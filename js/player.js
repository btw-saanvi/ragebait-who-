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
