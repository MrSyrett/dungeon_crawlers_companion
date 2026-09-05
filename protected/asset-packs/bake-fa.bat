@echo off
REM ============================================================================
REM  Bake ALL Forgotten Adventures object packs into the Map Maker's gated store.
REM  Run this ON YOUR PC (double-click it). It reads your FA packs directly, so
REM  there are NO size limits — the big 600MB+ packs bake the same as the small
REM  ones. When it finishes, open GitHub Desktop and commit the
REM  protected\asset-packs\fa folder.
REM
REM  Needs Python 3 with Pillow. If Pillow is missing this installs it for you.
REM  If "python" isn't found, install Python 3 from https://python.org first
REM  (tick "Add python.exe to PATH" in the installer).
REM ============================================================================

REM --- EDIT THIS if your Forgotten Adventures folder is somewhere else ---
set "FA=S:\TTRPGS\MAPS\ASSETS\Forgotten Adventures"

REM --- Which packs to bake. Default: every "Walls and Objects" pack (the ones
REM     with placeable props). Change to *.dungeondraft_pack to include texture
REM     packs too, or to a name fragment like *Furniture* to bake just one. ---
set "PATTERN=FA_Walls and Objects*.dungeondraft_pack"

set "HERE=%~dp0"
set "OUT=%HERE%fa"

echo Checking Pillow...
python -c "import PIL" 2>nul || python -m pip install --user pillow || goto :nopy

echo.
echo Baking packs matching "%PATTERN%"
echo   from : %FA%
echo   into : %OUT%
echo (this can take 20-40 minutes for the full object set — leave it running)
echo.

REM Fresh, complete bake: clear the folder so there are no stale sheets.
if exist "%OUT%" rmdir /s /q "%OUT%"

python "%HERE%extract-fa.py" "%FA%" "%OUT%" "%PATTERN%"
if errorlevel 1 goto :fail

echo.
echo ============================================================================
echo  Done. Open GitHub Desktop and commit the protected\asset-packs\fa folder,
echo  then deploy. The Map Maker will load every baked pack automatically.
echo ============================================================================
pause
exit /b 0

:nopy
echo.
echo Could not find Python. Install Python 3 from https://python.org (tick
echo "Add python.exe to PATH"), then run this again.
pause
exit /b 1

:fail
echo.
echo The bake failed — check the message above. If it's a missing package, run:
echo    python -m pip install --user pillow
pause
exit /b 1
