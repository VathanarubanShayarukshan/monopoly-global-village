"""Build src/js/game.js — single-file bundle (no ES modules) so the game works on
file://, localhost, and Netlify without module/CORS issues."""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / 'src' / 'js'
ORDER = [
    'constants.js',
    'storage.js',
    'audio.js',
    'game-engine.js',
    'multiplayer.js',
    'board.js',
    'bots.js',
    'ui.js',
    'app.js',
]

parts = []
for name in ORDER:
    text = (SRC / name).read_text(encoding='utf-8')
    out_lines = []
    skip_until_semicolon = False
    for line in text.splitlines():
        s = line.strip()
        if skip_until_semicolon:
            if s.endswith(';'):
                skip_until_semicolon = False
            continue
        if s.startswith('import '):
            if not s.endswith(';'):
                skip_until_semicolon = True
            continue
        if s.startswith('export {'):
            continue
        if s.startswith('export '):
            line = line.replace('export ', '', 1)
        out_lines.append(line)
    parts.append('\n'.join(out_lines))

bundle = '\n\n'.join(parts) + '\n'
(SRC / 'game.js').write_text(bundle, encoding='utf-8')
print(f'src/js/game.js written: {len(bundle)} bytes, {bundle.count(chr(10))} lines')