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
    if (p.yOffset === undefined) p.yOffset = randInt(120, 200);
    p.y = getFloorY() - p.yOffset;
  });
  
  lvl.movers.forEach(m => {
    m.x = m.start;
    if (m.yOffset === undefined) m.yOffset = randInt(80, 120);
    m.y = getFloorY() - m.yOffset;
    m.dir = m.speed > 0 ? 1 : -1;
  });
  
  lvl.saws.forEach(s => {
    if (s.yOffset === undefined) s.yOffset = randInt(50, 80);
    s.y = getFloorY() - s.yOffset;
    s.rot = 0;
  });
  
  if (lvl.ceilings) {
    lvl.ceilings.forEach(c => {
      c.y = getFloorY() - c.yOffset;
    });
  }
  
  if (lvl.collapsingFloors) {
    lvl.collapsingFloors.forEach(cf => {
      cf.active = true;
      cf.touched = false;
      cf.y = getFloorY();
    });
  }
  
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
