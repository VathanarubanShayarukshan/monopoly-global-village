"""Static file server for Monopoly Global Village — no-cache headers for development."""
import http.server
import socketserver
import os

PORT = 34567
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src'))


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, fmt, *args):
        print(f"[{self.log_date_time_string()}] {fmt % args}")


with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"Serving Monopoly Global Village on http://localhost:{PORT} (no-cache)")
    httpd.serve_forever()