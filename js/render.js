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
  
  // Ceilings
  if (lvl.ceilings) {
    lvl.ceilings.forEach(ceiling => {
      ctx.fillStyle = "#444";
      ctx.fillRect(ceiling.x, ceiling.y, ceiling.w, ceiling.h);
    });
  }
  
  // Fake door
  if (lvl.fakeDoor) {
    ctx.fillStyle = "#22aa22";
    ctx.fillRect(lvl.fakeDoor.x, getFloorY() - 80, 50, 80);
  }
  
  // Collapsing floors
  if (lvl.collapsingFloors) {
    lvl.collapsingFloors.forEach(cf => {
      if (!cf.active) return;
      const alpha = cf.touched ? (Math.sin(Date.now() / 100) * 0.3 + 0.7) : 1;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = cf.touched ? "#ff6666" : "#4a4a4a";
      ctx.fillRect(cf.x, cf.y, cf.w, 20);
      ctx.restore();
    });
  }
  
  // Exit (sky door)
  const exit = lvl.exit;
  const exitY = (exit.yOffset !== undefined) ? (getFloorY() - exit.yOffset) : (getFloorY() - 80);
  const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(255, 200, 0, ${pulse})`;
  ctx.fillRect(exit.x, exitY, 50, 80);
  
  // Exit door glow
  ctx.shadowBlur = 20 * pulse;
  ctx.shadowColor = `rgba(255, 200, 0, ${pulse * 0.6})`;
  ctx.fillRect(exit.x, exitY, 50, 80);
  ctx.shadowBlur = 0;
  
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
  ctx.fillRect(15, 15, 320, 120);
  ctx.strokeStyle = "rgba(100, 100, 120, 0.6)";
  ctx.lineWidth = 2;
  ctx.strokeRect(15, 15, 320, 120);
  
  ctx.fillStyle = "#fff";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(message, 30, 45);
  
  ctx.fillStyle = "#aaa";
  ctx.font = "16px monospace";
  ctx.fillText(`Deaths: ${deaths}`, 30, 70);
  ctx.fillText(`Level: ${level + 1}/${levels.length}`, 30, 95);
  ctx.fillText(`Best: ${highestLevel}/${levels.length}`, 30, 120);
  
  if (reversed) {
    ctx.fillStyle = "#ff4444";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("⚠ REVERSED", 200, 45);
  }
  
  // Menu button hint
  ctx.fillStyle = "#666";
  ctx.font = "12px sans-serif";
  ctx.fillText("ESC: Menu", canvas.width - 100, 30);
  
  ctx.restore();
}
