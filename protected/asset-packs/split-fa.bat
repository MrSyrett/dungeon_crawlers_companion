@echo off
REM ============================================================================
REM  Double-click this to split the oversized Forgotten Adventures packs.
REM
REM  It runs split-fa.ps1 with Windows' built-in PowerShell -- NOTHING to
REM  install, no Node, no PATH setup. The chunks land in an "_split" subfolder
REM  of your FA folder. When it's done, tell Claude "the _split folder is
REM  ready" and it will pull + bake them.
REM
REM  (If your FA folder moved, edit the path at the top of split-fa.ps1.)
REM ============================================================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0split-fa.ps1"

echo.
pause
