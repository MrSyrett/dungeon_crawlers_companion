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

  Afterwards, `node scripts/check-fonts.mjs` verifies the result: every manifest
  face present on disk, every family referenced anywhere actually declared. If you
  have no Node, that check runs on Claude's side instead; it reads the same files.
#>
# THIS FILE MUST STAY PURE ASCII.
# Windows PowerShell 5.1 reads a .ps1 as Windows-1252 unless it has a BOM, so a
# UTF-8 em dash (E2 80 94) decodes as three characters ending in 0x94 - which is a
# RIGHT CURLY QUOTE, and PowerShell accepts curly quotes as string delimiters. One
# em dash inside a double-quoted message therefore closed the string mid-sentence
# and the file would not parse at all:
#     Unexpected token 'fix' in expression or statement.
# Use plain hyphens and straight quotes. scripts/check-fonts.mjs fails if any
# non-ASCII byte reappears in here.
# NO param() BLOCK, ON PURPOSE.
# A [switch] parameter blows up if it is supplied twice - PowerShell binds the second
# one as an array and refuses it, with an error that says nothing about what you typed:
#     Cannot convert value "System.Object[]" to type
#     "System.Management.Automation.SwitchParameter".
# That is easy to do by accident when pasting a command line, and this script takes no
# arguments it cannot live without, so the flags are read out of $args by hand instead.
# Duplicates, any order, any casing, with or without a leading dash: all fine.
# scripts/check-fonts.mjs fails if a param() block reappears here.
# POWERSHELL VARIABLE NAMES ARE CASE-INSENSITIVE. $Plan and $plan are one variable.
# This script shipped with a `$Plan` flag AND a `$plan` array of the 31 families to
# fetch: building the array made the flag truthy, so it always took the -Plan branch
# and exited without downloading a thing, no matter what you typed on the command line.
# The same collision sat between `$Manifest` (then `$M`) and the `$m` regex match
# variable, which would have wiped the manifest on the first family.
# Nothing here may differ from another variable by case alone. check-fonts.mjs fails
# on any such pair, and no syntax check can see this - the file parses perfectly.
$flags = @()
# -replace rather than .TrimStart('-','/'): the method takes a char[], and relying on
# PowerShell to coerce two single-character strings into chars is one more overload
# resolution that can surprise you at runtime. A regex cannot.
foreach ($a in $args) { $flags += ((([string]$a) -replace '^[-/]+', '')).ToLower() }
$Force = $flags -contains 'force'
$PlanOnly  = $flags -contains 'plan'
$unknown = @($flags | Where-Object { $_ -ne 'force' -and $_ -ne 'plan' -and $_ -ne '' })
if ($unknown.Count -gt 0) {
  Write-Host ("Ignoring unrecognised argument(s): " + ($unknown -join ', ')) -ForegroundColor Yellow
  Write-Host "The only ones this script understands are -Plan and -Force." -ForegroundColor Yellow
}

$ErrorActionPreference = 'Stop'

# Windows PowerShell 5.1 still defaults to TLS 1.0 for .NET web calls, which Google
# refuses outright. Without this the very first request dies with a connection
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
$Manifest = [System.IO.File]::ReadAllText($manifestPath) | ConvertFrom-Json

$outDir  = Join-Path $repo ($Manifest.outDir  -replace '/', '\')
$cssPath = Join-Path $repo ($Manifest.cssFile -replace '/', '\')
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
$requests = @()
foreach ($p in $Manifest.families.PSObject.Properties) {
  $requests += [pscustomobject]@{ Family = $p.Name; Url = (Get-Css2Url $p.Name $p.Value) }
}

if ($PlanOnly) {
  foreach ($p in $requests) { '{0,-22} {1}' -f $p.Family, $p.Url }
  ''
  "$($requests.Count) families. Run without -Plan to download."
  exit 0
}

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# A css2 response is a run of  /* subset */ @font-face { ... }  blocks, one per
# (style, weight, unicode range). Only the manifest's subset is kept.
$blockRe = '/\*\s*([a-z0-9-]+)\s*\*/\s*@font-face\s*\{([^}]*)\}'

$declared = New-Object System.Collections.ArrayList
$failed   = New-Object System.Collections.ArrayList
$fetched = 0; $skipped = 0; $bytes = 0; $collapsed = 0

foreach ($p in $requests) {
  $css = $null
  try {
    $css = (Invoke-WebRequest -UseBasicParsing -UserAgent $UA -Uri $p.Url).Content
  } catch {
    [void]$failed.Add("$($p.Family): $($_.Exception.Message)")
    continue
  }

  $faces = @()
  foreach ($blockMatch in [regex]::Matches($css, $blockRe, 'IgnoreCase')) {
    if ($blockMatch.Groups[1].Value -ne $Manifest.subset) { continue }
    $body = $blockMatch.Groups[2].Value
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
    [void]$failed.Add("$($p.Family): no `"$($Manifest.subset)`" @font-face block in the response")
    continue
  }

  # COLLAPSE VARIABLE FAMILIES BEFORE DOWNLOADING.
  # Asked for several discrete weights of a VARIABLE family, the css2 API answers with
  # one @font-face per weight that all point at the SAME woff2 url. Taken literally
  # that stores N byte-identical copies and makes a page using three weights download
  # the file three times - the opposite of the point of self-hosting. Verified against
  # the real downloads: 21 of the 31 families are variable, and 73 of 130 files were
  # copies (2.49 MB of 3.73 MB).
  # So faces sharing a url become ONE face covering a weight RANGE. A single value
  # renders correctly too (the wght axis is simply set to it, which is why nothing ever
  # looked wrong) but costs a file per weight. The file keeps the LOWEST weight's name
  # rather than a -var name, so this is idempotent against files already on disk, and
  # the range spans exactly the weights the manifest asked for, so which weight matches
  # which face does not change.
  $groups = $faces | Group-Object -Property @{Expression={ "$($_.Italic)|$($_.Url)" }}
  $collapsedFaces = @()
  foreach ($g in $groups) {
    $ordered = $g.Group | Sort-Object -Property @{Expression={ [int]$_.Weight }}
    $lo = $ordered[0]
    $hi = $ordered[$ordered.Count - 1]
    $weight = if ($ordered.Count -gt 1) { "$($lo.Weight) $($hi.Weight)" } else { $lo.Weight }
    $collapsedFaces += [pscustomobject]@{
      Italic = $lo.Italic; Weight = $weight; Range = $lo.Range; Url = $lo.Url
      FileWeight = $lo.Weight; Covers = $ordered.Count
    }
  }

  foreach ($f in $collapsedFaces) {
    $file = Get-FaceFile $p.Family $f.FileWeight $f.Italic
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
    if ($f.Covers -gt 1) { $collapsed += ($f.Covers - 1) }
  }
  if ($collapsedFaces.Count -lt $faces.Count) {
    '{0,-22} {1} face(s) -> {2} file(s) (variable)' -f $p.Family, $faces.Count, $collapsedFaces.Count
  } else {
    '{0,-22} {1} face(s)' -f $p.Family, $faces.Count
  }
}

# ---------------------------------------------------------------------------
# The @font-face block. font-display:swap keeps text readable while a face loads,
# the same policy as before, but the wait is now a same-origin hit on a file cached
# for a year rather than two third-party round trips.
# ---------------------------------------------------------------------------
# The inner parens are deliberate: in [int](expr)[0] it is not obvious whether the
# cast or the index binds first, and a weight here may be a range ("300 900") whose
# first token is the one to sort on.
$rows = $declared | Sort-Object -Property 'Family', 'Italic', { [int](($_.Weight -split '\s')[0]) }

$lines = New-Object System.Collections.ArrayList
[void]$lines.Add($Manifest.beginMark)
[void]$lines.Add('/* Generated by scripts/fetch-fonts.ps1 (or .mjs) from scripts/font-manifest.json.')
[void]$lines.Add('   Do not hand-edit between the markers. Add a face to the manifest and re-run the')
[void]$lines.Add('   fetcher. These rules live in tokens.css because every standalone tool page')
[void]$lines.Add('   already loads it, so they cost no extra request at all.')
[void]$lines.Add('   A weight RANGE means a variable font: Google serves one file for every weight of')
[void]$lines.Add('   a variable family, so one face covers the span instead of one file per weight. */')
foreach ($d in $rows) {
  $style = if ($d.Italic) { 'italic' } else { 'normal' }
  [void]$lines.Add('@font-face {')
  [void]$lines.Add('  font-family: "' + $d.Family + '";')
  [void]$lines.Add('  font-style: ' + $style + ';')
  [void]$lines.Add('  font-weight: ' + $d.Weight + ';')
  [void]$lines.Add('  font-display: swap;')
  [void]$lines.Add('  src: url("' + $Manifest.urlPrefix + '/' + $d.File + '") format("woff2");')
  if ($d.Range) { [void]$lines.Add('  unicode-range: ' + $d.Range + ';') }
  [void]$lines.Add('}')
}
[void]$lines.Add($Manifest.endMark)
# tokens.css is LF throughout; joining with "`n" keeps it that way instead of
# leaving the one generated region in CRLF.
$block = [string]::Join("`n", $lines.ToArray())

$css = [System.IO.File]::ReadAllText($cssPath)
$i = $css.IndexOf($Manifest.beginMark)
$j = $css.IndexOf($Manifest.endMark)
if ($i -ge 0 -and $j -gt $i) {
  $new = $css.Substring(0, $i) + $block + $css.Substring($j + $Manifest.endMark.Length)
} elseif ($i -ge 0 -or $j -ge 0) {
  throw "$($Manifest.cssFile) has one generated marker but not the other. Fix it by hand. The woff2 files are already in place, so re-running after that is cheap."
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
  subset    = $Manifest.subset
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
# 1048576 rather than the 1MB multiplier, and -Property with quoted names above:
# both are the forms that parse unambiguously. See the note in the project doc.
$mb = if ($bytes -gt 0) { ' ({0:N2} MB)' -f ($bytes / 1048576) } else { '' }
$dupNote = if ($collapsed -gt 0) { " ($collapsed duplicate variable-font file(s) skipped)" } else { '' }
"$($declared.Count) faces declared$dupNote`: $fetched downloaded$mb, $skipped already present."
"Wrote the @font-face block into $($Manifest.cssFile) and $($Manifest.outDir)/manifest.json."

if ($failed.Count -gt 0) {
  ''
  Write-Host "$($failed.Count) FAILED:" -ForegroundColor Red
  foreach ($f in $failed) { Write-Host "  $f" -ForegroundColor Red }
  ''
  'Re-run to retry just these: files already on disk are skipped.'
  exit 1
}
''
'Now commit public/fonts/google/ and public/tokens.css together.'
