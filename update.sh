#!/bin/bash
# Monopoly Global Village — VPS Update Script
# Pull latest code from GitHub and restart the server
# Usage: bash update.sh

set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "🔄 Pulling latest changes from GitHub..."
git pull origin main

echo "🛑 Stopping old server..."
pkill -f "python3 server.py" 2>/dev/null || true
sleep 1

echo "🚀 Starting server..."
nohup python3 server.py > server.log 2>&1 &
sleep 2

if curl -s http://localhost:34567/api/state > /dev/null 2>&1; then
  echo "✅ Server running at http://localhost:34567"
  echo "📊 Database: $DIR/db.json"
  echo "📋 Logs: tail -f $DIR/server.log"
else
  echo "❌ Server failed to start. Check: cat $DIR/server.log"
  exit 1
fi