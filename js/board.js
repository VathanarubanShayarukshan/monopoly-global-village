import { BOARD } from './constants.js';

const CORNERS = new Set([0, 10, 20, 30]);

export function renderBoard(container, gameState) {
  container.innerHTML = '';

  const board = document.createElement('div');
  board.className = 'monopoly-board';

  const center = document.createElement('div');
  center.className = 'board-center';
  center.innerHTML = `
    <div class="center-logo">
      <h2>Monopoly<br><span>Global Village</span></h2>
      <div class="deck-slots">
        <div class="deck chance-deck" title="Chance cards remaining">❓<strong>${gameState.chanceDeck?.length || 0}</strong></div>
        <div class="deck chest-deck" title="Community Chest cards remaining">📦<strong>${gameState.chestDeck?.length || 0}</strong></div>
      </div>
      <small class="center-hint">Hover a tile for details</small>
    </div>
    <div class="dice-area" title="Click to roll the dice">
      <img class="die-img" data-die="0" src="assets/img/dice-1.png" alt="dice 1">
      <img class="die-img" data-die="1" src="assets/img/dice-2.png" alt="dice 2">
    </div>
    <small class="dice-hint">Click the dice to roll</small>`;
  board.appendChild(center);

  const positions = getBoardPositions();
  BOARD.forEach((space, i) => {
    board.appendChild(createCell(space, i, positions[i], gameState));
  });

  container.appendChild(board);
  updateTokens(container, gameState);
}

function getBoardPositions() {
  const pos = {};
  for (let i = 0; i <= 9; i++) pos[i] = { row: 10, col: 10 - i };
  for (let i = 10; i <= 19; i++) pos[i] = { row: 20 - i, col: 0 };
  for (let i = 20; i <= 29; i++) pos[i] = { row: 0, col: i - 20 };
  for (let i = 30; i <= 39; i++) pos[i] = { row: i - 30, col: 10 };
  return pos;
}

function buildTooltip(space, prop, owner) {
  const lines = [space.name];
  if (space.type === 'property') {
    lines.push(`Group: ${space.group} · Price $${space.price}`);
    lines.push(`Rent: ${space.rent.join(' / ')}`);
    if (space.houseCost) lines.push(`House cost $${space.houseCost}`);
  } else if (space.price) {
    lines.push(`Price $${space.price}`);
  }
  if (owner) lines.push(`Owner: ${owner.name}`);
  if (prop?.houses > 0) lines.push(prop.houses >= 5 ? 'Hotel' : `${prop.houses} house${prop.houses > 1 ? 's' : ''}`);
  if (prop?.mortgaged) lines.push('Mortgaged');
  return lines.join(' · ');
}

function createCell(space, index, pos, gameState) {
  const cell = document.createElement('div');
  cell.className = `board-cell cell-${space.type}${CORNERS.has(index) ? ' corner' : ''}`;
  cell.dataset.spaceId = space.id;
  cell.style.gridRow = pos.row + 1;
  cell.style.gridColumn = pos.col + 1;

  const prop = gameState?.properties?.find(p => p.spaceId === space.id);
  const owner = prop?.ownerId ? gameState.players.find(p => p.id === prop.ownerId) : null;

  let html = '';
  if (space.color) html += `<div class="color-bar" style="background:${space.color}" title="${space.group}"></div>`;

  html += `<div class="cell-content">`;
  html += `<span class="cell-icon">${space.icon || ''}</span>`;
  html += `<span class="cell-name">${space.name}</span>`;
  if (space.price) html += `<span class="cell-price">$${space.price}</span>`;
  if (space.tax) html += `<span class="cell-price">$${space.tax}</span>`;

  if (owner) {
    html += `<div class="owner-badge" style="background:${owner.color}" title="${owner.name}">${owner.token}</div>`;
  }

  if (prop?.houses > 0) {
    const n = prop.houses;
    html += `<div class="buildings" title="${n >= 5 ? 'Hotel' : n + ' house' + (n > 1 ? 's' : '')}">${
      n >= 5 ? '<span class="hotel">H</span>' : '<span class="house"></span>'.repeat(n)
    }</div>`;
  }
  if (prop?.mortgaged) html += `<div class="mortgaged" title="Mortgaged">M</div>`;

  html += `<div class="token-container" data-space="${space.id}"></div>`;
  html += `</div>`;

  cell.innerHTML = html;
  cell.title = buildTooltip(space, prop, owner);
  return cell;
}

export function updateTokens(container, gameState) {
  if (!gameState) return;
  container.querySelectorAll('.token-container').forEach(tc => tc.innerHTML = '');

  gameState.players.forEach(player => {
    if (player.bankrupt) return;
    const tc = container.querySelector(`.token-container[data-space="${player.position}"]`);
    if (tc) {
      const token = document.createElement('span');
      token.className = 'player-token';
      token.style.background = player.color;
      token.textContent = player.name ? player.name[0].toUpperCase() : '?';
      token.title = player.name;
      if (player.id === gameState.players[gameState.currentPlayerIndex]?.id) {
        token.classList.add('active-turn');
      }
      tc.appendChild(token);
    }
  });
}

export function setDiceImages(d1, d2) {
  const imgs = document.querySelectorAll('.die-img');
  if (!imgs.length) return;
  if (d1 > 0 && d1 <= 6) imgs[0].src = `assets/img/dice-${d1}.png`;
  if (d2 > 0 && d2 <= 6) imgs[1].src = `assets/img/dice-${d2}.png`;
}

export function animateDice(d1, d2) {
  const area = document.querySelector('.dice-area');
  const imgs = document.querySelectorAll('.die-img');
  if (!area || !imgs.length) return;
  area.classList.add('rolling');
  let frames = 0;
  const interval = setInterval(() => {
    imgs.forEach(img => {
      img.src = `assets/img/dice-${Math.ceil(Math.random() * 6)}.png`;
    });
    frames++;
    if (frames > 10) {
      clearInterval(interval);
      setDiceImages(d1, d2);
      area.classList.remove('rolling');
    }
  }, 80);
}

export function showCardOverlay(card, type) {
  const overlay = document.getElementById('card-overlay');
  if (!overlay) return;
  overlay.className = `card-overlay show ${type}`;
  overlay.querySelector('.card-text').textContent = card.text;
  overlay.querySelector('.card-type').textContent = type === 'chance' ? '❓ CHANCE' : '📦 COMMUNITY CHEST';
}

export function hideCardOverlay() {
  document.getElementById('card-overlay')?.classList.remove('show');
}
