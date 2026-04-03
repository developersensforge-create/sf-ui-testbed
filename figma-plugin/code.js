// Sensforge Skills UI — Figma Plugin v2
figma.showUI(__html__, { width: 300, height: 200 });

const W = 390, H = 844, GAP = 60;
const ORANGE = { r: 0.976, g: 0.392, b: 0 };
const ORANGE_LIGHT = { r: 1, g: 0.95, b: 0.925 };
const WHITE = { r: 1, g: 1, b: 1 };
const GRAY_BG = { r: 0.961, g: 0.961, b: 0.961 };
const DIVIDER = { r: 0.92, g: 0.92, b: 0.92 };
const TEXT = { r: 0.1, g: 0.1, b: 0.1 };
const TEXT_SUB = { r: 0.55, g: 0.55, b: 0.55 };

// Font to use — will be set after loading
let FONT_REG = { family: 'Roboto', style: 'Regular' };
let FONT_MED = { family: 'Roboto', style: 'Medium' };
let FONT_BOLD = { family: 'Roboto', style: 'Bold' };

async function loadFonts() {
  // Try Inter first, fall back to Roboto
  try {
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
    await figma.loadFontAsync({ family: 'Inter', style: 'Bold' });
    FONT_REG = { family: 'Inter', style: 'Regular' };
    FONT_MED = { family: 'Inter', style: 'Medium' };
    FONT_BOLD = { family: 'Inter', style: 'Bold' };
    return;
  } catch(e) {}
  try {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
    await figma.loadFontAsync({ family: 'Roboto', style: 'Medium' });
    await figma.loadFontAsync({ family: 'Roboto', style: 'Bold' });
    return;
  } catch(e) {}
  // Last resort
  await figma.loadFontAsync({ family: 'Arial', style: 'Regular' });
  FONT_REG = FONT_MED = FONT_BOLD = { family: 'Arial', style: 'Regular' };
}

function mkFrame(name, x) {
  const f = figma.createFrame();
  f.name = name; f.x = x; f.y = 0;
  f.resize(W, H);
  f.fills = [{ type: 'SOLID', color: WHITE }];
  f.clipsContent = true;
  return f;
}

function mkRect(parent, x, y, w, h, color, radius = 0) {
  const r = figma.createRectangle();
  r.x = x; r.y = y; r.resize(w, h);
  r.fills = [{ type: 'SOLID', color }];
  r.cornerRadius = radius;
  parent.appendChild(r);
  return r;
}

function mkText(parent, str, x, y, size, color, bold = false) {
  const t = figma.createText();
  t.fontName = bold ? FONT_BOLD : FONT_REG;
  t.characters = String(str);
  t.fontSize = size;
  t.fills = [{ type: 'SOLID', color }];
  t.x = x; t.y = y;
  parent.appendChild(t);
  return t;
}

function statusBar(f) {
  mkRect(f, 0, 0, W, 44, WHITE);
  mkText(f, '9:41', 20, 14, 12, TEXT, true);
  mkText(f, '88%', W-50, 14, 12, TEXT, false);
}

function topNav(f, title) {
  mkRect(f, 0, 44, W, 52, WHITE);
  mkRect(f, 0, 95, W, 1, DIVIDER);
  mkText(f, '<', 16, 56, 22, ORANGE, true);
  mkText(f, title, W/2 - title.length * 4, 59, 17, TEXT, true);
}

function listRow(f, label, y, showToggle = false, toggleOn = false, showChevron = true) {
  mkRect(f, 0, y, W, 52, WHITE);
  mkRect(f, 0, y+51, W, 1, DIVIDER);
  mkRect(f, 16, y+8, 36, 36, GRAY_BG, 8);
  mkText(f, label, 68, y+16, 15, TEXT, false);
  if (showToggle) {
    mkRect(f, W-66, y+14, 50, 28, toggleOn ? ORANGE : DIVIDER, 14);
    mkRect(f, toggleOn ? W-26 : W-58, y+17, 22, 22, WHITE, 11);
  } else if (showChevron) {
    mkText(f, '>', W-28, y+16, 16, DIVIDER, false);
  }
  return 52;
}

function orangeBtn(f, label, y) {
  mkRect(f, 16, y, W-32, 50, ORANGE, 12);
  mkText(f, label, W/2 - label.length*3.5, y+14, 16, WHITE, true);
}

function chip(f, label, x, y) {
  const w = label.length * 8 + 24;
  mkRect(f, x, y, w, 30, ORANGE_LIGHT, 15);
  mkText(f, label, x+10, y+7, 13, ORANGE, false);
  return w + 8;
}

// ── Screen builders ──────────────────────────────────

async function s1_MySkills(x) {
  const f = mkFrame('P1 — My Skills', x);
  statusBar(f);
  topNav(f, 'My Skills');
  let y = 112;
  mkRect(f, 0, y, W, 40, GRAY_BG);
  mkText(f, 'ACTIVE SKILLS', 16, y+13, 11, TEXT_SUB, true);
  y += 40;
  for (const [t, d] of [['Person at Front Door','If person detected → Send notification'],['Package Delivered','If package detected → Alert + Record']]) {
    mkRect(f, 12, y, W-24, 70, GRAY_BG, 12);
    mkText(f, t, 28, y+12, 15, TEXT, true);
    mkText(f, d, 28, y+34, 12, TEXT_SUB, false);
    mkText(f, '>', W-32, y+24, 16, ORANGE, true);
    y += 82;
  }
  y += 16;
  mkRect(f, 0, y, W, 40, GRAY_BG);
  mkText(f, 'NEW SKILL', 16, y+13, 11, TEXT_SUB, true);
  y += 40;
  mkRect(f, 12, y, W-24, 52, ORANGE_LIGHT, 12);
  mkText(f, '+ Create New Skill', W/2-60, y+15, 15, ORANGE, true);
  figma.currentPage.appendChild(f);
  return f;
}

async function s2_SelectTrigger(x) {
  const f = mkFrame('P2 — Select Trigger', x);
  statusBar(f);
  topNav(f, 'Select Trigger');
  let y = 112;
  mkRect(f, 16, y, 220, 30, ORANGE_LIGHT, 15);
  mkText(f, 'If ... on ...', 28, y+7, 13, ORANGE, false);
  y += 48;
  for (const t of ['Person Detected','Person Coming Home','Near Car / Driveway','Motion','Vehicle','Package Delivered']) {
    listRow(f, t, y);
    y += 52;
  }
  figma.currentPage.appendChild(f);
  return f;
}

async function s3_TriggerDetails(x) {
  const f = mkFrame('P3 — Trigger Details', x);
  statusBar(f);
  topNav(f, 'Trigger Details');
  let y = 112;
  mkRect(f, 16, y, 240, 30, ORANGE_LIGHT, 15);
  mkText(f, 'If Person Detected ...', 28, y+7, 13, ORANGE, false);
  y += 52;
  mkText(f, 'Add conditions (optional)', 16, y, 13, TEXT_SUB, false);
  y += 28;
  let cx = 16;
  for (const c of ['At Night', 'Motion > 10s', 'Near entrance']) cx += chip(f, c, cx, y);
  y += 52;
  mkText(f, 'Your conditions', 16, y, 13, TEXT_SUB, false);
  y += 28;
  mkRect(f, 16, y, W-32, 52, GRAY_BG, 10);
  mkText(f, 'No conditions added yet', 24, y+16, 14, TEXT_SUB, false);
  orangeBtn(f, 'Continue', H-90);
  figma.currentPage.appendChild(f);
  return f;
}

async function s4_SelectDevice(x) {
  const f = mkFrame('P4 — Select Device', x);
  statusBar(f);
  topNav(f, 'Select Device');
  let y = 112;
  mkRect(f, 16, y, 280, 30, ORANGE_LIGHT, 15);
  mkText(f, 'If Person Detected on ...', 28, y+7, 13, ORANGE, false);
  y += 48;
  for (const d of ['Living Room Cam','Front Door Cam','Office Cam','Game Room Cam']) {
    listRow(f, d, y);
    y += 52;
  }
  figma.currentPage.appendChild(f);
  return f;
}

async function s5_SelectAction(x) {
  const f = mkFrame('P5 — Select Action', x);
  statusBar(f);
  topNav(f, 'Select Action');
  let y = 112;
  mkRect(f, 16, y, 300, 30, ORANGE_LIGHT, 15);
  mkText(f, 'If Person Detected on Front Door', 28, y+7, 12, ORANGE, false);
  y += 48;
  const actions = [['Send Notification', true],['Record', false],['Turn on Light', false],['Play Customized Voice', false],['Trigger Siren', false],['Call Me', false]];
  for (const [label, checked] of actions) {
    mkRect(f, 0, y, W, 52, checked ? ORANGE_LIGHT : WHITE);
    mkRect(f, 0, y+51, W, 1, DIVIDER);
    mkRect(f, 16, y+15, 22, 22, checked ? ORANGE : WHITE, 6);
    mkRect(f, 16, y+15, 22, 22, DIVIDER, 6); // border
    if (checked) { const check = figma.createRectangle(); check.resize(12,2); check.x=20; check.y=y+26; check.fills=[{type:'SOLID',color:WHITE}]; f.appendChild(check); }
    mkText(f, label, 52, y+16, 15, TEXT, checked);
    y += 52;
  }
  orangeBtn(f, 'Activate Now', H-90);
  figma.currentPage.appendChild(f);
  return f;
}

async function s6_VoiceMemo(x) {
  const f = mkFrame('P6 — Voice Memo', x);
  statusBar(f);
  topNav(f, 'Record Voice Memo');
  mkRect(f, W/2-56, 200, 112, 112, ORANGE_LIGHT, 56);
  mkRect(f, W/2-12, 236, 24, 40, ORANGE, 8);
  mkRect(f, W/2-20, 270, 40, 8, ORANGE, 4);
  mkRect(f, W/2-2, 278, 4, 16, ORANGE, 2);
  mkText(f, 'Tap to record', W/2-50, 330, 15, TEXT_SUB, false);
  mkText(f, '00:00', W/2-22, 360, 20, ORANGE, true);
  orangeBtn(f, 'Play Preview', H-160);
  orangeBtn(f, 'Use This Recording', H-98);
  figma.currentPage.appendChild(f);
  return f;
}

figma.ui.onmessage = async (msg) => {
  if (msg.type !== 'build') return;
  figma.ui.postMessage({ status: 'Loading fonts...' });
  await loadFonts();
  figma.ui.postMessage({ status: 'Building 6 screens...' });
  
  // Delete any previous incomplete builds
  const toDelete = figma.currentPage.children.filter(n => n.name.startsWith('P'));
  for (const n of toDelete) n.remove();

  await s1_MySkills(0);
  await s2_SelectTrigger(W + GAP);
  await s3_TriggerDetails((W + GAP) * 2);
  await s4_SelectDevice((W + GAP) * 3);
  await s5_SelectAction((W + GAP) * 4);
  await s6_VoiceMemo((W + GAP) * 5);

  figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
  figma.ui.postMessage({ status: '✅ Done! 6 screens created.' });
  setTimeout(() => figma.closePlugin(), 2500);
};
