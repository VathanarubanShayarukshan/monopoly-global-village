"""Monopoly Global Village server.
Static file server + JSON file database (db.json) API so ALL game data is saved
permanently in a real file, never only in the browser cache.

GET  /api/state  -> read the whole database from db.json
POST /api/state  -> atomically overwrite db.json with the submitted body
Everything else  -> static files from ./src with no-cache headers
"""
import http.server
import json
import os
import socketserver
import tempfile

PORT = 34567
BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE, 'db.json')
os.chdir(os.path.join(BASE, 'src'))


def load_db():
    try:
        with open(DB_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception:
        data = {}
    if not isinstance(data, dict):
        data = {}
    data.setdefault('version', 2)
    for key in ('accounts', 'games', 'rooms'):
        if not isinstance(data.get(key), list):
            data[key] = []
    if not isinstance(data.get('banked'), dict):
        data['banked'] = {}
    if not isinstance(data.get('incomeOffsets'), dict):
        data['incomeOffsets'] = {}
    return data


def save_db(data):
    fd, tmp = tempfile.mkstemp(dir=BASE, suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, DB_PATH)
    except Exception:
        try:
            os.unlink(tmp)
        except Exception:
            pass
        raise


class Handler(http.server.SimpleHTTPRequestHandler):

    def _send_json(self, obj, status=200):
        body = json.dumps(obj).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith('/api/state'):
            self._send_json(load_db())
            return
        super().do_GET()

    def do_POST(self):
        if not self.path.startswith('/api/state'):
            self._send_json({'ok': False, 'error': 'not found'}, 404)
            return
        try:
            length = int(self.headers.get('Content-Length') or 0)
            raw = self.rfile.read(length) if length else b'{}'
            data = json.loads(raw.decode('utf-8'))
        except Exception as e:
            self._send_json({'ok': False, 'error': 'bad json: %s' % e}, 400)
            return
        try:
            save_db(data)
            self._send_json({'ok': True})
        except Exception as e:
            self._send_json({'ok': False, 'error': 'write failed: %s' % e}, 500)

    def end_headers(self):
        if not self.path.startswith('/api/'):
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        print(f"[{self.log_date_time_string()}] {fmt % args}")


with socketserver.ThreadingTCPServer(("", PORT), Handler) as httpd:
    print(f"Monopoly Global Village on http://localhost:{PORT}")
    print(f"JSON database at {DB_PATH}")
    httpd.serve_forever()