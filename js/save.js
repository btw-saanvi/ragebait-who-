// ============================================
// SAVE/LOAD SYSTEM
// ============================================

function saveProgress() {
  const progress = {
    level: level,
    highestLevel: highestLevel,
    deaths: deaths
  };
  localStorage.setItem('levelDevilProgress', JSON.stringify(progress));
}

function loadProgress() {
  try {
    const saved = localStorage.getItem('levelDevilProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      if (progress.highestLevel !== undefined) {
        highestLevel = progress.highestLevel;
        if (highestLevel > level) {
          level = Math.min(highestLevel - 1, levels.length - 1);
        }
      }
    }
  } catch (e) {}
}

function resetProgress() {
  localStorage.removeItem('levelDevilProgress');
  level = 0;
  highestLevel = 0;
  deaths = 0;
  resetLevel();
  message = "Progress reset!";
}
