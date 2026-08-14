# 🧑‍🎓 Monopoly Global Village — User Guide

How to play, how the wallet & rank system work, how to play online, and how to fix common problems.

---

## 1. Quick start

1. Open the game (`node server.js` → `http://localhost:34567`, or open `src/index.html` directly).
2. On the lobby, type your **trainer name** and pick an avatar.
3. Press **🎮 New Local Game**.
4. Enter names for up to 4 players, optionally tick **🤖 Add 6 Bots**.
5. Press **▶ Start Game** — the dice sit in the middle of the board: **click them to roll**!

---

## 2. How to play (rules)

- You start each game with **$1,500**.
- Roll two dice, move clockwise. Landing rules:
  - **Buyable tiles** (colored city, ✈️ airport, 🏥 utility) — buy it or decline (goes to auction).
  - **Rent** — if someone owns the tile, pay them rent (mortgaged tiles charge nothing).
  - **💰 Tax** — pay income/luxury tax (goes to the Free Parking pot).
  - **❓ Chance / 📦 Community Chest** — draw a card.
  - **👮 Go To Jail** — get sent to jail; roll doubles, pay $50, or use a Jail-Free card.
- **Doubles** = roll again. **Three doubles in a row** = jail.
- **Build houses/hotels** on a full color group (monopoly). Hotels show as a red **H** on the board.
- **Mortgage** a property to raise cash fast (no rent while mortgaged).
- If you can't pay a debt, sell houses, mortgage tiles, or **declare bankruptcy**.
- Last player standing wins.

The action panel (right sidebar) always shows what to do next on your turn. Hover any board tile for its price/rent details.

---

## 3. 💰 Wallet — money AND properties save between games

Your wallet is a permanent bank stored in long-lived cookies (2 years) that survives closing the browser.

- **💾 When does it save?**
  - When a game **finishes**, your final earnings + owned properties are banked automatically.
  - When you **Quit to Lobby** (☰ menu), your current earnings + properties are banked too — you never lose progress by leaving.
- **🏠 Properties** — banked properties are added to your permanent portfolio and are automatically available again at the start of your next game. Your property count shows in the lobby.
- **🏧 ATM (in game)** — move money between the game and your wallet:
  - **Deposit to Wallet** — move game cash into your wallet.
  - **Withdraw** — bring wallet cash into the current game.
  - **Send** — transfer game money to another player using their wallet address (`MGV-...`, shown under each player).

> 🔒 **Fairness rule:** every new game starts at $1,500 regardless of wallet balance, and only **net winnings** are banked — final money minus any wallet cash you withdrew into the game, minus the $1,500 start. Money you withdraw from the wallet is never double-counted, so the "start → bank → restart" trick **cannot** create money — your wealth only grows by actually playing and winning.

---

## 4. 🏆 Ranks (net worth)

Your **net worth** = wallet cash + purchase value of all wallet properties.

| Rank          | Icon | Net worth needed |
| ------------- | ---- | ---------------- |
| Rookie        | 🌱   | $0               |
| Collector     | 🎒   | $5,000           |
| Trader        | 💰   | $15,000          |
| Tycoon        | 🏙️   | $40,000          |
| Millionaire   | 💎   | $100,000         |
| Billionaire   | 👑   | $1,000,000       |

Your rank + progress appear on the lobby wallet card and in the ATM. Climb the ranks by winning games and growing your property portfolio.

---

## 5. 🌐 Playing online with friends

### Host (create a room)
1. Press **🌐 Create Online Room** (internet required).
2. An **invite modal** opens with a link + room code.
3. Send the link (or code) to friends, e.g. by WhatsApp/Discord.
4. **Wait until everyone joins** (they appear in the left sidebar / connection chip), then press **▶ Start Game**.

### Guest (join a room)
1. Open the invite link (room code auto-fills) **or** press **🔗 Join Friend's Room** and type the code.
2. Enter your name and press **Join Room**.
3. Wait for the host to press Start — then play normally on your turn.

### How it works / limitations
- Uses **peer-to-peer WebRTC** (PeerJS). The host's browser runs the game and every player's screen stays in sync.
- Everyone needs **internet**; firewalls/offices sometimes block peer connections (see troubleshooting).
- The **connection chip** in the toolbar shows: green = connected, yellow = connecting, red = error.
- Wallet ATM (Deposit/Withdraw) is **local-only** — online guests use their own wallet in solo games; the host's game cash is what everyone plays with.

---

## 6. 💾 Saving your progress

- Everything is saved **automatically** (cookies + IndexedDB).
- **📥 Download Save Data** (lobby or ☰ menu) exports your wallet + games to a `.mgv` file.
- **📤 Upload Save Data** restores from a `.mgv` file (handy when switching devices).

---

## 7. ❓ Troubleshooting

| Problem                                        | Fix                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------- |
| Wallet shows `$0` / nothing saved              | Earnings bank **automatically**: when the game ends, when you Quit via ☰, and even when you close the tab. Because games start at $1,500 and only *net winnings* bank, a wallet stays `$0` if a saved game ended with $1,500 or less (properties you kept still count toward net worth). Win more than you start with and the profit lands in the wallet. |
| Properties not saved — "only liquid money"     | Fixed. Your owned properties are now banked into the wallet portfolio on game end / quit / tab close and restored at the start of your next game. |
| Money too easy to "farm"                       | That exploit is fixed — games always start at $1,500, only net winnings bank (wallet funds are tracked), and each game banks once. |
| "Online mode needs internet"                   | Check you can reach the internet; PeerJS loads from `unpkg.com` (may be blocked by firewalls/AdBlock). |
| Invite link opens but room isn't found         | The host must keep the game page open. Room codes are live only while the host is online. |
| Peer connection won't establish                | Both players need internet. Corporate/VPN networks may block WebRTC — try a home/hotspot network. |
| Sound doesn't play                             | Audio files stream from `assets.mixkit.co` — they need internet the first time. |
| **I updated the game but nothing changed / old board still shows** | Your browser is serving the **old cached version** (service worker). Do a hard refresh: `Ctrl+Shift+R`, or clear site data / unregister the service worker in DevTools → Application → Service Workers. |
| I want to reset everything                     | Clear browser cookies + site data for the game's address, or Import/Export to back up first. |

---

## 8. Developers

- Edit source modules in `js/`, then run `node build.js` to regenerate `js/game.js`.
- See `README.md` for the file structure and architecture notes.
