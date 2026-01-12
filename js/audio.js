// ============================================
// AUDIO SYSTEM
// ============================================

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(freq, dur, type = 'sine', vol = 0.3) {
  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.frequency.value = freq;
    osc.type = type;
    gain.gain.setValueAtTime(vol, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + dur);
    osc.start();
    osc.stop(audioContext.currentTime + dur);
  } catch (e) {}
}

const sounds = {
  jump: () => playSound(400, 0.08, 'square', 0.15),
  death: () => { 
    playSound(150, 0.25, 'sawtooth', 0.4); 
    setTimeout(() => playSound(100, 0.2, 'sawtooth', 0.3), 80); 
  },
  break: () => playSound(200, 0.12, 'square', 0.25),
  spike: () => playSound(300, 0.1, 'sawtooth', 0.35),
  complete: () => { 
    playSound(523, 0.1); 
    setTimeout(() => playSound(659, 0.1), 100); 
    setTimeout(() => playSound(784, 0.15), 200); 
  }
};
