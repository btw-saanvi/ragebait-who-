// ============================================
// MENU SYSTEM
// ============================================

function toggleMenu() {
  menuOpen = !menuOpen;
}

function drawMenu() {
  if (!menuOpen) return;
  
  // Menu overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Menu box
  const menuW = 400;
  const menuH = 350;
  const menuX = (canvas.width - menuW) / 2;
  const menuY = (canvas.height - menuH) / 2;
  
  ctx.fillStyle = "rgba(30, 30, 40, 0.95)";
  ctx.fillRect(menuX, menuY, menuW, menuH);
  ctx.strokeStyle = "rgba(100, 100, 120, 0.8)";
  ctx.lineWidth = 3;
  ctx.strokeRect(menuX, menuY, menuW, menuH);
  
  // Title
  ctx.fillStyle = "#fff";
  ctx.font = "bold 28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("LEVEL DEVIL", menuX + menuW / 2, menuY + 40);
  
  // Stats
  ctx.font = "18px monospace";
  ctx.fillStyle = "#aaa";
  ctx.textAlign = "left";
  ctx.fillText(`Current Level: ${level + 1}/${levels.length}`, menuX + 30, menuY + 80);
  ctx.fillText(`Highest Level: ${highestLevel}/${levels.length}`, menuX + 30, menuY + 110);
  ctx.fillText(`Total Deaths: ${deaths}`, menuX + 30, menuY + 140);
  
  // Buttons
  const btnY = menuY + 180;
  const btnH = 40;
  const btnSpacing = 50;
  
  // Resume button
  ctx.fillStyle = "#4488ff";
  ctx.fillRect(menuX + 50, btnY, menuW - 100, btnH);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Resume (ESC)", menuX + menuW / 2, btnY + 28);
  
  // Reset Progress button
  ctx.fillStyle = "#ff4444";
  ctx.fillRect(menuX + 50, btnY + btnSpacing, menuW - 100, btnH);
  ctx.fillStyle = "#fff";
  ctx.fillText("Reset Progress", menuX + menuW / 2, btnY + btnSpacing + 28);
  
  // Instructions
  ctx.fillStyle = "#888";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Press ESC to toggle menu", menuX + menuW / 2, menuY + menuH - 20);
  
  ctx.textAlign = "left";
}

function handleMenuClick(x, y) {
  if (!menuOpen) return;
  
  const menuW = 400;
  const menuH = 350;
  const menuX = (canvas.width - menuW) / 2;
  const menuY = (canvas.height - menuH) / 2;
  const btnY = menuY + 180;
  const btnH = 40;
  const btnSpacing = 50;
  
  // Resume button
  if (x >= menuX + 50 && x <= menuX + menuW - 50 &&
      y >= btnY && y <= btnY + btnH) {
    toggleMenu();
  }
  
  // Reset Progress button
  if (x >= menuX + 50 && x <= menuX + menuW - 50 &&
      y >= btnY + btnSpacing && y <= btnY + btnSpacing + btnH) {
    if (confirm("Reset all progress? This cannot be undone!")) {
      resetProgress();
      toggleMenu();
    }
  }
}

// Menu input handlers (initialized in game.js after canvas is ready)
function initMenuInput() {
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" || e.key === "Escape") {
      e.preventDefault();
      toggleMenu();
    }
  });

  canvas.addEventListener("click", e => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleMenuClick(x, y);
  });
}
