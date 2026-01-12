// ============================================
// UTILITY FUNCTIONS
// ============================================

function getFloorY() { 
  return canvas.height - 50; 
}

function rand(min, max) { 
  return Math.random() * (max - min) + min; 
}

function randInt(min, max) { 
  return Math.floor(rand(min, max + 1)); 
}

function pick(arr) { 
  return arr[Math.floor(Math.random() * arr.length)]; 
}

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
