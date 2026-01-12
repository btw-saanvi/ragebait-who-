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
// MAIN LOOP
// ============================================
function loop() {
  update();
  draw();
  if (menuOpen) {
    drawMenu();
  }
  requestAnimationFrame(loop);
}

// Initialize game
loadProgress();
resetLevel();
initMenuInput();
loop();
