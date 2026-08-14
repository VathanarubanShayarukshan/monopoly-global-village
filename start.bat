@echo off
setlocal
title Monopoly Global Village
cd /d "%~dp0"

rem ---- Monopoly Global Village launcher (Windows) ----
rem Starts the Python server and opens the game in your browser.

where python >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Python not found. Install Python 3 from https://www.python.org/downloads/
  pause
  exit /b 1
)

echo Starting Monopoly Global Village...
echo Server: http://localhost:34567
echo Close this window to stop the server.

start "Monopoly Server" /min python server.py

rem Give the server a moment, then open the game in the default browser
rem (powershell sleep works everywhere; "timeout" fails when input is redirected)
powershell -NoProfile -Command "Start-Sleep -Milliseconds 1500"
start "" "http://localhost:34567"

endlocal