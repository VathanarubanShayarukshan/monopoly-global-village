"""Monopoly Global Village server.
Static file server + JSON file database (db.json) API so ALL game data is saved
permanently in a real file, never only in the browser cache.

GET  /api/state  -> read the whole database from db.json
POST /api/state  -> atomically overwrite db.json with the submitted body
GET  /api/admin  -> admin panel: all data (requires ?pin=)
POST /api/admin/delete-account  -> delete an account (requires ?pin=&username=)
POST /api/admin/delete-game     -> delete a game (requires ?pin=&id=)
POST /api/admin/clear-db        -> clear the database (requires ?pin=)
Everything else  -> static files from ./src with no-cache headers
"""
import http.server
import json
import os
import socketserver
import tempfile
import urllib.parse

PORT = 34567
ADMIN_PIN = os.environ.get('MGV_ADMIN_PIN', '1234')   # change via: export MGV_ADMIN_PIN=your_pin
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


def _admin_ok(handler):
    qs = urllib.parse.urlparse(handler.path).query
    pin = urllib.parse.parse_qs(qs).get('pin', [''])[0]
    return pin == ADMIN_PIN


class Handler(http.server.SimpleHTTPRequestHandler):

    def _send_json(self, obj, status=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
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
        if self.path.startswith('/api/admin'):
            if not _admin_ok(self):
                self._send_json({'error': 'wrong pin'}, 403)
                return
            db = load_db()
            self._send_json({
                'accounts': db['accounts'],
                'games': db['games'],
                'rooms': db['rooms'],
                'banked': db['banked'],
                'incomeOffsets': db['incomeOffsets'],
                'stats': {
                    'accounts': len(db['accounts']),
                    'games': len(db['games']),
                    'rooms': len(db['rooms'])
                }
            })
            return
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        qs = urllib.parse.parse_qs(parsed.query)

        if path == '/api/state':
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
            return

        if path == '/api/admin/delete-account':
            if not _admin_ok(self):
                self._send_json({'error': 'wrong pin'}, 403)
                return
            username = (qs.get('username', [''])[0]).strip()
            if not username:
                self._send_json({'error': 'missing username'}, 400)
                return
            db = load_db()
            before = len(db['accounts'])
            db['accounts'] = [a for a in db['accounts'] if a.get('username') != username]
            if len(db['accounts']) == before:
                self._send_json({'ok': False, 'error': 'account not found'}, 404)
                return
            save_db(db)
            self._send_json({'ok': True, 'deleted': username})
            return

        if path == '/api/admin/delete-game':
            if not _admin_ok(self):
                self._send_json({'error': 'wrong pin'}, 403)
                return
            gid = (qs.get('id', [''])[0]).strip()
            if not gid:
                self._send_json({'error': 'missing game id'}, 400)
                return
            db = load_db()
            before = len(db['games'])
            db['games'] = [g for g in db['games'] if g.get('id') != gid]
            if len(db['games']) == before:
                self._send_json({'ok': False, 'error': 'game not found'}, 404)
                return
            save_db(db)
            self._send_json({'ok': True, 'deleted': gid})
            return

        if path == '/api/admin/clear-db':
            if not _admin_ok(self):
                self._send_json({'error': 'wrong pin'}, 403)
                return
            db = {
                'version': 2,
                'accounts': [],
                'games': [],
                'rooms': [],
                'banked': {},
                'incomeOffsets': {}
            }
            save_db(db)
            self._send_json({'ok': True, 'message': 'database cleared'})
            return

        self._send_json({'ok': False, 'error': 'not found'}, 404)

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
    print(f"Admin panel at http://localhost:{PORT}/admin.html (PIN: {ADMIN_PIN})")
    httpd.serve_forever()