// Build js/game.js — single-file bundle (no ES modules) so the game works on
// file://, localhost, and Netlify without module/CORS issues.
// Usage: node build.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'js');
const ORDER = [
  'constants.js',
  'storage.js',
  'audio.js',
  'game-engine.js',
  'multiplayer.js',
  'board.js',
  'bots.js',
  'ui.js',
  'app.js'
];

const parts = ORDER.map((name) => {
  const text = fs.readFileSync(path.join(SRC, name), 'utf8');
  const out = [];
  let skip = false;
  for (const raw of text.split(/\r?\n/)) {
    const s = raw.trim();
    if (skip) {
      if (s.endsWith(';')) skip = false;
      continue;
    }
    if (s.startsWith('import ')) {
      if (!s.endsWith(';')) skip = true;
      continue;
    }
    if (s.startsWith('export {')) continue;
    if (s.startsWith('export ')) {
      out.push(raw.replace('export ', '', 1));
      continue;
    }
    out.push(raw);
  }
  return out.join('\n');
});

const bundle = parts.join('\n\n') + '\n';
const target = path.join(SRC, 'game.js');
fs.writeFileSync(target, bundle, 'utf8');
console.log(`src/js/game.js rebuilt: ${Buffer.byteLength(bundle, 'utf8')} bytes, ${bundle.split('\n').length} lines`);
