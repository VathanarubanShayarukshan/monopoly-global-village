// Monopoly Global Village — Board & Game Constants
export const GO_SALARY = 200;
export const JAIL_POSITION = 10;
export const GO_TO_JAIL_POSITION = 30;
export const STARTING_MONEY = 1500;
export const MAX_HOUSES = 32;
export const MAX_HOTELS = 12;
export const COOKIE_MAX_AGE_DAYS = 730; // 2 years — long-lived like Google login

export const PLAYER_COLORS = [
  '#e63946', '#457b9d', '#2a9d8f', '#e9c46a',
  '#9b5de5', '#f72585', '#00bbf9', '#fee440'
];

export const PLAYER_TOKENS = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⚫', '⚪'];

// 40-space board — Global Village cities (Pokémon GO theme)
export const BOARD = [
  { id: 0,  type: 'go',           name: 'GO',              icon: '🏁' },
  { id: 1,  type: 'property',     name: 'Manila',          color: '#8B4513', price: 60,  rent: [2,10,30,90,160,250], houseCost: 50, group: 'brown' },
  { id: 2,  type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 3,  type: 'property',     name: 'Bangkok',         color: '#8B4513', price: 60,  rent: [4,20,60,180,320,450], houseCost: 50, group: 'brown' },
  { id: 4,  type: 'tax',          name: 'Income Tax',      tax: 200, icon: '💰' },
  { id: 5,  type: 'airport',      name: 'North Airport',   price: 200, icon: '✈️' },
  { id: 6,  type: 'property',     name: 'London',          color: '#87CEEB', price: 100, rent: [6,30,90,270,400,550], houseCost: 50, group: 'lightblue' },
  { id: 7,  type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 8,  type: 'property',     name: 'Toronto',         color: '#87CEEB', price: 100, rent: [6,30,90,270,400,550], houseCost: 50, group: 'lightblue' },
  { id: 9,  type: 'property',     name: 'Washington',      color: '#87CEEB', price: 120, rent: [8,40,100,300,450,600], houseCost: 50, group: 'lightblue' },
  { id: 10, type: 'jail',         name: 'Just Visiting',   icon: '🔒' },
  { id: 11, type: 'property',     name: 'Paris',           color: '#FF69B4', price: 140, rent: [10,50,150,450,625,750], houseCost: 100, group: 'pink' },
  { id: 12, type: 'utility',      name: 'Poké Center',     price: 150, icon: '🏥' },
  { id: 13, type: 'property',     name: 'Berlin',          color: '#FF69B4', price: 140, rent: [10,50,150,450,625,750], houseCost: 100, group: 'pink' },
  { id: 14, type: 'property',     name: 'Moscow',          color: '#FF69B4', price: 160, rent: [12,60,180,500,700,900], houseCost: 100, group: 'pink' },
  { id: 15, type: 'airport',      name: 'East Airport',    price: 200, icon: '✈️' },
  { id: 16, type: 'property',     name: 'Dubai',           color: '#FF8C00', price: 180, rent: [14,70,200,550,750,950], houseCost: 100, group: 'orange' },
  { id: 17, type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 18, type: 'property',     name: 'Cairo',           color: '#FF8C00', price: 180, rent: [14,70,200,550,750,950], houseCost: 100, group: 'orange' },
  { id: 19, type: 'property',     name: 'Madrid',          color: '#FF8C00', price: 200, rent: [16,80,220,600,800,1000], houseCost: 100, group: 'orange' },
  { id: 20, type: 'parking',      name: 'Free Parking',    icon: '🅿️' },
  { id: 21, type: 'property',     name: 'Istanbul',        color: '#FF0000', price: 220, rent: [18,90,250,700,875,1050], houseCost: 150, group: 'red' },
  { id: 22, type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 23, type: 'property',     name: 'Sydney',          color: '#FF0000', price: 220, rent: [18,90,250,700,875,1050], houseCost: 150, group: 'red' },
  { id: 24, type: 'property',     name: 'Taipei',          color: '#FF0000', price: 240, rent: [20,100,300,750,925,1100], houseCost: 150, group: 'red' },
  { id: 25, type: 'airport',      name: 'South Airport',   price: 200, icon: '✈️' },
  { id: 26, type: 'property',     name: 'Tokyo',           color: '#008000', price: 300, rent: [26,130,390,900,1100,1275], houseCost: 200, group: 'green' },
  { id: 27, type: 'property',     name: 'Seoul',           color: '#008000', price: 300, rent: [26,130,390,900,1100,1275], houseCost: 200, group: 'green' },
  { id: 28, type: 'utility',      name: 'Poké Stop',       price: 150, icon: '📍' },
  { id: 29, type: 'property',     name: 'Rio de Janeiro',  color: '#008000', price: 320, rent: [28,150,450,1000,1200,1400], houseCost: 200, group: 'green' },
  { id: 30, type: 'gotojail',     name: 'Go To Jail',      icon: '👮' },
  { id: 31, type: 'property',     name: 'New York',        color: '#000080', price: 350, rent: [35,175,500,1100,1300,1500], houseCost: 200, group: 'darkblue' },
  { id: 32, type: 'property',     name: 'Chicago',         color: '#000080', price: 360, rent: [37,185,550,1150,1350,1550], houseCost: 200, group: 'darkblue' },
  { id: 33, type: 'chest',        name: 'Community Chest', icon: '📦' },
  { id: 34, type: 'tax',          name: 'Luxury Tax',      tax: 100, icon: '💎' },
  { id: 35, type: 'airport',      name: 'West Airport',    price: 200, icon: '✈️' },
  { id: 36, type: 'chance',       name: 'Chance',          icon: '❓' },
  { id: 37, type: 'property',     name: 'Shanghai',        color: '#FFD700', price: 260, rent: [22,110,330,800,975,1150], houseCost: 150, group: 'yellow' },
  { id: 38, type: 'property',     name: 'Hong Kong',       color: '#FFD700', price: 260, rent: [22,110,330,800,975,1150], houseCost: 150, group: 'yellow' },
  { id: 39, type: 'property',     name: 'Mumbai',          color: '#FFD700', price: 280, rent: [24,120,360,850,1025,1200], houseCost: 150, group: 'yellow' }
];

export const PROPERTY_GROUPS = {
  brown: [1, 3], lightblue: [6, 8, 9], pink: [11, 13, 14],
  orange: [16, 18, 19], red: [21, 23, 24], yellow: [37, 38, 39],
  green: [26, 27, 29], darkblue: [31, 32]
};

export const AIRPORTS = [5, 15, 25, 35];
export const UTILITIES = [12, 28];

export const CHANCE_CARDS = [
  { text: 'Advance to GO — Collect $200', action: 'move', target: 0, collectGo: true },
  { text: 'Advance to Tokyo', action: 'move', target: 26 },
  { text: 'Advance to South Airport — If you pass GO collect $200', action: 'move', target: 25, collectGo: true },
  { text: 'Advance to nearest Airport', action: 'nearestAirport' },
  { text: 'Advance to nearest Utility', action: 'nearestUtility' },
  { text: 'Bank pays you dividend of $50', action: 'money', amount: 50 },
  { text: 'Get Out of Jail Free', action: 'jailFree' },
  { text: 'Go Back 3 Spaces', action: 'back', spaces: 3 },
  { text: 'Go to Jail — Do not pass GO', action: 'jail' },
  { text: 'Make general repairs — $25 per house, $100 per hotel', action: 'repairs', house: 25, hotel: 100 },
  { text: 'Pay poor tax of $15', action: 'money', amount: -15 },
  { text: 'Take a trip to Paris — Advance to Paris', action: 'move', target: 11 },
  { text: 'Your building loan matures — Collect $150', action: 'money', amount: 150 },
  { text: 'You have won a crossword competition — Collect $100', action: 'money', amount: 100 },
  { text: 'Speeding fine $15', action: 'money', amount: -15 },
  { text: 'Catch a Pikachu! Collect $200', action: 'money', amount: 200 }
];

export const CHEST_CARDS = [
  { text: 'Advance to GO — Collect $200', action: 'move', target: 0, collectGo: true },
  { text: 'Bank error in your favor — Collect $200', action: 'money', amount: 200 },
  { text: 'Doctor\'s fees — Pay $50', action: 'money', amount: -50 },
  { text: 'From sale of stock you get $50', action: 'money', amount: 50 },
  { text: 'Get Out of Jail Free', action: 'jailFree' },
  { text: 'Go to Jail — Do not pass GO', action: 'jail' },
  { text: 'Holiday fund matures — Receive $100', action: 'money', amount: 100 },
  { text: 'Income tax refund — Collect $20', action: 'money', amount: 20 },
  { text: 'It is your birthday — Collect $10 from every player', action: 'birthday', amount: 10 },
  { text: 'Life insurance matures — Collect $100', action: 'money', amount: 100 },
  { text: 'Pay hospital fees of $100', action: 'money', amount: -100 },
  { text: 'Pay school fees of $50', action: 'money', amount: -50 },
  { text: 'Receive $25 consultancy fee', action: 'money', amount: 25 },
  { text: 'You are assessed for street repairs — $40 per house, $100 per hotel', action: 'repairs', house: 40, hotel: 100 },
  { text: 'You have won second prize in a beauty contest — Collect $10', action: 'money', amount: 10 },
  { text: 'You inherit $100', action: 'money', amount: 100 }
];

/** Player wealth ranks — based on total net worth (wallet cash + property value) */
export const RANKS = [
  { name: 'Rookie', icon: '🌱', min: 0 },
  { name: 'Collector', icon: '🎒', min: 5000 },
  { name: 'Trader', icon: '💰', min: 15000 },
  { name: 'Tycoon', icon: '🏙️', min: 40000 },
  { name: 'Millionaire', icon: '💎', min: 100000 },
  { name: 'Billionaire', icon: '👑', min: 1000000 }
];

/** Purchase value of a property/airport/utility space */
export function propertyValue(spaceId) {
  const s = BOARD[spaceId];
  return s ? (s.price || 0) : 0;
}

export const MEDIA = {
  diceRoll: 'assets/audio/diceRoll.mp3',
  money: 'assets/audio/money.mp3',
  buy: 'assets/audio/buy.mp3',
  jail: 'assets/audio/jail.mp3',
  win: 'assets/audio/win.mp3',
  card: 'assets/audio/card.mp3',
  click: 'assets/audio/click.mp3',
  bgMusic: 'assets/audio/bgMusic.mp3'
};
