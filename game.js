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

const startMenu = document.getElementById("starter-menu");
const gameUi = document.getElementById("game-ui");
const startBtn = document.getElementById("start-btn");
const uiLevel = document.getElementById("ui-level");
const uiDeaths = document.getElementById("ui-deaths");
const levelTitleDisplay = document.getElementById("level-title-display");
const deathDialogue = document.getElementById("death-dialogue");
const deathMessage = document.getElementById("death-message");

let dialogueOpen = false;

function showDeathDialogue(msg) {
  dialogueOpen = true;
  deathMessage.innerText = msg;
  deathDialogue.style.display = "block";
  
  setTimeout(() => {
    dialogueOpen = false;
    deathDialogue.style.display = "none";
    resetLevel();
  }, 1000);
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  startMenu.style.display = "none";
  gameUi.style.display = "block";
}

startBtn.addEventListener("click", startGame);
window.addEventListener("keydown", (e) => {
  if (!gameStarted) startGame();
});

function loop() {
  if (gameStarted) {
    update();
    draw();
    
    // Update UI elements
    if (uiLevel.innerText != (level + 1)) {
      uiLevel.innerText = level + 1;
      const lvlName = levels[level] && levels[level].name ? levels[level].name : "Unknown";
      levelTitleDisplay.innerHTML = `Level <span id="ui-level">${level + 1}</span> &mdash; ${lvlName}`;
    }
    if (uiDeaths.innerText != deaths) uiDeaths.innerText = deaths;
  }
  if (menuOpen && gameStarted) {
    drawMenu();
  }
  requestAnimationFrame(loop);
}

// Initialize game
loadProgress();
resetLevel();
initMenuInput();
loop();
