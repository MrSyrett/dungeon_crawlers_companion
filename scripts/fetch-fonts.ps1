<#
  Downloads every Google face listed in scripts/font-manifest.json into
  public/fonts/google/, then rewrites the generated @font-face block inside
  public/tokens.css to point at those files.

  This is the PowerShell twin of scripts/fetch-fonts.mjs. Both exist because this
  repo's machine has no Node installed, and both read the SAME font-manifest.json,
  so there is no second copy of the family list to drift. Either one produces the
  same files; run whichever you can.

  RUN IT (from the repo root, in Windows PowerShell):

      powershell -ExecutionPolicy Bypass -File scripts\fetch-fonts.ps1

  The -ExecutionPolicy flag is there because Windows refuses to run an unsigned
  script it thinks came from elsewhere, which a file out of git often is. It applies
  to this one invocation only and changes no setting.

      ... -File scripts\fetch-fonts.ps1 -Plan     # print the URLs, no network
      ... -File scripts\fetch-fonts.ps1 -Force    # re-download everything

  Then commit public/fonts/google/ and public/tokens.css together. The files never
  change on their own, so this is a one-off per face.

  Afterwards, `node scripts/check-fonts.mjs` verifies the result — every manifest
  face present on disk, every family referenced anywhere actually declared. If you
  have no Node, that check runs on Claude's side instead; it reads the same files.
#>
#Requires -Version 5.1
[CmdletBinding()]
param(
  [switch]$Force,
  [switch]$Plan
)

$ErrorActionPreference = 'Stop'

# Windows PowerShell 5.1 still defaults to TLS 1.0 for .NET web calls, which Google
# refuses outright — without this the very first request dies with a connection
# error that looks like a network fault.
[Net.ServicePointManager]::SecurityProtocol =
  [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12

# Invoke-WebRequest spends more time drawing its progress bar than downloading a
# 15 KB font. Turning it off is the difference between minutes and seconds here.
$ProgressPreference = 'SilentlyContinue'

# The css2 API decides the format from the User-Agent: anything it does not
# recognise gets ttf, which is about three times the bytes for no benefit.
$UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

$repo = Split-Path -Parent $PSScriptRoot
$manifestPath = Join-Path $PSScriptRoot 'font-manifest.json'
if (-not (Test-Path $manifestPath)) { throw "Cannot find $manifestPath" }
$M = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

$outDir  = Join-Path $repo ($M.outDir  -replace '/', '\')
$cssPath = Join-Path $repo ($M.cssFile -replace '/', '\')
if (-not (Test-Path $cssPath)) { throw "Cannot find $cssPath" }

function Get-Slug([string]$family) {
  (($family.ToLower() -replace '[^a-z0-9]+', '-')).Trim('-')
}

# A weight that contains a space is a RANGE ("300 900"), which means Google served
# one variable file covering it rather than an instance per weight. Those land in a
# single "-var" file that the browser interpolates, so the face count can come back
# lower than the manifest asked for. That is fine and expected.
function Get-FaceFile([string]$family, [string]$weight, [bool]$italic) {
  $w = if ($weight -match '\s') { 'var' } else { $weight }
  $suffix = if ($italic) { '-italic' } else { '' }
  '{0}-{1}{2}.woff2' -f (Get-Slug $family), $w, $suffix
}

function Get-Css2Url($family, $spec) {
  $name = $family -replace ' ', '+'
  # Fraunces carries an optical-size axis as well as weight, and the API wants every
  # axis it is asked about listed alphabetically, so that one ships its axis verbatim.
  if ($spec.PSObject.Properties.Name -contains 'axis' -and $spec.axis) {
    return "https://fonts.googleapis.com/css2?family=$name`:$($spec.axis)&display=swap"
  }
  $normal = @(); if ($spec.PSObject.Properties.Name -contains 'normal' -and $spec.normal) { $normal = @($spec.normal | Sort-Object) }
  $italic = @(); if ($spec.PSObject.Properties.Name -contains 'italic' -and $spec.italic) { $italic = @($spec.italic | Sort-Object) }
  if ($italic.Count -gt 0) {
    $tuples = @()
    foreach ($w in $normal) { $tuples += "0,$w" }
    foreach ($w in $italic) { $tuples += "1,$w" }
    $axis = 'ital,wght@' + ($tuples -join ';')
  } else {
    $axis = 'wght@' + ($normal -join ';')
  }
  "https://fonts.googleapis.com/css2?family=$name`:$axis&display=swap"
}

# ---------------------------------------------------------------------------
# Plan the 31 requests
# ---------------------------------------------------------------------------
$plan = @()
foreach ($p in $M.families.PSObject.Properties) {
  $plan += [pscustomobject]@{ Family = $p.Name; Url = (Get-Css2Url $p.Name $p.Value) }
}

if ($Plan) {
  foreach ($p in $plan) { '{0,-22} {1}' -f $p.Family, $p.Url }
  ''
  "$($plan.Count) families. Run without -Plan to download."
  exit 0
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# A css2 response is a run of  /* subset */ @font-face { ... }  blocks, one per
# (style, weight, unicode range). Only the manifest's subset is kept.
$blockRe = '/\*\s*([a-z0-9-]+)\s*\*/\s*@font-face\s*\{([^}]*)\}'

$declared = New-Object System.Collections.ArrayList
$failed   = New-Object System.Collections.ArrayList
$fetched = 0; $skipped = 0; $bytes = 0

foreach ($p in $plan) {
  $css = $null
  try {
    $css = (Invoke-WebRequest -UseBasicParsing -UserAgent $UA -Uri $p.Url).Content
  } catch {
    [void]$failed.Add("$($p.Family): $($_.Exception.Message)")
    continue
  }

  $faces = @()
  foreach ($m in [regex]::Matches($css, $blockRe, 'IgnoreCase')) {
    if ($m.Groups[1].Value -ne $M.subset) { continue }
    $body = $m.Groups[2].Value
    $style  = [regex]::Match($body, 'font-style:\s*([^;]+);').Groups[1].Value.Trim()
    $weight = [regex]::Match($body, 'font-weight:\s*([^;]+);').Groups[1].Value.Trim()
    $range  = [regex]::Match($body, 'unicode-range:\s*([^;]+);').Groups[1].Value.Trim()
    $url    = [regex]::Match($body, 'url\(([^)]+)\)').Groups[1].Value.Trim([char[]]@("'", '"'))
    if (-not $url) { continue }
    if (-not $weight) { $weight = '400' }
    $faces += [pscustomobject]@{
      Italic = ($style -like 'italic*' -or $style -like 'oblique*')
      Weight = $weight
      Range  = $range
      Url    = $url
    }
  }

  if ($faces.Count -eq 0) {
    [void]$failed.Add("$($p.Family): no `"$($M.subset)`" @font-face block in the response")
    continue
  }

  foreach ($f in $faces) {
    $file = Get-FaceFile $p.Family $f.Weight $f.Italic
    $abs  = Join-Path $outDir $file
    if ((Test-Path -LiteralPath $abs) -and -not $Force) {
      $skipped++
    } else {
      try {
        Invoke-WebRequest -UseBasicParsing -UserAgent $UA -Uri $f.Url -OutFile $abs
        $fetched++
        $bytes += (Get-Item -LiteralPath $abs).Length
      } catch {
        $label = if ($f.Italic) { "italic $($f.Weight)" } else { $f.Weight }
        [void]$failed.Add("$($p.Family) ${label}: $($_.Exception.Message)")
        continue
      }
    }
    [void]$declared.Add([pscustomobject]@{
      Family = $p.Family; Italic = $f.Italic; Weight = $f.Weight; Range = $f.Range; File = $file
    })
  }
  '{0,-22} {1} face(s)' -f $p.Family, $faces.Count
}

# ---------------------------------------------------------------------------
# The @font-face block. font-display:swap keeps text readable while a face loads —
# the same policy as before, but the wait is now a same-origin hit on a file cached
# for a year rather than two third-party round trips.
# ---------------------------------------------------------------------------
$rows = $declared | Sort-Object Family, Italic, { [int]($_.Weight -split '\s')[0] }

$lines = New-Object System.Collections.ArrayList
[void]$lines.Add($M.beginMark)
[void]$lines.Add('/* Generated by scripts/fetch-fonts.ps1 (or .mjs) from scripts/font-manifest.json.')
[void]$lines.Add('   Do not hand-edit between the markers — add a face to the manifest and re-run the')
[void]$lines.Add('   fetcher. These rules live in tokens.css because every standalone tool page')
[void]$lines.Add('   already loads it, so they cost no extra request at all. */')
foreach ($d in $rows) {
  $style = if ($d.Italic) { 'italic' } else { 'normal' }
  [void]$lines.Add('@font-face {')
  [void]$lines.Add('  font-family: "' + $d.Family + '";')
  [void]$lines.Add('  font-style: ' + $style + ';')
  [void]$lines.Add('  font-weight: ' + $d.Weight + ';')
  [void]$lines.Add('  font-display: swap;')
  [void]$lines.Add('  src: url("' + $M.urlPrefix + '/' + $d.File + '") format("woff2");')
  if ($d.Range) { [void]$lines.Add('  unicode-range: ' + $d.Range + ';') }
  [void]$lines.Add('}')
}
[void]$lines.Add($M.endMark)
# tokens.css is LF throughout; joining with "`n" keeps it that way instead of
# leaving the one generated region in CRLF.
$block = [string]::Join("`n", $lines.ToArray())

$css = [System.IO.File]::ReadAllText($cssPath)
$i = $css.IndexOf($M.beginMark)
$j = $css.IndexOf($M.endMark)
if ($i -ge 0 -and $j -gt $i) {
  $new = $css.Substring(0, $i) + $block + $css.Substring($j + $M.endMark.Length)
} elseif ($i -ge 0 -or $j -ge 0) {
  throw "$($M.cssFile) has one generated marker but not the other — fix it by hand. The woff2 files are already in place, so re-running after that is cheap."
} else {
  # First run. The faces must come before anything that sets a font-family, and
  # tokens.css already opens with the self-hosted non-Google faces, so the block
  # goes in just above the first of those.
  $anchor = $css.IndexOf('@font-face')
  if ($anchor -ge 0) {
    $new = $css.Substring(0, $anchor) + $block + "`n`n" + $css.Substring($anchor)
  } else {
    $new = $block + "`n`n" + $css
  }
}
# WriteAllText with an explicit no-BOM encoding: Set-Content -Encoding UTF8 on 5.1
# prepends a byte-order mark, which would show up as a spurious change on the first
# line of tokens.css.
[System.IO.File]::WriteAllText($cssPath, $new, (New-Object System.Text.UTF8Encoding($false)))

$manifestOut = [pscustomobject]@{
  generated = (Get-Date).ToUniversalTime().ToString('o')
  subset    = $M.subset
  faces     = @($rows | ForEach-Object {
    [pscustomobject]@{
      family = $_.Family
      italic = [bool]$_.Italic
      weight = $_.Weight
      range  = $_.Range
      file   = $_.File
    }
  })
}
[System.IO.File]::WriteAllText(
  (Join-Path $outDir 'manifest.json'),
  ($manifestOut | ConvertTo-Json -Depth 5) + "`n",
  (New-Object System.Text.UTF8Encoding($false)))

''
$mb = if ($bytes -gt 0) { ' ({0:N2} MB)' -f ($bytes / 1MB) } else { '' }
"$($declared.Count) faces declared — $fetched downloaded$mb, $skipped already present."
"Wrote the @font-face block into $($M.cssFile) and $($M.outDir)/manifest.json."

if ($failed.Count -gt 0) {
  ''
  Write-Host "$($failed.Count) FAILED:" -ForegroundColor Red
  foreach ($f in $failed) { Write-Host "  $f" -ForegroundColor Red }
  ''
  'Re-run to retry just these — files already on disk are skipped.'
  exit 1
}
''
'Now commit public/fonts/google/ and public/tokens.css together.'
