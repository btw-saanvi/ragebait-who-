// ============================================
// RENDER
// ============================================

function draw() {
  const shakeX = shake > 0 ? (Math.random() - 0.5) * 12 : 0;
  ctx.save();
  ctx.translate(shakeX - camX, shakeX);
  
  // Background
  ctx.fillStyle = "#121010";
  ctx.fillRect(0, 0, canvas.width + camX * 2, canvas.height);
  
  // Mountains (background)
  const mColors = ["#1a1515", "#1f1818", "#241a1a"];
  mColors.forEach((color, idx) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    const peaks = 8;
    const pw = (canvas.width + camX * 2) / peaks;
    for (let i = 0; i <= peaks; i++) {
      const x = i * pw + camX * (0.1 + idx * 0.15);
      const h = canvas.height * (0.3 + idx * 0.15);
      // Sharp jagged peaks
      const y = canvas.height - h + (i % 2 === 0 ? 0 : 80 + idx * 20);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width + camX * 2, canvas.height);
    ctx.closePath();
    ctx.fill();
  });
  
  // Floor
  ctx.fillStyle = "#222";
  ctx.fillRect(0, getFloorY(), canvas.width + camX * 2, 150);
  
  const lvl = levels[level];
  
  // Platforms
  lvl.platforms.forEach(p => {
    if (!p.active || (p.invisible && !p.touched)) return;
    
    const alpha = p.invisible ? 0.4 : 1;
    ctx.save();
    ctx.globalAlpha = alpha;
    
    if (p.betray) {
      ctx.fillStyle = "#ff3333";
      if (p.touched) {
        const pulse = Math.sin(Date.now() / 80) * 0.2 + 0.8;
        ctx.globalAlpha = alpha * pulse;
      }
    } else {
      ctx.fillStyle = "#333";
    }
    
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.restore();
  });
  
  // Moving platforms
  lvl.movers.forEach(m => {
    ctx.fillStyle = "#3399ff";
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
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.moveTo(spike.x, sy + 25);
    ctx.lineTo(spike.x + 12.5, sy);
    ctx.lineTo(spike.x + 25, sy + 25);
    ctx.closePath();
    ctx.fill();
  });
  
  // Ceilings
  if (lvl.ceilings) {
    lvl.ceilings.forEach(ceiling => {
      ctx.fillStyle = "#222";
      ctx.fillRect(ceiling.x, ceiling.y, ceiling.w, ceiling.h);
    });
  }
  
  // Fake door
  if (lvl.fakeDoor) {
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(lvl.fakeDoor.x, getFloorY() - 80, 50, 80);
  }
  
  // Collapsing floors
  if (lvl.collapsingFloors) {
    lvl.collapsingFloors.forEach(cf => {
      if (!cf.active) return;
      const alpha = cf.touched ? (Math.sin(Date.now() / 100) * 0.3 + 0.7) : 1;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = cf.touched ? "#ff3333" : "#222";
      ctx.fillRect(cf.x, cf.y, cf.w, 20);
      ctx.restore();
    });
  }
  
  // Exit (sky door)
  const exit = lvl.exit;
  const exitY = (exit.yOffset !== undefined) ? (getFloorY() - exit.yOffset) : (getFloorY() - 80);
  
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(exit.x, exitY, 50, 80);
  
  // Player
  ctx.save();
  if (player.invuln > 0 && Math.floor(player.invuln / 2) % 2) {
    ctx.globalAlpha = 0.5;
  }
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  
  // Player eyes
  ctx.fillStyle = "#000";
  // Determine direction player is facing based on vx or just keep static
  // the image shows eyes at the top right if facing right.
  const eyeOffset = player.vx < 0 ? 4 : (player.vx > 0 ? 12 : 8);
  ctx.fillRect(player.x + eyeOffset, player.y + 6, 4, 4);
  ctx.fillRect(player.x + eyeOffset + 8, player.y + 6, 4, 4);
  ctx.restore();
  
  // Particles
  drawParticles();
  
  ctx.restore();
}
