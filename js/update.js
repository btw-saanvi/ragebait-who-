// ============================================
// UPDATE LOOP
// ============================================

function update() {
  const lvl = levels[level];
  if (player.invuln > 0) player.invuln--;
  
  // Skip update if menu is open
  if (menuOpen) {
    if (shake > 0) shake--;
    updateParticles();
    return;
  }
  
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
  
  // Ceilings (prevent jumping over obstacles)
  if (lvl.ceilings) {
    lvl.ceilings.forEach(ceiling => {
      if (rectCollide(player, { x: ceiling.x, y: ceiling.y, w: ceiling.w, h: ceiling.h })) {
        if (player.vy < 0 && player.y - player.vy >= ceiling.y + ceiling.h) {
          player.y = ceiling.y + ceiling.h;
          player.vy = 0;
        }
      }
    });
  }
  
  // Fake door
  if (lvl.fakeDoor && !lvl.fakeDoor.triggered && player.x + player.w > lvl.fakeDoor.x && player.y + player.h > floorY - 80) {
    lvl.fakeDoor.triggered = true;
    lvl.fakeDoor.x += lvl.fakeDoor.move;
    message = "Not so fast";
  }
  
  // Collapsing floors
  if (lvl.collapsingFloors) {
    lvl.collapsingFloors.forEach(cf => {
      if (!cf.active) return;
      
      const cfY = cf.y;
      if (rectCollide(player, { x: cf.x, y: cfY, w: cf.w, h: 20 })) {
        if (player.vy >= 0 && player.y + player.h - player.vy <= cfY) {
          player.y = cfY - player.h;
          player.vy = 0;
          player.onGround = true;
          
          if (!cf.touched) {
            cf.touched = true;
            message = "Floor shaking...";
            setTimeout(() => {
              cf.active = false;
              message = "Floor collapsed!";
              sounds.break();
            }, cf.breakTime || 200);
          }
        }
      }
    });
  }
  
  // Exit (handle sky doors)
  const exitY = (lvl.exit.yOffset !== undefined) ? (getFloorY() - lvl.exit.yOffset) : (floorY - 80);
  const exitH = 80;
  if (player.x + player.w > lvl.exit.x && 
      player.x < lvl.exit.x + 50 &&
      player.y + player.h > exitY && 
      player.y < exitY + exitH) {
    sounds.complete();
    if (level >= highestLevel) {
      highestLevel = level + 1;
      saveProgress();
    }
    level++;
    if (level >= levels.length) {
      message = "Victory! All levels complete!";
      level = 0;
      deaths = 0;
      highestLevel = 0;
      saveProgress();
    }
    resetLevel();
  }
  
  // Fall death
  if (player.y > canvas.height + 150) die();
  
  if (shake > 0) shake--;
  updateParticles();
}
