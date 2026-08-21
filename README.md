# 🏙️ Monopoly Global Village

A Pokémon‑themed Monopoly board game that runs **100% in the browser** — plain JavaScript + WebRTC, no backend server required. Fully offline‑first with limited online play.

> 🌍 **Play it live on GitHub Pages:** https://vathanarubanshayarukshan.github.io/monopoly-global-village/

> 💾 On the hosted site (static GitHub Pages) accounts are kept in your browser; run it locally with `python server.py` and all data is stored permanently in the repo's `db.json` file instead.

## 🚀 Quick start

**Windows** — double‑click `start.bat` (or `start.sh` on Linux/macOS) — it starts the server and opens the game in your browser automatically.

Or manually:

```bash
python server.py      # → open http://localhost:34567
```

- 🎲 Classic Monopoly on a 40‑space "Global Village" board (Manila → Mumbai)
- 🤖 Play offline against AI bots
- 🌐 Play online with friends over peer‑to‑peer WebRTC (host‑authoritative)
- 🔐 **Lifetime Wallet** + GAME wallet — protected by a PIN
- 💾 **Two wallets**: permanent LIFETIME wallet (cash only, owner sees it) and a temporary GAME wallet ($1500 per game) that is deleted at game end
- 🏧 **ATM** — send lifetime cash to any account's lifetime wallet (owner‑only cash)
- 🏆 Player rank decided by lifetime cash only
- 📴 Works offline as a PWA (service worker)
- 💾 Export/Import save data as a single file

> 💾 **Permanent JSON database** — all data (accounts, wallets, saved games, banked‑income
> counters) is stored in a real file, `db.json`, next to `server.py`. Nothing depends on
> the browser cache, so nothing is ever lost when you clear cookies / site data. The
> server automatically migrates any existing browser‑stored data into `db.json` the
> first time it runs. (If you open the game without the server — e.g. `file://` — it
> falls back to browser storage so the game always works.)

---

## ▶️ How to run

Requires **Node.js 14+** or **Python 3**.

```bash
# Easiest — launcher scripts (starts server + opens the browser)
start.bat   # Windows (double-click)
./start.sh  # Linux / macOS

# Or manually:
# Option 1 — Node (recommended)
node server.js
# → open http://localhost:34567

# Option 2 — Python
python server.py
# → open http://localhost:34567

# Option 3 — just double‑click src/index.html (file:// works too)
```

> ⚠️ **Online mode needs an internet connection** (PeerJS signaling server + Google STUN). Solo play, bots, and the wallet work fully offline.

### Commands

| Command          | What it does                             |
| ---------------- | ---------------------------------------- |
| `python server.py` | Start the game server + JSON database (port 34567) |
| `start.bat` / `./start.sh` | Launcher scripts (server + browser)      |

### Run on your own server / VPS (shared database for all players)

```bash
git clone https://github.com/VathanarubanShayarukshan/monopoly-global-village.git
cd monopoly-global-village
nohup python3 server.py > server.log 2>&1 &   # background
curl http://localhost:34567/api/state         # verify -> {"version":2,...}
```

Open port `34567` in your firewall/security group, then players open
`http://<your-server-ip>:34567`. All accounts, games and wallets are saved
permanently in `db.json` on the server — shared by every player.

Public URL without opening ports — Cloudflare quick tunnel:

```bash
nohup cloudflared tunnel --url http://localhost:34567 > cloudflared.log 2>&1 &
grep -o 'https://[a-z0-9-]*\.trycloudflare\.com' cloudflared.log | head -1
```

> ℹ️ The GitHub Pages deployment is **static** (no database): there each browser
> keeps its own data. For a real shared database run `server.py` as shown above.

### Two wallets explained

| | Lifetime Wallet 💰 | Game Wallet 🎮 |
| --- | ---------------- | -------------- |
| Permanent? | ✅ permanent | ❌ temporary (per game) |
| How you get it | system‑issued at account creation | $1500 at every new game |
| INCOME (rent, GO, Chance & Community Chest) | ✅ saved here | ❌ |
| All outgoing payments | ❌ | ✅ paid from here |
| PIN‑protected | ✅ | ❌ |
| Shown to other players | ❌ (owner only, masked in‑game) | ✅ public |
| At game end | kept forever | ❌ deleted (money + properties) |

An **account** = username + password + wallet PIN. Username, password and PIN can be changed; your **lifetime wallet address is permanent** and made by the system. Use the **ATM** to share lifetime cash with any other account.

---

## 🌐 User Guide — English

<details>
<summary>Tap to read the full English user guide</summary>

1. **Create an account** (username + password + 4–6 digit wallet PIN). Your permanent lifetime wallet is created for you.
2. On the **main page** you see your **own** lifetime cash, rank, and your lifetime address. Only you can see it.
3. **Start a game** — every player gets $1500 in their game wallet.
4. Earn income (rent, GO salary, Chance & Community Chest) — it is saved straight into your **lifetime wallet**.
5. Use the in‑game **Bank** to move lifetime cash into the game wallet (PIN required). That money is spent in the game and deleted when the game ends.
6. Use the **ATM** on the main page to send lifetime cash to any other account's lifetime wallet (PIN required).
7. **End the game** — the temporary game wallet (money + properties) is deleted; only your lifetime income is kept and your rank is recomputed from it.
</details>

---

## 🌐 பயனர் வழிகாட்டி — தமிழ்

<details>
<summary>முழு தமிழ் பயனர் வழிகாட்டியைப் படிக்க</summary>

1. **கணக்கு உருவாக்கவும்** (பயனர் பெயர் + கடவுச்சொல் + 4–6 இலக்க வாலட் PIN). உங்களுக்கான நிரந்தர லைஃப்டைம் வாலட் தானாக உருவாக்கப்படும்.
2. **முக்கிய பக்கம்** உங்கள் சொந்த லைஃப்டைம் பணத்தையும், ரேங்கையும், உங்கள் வாலட் முகவரியையும் காட்டுகிறது. அதை நீங்கள் மட்டுமே பார்க்க முடியும்.
3. **விளையாட்டைத் தொடங்குங்கள்** — ஒவ்வொரு வீரருக்கும் கேம் வாலட்டில் $1500 கிடைக்கும்.
4. வருமானம் சம்பாதிக்கவும் (வாடகை, GO சம்பளம், Chance & Community Chest) — அது நேரடியாக உங்கள் **லைஃப்டைம் வாலட்டில்** சேமிக்கப்படும்.
5. விளையாட்டுக்குள் **Bank** பயன்படுத்தி லைஃப்டைம் பணத்தை கேம் வாலட்டுக்கு மாற்றவும் (PIN தேவை). அந்த பணம் விளையாட்டில் செலவாகும்; விளையாட்டு முடிந்ததும் நீக்கப்படும்.
6. முக்கிய பக்கத்தில் **ATM** மூலம் வேறு எந்த கணக்கின் லைஃப்டைம் வாலட்டுக்கும் பணம் அனுப்பலாம் (PIN தேவை).
7. **விளையாட்டை முடிக்கவும்** — தற்காலிக கேம் வாலட் (பணம் + சொத்துகள்) நீக்கப்படும்; உங்கள் லைஃப்டைம் வருமானம் மட்டும் வைக்கப்படும், ரேங்க் அதிலிருந்து கணக்கிடப்படும்.
</details>

---

## 🛠️ Tech stack

- Vanilla JavaScript (single‑bundle `src/js/game.js`) — no frameworks
- IndexedDB for offline storage + CookieStore for lightweight settings
- WebRTC via PeerJS for host‑authoritative online play
- SHA‑256 (with salt) for hashing passwords and wallet PINs
- PWA service worker (`sw.js`) for offline caching