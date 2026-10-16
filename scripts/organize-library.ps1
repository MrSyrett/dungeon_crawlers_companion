# One-time sort of the Library — PowerShell twin of scripts/organize-library.mjs,
# for a PC without Node. Moves the PDFs loose in protected\rulebooks\ into
# protected\rulebooks\<System>\<Core Rules|Expansions|Adventures>\ (with `git mv`
# when git is available, so the moves show as renames). Safe to re-run.
#
#   Right-click this file → "Run with PowerShell"   (dry run: shows the moves)
#   or from the repo folder:  powershell -ExecutionPolicy Bypass -File scripts\organize-library.ps1 -Apply

param([switch]$Apply)
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Lib  = Join-Path $Root "protected\rulebooks"
Set-Location $Root

$Moves = @(
  @('shadowdark-core-rules.pdf', 'Shadowdark\Core Rules'),
  @('Shadowdark Player Quickstart.pdf', 'Shadowdark\Core Rules'),
  @('Shadowdark Game Master Quickstart.pdf', 'Shadowdark\Core Rules'),
  @('Cursed Scroll Compilation.pdf', 'Shadowdark\Expansions'),
  @('DarkSpace Rulebook.pdf', 'Shadowdark\Expansions'),
  @('DarkSpace Quickstart Rules.pdf', 'Shadowdark\Expansions'),
  @('Carl RPG Core Rulebook.pdf', 'Dungeon Crawler Carl\Core Rules'),
  @('Crawlers.pdf', 'Dungeon Crawler Carl\Expansions'),
  @('Gamemasters Toolkit.pdf', 'Dungeon Crawler Carl\Expansions'),
  @('Par for the Course.pdf', 'Dungeon Crawler Carl\Expansions'),
  @('Rules for Survival.pdf', 'Dungeon Crawler Carl\Expansions'),
  @('Atlas Tutorial Floors.pdf', 'Dungeon Crawler Carl\Adventures'),
  @('ICRPG Master Edition.pdf', 'Index Card RPG\Core Rules'),
  @('ICRPG Adventures.pdf', 'Index Card RPG\Adventures'),
  @('Nimble CoreRules.pdf', 'Nimble\Core Rules'),
  @('Nimble Heroes.pdf', 'Nimble\Expansions'),
  @('Nimble GMG.pdf', 'Nimble\Expansions'),
  @('Nimble 5e.pdf', 'Nimble\Expansions'),
  @('Lord of the Rings Rules.pdf', 'The Lord of the Rings\Core Rules'),
  @('Kids on Bikes Second Edition Core Rulebook.pdf', 'Kids on Bikes\Core Rules'),
  @('Kids on Brooms.pdf', 'Kids on Bikes\Expansions'),
  @('Kids in Capes.pdf', 'Kids on Bikes\Expansions'),
  @('Never Stop Blowing Up.pdf', 'Kids on Bikes\Expansions'),
  @('Candela Obscura Core Rulebook.pdf', 'Candela Obscura\Core Rules'),
  @('Marvel Multiverse RPG Core Rule Book.pdf', 'Marvel Multiverse RPG\Core Rules'),
  @('Marvel Multiverse RPG Quickstart with Thunderbolts Adventure.pdf', 'Marvel Multiverse RPG\Core Rules'),
  @('Marvel Multiverse RPG Avengers Expansion.pdf', 'Marvel Multiverse RPG\Expansions'),
  @('Marvel Multiverse RPG Spider verse Expansion.pdf', 'Marvel Multiverse RPG\Expansions'),
  @('Marvel Multiverse RPG X Men Expansion.pdf', 'Marvel Multiverse RPG\Expansions'),
  @('Marvel Multiverse RPG Secret Wars.pdf', 'Marvel Multiverse RPG\Expansions'),
  @('JLURPG Quickstart.pdf', 'Justice League Unlimited\Core Rules'),
  @('GB Training Manual.pdf', 'Ghostbusters\Core Rules'),
  @('GB Operations Manual.pdf', 'Ghostbusters\Core Rules'),
  @('Ghostbusters International.pdf', 'Ghostbusters\Core Rules'),
  @('STAR WARS The Roleplaying Game.pdf', 'Star Wars\Core Rules'),
  @('STAR WARS Sourcebook.pdf', 'Star Wars\Expansions'),
  @('STARWARS Rules Companion.pdf', 'Star Wars\Expansions'),
  @('ACE Omnibus.pdf', 'ACE\Core Rules'),
  @('D62e Core Rulebook.pdf', 'D6 System 2e\Core Rules'),
  @('ALIEN RPG Core Rulebook.pdf', 'Alien RPG\Core Rules'),
  @('The Walking Dead RPG Core Rules.pdf', 'The Walking Dead\Core Rules'),
  @('Mutant Year Zero Core Rulebook.pdf', 'Mutant Year Zero\Core Rules'),
  @('Vaesen Core Rulebook.pdf', 'Vaesen\Core Rules')
)

$useGit = $false
if ($Apply) { try { git rev-parse --is-inside-work-tree *> $null; $useGit = ($LASTEXITCODE -eq 0) } catch { $useGit = $false } }

$moved = 0
foreach ($m in $Moves) {
  $name = $m[0]; $dir = $m[1]
  $from = Join-Path $Lib $name
  if (-not (Test-Path -LiteralPath $from)) { continue }   # already sorted, or not here
  $toDir = Join-Path $Lib $dir
  $to = Join-Path $toDir $name
  Write-Host ("  {0}  ->  {1}\{0}" -f $name, $dir)
  if (-not $Apply) { $moved++; continue }
  New-Item -ItemType Directory -Force -Path $toDir | Out-Null
  if ($useGit) {
    git ls-files --error-unmatch -- "protected/rulebooks/$name" *> $null
    if ($LASTEXITCODE -eq 0) { git mv -- "protected/rulebooks/$name" ("protected/rulebooks/" + ($dir -replace '\\','/') + "/$name") }
    else { Move-Item -LiteralPath $from -Destination $to }
  } else { Move-Item -LiteralPath $from -Destination $to }
  $moved++
}

$left = Get-ChildItem -LiteralPath $Lib -File -Filter *.pdf
if ($left) {
  Write-Host "`nStill loose (not in the known list) - file these by hand into <System>\<Core Rules|Expansions|Adventures>\:"
  $left | ForEach-Object { Write-Host "  $($_.Name)" }
}
if ($Apply) { Write-Host "`nMoved $moved book(s). Commit the changes." }
else {
  Write-Host "`nDry run: $moved book(s) would move. To do it, run:"
  Write-Host "  powershell -ExecutionPolicy Bypass -File scripts\organize-library.ps1 -Apply"
}
if ($Host.Name -eq "ConsoleHost" -and -not $env:WT_SESSION) { Read-Host "`nPress Enter to close" | Out-Null }
