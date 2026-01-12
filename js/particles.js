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
