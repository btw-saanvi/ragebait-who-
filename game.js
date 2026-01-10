/* ============================================
   LEVEL DEVIL - A Brutal Platformer
   Simple graphics, brutal difficulty
============================================ */

// ============================================
// CANVAS SETUP
// ============================================
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// ============================================
// AUDIO SYSTEM
// ============================================
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, dur, type = 'sine', vol = 0.3) {
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + dur);
    osc.start();
    osc.stop(audioContext.currentTime + dur);
  } catch (e) {}
}

const sounds = {
  jump: () => playSound(400, 0.08, 'square', 0.15),
  death: () => { playSound(150, 0.25, 'sawtooth', 0.4); setTimeout(() => playSound(100, 0.2, 'sawtooth', 0.3), 80); },
  break: () => playSound(200, 0.12, 'square', 0.25),
  spike: () => playSound(300, 0.1, 'sawtooth', 0.35),
  complete: () => { playSound(523, 0.1); setTimeout(() => playSound(659, 0.1), 100); setTimeout(() => playSound(784, 0.15), 200); }
};

// ============================================
// UTILITIES
// ============================================
function getFloorY() { return canvas.height - 50; }
function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function rectCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function circleCollide(circle, rect) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
  const distX = circle.x - closestX;
  const distY = circle.y - closestY;
  return (distX * distX + distY * distY) < (circle.r * circle.r);
}

// ============================================
// PARTICLE SYSTEM
// ============================================
const particles = [];

function createExplosion(x, y, count = 25) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      vx: rand(-7, 7),
      vy: rand(-10, -3),
      life: 30,
      maxLife: 30,
      size: rand(2, 6),
      hue: rand(0, 50)
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.3;
    p.vx *= 0.97;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawParticles() {
  particles.forEach(p => {
    const alpha = p.life / p.maxLife;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `hsl(${p.hue}, 100%, ${rand(50, 70)}%)`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
}

// ============================================
// PLAYER
// ============================================
const player = {
  x: 100,
  y: 0,
  w: 32,
  h: 32,
  vx: 0,
  vy: 0,
  speed: 5.5,
  jumpPower: -14.5,
  gravity: 0.65,
  onGround: false,
  invuln: 0
};

// ============================================
// INPUT
// ============================================
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// ============================================
// GAME STATE
// ============================================
let level = 0;
let deaths = 0;
let message = "";
let shake = 0;
let reversed = false;
let camX = 0;

// ============================================
// MESSAGES
// ============================================
const lies = [
  "This is safe",
  "Trust me",
  "Easy jump",
  "Nothing bad",
  "Just go"
];

const taunts = [
  "Try again",
  "So close",
  "Almost",
  "Again?",
  "Keep going"
];

// ============================================
// LEVEL DATA
// ============================================
const levels = [
  {
    platforms: [
      { x: 320, y: 0, w: 50, h: 12, betray: true, breakTime: 180 },
      { x: 450, y: 0, w: 45, h: 12, betray: false, invisible: true },
      { x: 580, y: 0, w: 50, h: 12, betray: true, breakTime: 200 },
      { x: 720, y: 0, w: 40, h: 12, betray: false, invisible: true }
    ],
    spikes: [{ x: 400 }, { x: 650 }],
    movers: [],
    saws: [],
    fakeDoor: { x: 850, move: 280 },
    exit: { x: 1100 },
    reverseChance: 0.3
  },
  {
    platforms: [
      { x: 300, y: 0, w: 45, h: 12, betray: true, breakTime: 160 },
      { x: 430, y: 0, w: 40, h: 12, betray: true, invisible: true },
      { x: 560, y: 0, w: 50, h: 12, betray: true, breakTime: 180 },
      { x: 700, y: 0, w: 35, h: 12, betray: false, invisible: true }
    ],
    spikes: [{ x: 380 }, { x: 510 }, { x: 640 }],
    movers: [
      { x: 480, y: 0, w: 50, h: 12, start: 480, end: 680, speed: 2.8 }
    ],
    saws: [],
    fakeDoor: { x: 900, move: 320 },
    exit: { x: 1200 },
    reverseChance: 0.4
  },
  {
    platforms: [
      { x: 280, y: 0, w: 40, h: 12, betray: true, breakTime: 150 },
      { x: 410, y: 0, w: 35, h: 12, betray: false, invisible: true },
      { x: 540, y: 0, w: 45, h: 12, betray: true, breakTime: 170 },
      { x: 680, y: 0, w: 40, h: 12, betray: true, invisible: true },
      { x: 800, y: 0, w: 50, h: 12, betray: true, breakTime: 160 }
    ],
    spikes: [{ x: 360 }, { x: 490 }, { x: 620 }, { x: 750 }],
    movers: [
      { x: 440, y: 0, w: 45, h: 12, start: 440, end: 640, speed: 3.2 },
      { x: 640, y: 0, w: 40, h: 12, start: 640, end: 840, speed: -2.5 }
    ],
    saws: [
      { x: 500, y: 0, r: 20, speed: 0.1 }
    ],
    fakeDoor: { x: 1000, move: 360 },
    exit: { x: 1300 },
    reverseChance: 0.5
  },
  {
    platforms: [
      { x: 260, y: 0, w: 35, h: 10, betray: true, breakTime: 140 },
      { x: 390, y: 0, w: 30, h: 10, betray: false, invisible: true },
      { x: 520, y: 0, w: 40, h: 10, betray: true, breakTime: 150 },
      { x: 660, y: 0, w: 35, h: 10, betray: true, invisible: true },
      { x: 780, y: 0, w: 45, h: 10, betray: true, breakTime: 145 },
      { x: 920, y: 0, w: 30, h: 10, betray: false, invisible: true }
    ],
    spikes: [{ x: 340 }, { x: 470 }, { x: 600 }, { x: 730 }, { x: 860 }],
    movers: [
      { x: 420, y: 0, w: 40, h: 10, start: 420, end: 620, speed: 3.5 },
      { x: 620, y: 0, w: 35, h: 10, start: 620, end: 820, speed: -3 },
      { x: 820, y: 0, w: 40, h: 10, start: 820, end: 1020, speed: 2.8 }
    ],
    saws: [
      { x: 460, y: 0, r: 24, speed: 0.14 },
      { x: 760, y: 0, r: 22, speed: -0.12 }
    ],
    fakeDoor: { x: 1100, move: 400 },
    exit: { x: 1400 },
    reverseChance: 0.6
  },
  {
    platforms: [
      { x: 240, y: 0, w: 30, h: 10, betray: true, breakTime: 130 },
      { x: 370, y: 0, w: 25, h: 10, betray: false, invisible: true },
      { x: 500, y: 0, w: 35, h: 10, betray: true, breakTime: 140 },
      { x: 640, y: 0, w: 30, h: 10, betray: true, invisible: true },
      { x: 760, y: 0, w: 40, h: 10, betray: true, breakTime: 135 },
      { x: 900, y: 0, w: 25, h: 10, betray: false, invisible: true },
      { x: 1020, y: 0, w: 35, h: 10, betray: true, breakTime: 130 }
    ],
    spikes: [{ x: 320 }, { x: 450 }, { x: 580 }, { x: 710 }, { x: 840 }, { x: 970 }],
    movers: [
      { x: 400, y: 0, w: 35, h: 10, start: 400, end: 600, speed: 4 },
      { x: 600, y: 0, w: 30, h: 10, start: 600, end: 800, speed: -3.5 },
      { x: 800, y: 0, w: 35, h: 10, start: 800, end: 1000, speed: 3.2 },
      { x: 1000, y: 0, w: 30, h: 10, start: 1000, end: 1200, speed: -2.8 }
    ],
    saws: [
      { x: 440, y: 0, r: 26, speed: 0.16 },
      { x: 740, y: 0, r: 24, speed: -0.14 },
      { x: 1040, y: 0, r: 25, speed: 0.15 }
    ],
    fakeDoor: { x: 1200, move: 450 },
    exit: { x: 1500 },
    reverseChance: 0.7
  }
];

// ============================================
// LEVEL MANAGEMENT
// ============================================
function resetLevel() {
  const lvl = levels[level];
  player.x = 100;
  player.y = 0;
  player.vx = 0;
  player.vy = 0;
  player.onGround = false;
  player.invuln = 0;
  particles.length = 0;
  camX = 0;
  
  lvl.platforms.forEach(p => {
    p.active = true;
    p.touched = false;
    p.y = getFloorY() - (p.yOffset || 0);
    if (p.yOffset === undefined) p.yOffset = randInt(120, 200);
    p.y = getFloorY() - p.yOffset;
  });
  
  lvl.movers.forEach(m => {
    m.x = m.start;
    m.y = getFloorY() - (m.yOffset || 0);
    if (m.yOffset === undefined) m.yOffset = randInt(80, 120);
    m.y = getFloorY() - m.yOffset;
    m.dir = m.speed > 0 ? 1 : -1;
  });
  
  lvl.saws.forEach(s => {
    s.y = getFloorY() - (s.yOffset || 0);
    if (s.yOffset === undefined) s.yOffset = randInt(50, 80);
    s.y = getFloorY() - s.yOffset;
    s.rot = 0;
  });
  
  if (lvl.fakeDoor) {
    lvl.fakeDoor.triggered = false;
    if (!lvl.fakeDoor.origX) lvl.fakeDoor.origX = lvl.fakeDoor.x;
    lvl.fakeDoor.x = lvl.fakeDoor.origX;
  }
  
  message = pick(lies);
  reversed = Math.random() < (lvl.reverseChance || 0);
}

function die() {
  deaths++;
  shake = 18;
  message = pick(taunts);
  sounds.death();
  createExplosion(player.x + player.w / 2, player.y + player.h / 2);
  setTimeout(() => resetLevel(), 400);
}

// ============================================
// UPDATE LOOP
// ============================================
function update() {
  const lvl = levels[level];
  if (player.invuln > 0) player.invuln--;
  
  // Movement
  player.vx = 0;
  const left = reversed ? (keys['d'] || keys['arrowright']) : (keys['a'] || keys['arrowleft']);
  const right = reversed ? (keys['a'] || keys['arrowleft']) : (keys['d'] || keys['arrowright']);
  if (left) player.vx = -player.speed;
  if (right) player.vx = player.speed;
  
  // Jump
  if ((keys['w'] || keys['arrowup'] || keys[' ']) && player.onGround) {
    player.vy = player.jumpPower;
    player.onGround = false;
    sounds.jump();
  }
  
  // Physics
  player.vy += player.gravity;
  player.x += player.vx;
  player.y += player.vy;
  
  // Camera
  camX = player.x - canvas.width / 3;
  if (camX < 0) camX = 0;
  
  // Floor
  const floorY = getFloorY();
  if (player.y + player.h >= floorY) {
    player.y = floorY - player.h;
    player.vy = 0;
    player.onGround = true;
  }
  
  // Platforms
  lvl.platforms.forEach(p => {
    if (!p.active) return;
    
    if (p.betray) {
      p.x += Math.sin(Date.now() / 600) * 0.4;
    }
    
    const py = p.y;
    if (rectCollide(player, { x: p.x, y: py, w: p.w, h: p.h })) {
      if (player.vy >= 0 && player.y + player.h - player.vy <= py) {
        player.y = py - player.h;
        player.vy = 0;
        player.onGround = true;
        
        if (p.betray && !p.touched) {
          p.touched = true;
          message = "Safe...";
          setTimeout(() => {
            p.active = false;
            message = "Oops";
            sounds.break();
          }, p.breakTime || 200);
        }
      }
    }
  });
  
  // Moving platforms
  lvl.movers.forEach(m => {
    m.x += m.speed;
    if (m.x >= m.end || m.x <= m.start) m.speed *= -1;
    m.y = getFloorY() - m.yOffset;
    
    if (rectCollide(player, { x: m.x, y: m.y, w: m.w, h: m.h })) {
      if (player.vy >= 0 && player.y + player.h - player.vy <= m.y) {
        player.y = m.y - player.h;
        player.vy = 0;
        player.onGround = true;
        player.x += m.speed;
      }
    }
  });
  
  // Saws
  lvl.saws.forEach(saw => {
    saw.rot += saw.speed;
    saw.y = getFloorY() - saw.yOffset;
    
    if (circleCollide({ x: player.x + player.w / 2, y: player.y + player.h / 2, r: Math.max(player.w, player.h) / 2 }, 
                      { x: saw.x - saw.r, y: saw.y - saw.r, w: saw.r * 2, h: saw.r * 2 }) && player.invuln === 0) {
      sounds.spike();
      die();
    }
  });
  
  // Spikes
  lvl.spikes.forEach(spike => {
    const sy = floorY - 25;
    if (rectCollide(player, { x: spike.x, y: sy, w: 25, h: 25 }) && player.invuln === 0) {
      sounds.spike();
      die();
    }
  });
  
  // Fake door
  if (lvl.fakeDoor && !lvl.fakeDoor.triggered && player.x + player.w > lvl.fakeDoor.x && player.y + player.h > floorY - 80) {
    lvl.fakeDoor.triggered = true;
    lvl.fakeDoor.x += lvl.fakeDoor.move;
    message = "Not so fast";
  }
  
  // Exit
  if (player.x + player.w > lvl.exit.x && player.y + player.h > floorY - 80) {
    sounds.complete();
    level++;
    if (level >= levels.length) {
      message = "Victory!";
      level = 0;
      deaths = 0;
    }
    resetLevel();
  }
  
  // Fall death
  if (player.y > canvas.height + 150) die();
  
  if (shake > 0) shake--;
  updateParticles();
}

// ============================================
// RENDER
// ============================================
function draw() {
  const shakeX = shake > 0 ? (Math.random() - 0.5) * 12 : 0;
  ctx.save();
  ctx.translate(shakeX - camX, shakeX);
  
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, "#0a0a1a");
  sky.addColorStop(1, "#1a1a2e");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width + camX * 2, canvas.height);
  
  // Stars
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  for (let i = 0; i < 40; i++) {
    const x = (i * 150 + camX * 0.1) % (canvas.width + camX * 2);
    const y = (i * 200) % canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Mountains (background)
  const mColors = ["rgba(25, 25, 45, 0.5)", "rgba(35, 35, 55, 0.4)", "rgba(45, 45, 65, 0.3)"];
  mColors.forEach((color, idx) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    const peaks = 6;
    const pw = (canvas.width + camX * 2) / peaks;
    for (let i = 0; i <= peaks; i++) {
      const x = i * pw + camX * (0.2 + idx * 0.2);
      const h = canvas.height * (0.3 + idx * 0.1);
      const y = canvas.height - h + Math.sin((i + idx) * 1.5) * 25;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width + camX * 2, canvas.height);
    ctx.closePath();
    ctx.fill();
  });
  
  // Floor
  ctx.fillStyle = "#2a2a2a";
  ctx.fillRect(0, getFloorY(), canvas.width + camX * 2, 50);
  
  const lvl = levels[level];
  
  // Platforms
  lvl.platforms.forEach(p => {
    if (!p.active || (p.invisible && !p.touched)) return;
    
    const alpha = p.invisible ? 0.4 : 1;
    ctx.save();
    ctx.globalAlpha = alpha;
    
    if (p.betray) {
      ctx.fillStyle = p.touched ? "#ff4444" : "#ff6666";
      if (p.touched) {
        const pulse = Math.sin(Date.now() / 80) * 0.2 + 0.8;
        ctx.globalAlpha = alpha * pulse;
      }
    } else {
      ctx.fillStyle = "#666";
    }
    
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.restore();
  });
  
  // Moving platforms
  lvl.movers.forEach(m => {
    ctx.fillStyle = "#4488ff";
    ctx.fillRect(m.x, m.y, m.w, m.h);
  });
  
  // Saws
  lvl.saws.forEach(saw => {
    ctx.save();
    ctx.translate(saw.x, saw.y);
    ctx.rotate(saw.rot);
    ctx.fillStyle = "#ff3333";
    ctx.beginPath();
    ctx.arc(0, 0, saw.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#cc0000";
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * saw.r * 0.7, Math.sin(a) * saw.r * 0.7);
      ctx.lineTo(Math.cos(a) * saw.r, Math.sin(a) * saw.r);
      ctx.lineTo(Math.cos(a + 0.2) * saw.r, Math.sin(a + 0.2) * saw.r);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(0, 0, saw.r * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  
  // Spikes
  lvl.spikes.forEach(spike => {
    const sy = getFloorY() - 25;
    ctx.fillStyle = "#ff3333";
    ctx.beginPath();
    ctx.moveTo(spike.x, sy + 25);
    ctx.lineTo(spike.x + 12.5, sy);
    ctx.lineTo(spike.x + 25, sy + 25);
    ctx.closePath();
    ctx.fill();
  });
  
  // Fake door
  if (lvl.fakeDoor) {
    ctx.fillStyle = "#22aa22";
    ctx.fillRect(lvl.fakeDoor.x, getFloorY() - 80, 50, 80);
  }
  
  // Exit
  const exit = lvl.exit;
  const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(255, 200, 0, ${pulse})`;
  ctx.fillRect(exit.x, getFloorY() - 80, 50, 80);
  
  // Player
  ctx.save();
  if (player.invuln > 0 && Math.floor(player.invuln / 2) % 2) {
    ctx.globalAlpha = 0.5;
  }
  ctx.fillStyle = "#fff";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = "#000";
  ctx.fillRect(player.x + 8, player.y + 8, 4, 4);
  ctx.fillRect(player.x + 20, player.y + 8, 4, 4);
  ctx.restore();
  
  // Particles
  drawParticles();
  
  ctx.restore();
  
  // UI
  ctx.save();
  ctx.fillStyle = "rgba(20, 20, 30, 0.85)";
  ctx.fillRect(15, 15, 320, 100);
  ctx.strokeStyle = "rgba(100, 100, 120, 0.6)";
  ctx.lineWidth = 2;
  ctx.strokeRect(15, 15, 320, 100);
  
  ctx.fillStyle = "#fff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(message, 30, 45);
  
  ctx.fillStyle = "#aaa";
  ctx.font = "16px monospace";
  ctx.fillText(`Deaths: ${deaths}`, 30, 70);
  ctx.fillText(`Level: ${level + 1}/${levels.length}`, 30, 95);
  
  if (reversed) {
    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("⚠ REVERSED", 200, 45);
  }
  
  ctx.restore();
}

// ============================================
// MAIN LOOP
// ============================================
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

resetLevel();
loop();
