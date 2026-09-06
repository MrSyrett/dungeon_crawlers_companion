# ============================================================================
#  Forgotten Adventures pack splitter (PowerShell -- no install needed).
#
#  Chops every .dungeondraft_pack over 380 MB into raw byte chunks
#  (<name>.part001, .part002, ...) inside an "_split" subfolder. The chunks
#  are NOT usable on their own -- Claude glues them back into the exact
#  original file in the cloud and bakes it. Nothing here parses the pack, so
#  there's nothing to break.
#
#  Launched by split-fa.bat (double-click that). To run directly:
#    powershell -NoProfile -ExecutionPolicy Bypass -File split-fa.ps1
# ============================================================================

# --- EDIT THIS if your Forgotten Adventures folder is somewhere else ---
$FA = "S:\TTRPGS\MAPS\ASSETS\Forgotten Adventures"

$ChunkMB   = 380
$ThreshMB  = 380
$SplitDir  = Join-Path $FA "_split"
$chunkSize = $ChunkMB * 1MB

if (!(Test-Path -LiteralPath $FA)) {
    Write-Host "FA folder not found: $FA" -ForegroundColor Red
    Write-Host "Edit the `$FA line at the top of this script and try again."
    exit 1
}

if (!(Test-Path -LiteralPath $SplitDir)) {
    New-Item -ItemType Directory -Path $SplitDir | Out-Null
}

# Objects first: only split the "Walls and Objects" packs. (Texture packs
# come later -- change or remove the -like clause to include them.)
$packs = Get-ChildItem -LiteralPath $FA -Filter *.dungeondraft_pack -File |
         Where-Object { $_.Length -gt ($ThreshMB * 1MB) -and $_.Name -like "*Walls and Objects*" }

if ($packs.Count -eq 0) {
    Write-Host "No packs over $ThreshMB MB -- nothing to split." -ForegroundColor Green
    Write-Host "Claude can pull the rest directly. You're done."
    exit 0
}

Write-Host "Splitting $($packs.Count) oversized pack(s) into:"
Write-Host "  $SplitDir`n"

foreach ($p in $packs) {
    $mb = [math]::Round($p.Length / 1MB)
    Write-Host "$($p.Name)  ($mb MB)"

    # remove any stale parts for this pack
    Get-ChildItem -LiteralPath $SplitDir -Filter ($p.Name + ".part*") -File -ErrorAction SilentlyContinue |
        Remove-Item -Force -ErrorAction SilentlyContinue

    $inStream  = [System.IO.File]::OpenRead($p.FullName)
    $buffer    = New-Object byte[] (4 * 1MB)
    $idx       = 0
    $written   = 0
    $partStream = $null
    try {
        while (($read = $inStream.Read($buffer, 0, $buffer.Length)) -gt 0) {
            if ($null -eq $partStream -or $written -ge $chunkSize) {
                if ($partStream) { $partStream.Close() }
                $idx++
                $partPath = Join-Path $SplitDir ("{0}.part{1:000}" -f $p.Name, $idx)
                $partStream = [System.IO.File]::Create($partPath)
                $written = 0
                Write-Host ("  -> part{0:000}" -f $idx)
            }
            $partStream.Write($buffer, 0, $read)
            $written += $read
        }
    }
    finally {
        if ($partStream) { $partStream.Close() }
        $inStream.Close()
    }
}

Write-Host "`n============================================================================"
Write-Host " Done. Tell Claude: `"the _split folder is ready`" and it will pull + bake"
Write-Host " the oversized packs. You can delete the _split folder afterwards."
Write-Host "============================================================================"
