#!/usr/bin/env bash
# Monopoly Global Village launcher (Linux / macOS)
# Starts the Python server and opens the game in your browser.
set -e
cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "[ERROR] Python 3 not found. Install it first (https://www.python.org/downloads/)."
  exit 1
fi

echo "Starting Monopoly Global Village..."
echo "Server: http://localhost:34567"
echo "Press Ctrl+C to stop the server."

python3 server.py &
SERVER_PID=$!

sleep 2

if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "http://localhost:34567" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then
  open "http://localhost:34567"
elif command -v google-chrome >/dev/null 2>&1; then
  google-chrome "http://localhost:34567" >/dev/null 2>&1 &
elif command -v chromium >/dev/null 2>&1; then
  chromium "http://localhost:34567" >/dev/null 2>&1 &
fi

trap 'kill $SERVER_PID 2>/dev/null' EXIT
wait $SERVER_PID