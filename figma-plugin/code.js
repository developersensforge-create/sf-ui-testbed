// Sensforge Skills UI — Figma Plugin
// Creates all 6 screens as editable frames

figma.showUI(__html__, { width: 300, height: 200 });

const W = 390;
const H = 844;
const GAP = 60;

// Brand colors
const ORANGE = { r: 0.976, g: 0.392, b: 0 };       // #f96400
const ORANGE_LIGHT = { r: 1, g: 0.95, b: 0.925 };
const WHITE = { r: 1, g: 1, b: 1 };
const GRAY_BG = { r: 0.961, g: 0.961, b: 0.961 };
const DIVIDER = { r: 0.941, g: 0.941, b: 0.941 };
const TEXT = { r: 0.102, g: 0.102, b: 0.102 };
const TEXT_SUB = { r: 0.467, g: 0.467, b: 0.467 };
const BLACK = { r: 0, g: 0, b: 0 };

function hex(r,g,b) { return {r, g, b}; }

async function loadFont(style = 'Regular') {
  await figma.loadFontAsync({ family: 'Inter', style });
}

function frame(name, x, y, w, h, fills = [{ type: 'SOLID', color: WHITE }]) {
  const f = figma.createFrame();
  f.name = name;
  f.x = x; f.y = y;
  f.resize(w, h);
  f.fills = fills;
  f.cornerRadius = 0;
  f.clipsContent = true;
  return f;
}

function rect(parent, x, y, w, h, color, radius = 0) {
  const r = figma.createRectangle();
  r.x = x; r.y = y;
  r.resize(w, h);
  r.fills = [{ type: 'SOLID', color }];
  r.cornerRadius = radius;
  parent.appendChild(r);
  return r;
}

function text(parent, content, x, y, fontSize, color, weight = 'Regular', maxW = 0) {
  const t = figma.createText();
  t.fontName = { family: 'Inter', style: weight };
  t.characters = content;
  t.fontSize = fontSize;
  t.fills = [{ type: 'SOLID', color }];
  t.x = x; t.y = y;
  if (maxW > 0) { t.textAutoResize = 'HEIGHT'; t.resize(maxW, 20); }
  parent.appendChild(t);
  return t;
}

function divider(parent, y, indent = 0) {
  rect(parent, indent, y, W - indent, 1, DIVIDER);
}

function statusBar(parent) {
  rect(parent, 0, 0, W, 44, WHITE);
  text(parent, '9:41', 20, 14, 12, TEXT, 'Bold');
  text(parent, '📶 🔋', W - 60, 14, 12, TEXT, 'Regular');
}

function topNav(parent, title, hasBack = true, y = 44) {
  rect(parent, 0, y, W, 52, WHITE);
  divider(parent, y + 52);
  if (hasBack) text(parent, '‹', 16, y + 12, 24, { r: 0.976, g: 0.392, b: 0 }, 'Bold');
  text(parent, title, W/2 - 80, y + 14, 17, TEXT, 'Bold');
}

function orangeBtn(parent, label, x, y, w) {
  rect(parent, x, y, w, 48, ORANGE, 12);
  text(parent, label, x + w/2 - 40, y + 14, 16, WHITE, 'Bold');
}

function listRow(parent, label, sublabel, y, hasChevron = true) {
  rect(parent, 0, y, W, sublabel ? 68 : 52, WHITE);
  divider(parent, y + (sublabel ? 68 : 52));
  const icon = rect(parent, 16, y + 8, 36, 36, GRAY_BG, 8);
  text(parent, label, 68, y + (sublabel ? 10 : 15), 15, TEXT, 'Medium');
  if (sublabel) text(parent, sublabel, 68, y + 30, 12, TEXT_SUB, 'Regular');
  if (hasChevron) text(parent, '›', W - 28, y + (sublabel ? 20 : 17), 18, { r: 0.8, g: 0.8, b: 0.8 }, 'Regular');
  return sublabel ? 68 : 52;
}

function toggleRow(parent, label, isOn, y) {
  rect(parent, 0, y, W, 52, WHITE);
  divider(parent, y + 52);
  rect(parent, 16, y + 8, 36, 36, GRAY_BG, 8);
  text(parent, label, 68, y + 15, 15, TEXT, 'Medium');
  // Toggle
  const toggleBg = rect(parent, W - 66, y + 14, 50, 28, isOn ? ORANGE : DIVIDER, 14);
  rect(parent, isOn ? W - 26 : W - 56, y + 17, 22, 22, WHITE, 11);
  return 52;
}

// ── SCREEN 1: My Skills ────────────────────────────────
async function buildMySkills(x) {
  const f = frame('P1 — My Skills', x, 0, W, H);
  statusBar(f);
  topNav(f, 'My Skills', false);

  let y = 112;
  rect(f, 0, y, W, 50, GRAY_BG);
  text(f, 'Active Skills', 16, y + 16, 13, TEXT_SUB, 'Bold');
  y += 50;

  // Skill cards
  const skills = [
    ['Person at Front Door', 'If person detected → Send notification'],
    ['Package Delivered', 'If package detected → Alert + Record'],
  ];
  for (const [title, desc] of skills) {
    rect(f, 16, y, W - 32, 72, WHITE, 12);
    rect(f, 16, y, W - 32, 72, { r: 0, g: 0, b: 0, a: 0.03 }, 12);
    text(f, title, 32, y + 12, 15, TEXT, 'SemiBold', W - 80);
    text(f, desc, 32, y + 34, 12, TEXT_SUB, 'Regular', W - 80);
    rect(f, W - 56, y + 24, 28, 28, ORANGE_LIGHT, 14);
    text(f, '›', W - 44, y + 28, 14, ORANGE, 'Bold');
    y += 84;
  }

  y += 16;
  rect(f, 0, y, W, 50, GRAY_BG);
  text(f, 'New Skill Template', 16, y + 16, 13, TEXT_SUB, 'Bold');
  y += 50;

  rect(f, 16, y, W - 32, 56, ORANGE_LIGHT, 12);
  text(f, '+ Create New Skill', W/2 - 60, y + 18, 15, ORANGE, 'SemiBold');

  figma.currentPage.appendChild(f);
  return f;
}

// ── SCREEN 2: Select Trigger ──────────────────────────
async function buildSelectTrigger(x) {
  const f = frame('P2 — Select Trigger', x, 0, W, H);
  statusBar(f);
  topNav(f, 'Select Trigger');

  let y = 112;
  // Context pill
  rect(f, 16, y, 200, 32, ORANGE_LIGHT, 16);
  text(f, 'If ... on ...', 28, y + 8, 13, ORANGE, 'SemiBold');
  y += 52;

  const triggers = [
    'Person Detected', 'Person Coming Home', 'Near Car / Driveway',
    'Motion', 'Vehicle', 'Package Delivered',
  ];
  for (const t of triggers) {
    rect(f, 0, y, W, 52, WHITE);
    divider(f, y + 52, 16);
    rect(f, 16, y + 8, 36, 36, GRAY_BG, 8);
    text(f, t, 68, y + 16, 15, TEXT, 'Regular');
    text(f, '›', W - 28, y + 17, 18, DIVIDER, 'Regular');
    y += 52;
  }

  figma.currentPage.appendChild(f);
  return f;
}

// ── SCREEN 3: Select Device ───────────────────────────
async function buildSelectDevice(x) {
  const f = frame('P4 — Select Device', x, 0, W, H);
  statusBar(f);
  topNav(f, 'Select Device');

  let y = 96 + 52;
  rect(f, 16, y - 52, 260, 32, ORANGE_LIGHT, 16);
  text(f, 'If Person Detected on ...', 28, y - 44, 13, ORANGE, 'SemiBold');

  const devices = ['Living Room Cam', 'Front Door Cam', 'Office Cam'];
  for (const d of devices) {
    rect(f, 0, y, W, 52, WHITE);
    divider(f, y + 52, 16);
    rect(f, 16, y + 8, 36, 36, GRAY_BG, 8);
    text(f, d, 68, y + 16, 15, TEXT, 'Regular');
    y += 52;
  }

  figma.currentPage.appendChild(f);
  return f;
}

// ── SCREEN 4: Select Action ───────────────────────────
async function buildSelectAction(x) {
  const f = frame('P5 — Select Action', x, 0, W, H);
  statusBar(f);
  topNav(f, 'Select Action');

  let y = 96 + 52;
  rect(f, 16, y - 52, 300, 32, ORANGE_LIGHT, 16);
  text(f, 'If Person Detected on Front Door', 28, y - 44, 13, ORANGE, 'SemiBold');

  const actions = [
    ['Send Notification', true],
    ['Record', false],
    ['Turn on Light', false],
    ['Play Customized Voice', false],
    ['Trigger Siren', false],
    ['Call Me', false],
  ];
  for (const [label, checked] of actions) {
    rect(f, 0, y, W, 52, checked ? ORANGE_LIGHT : WHITE);
    divider(f, y + 52);
    // Checkbox
    const cb = rect(f, 16, y + 15, 22, 22, checked ? ORANGE : WHITE, 6);
    if (!checked) {
      // Border only
      const border = rect(f, 16, y + 15, 22, 22, { r: 0.85, g: 0.85, b: 0.85 }, 6);
    }
    if (checked) text(f, '✓', 20, y + 17, 13, WHITE, 'Bold');
    text(f, label, 52, y + 16, 15, TEXT, checked ? 'SemiBold' : 'Regular');
    y += 52;
  }

  // Activate button
  orangeBtn(f, '✅  Activate Now', 16, H - 90, W - 32);

  figma.currentPage.appendChild(f);
  return f;
}

// ── SCREEN 5: Trigger Details ─────────────────────────
async function buildTriggerDetails(x) {
  const f = frame('P3 — Trigger Details', x, 0, W, H);
  statusBar(f);
  topNav(f, 'Trigger Details');

  let y = 112;
  rect(f, 16, y, 260, 32, ORANGE_LIGHT, 16);
  text(f, 'If Person Detected ...', 28, y + 8, 13, ORANGE, 'SemiBold');
  y += 52;

  text(f, 'Add conditions (optional)', 16, y, 13, TEXT_SUB, 'Regular');
  y += 28;

  // Suggestion chips
  const chips = ['At Night', 'Motion > 10s', 'Near entrance'];
  let cx = 16;
  for (const chip of chips) {
    const cw = chip.length * 8 + 24;
    rect(f, cx, y, cw, 32, ORANGE_LIGHT, 16);
    text(f, chip, cx + 10, y + 8, 13, ORANGE, 'Medium');
    cx += cw + 8;
  }
  y += 52;

  orangeBtn(f, 'Continue →', 16, H - 90, W - 32);

  figma.currentPage.appendChild(f);
  return f;
}

// ── SCREEN 6: Voice Memo ──────────────────────────────
async function buildVoiceMemo(x) {
  const f = frame('P6 — Voice Memo', x, 0, W, H);
  statusBar(f);
  topNav(f, 'Record Voice Memo');

  // Mic circle
  rect(f, W/2 - 52, 220, 104, 104, ORANGE_LIGHT, 52);
  text(f, '🎙️', W/2 - 16, 248, 36, TEXT, 'Regular');
  text(f, 'Tap to record', W/2 - 48, 344, 15, TEXT_SUB, 'Regular');
  text(f, '00:00', W/2 - 22, 378, 20, ORANGE, 'Bold');

  orangeBtn(f, '▶  Play Preview', 16, H - 160, W - 32);
  orangeBtn(f, '✅  Use This Recording', 16, H - 100, W - 32);

  figma.currentPage.appendChild(f);
  return f;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'build') return;

  figma.ui.postMessage({ status: 'Loading fonts...' });
  try {
    await loadFont('Regular');
    await loadFont('Medium');
    await loadFont('SemiBold');
    await loadFont('Bold');
  } catch(e) {
    // Fallback
    try { await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }); } catch(e2) {}
  }

  figma.ui.postMessage({ status: 'Building screens...' });

  const screens = [
    buildMySkills,
    buildSelectTrigger,
    buildTriggerDetails,
    buildSelectDevice,
    buildSelectAction,
    buildVoiceMemo,
  ];

  let x = 0;
  for (const builder of screens) {
    await builder(x);
    x += W + GAP;
  }

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.ui.postMessage({ status: '✅ Done! 6 screens created.' });
  setTimeout(() => figma.closePlugin(), 2000);
};
