// ============================================
// GAME CONFIGURATION
// ============================================

// Messages
const lies = [
  "This is safe",
  "Trust me",
  "Easy jump",
  "Nothing bad",
  "Just go"
];

const taunts = [
  "Try again",
  "So close",
  "Almost",
  "Again?",
  "Keep going"
];

// Level Data (15 levels total)
const levels = [
  {
    platforms: [
      { x: 320, yOffset: 140, w: 50, h: 12, betray: true, breakTime: 180 },
      { x: 450, yOffset: 180, w: 45, h: 12, betray: false, invisible: true },
      { x: 580, yOffset: 150, w: 50, h: 12, betray: true, breakTime: 200 },
      { x: 720, yOffset: 190, w: 40, h: 12, betray: false, invisible: true }
    ],
    spikes: [{ x: 400 }, { x: 650 }],
    movers: [],
    saws: [],
    ceilings: [{ x: 300, w: 200, h: 20, yOffset: 80 }],
    fakeDoor: { x: 850, move: 280 },
    exit: { x: 1100, yOffset: 80 },
    reverseChance: 0.3
  },
  {
    platforms: [
      { x: 300, yOffset: 150, w: 45, h: 12, betray: true, breakTime: 160 },
      { x: 430, yOffset: 200, w: 40, h: 12, betray: true, invisible: true },
      { x: 560, yOffset: 160, w: 50, h: 12, betray: true, breakTime: 180 },
      { x: 700, yOffset: 190, w: 35, h: 12, betray: false, invisible: true }
    ],
    spikes: [{ x: 380 }, { x: 510 }, { x: 640 }],
    movers: [
      { x: 480, yOffset: 100, w: 50, h: 12, start: 480, end: 680, speed: 2.8 }
    ],
    saws: [],
    ceilings: [{ x: 280, w: 180, h: 20, yOffset: 70 }, { x: 550, w: 200, h: 20, yOffset: 60 }],
    fakeDoor: { x: 900, move: 320 },
    exit: { x: 1200, yOffset: 80 },
    reverseChance: 0.4
  },
  {
    platforms: [
      { x: 280, yOffset: 140, w: 40, h: 12, betray: true, breakTime: 150 },
      { x: 410, yOffset: 200, w: 35, h: 12, betray: false, invisible: true },
      { x: 540, yOffset: 150, w: 45, h: 12, betray: true, breakTime: 170 },
      { x: 680, yOffset: 180, w: 40, h: 12, betray: true, invisible: true },
      { x: 800, yOffset: 160, w: 50, h: 12, betray: true, breakTime: 160 }
    ],
    spikes: [{ x: 360 }, { x: 490 }, { x: 620 }, { x: 750 }],
    movers: [
      { x: 440, yOffset: 80, w: 45, h: 12, start: 440, end: 640, speed: 3.2 },
      { x: 640, yOffset: 120, w: 40, h: 12, start: 640, end: 840, speed: -2.5 }
    ],
    saws: [
      { x: 500, yOffset: 60, r: 20, speed: 0.1 }
    ],
    ceilings: [{ x: 270, w: 150, h: 20, yOffset: 50 }, { x: 530, w: 180, h: 20, yOffset: 40 }, { x: 790, w: 160, h: 20, yOffset: 45 }],
    fakeDoor: { x: 1000, move: 360 },
    exit: { x: 1300, yOffset: 80 },
    reverseChance: 0.5
  },
  {
    platforms: [
      { x: 260, yOffset: 150, w: 35, h: 10, betray: true, breakTime: 140 },
      { x: 390, yOffset: 180, w: 30, h: 10, betray: false, invisible: true },
      { x: 520, yOffset: 130, w: 40, h: 10, betray: true, breakTime: 150 },
      { x: 660, yOffset: 200, w: 35, h: 10, betray: true, invisible: true },
      { x: 780, yOffset: 140, w: 45, h: 10, betray: true, breakTime: 145 },
      { x: 920, yOffset: 190, w: 30, h: 10, betray: false, invisible: true }
    ],
    spikes: [{ x: 340 }, { x: 470 }, { x: 600 }, { x: 730 }, { x: 860 }],
    movers: [
      { x: 420, yOffset: 100, w: 40, h: 10, start: 420, end: 620, speed: 3.5 },
      { x: 620, yOffset: 60, w: 35, h: 10, start: 620, end: 820, speed: -3 },
      { x: 820, yOffset: 90, w: 40, h: 10, start: 820, end: 1020, speed: 2.8 }
    ],
    saws: [
      { x: 460, yOffset: 50, r: 24, speed: 0.14 },
      { x: 760, yOffset: 70, r: 22, speed: -0.12 }
    ],
    ceilings: [{ x: 250, w: 120, h: 20, yOffset: 30 }, { x: 510, w: 140, h: 20, yOffset: 25 }, { x: 770, w: 130, h: 20, yOffset: 35 }, { x: 910, w: 150, h: 20, yOffset: 28 }],
    fakeDoor: { x: 1100, move: 400 },
    exit: { x: 1400, yOffset: 80 },
    reverseChance: 0.6
  },
  {
    platforms: [
      { x: 240, yOffset: 140, w: 30, h: 10, betray: true, breakTime: 130 },
      { x: 370, yOffset: 200, w: 25, h: 10, betray: false, invisible: true },
      { x: 500, yOffset: 150, w: 35, h: 10, betray: true, breakTime: 140 },
      { x: 640, yOffset: 180, w: 30, h: 10, betray: true, invisible: true },
      { x: 760, yOffset: 130, w: 40, h: 10, betray: true, breakTime: 135 },
      { x: 900, yOffset: 190, w: 25, h: 10, betray: false, invisible: true },
      { x: 1020, yOffset: 160, w: 35, h: 10, betray: true, breakTime: 130 }
    ],
    spikes: [{ x: 320 }, { x: 450 }, { x: 580 }, { x: 710 }, { x: 840 }, { x: 970 }],
    movers: [
      { x: 400, yOffset: 100, w: 35, h: 10, start: 400, end: 600, speed: 4 },
      { x: 600, yOffset: 60, w: 30, h: 10, start: 600, end: 800, speed: -3.5 },
      { x: 800, yOffset: 90, w: 35, h: 10, start: 800, end: 1000, speed: 3.2 },
      { x: 1000, yOffset: 110, w: 30, h: 10, start: 1000, end: 1200, speed: -2.8 }
    ],
    saws: [
      { x: 440, yOffset: 50, r: 26, speed: 0.16 },
      { x: 740, yOffset: 70, r: 24, speed: -0.14 },
      { x: 1040, yOffset: 55, r: 25, speed: 0.15 }
    ],
    ceilings: [{ x: 230, w: 100, h: 20, yOffset: 20 }, { x: 490, w: 120, h: 20, yOffset: 15 }, { x: 750, w: 110, h: 20, yOffset: 25 }, { x: 890, w: 130, h: 20, yOffset: 18 }, { x: 1010, w: 140, h: 20, yOffset: 22 }],
    fakeDoor: { x: 1200, move: 450 },
    exit: { x: 1500, yOffset: 80 },
    reverseChance: 0.7
  },
  // Level 6 - First sky door
  {
    platforms: [
      { x: 300, yOffset: 140, w: 45, h: 12, betray: true, breakTime: 150 },
      { x: 450, yOffset: 180, w: 40, h: 12, betray: false, invisible: true },
      { x: 600, yOffset: 120, w: 50, h: 12, betray: true, breakTime: 160 },
      { x: 750, yOffset: 160, w: 45, h: 12, betray: false, invisible: true },
      { x: 900, yOffset: 100, w: 55, h: 12, betray: true, breakTime: 140 }
    ],
    spikes: [{ x: 380 }, { x: 530 }, { x: 680 }, { x: 830 }],
    movers: [
      { x: 500, yOffset: 80, w: 50, h: 12, start: 500, end: 700, speed: 3 },
      { x: 800, yOffset: 60, w: 45, h: 12, start: 800, end: 1000, speed: -2.8 }
    ],
    saws: [
      { x: 550, yOffset: 50, r: 22, speed: 0.12 }
    ],
    ceilings: [{ x: 290, w: 140, h: 20, yOffset: 40 }, { x: 590, w: 160, h: 20, yOffset: 30 }],
    collapsingFloors: [{ x: 400, w: 100, breakTime: 200 }],
    fakeDoor: { x: 1000, move: 380 },
    exit: { x: 1200, yOffset: 250 },
    reverseChance: 0.5
  },
  // Level 7
  {
    platforms: [
      { x: 280, yOffset: 150, w: 40, h: 12, betray: true, breakTime: 140 },
      { x: 420, yOffset: 200, w: 35, h: 12, betray: false, invisible: true },
      { x: 560, yOffset: 130, w: 45, h: 12, betray: true, breakTime: 150 },
      { x: 700, yOffset: 180, w: 40, h: 12, betray: true, invisible: true },
      { x: 840, yOffset: 110, w: 50, h: 12, betray: true, breakTime: 145 },
      { x: 980, yOffset: 160, w: 45, h: 12, betray: false, invisible: true }
    ],
    spikes: [{ x: 350 }, { x: 490 }, { x: 630 }, { x: 770 }, { x: 910 }],
    movers: [
      { x: 460, yOffset: 90, w: 45, h: 12, start: 460, end: 660, speed: 3.2 },
      { x: 760, yOffset: 70, w: 40, h: 12, start: 760, end: 960, speed: -3 }
    ],
    saws: [
      { x: 520, yOffset: 55, r: 24, speed: 0.14 },
      { x: 820, yOffset: 45, r: 22, speed: -0.13 }
    ],
    ceilings: [{ x: 270, w: 120, h: 20, yOffset: 35 }, { x: 550, w: 150, h: 20, yOffset: 25 }, { x: 830, w: 140, h: 20, yOffset: 30 }],
    collapsingFloors: [{ x: 380, w: 120, breakTime: 180 }, { x: 720, w: 100, breakTime: 190 }],
    fakeDoor: { x: 1100, move: 400 },
    exit: { x: 1300, yOffset: 280 },
    reverseChance: 0.6
  },
  // Level 8
  {
    platforms: [
      { x: 260, yOffset: 140, w: 35, h: 10, betray: true, breakTime: 130 },
      { x: 400, yOffset: 190, w: 30, h: 10, betray: false, invisible: true },
      { x: 540, yOffset: 120, w: 40, h: 10, betray: true, breakTime: 140 },
      { x: 680, yOffset: 170, w: 35, h: 10, betray: true, invisible: true },
      { x: 820, yOffset: 100, w: 45, h: 10, betray: true, breakTime: 135 },
      { x: 960, yOffset: 150, w: 40, h: 10, betray: false, invisible: true },
      { x: 1100, yOffset: 80, w: 50, h: 10, betray: true, breakTime: 130 }
    ],
    spikes: [{ x: 330 }, { x: 470 }, { x: 610 }, { x: 750 }, { x: 890 }, { x: 1030 }],
    movers: [
      { x: 440, yOffset: 85, w: 40, h: 10, start: 440, end: 640, speed: 3.5 },
      { x: 720, yOffset: 65, w: 35, h: 10, start: 720, end: 920, speed: -3.2 },
      { x: 1000, yOffset: 75, w: 40, h: 10, start: 1000, end: 1200, speed: 3 }
    ],
    saws: [
      { x: 500, yOffset: 50, r: 25, speed: 0.15 },
      { x: 800, yOffset: 40, r: 23, speed: -0.14 },
      { x: 1080, yOffset: 35, r: 24, speed: 0.16 }
    ],
    ceilings: [{ x: 250, w: 110, h: 20, yOffset: 30 }, { x: 530, w: 130, h: 20, yOffset: 20 }, { x: 810, w: 120, h: 20, yOffset: 25 }, { x: 950, w: 140, h: 20, yOffset: 22 }],
    collapsingFloors: [{ x: 360, w: 110, breakTime: 170 }, { x: 660, w: 100, breakTime: 160 }, { x: 980, w: 120, breakTime: 175 }],
    fakeDoor: { x: 1200, move: 420 },
    exit: { x: 1400, yOffset: 300 },
    reverseChance: 0.65
  },
  // Level 9
  {
    platforms: [
      { x: 240, yOffset: 150, w: 30, h: 10, betray: true, breakTime: 125 },
      { x: 380, yOffset: 200, w: 25, h: 10, betray: false, invisible: true },
      { x: 520, yOffset: 130, w: 35, h: 10, betray: true, breakTime: 135 },
      { x: 660, yOffset: 180, w: 30, h: 10, betray: true, invisible: true },
      { x: 800, yOffset: 110, w: 40, h: 10, betray: true, breakTime: 130 },
      { x: 940, yOffset: 160, w: 35, h: 10, betray: false, invisible: true },
      { x: 1080, yOffset: 90, w: 45, h: 10, betray: true, breakTime: 125 },
      { x: 1220, yOffset: 140, w: 40, h: 10, betray: false, invisible: true }
    ],
    spikes: [{ x: 310 }, { x: 450 }, { x: 590 }, { x: 730 }, { x: 870 }, { x: 1010 }, { x: 1150 }],
    movers: [
      { x: 420, yOffset: 95, w: 35, h: 10, start: 420, end: 620, speed: 4 },
      { x: 700, yOffset: 70, w: 30, h: 10, start: 700, end: 900, speed: -3.5 },
      { x: 980, yOffset: 80, w: 35, h: 10, start: 980, end: 1180, speed: 3.3 },
      { x: 1160, yOffset: 60, w: 30, h: 10, start: 1160, end: 1360, speed: -3 }
    ],
    saws: [
      { x: 480, yOffset: 45, r: 26, speed: 0.17 },
      { x: 780, yOffset: 35, r: 24, speed: -0.15 },
      { x: 1060, yOffset: 30, r: 25, speed: 0.18 }
    ],
    ceilings: [{ x: 230, w: 100, h: 20, yOffset: 18 }, { x: 510, w: 120, h: 20, yOffset: 15 }, { x: 790, w: 110, h: 20, yOffset: 20 }, { x: 930, w: 130, h: 20, yOffset: 17 }, { x: 1070, w: 140, h: 20, yOffset: 22 }],
    collapsingFloors: [{ x: 340, w: 100, breakTime: 160 }, { x: 640, w: 110, breakTime: 155 }, { x: 960, w: 100, breakTime: 165 }, { x: 1200, w: 120, breakTime: 150 }],
    fakeDoor: { x: 1300, move: 450 },
    exit: { x: 1500, yOffset: 320 },
    reverseChance: 0.7
  },
  // Level 10
  {
    platforms: [
      { x: 220, yOffset: 140, w: 28, h: 10, betray: true, breakTime: 120 },
      { x: 360, yOffset: 190, w: 25, h: 10, betray: false, invisible: true },
      { x: 500, yOffset: 120, w: 32, h: 10, betray: true, breakTime: 130 },
      { x: 640, yOffset: 170, w: 28, h: 10, betray: true, invisible: true },
      { x: 780, yOffset: 100, w: 38, h: 10, betray: true, breakTime: 125 },
      { x: 920, yOffset: 150, w: 32, h: 10, betray: false, invisible: true },
      { x: 1060, yOffset: 80, w: 42, h: 10, betray: true, breakTime: 120 },
      { x: 1200, yOffset: 130, w: 35, h: 10, betray: false, invisible: true },
      { x: 1340, yOffset: 60, w: 45, h: 10, betray: true, breakTime: 115 }
    ],
    spikes: [{ x: 290 }, { x: 430 }, { x: 570 }, { x: 710 }, { x: 850 }, { x: 990 }, { x: 1130 }, { x: 1270 }],
    movers: [
      { x: 400, yOffset: 100, w: 32, h: 10, start: 400, end: 600, speed: 4.2 },
      { x: 680, yOffset: 75, w: 28, h: 10, start: 680, end: 880, speed: -3.8 },
      { x: 960, yOffset: 85, w: 32, h: 10, start: 960, end: 1160, speed: 3.5 },
      { x: 1240, yOffset: 55, w: 30, h: 10, start: 1240, end: 1440, speed: -3.2 }
    ],
    saws: [
      { x: 460, yOffset: 40, r: 27, speed: 0.19 },
      { x: 760, yOffset: 30, r: 25, speed: -0.17 },
      { x: 1040, yOffset: 25, r: 26, speed: 0.2 },
      { x: 1320, yOffset: 20, r: 24, speed: -0.18 }
    ],
    ceilings: [{ x: 210, w: 90, h: 20, yOffset: 15 }, { x: 490, w: 110, h: 20, yOffset: 12 }, { x: 770, w: 100, h: 20, yOffset: 18 }, { x: 910, w: 120, h: 20, yOffset: 14 }, { x: 1050, w: 130, h: 20, yOffset: 20 }, { x: 1190, w: 140, h: 20, yOffset: 16 }],
    collapsingFloors: [{ x: 320, w: 90, breakTime: 150 }, { x: 620, w: 100, breakTime: 145 }, { x: 940, w: 90, breakTime: 155 }, { x: 1180, w: 110, breakTime: 140 }, { x: 1420, w: 100, breakTime: 148 }],
    fakeDoor: { x: 1400, move: 480 },
    exit: { x: 1600, yOffset: 350 },
    reverseChance: 0.75
  },
  // Level 11 - Extreme difficulty
  {
    platforms: [
      { x: 200, yOffset: 150, w: 25, h: 10, betray: true, breakTime: 110 },
      { x: 340, yOffset: 200, w: 22, h: 10, betray: false, invisible: true },
      { x: 480, yOffset: 130, w: 30, h: 10, betray: true, breakTime: 120 },
      { x: 620, yOffset: 180, w: 25, h: 10, betray: true, invisible: true },
      { x: 760, yOffset: 110, w: 35, h: 10, betray: true, breakTime: 115 },
      { x: 900, yOffset: 160, w: 30, h: 10, betray: false, invisible: true },
      { x: 1040, yOffset: 90, w: 38, h: 10, betray: true, breakTime: 110 },
      { x: 1180, yOffset: 140, w: 32, h: 10, betray: false, invisible: true },
      { x: 1320, yOffset: 70, w: 40, h: 10, betray: true, breakTime: 105 },
      { x: 1460, yOffset: 120, w: 35, h: 10, betray: false, invisible: true }
    ],
    spikes: [{ x: 270 }, { x: 410 }, { x: 550 }, { x: 690 }, { x: 830 }, { x: 970 }, { x: 1110 }, { x: 1250 }, { x: 1390 }],
    movers: [
      { x: 380, yOffset: 105, w: 30, h: 10, start: 380, end: 580, speed: 4.5 },
      { x: 660, yOffset: 80, w: 25, h: 10, start: 660, end: 860, speed: -4 },
      { x: 940, yOffset: 90, w: 30, h: 10, start: 940, end: 1140, speed: 3.8 },
      { x: 1220, yOffset: 60, w: 28, h: 10, start: 1220, end: 1420, speed: -3.5 },
      { x: 1500, yOffset: 50, w: 32, h: 10, start: 1500, end: 1700, speed: 3.6 }
    ],
    saws: [
      { x: 440, yOffset: 35, r: 28, speed: 0.21 },
      { x: 740, yOffset: 25, r: 26, speed: -0.19 },
      { x: 1020, yOffset: 20, r: 27, speed: 0.22 },
      { x: 1300, yOffset: 15, r: 25, speed: -0.2 },
      { x: 1580, yOffset: 10, r: 26, speed: 0.21 }
    ],
    ceilings: [{ x: 190, w: 80, h: 20, yOffset: 12 }, { x: 470, w: 100, h: 20, yOffset: 10 }, { x: 750, w: 90, h: 20, yOffset: 15 }, { x: 890, w: 110, h: 20, yOffset: 11 }, { x: 1030, w: 120, h: 20, yOffset: 18 }, { x: 1170, w: 130, h: 20, yOffset: 13 }, { x: 1310, w: 140, h: 20, yOffset: 19 }],
    collapsingFloors: [{ x: 300, w: 80, breakTime: 140 }, { x: 600, w: 90, breakTime: 135 }, { x: 920, w: 80, breakTime: 145 }, { x: 1160, w: 100, breakTime: 130 }, { x: 1400, w: 90, breakTime: 138 }, { x: 1640, w: 100, breakTime: 132 }],
    fakeDoor: { x: 1500, move: 500 },
    exit: { x: 1700, yOffset: 380 },
    reverseChance: 0.8
  },
  // Level 12
  {
    platforms: [
      { x: 180, yOffset: 140, w: 22, h: 10, betray: true, breakTime: 100 },
      { x: 320, yOffset: 190, w: 20, h: 10, betray: false, invisible: true },
      { x: 460, yOffset: 120, w: 28, h: 10, betray: true, breakTime: 110 },
      { x: 600, yOffset: 170, w: 22, h: 10, betray: true, invisible: true },
      { x: 740, yOffset: 100, w: 32, h: 10, betray: true, breakTime: 105 },
      { x: 880, yOffset: 150, w: 28, h: 10, betray: false, invisible: true },
      { x: 1020, yOffset: 80, w: 35, h: 10, betray: true, breakTime: 100 },
      { x: 1160, yOffset: 130, w: 30, h: 10, betray: false, invisible: true },
      { x: 1300, yOffset: 60, w: 38, h: 10, betray: true, breakTime: 95 },
      { x: 1440, yOffset: 110, w: 32, h: 10, betray: false, invisible: true },
      { x: 1580, yOffset: 50, w: 40, h: 10, betray: true, breakTime: 90 }
    ],
    spikes: [{ x: 250 }, { x: 390 }, { x: 530 }, { x: 670 }, { x: 810 }, { x: 950 }, { x: 1090 }, { x: 1230 }, { x: 1370 }, { x: 1510 }],
    movers: [
      { x: 360, yOffset: 110, w: 28, h: 10, start: 360, end: 560, speed: 4.8 },
      { x: 640, yOffset: 85, w: 24, h: 10, start: 640, end: 840, speed: -4.2 },
      { x: 920, yOffset: 95, w: 28, h: 10, start: 920, end: 1120, speed: 4 },
      { x: 1200, yOffset: 65, w: 26, h: 10, start: 1200, end: 1400, speed: -3.8 },
      { x: 1480, yOffset: 55, w: 30, h: 10, start: 1480, end: 1680, speed: 3.9 },
      { x: 1760, yOffset: 45, w: 28, h: 10, start: 1760, end: 1960, speed: -3.7 }
    ],
    saws: [
      { x: 420, yOffset: 30, r: 29, speed: 0.23 },
      { x: 720, yOffset: 20, r: 27, speed: -0.21 },
      { x: 1000, yOffset: 15, r: 28, speed: 0.24 },
      { x: 1280, yOffset: 10, r: 26, speed: -0.22 },
      { x: 1560, yOffset: 5, r: 27, speed: 0.25 },
      { x: 1840, yOffset: 0, r: 25, speed: -0.23 }
    ],
    ceilings: [{ x: 170, w: 70, h: 20, yOffset: 10 }, { x: 450, w: 90, h: 20, yOffset: 8 }, { x: 730, w: 80, h: 20, yOffset: 12 }, { x: 870, w: 100, h: 20, yOffset: 9 }, { x: 1010, w: 110, h: 20, yOffset: 14 }, { x: 1150, w: 120, h: 20, yOffset: 10 }, { x: 1290, w: 130, h: 20, yOffset: 16 }, { x: 1430, w: 140, h: 20, yOffset: 11 }],
    collapsingFloors: [{ x: 280, w: 70, breakTime: 130 }, { x: 580, w: 80, breakTime: 125 }, { x: 900, w: 70, breakTime: 135 }, { x: 1140, w: 90, breakTime: 120 }, { x: 1380, w: 80, breakTime: 128 }, { x: 1620, w: 90, breakTime: 122 }, { x: 1860, w: 100, breakTime: 118 }],
    fakeDoor: { x: 1600, move: 520 },
    exit: { x: 1800, yOffset: 400 },
    reverseChance: 0.85
  },
  // Level 13
  {
    platforms: [
      { x: 160, yOffset: 150, w: 20, h: 10, betray: true, breakTime: 90 },
      { x: 300, yOffset: 200, w: 18, h: 10, betray: false, invisible: true },
      { x: 440, yOffset: 130, w: 25, h: 10, betray: true, breakTime: 100 },
      { x: 580, yOffset: 180, w: 20, h: 10, betray: true, invisible: true },
      { x: 720, yOffset: 110, w: 30, h: 10, betray: true, breakTime: 95 },
      { x: 860, yOffset: 160, w: 25, h: 10, betray: false, invisible: true },
      { x: 1000, yOffset: 90, w: 32, h: 10, betray: true, breakTime: 90 },
      { x: 1140, yOffset: 140, w: 28, h: 10, betray: false, invisible: true },
      { x: 1280, yOffset: 70, w: 35, h: 10, betray: true, breakTime: 85 },
      { x: 1420, yOffset: 120, w: 30, h: 10, betray: false, invisible: true },
      { x: 1560, yOffset: 50, w: 38, h: 10, betray: true, breakTime: 80 },
      { x: 1700, yOffset: 100, w: 32, h: 10, betray: false, invisible: true }
    ],
    spikes: [{ x: 230 }, { x: 370 }, { x: 510 }, { x: 650 }, { x: 790 }, { x: 930 }, { x: 1070 }, { x: 1210 }, { x: 1350 }, { x: 1490 }, { x: 1630 }],
    movers: [
      { x: 340, yOffset: 115, w: 26, h: 10, start: 340, end: 540, speed: 5 },
      { x: 620, yOffset: 90, w: 22, h: 10, start: 620, end: 820, speed: -4.5 },
      { x: 900, yOffset: 100, w: 26, h: 10, start: 900, end: 1100, speed: 4.2 },
      { x: 1180, yOffset: 70, w: 24, h: 10, start: 1180, end: 1380, speed: -4 },
      { x: 1460, yOffset: 60, w: 28, h: 10, start: 1460, end: 1660, speed: 4.1 },
      { x: 1740, yOffset: 50, w: 26, h: 10, start: 1740, end: 1940, speed: -3.9 }
    ],
    saws: [
      { x: 400, yOffset: 25, r: 30, speed: 0.26 },
      { x: 700, yOffset: 15, r: 28, speed: -0.24 },
      { x: 980, yOffset: 10, r: 29, speed: 0.27 },
      { x: 1260, yOffset: 5, r: 27, speed: -0.25 },
      { x: 1540, yOffset: 0, r: 28, speed: 0.28 },
      { x: 1820, yOffset: -5, r: 26, speed: -0.26 }
    ],
    ceilings: [{ x: 150, w: 60, h: 20, yOffset: 8 }, { x: 430, w: 80, h: 20, yOffset: 6 }, { x: 710, w: 70, h: 20, yOffset: 10 }, { x: 850, w: 90, h: 20, yOffset: 7 }, { x: 990, w: 100, h: 20, yOffset: 12 }, { x: 1130, w: 110, h: 20, yOffset: 8 }, { x: 1270, w: 120, h: 20, yOffset: 14 }, { x: 1410, w: 130, h: 20, yOffset: 9 }, { x: 1550, w: 140, h: 20, yOffset: 15 }],
    collapsingFloors: [{ x: 260, w: 60, breakTime: 120 }, { x: 560, w: 70, breakTime: 115 }, { x: 880, w: 60, breakTime: 125 }, { x: 1120, w: 80, breakTime: 110 }, { x: 1360, w: 70, breakTime: 118 }, { x: 1600, w: 80, breakTime: 112 }, { x: 1840, w: 90, breakTime: 108 }],
    fakeDoor: { x: 1700, move: 550 },
    exit: { x: 1900, yOffset: 420 },
    reverseChance: 0.9
  },
  // Level 14
  {
    platforms: [
      { x: 140, yOffset: 140, w: 18, h: 10, betray: true, breakTime: 80 },
      { x: 280, yOffset: 190, w: 16, h: 10, betray: false, invisible: true },
      { x: 420, yOffset: 120, w: 22, h: 10, betray: true, breakTime: 90 },
      { x: 560, yOffset: 170, w: 18, h: 10, betray: true, invisible: true },
      { x: 700, yOffset: 100, w: 28, h: 10, betray: true, breakTime: 85 },
      { x: 840, yOffset: 150, w: 22, h: 10, betray: false, invisible: true },
      { x: 980, yOffset: 80, w: 30, h: 10, betray: true, breakTime: 80 },
      { x: 1120, yOffset: 130, w: 26, h: 10, betray: false, invisible: true },
      { x: 1260, yOffset: 60, w: 32, h: 10, betray: true, breakTime: 75 },
      { x: 1400, yOffset: 110, w: 28, h: 10, betray: false, invisible: true },
      { x: 1540, yOffset: 50, w: 35, h: 10, betray: true, breakTime: 70 },
      { x: 1680, yOffset: 90, w: 30, h: 10, betray: false, invisible: true },
      { x: 1820, yOffset: 40, w: 38, h: 10, betray: true, breakTime: 65 }
    ],
    spikes: [{ x: 210 }, { x: 350 }, { x: 490 }, { x: 630 }, { x: 770 }, { x: 910 }, { x: 1050 }, { x: 1190 }, { x: 1330 }, { x: 1470 }, { x: 1610 }, { x: 1750 }],
    movers: [
      { x: 320, yOffset: 120, w: 24, h: 10, start: 320, end: 520, speed: 5.2 },
      { x: 600, yOffset: 95, w: 20, h: 10, start: 600, end: 800, speed: -4.8 },
      { x: 880, yOffset: 105, w: 24, h: 10, start: 880, end: 1080, speed: 4.5 },
      { x: 1160, yOffset: 75, w: 22, h: 10, start: 1160, end: 1360, speed: -4.2 },
      { x: 1440, yOffset: 65, w: 26, h: 10, start: 1440, end: 1640, speed: 4.3 },
      { x: 1720, yOffset: 55, w: 24, h: 10, start: 1720, end: 1920, speed: -4.1 },
      { x: 2000, yOffset: 45, w: 28, h: 10, start: 2000, end: 2200, speed: 4 }
    ],
    saws: [
      { x: 380, yOffset: 20, r: 31, speed: 0.29 },
      { x: 680, yOffset: 10, r: 29, speed: -0.27 },
      { x: 960, yOffset: 5, r: 30, speed: 0.3 },
      { x: 1240, yOffset: 0, r: 28, speed: -0.28 },
      { x: 1520, yOffset: -5, r: 29, speed: 0.31 },
      { x: 1800, yOffset: -10, r: 27, speed: -0.29 },
      { x: 2080, yOffset: -15, r: 28, speed: 0.32 }
    ],
    ceilings: [{ x: 130, w: 50, h: 20, yOffset: 5 }, { x: 410, w: 70, h: 20, yOffset: 4 }, { x: 690, w: 60, h: 20, yOffset: 8 }, { x: 830, w: 80, h: 20, yOffset: 5 }, { x: 970, w: 90, h: 20, yOffset: 10 }, { x: 1110, w: 100, h: 20, yOffset: 6 }, { x: 1250, w: 110, h: 20, yOffset: 12 }, { x: 1390, w: 120, h: 20, yOffset: 7 }, { x: 1530, w: 130, h: 20, yOffset: 13 }, { x: 1670, w: 140, h: 20, yOffset: 8 }],
    collapsingFloors: [{ x: 240, w: 50, breakTime: 110 }, { x: 540, w: 60, breakTime: 105 }, { x: 860, w: 50, breakTime: 115 }, { x: 1100, w: 70, breakTime: 100 }, { x: 1340, w: 60, breakTime: 108 }, { x: 1580, w: 70, breakTime: 102 }, { x: 1860, w: 80, breakTime: 98 }, { x: 2100, w: 90, breakTime: 95 }],
    fakeDoor: { x: 1800, move: 580 },
    exit: { x: 2000, yOffset: 450 },
    reverseChance: 0.95
  },
  // Level 15 - Final Boss Level
  {
    platforms: [
      { x: 120, yOffset: 150, w: 16, h: 10, betray: true, breakTime: 70 },
      { x: 260, yOffset: 200, w: 14, h: 10, betray: false, invisible: true },
      { x: 400, yOffset: 130, w: 20, h: 10, betray: true, breakTime: 80 },
      { x: 540, yOffset: 180, w: 16, h: 10, betray: true, invisible: true },
      { x: 680, yOffset: 110, w: 26, h: 10, betray: true, breakTime: 75 },
      { x: 820, yOffset: 160, w: 20, h: 10, betray: false, invisible: true },
      { x: 960, yOffset: 90, w: 28, h: 10, betray: true, breakTime: 70 },
      { x: 1100, yOffset: 140, w: 24, h: 10, betray: false, invisible: true },
      { x: 1240, yOffset: 70, w: 30, h: 10, betray: true, breakTime: 65 },
      { x: 1380, yOffset: 120, w: 26, h: 10, betray: false, invisible: true },
      { x: 1520, yOffset: 50, w: 33, h: 10, betray: true, breakTime: 60 },
      { x: 1660, yOffset: 100, w: 28, h: 10, betray: false, invisible: true },
      { x: 1800, yOffset: 40, w: 36, h: 10, betray: true, breakTime: 55 },
      { x: 1940, yOffset: 80, w: 30, h: 10, betray: false, invisible: true },
      { x: 2080, yOffset: 30, w: 38, h: 10, betray: true, breakTime: 50 }
    ],
    spikes: [{ x: 190 }, { x: 330 }, { x: 470 }, { x: 610 }, { x: 750 }, { x: 890 }, { x: 1030 }, { x: 1170 }, { x: 1310 }, { x: 1450 }, { x: 1590 }, { x: 1730 }, { x: 1870 }, { x: 2010 }],
    movers: [
      { x: 300, yOffset: 125, w: 22, h: 10, start: 300, end: 500, speed: 5.5 },
      { x: 580, yOffset: 100, w: 18, h: 10, start: 580, end: 780, speed: -5 },
      { x: 860, yOffset: 110, w: 22, h: 10, start: 860, end: 1060, speed: 4.8 },
      { x: 1140, yOffset: 80, w: 20, h: 10, start: 1140, end: 1340, speed: -4.5 },
      { x: 1420, yOffset: 70, w: 24, h: 10, start: 1420, end: 1620, speed: 4.6 },
      { x: 1700, yOffset: 60, w: 22, h: 10, start: 1700, end: 1900, speed: -4.3 },
      { x: 1980, yOffset: 50, w: 26, h: 10, start: 1980, end: 2180, speed: 4.4 },
      { x: 2260, yOffset: 40, w: 24, h: 10, start: 2260, end: 2460, speed: -4.2 }
    ],
    saws: [
      { x: 360, yOffset: 15, r: 32, speed: 0.33 },
      { x: 660, yOffset: 5, r: 30, speed: -0.31 },
      { x: 940, yOffset: 0, r: 31, speed: 0.34 },
      { x: 1220, yOffset: -5, r: 29, speed: -0.32 },
      { x: 1500, yOffset: -10, r: 30, speed: 0.35 },
      { x: 1780, yOffset: -15, r: 28, speed: -0.33 },
      { x: 2060, yOffset: -20, r: 29, speed: 0.36 },
      { x: 2340, yOffset: -25, r: 27, speed: -0.34 }
    ],
    ceilings: [{ x: 110, w: 40, h: 20, yOffset: 3 }, { x: 390, w: 60, h: 20, yOffset: 2 }, { x: 670, w: 50, h: 20, yOffset: 6 }, { x: 810, w: 70, h: 20, yOffset: 4 }, { x: 950, w: 80, h: 20, yOffset: 8 }, { x: 1090, w: 90, h: 20, yOffset: 5 }, { x: 1230, w: 100, h: 20, yOffset: 11 }, { x: 1370, w: 110, h: 20, yOffset: 6 }, { x: 1510, w: 120, h: 20, yOffset: 12 }, { x: 1650, w: 130, h: 20, yOffset: 7 }, { x: 1790, w: 140, h: 20, yOffset: 13 }, { x: 1930, w: 150, h: 20, yOffset: 8 }],
    collapsingFloors: [{ x: 220, w: 40, breakTime: 100 }, { x: 520, w: 50, breakTime: 95 }, { x: 840, w: 40, breakTime: 105 }, { x: 1080, w: 60, breakTime: 90 }, { x: 1320, w: 50, breakTime: 98 }, { x: 1600, w: 60, breakTime: 88 }, { x: 1880, w: 70, breakTime: 85 }, { x: 2160, w: 80, breakTime: 82 }, { x: 2440, w: 90, breakTime: 78 }],
    fakeDoor: { x: 1900, move: 600 },
    exit: { x: 2100, yOffset: 500 },
    reverseChance: 1.0
  }
];
