// nano.jsx — GNU-nano-styled personal site
// Author: kenny.na

const { useState, useEffect, useRef, useCallback, useMemo, Fragment } = React;

// ============================================================
// File contents — each line is a tagged object
// ============================================================
const L = {
  t:   (s)            => ({ k: 'text', s }),
  h:   (s)            => ({ k: 'h',    s }),
  d:   (s)            => ({ k: 'dim',  s }),
  b:   ()             => ({ k: 'blank' }),
  lnk: (s, opts)      => ({ k: 'link', s, ...opts }),
  img: (src, alt, cap)=> ({ k: 'img',  src, alt, cap }),
};

const FILES = {
  'about_me.txt': [
    L.h('Kenny Na'),
    L.h('========'),
    L.b(),
    L.t('Systems Design Engineering @ University of Waterloo.'),
    L.t('Class of 2028.'),
    L.b(),
    L.t('I design hardware — PCBs, power electronics,'),
    L.t('mixed-signal, high-speed digital — for UAVs and'),
    L.t('AI-inference silicon.'),
    L.b(),
    L.t('Currently leading the electrical team at WARG (Waterloo'),
    L.t('Aerial Robotics Group). Previously hardware intern'),
    L.t('at Arista Networks (800GbE switching platforms) and'),
    L.t('Etched (hardware platform for custom AI-inference chips), and founder /'),
    L.t('team lead at Waterloo Reality Labs (open-source'),
    L.t('hackable VR/AR headsets).'),
    L.b(),
    L.d('-- now ---------------------------------------------------'),
    L.b(),
    L.lnk('  > projects/warg.md', { file: 'projects/warg.md' }),
    L.t('    Electrical Lead at WARG: custom STM32 flight'),
    L.t('    controllers, 3-phase BLDC drivers, AEAC comp.'),
    L.b(),
    L.d('-- past --------------------------------------------------'),
    L.b(),
    L.lnk('  > experience.txt', { file: 'experience.txt' }),
    L.t('    Internships: Arista Networks, Etched, WARG,'),
    L.t('    Grand & Toy.'),
    L.b(),
    L.lnk('  > projects/reality_labs.md', { file: 'projects/reality_labs.md' }),
    L.t('    Founded Waterloo Reality Labs — open-source VR/AR.'),
    L.b(),
    L.lnk('  > projects/study_lofi_beats.md', { file: 'projects/study_lofi_beats.md' }),
    L.t('    Lo-fi beats on Ableton; 50K+ streams.'),
    L.b(),
    L.lnk('  > projects/3d_modelling_art.md', { file: 'projects/3d_modelling_art.md' }),
    L.t('    10+ Blender / Unity art projects.'),
    L.b(),
    L.lnk('  > skills.txt', { file: 'skills.txt' }),
    L.t('    Stack, tools, protocols.'),
    L.b(),
    L.d('-- contact -----------------------------------------------'),
    L.b(),
    L.lnk('  > kenny.na@uwaterloo.ca',      { href: 'mailto:kenny.na@uwaterloo.ca' }),
    L.lnk('  > linkedin.com/in/kennyulna',  { href: 'https://www.linkedin.com/in/kennyulna/' }),
    L.lnk('  > github.com/kennynahh',       { href: 'https://github.com/kennynahh' }),
    L.b(),
    L.d('-- tip ---------------------------------------------------'),
    L.t('Press ^G for help, ^R to switch files, ^W to search.'),
    L.t('Use the arrow keys (or j/k) to move the cursor;'),
    L.t('press Enter on a link to follow it.'),
  ],

  'experience.txt': [
    L.h('Experience'),
    L.h('=========='),
    L.b(),
    L.t('Hardware Design Engineering Intern'),
    L.d('  Arista Networks · Santa Clara, CA      Jan 2026 – Apr 2026'),
    L.t('  - SerDes routing strategy for a 52-layer 800GbE'),
    L.t('    OSFP switch card via die-to-die channel loss'),
    L.t('    analysis.'),
    L.t('  - Multiphase VRM schematics for pluggable-optics'),
    L.t('    power and ASIC voltage-ripple targets.'),
    L.t('  - Control-plane features for power cycling and'),
    L.t('    fault logging with FPGA team based on vendor'),
    L.t('    RFP requirements.'),
    L.t('  - Stackup design for 28-layer mezzanine cards'),
    L.t('    with PCIe / SerDes routing, working with fabs.'),
    L.b(),
    L.t('Electrical Engineering Intern'),
    L.d('  Etched · San Jose, CA                  May 2025 – Aug 2025'),
    L.t('  - 16-layer HDI test interposer PCB (Cadence'),
    L.t('    Allegro) with STM32 + high-speed breakouts'),
    L.t('    (Ethernet, PCIe 5.0) for S-parameter tests'),
    L.t('    and basic ASIC emulation.'),
    L.t('  - Test PCB replicating an ASIC ballmap to'),
    L.t('    evaluate ~1.2 V / 450 A+ DC stress —'),
    L.t('    electromigration and thermal-runaway risk'),
    L.t('    around BGA balls.'),
    L.t('  - Reduced IR drop by ~39% in select ASIC'),
    L.t('    substrate / interposer regions via ballmap'),
    L.t('    pattern optimization.'),
    L.t('  - 12-layer vendor-specific load slammers sinking'),
    L.t('    up to 1500 A; stackup + via fanout work.'),
    L.b(),
    L.t('Electrical Engineering Intern'),
    L.d('  Waterloo Aerial Robotics Group         Sep 2024 – Dec 2024'),
    L.t('  - Mixed-signal PCB integrating 12 → 5 V buck,'),
    L.t('    LDO, ESP32, impedance-matched RF transceiver'),
    L.t('    in Altium for an ExpressLRS RC plane;'),
    L.t('    6 PWM outputs for servos & ESCs.'),
    L.t('  - LTspice input filtering on the buck converter'),
    L.t('    to suppress LiPo source-impedance transients'),
    L.t('    and MLCC resonance.'),
    L.t('  - USB-C source PCB arbitrating up to 20 V / 5 A'),
    L.t('    (USB-PD + USB 3.2 compliant) for drone debug.'),
    L.b(),
    L.t('IT Infrastructure & Operations Intern'),
    L.d('  Grand & Toy · Vaughan, ON              Jan 2024 – Apr 2024'),
    L.t('  - Managed 250+ users via Active Directory,'),
    L.t('    Group Policy, and Microsoft Management'),
    L.t('    Console.'),
    L.b(),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],

  'skills.txt': [
    L.h('Skills'),
    L.h('======'),
    L.b(),
    L.d('hardware'),
    L.t('  Power electronics · Analog & digital design'),
    L.t('  PCB layout · Schematic capture · Sim & validation'),
    L.t('  Mixed-signal · High-speed (SerDes, PCIe 5.0, 800GbE)'),
    L.b(),
    L.d('tools'),
    L.t('  Cadence OrCAD / Allegro · Altium Designer'),
    L.t('  LTspice · SOLIDWORKS · Onshape'),
    L.t('  Arduino · Git · Linux'),
    L.b(),
    L.d('languages & protocols'),
    L.t('  C · C++ · Python · MATLAB · HTML/CSS/JS'),
    L.t('  I²C · SPI · UART · USB-PD · USB 3.2'),
    L.b(),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],

  'projects/warg.md': [
    L.h('WARG · Waterloo Aerial Robotics Group'),
    L.h('====================================='),
    L.b(),
    L.t('Electrical Lead · Mar 2025 – Present'),
    L.b(),
    L.t('Leading the electrical team on sUAS / UAV systems'),
    L.t('for the Aerial Evolution Association of Canada'),
    L.t('(AEAC) national competition.'),
    L.b(),
    L.d('what I\'m building:'),
    L.t('  - ZeroPilot 4.0: Custom STM32-based flight controller with'),
    L.t('    CAN, SPI, I²C, barometer, and redundant IMUs.'),
    L.t('  - Compact 3-phase motor driver board (STSPIN32)'),
    L.t('    for BLDCs on 3S-battery drones.'),
    L.b(),
    L.d('previously @ WARG (Sep – Dec 2024, EE intern):'),
    L.t('  - 12 → 5 V buck + LDO + ESP32 + RF transceiver'),
    L.t('    on a single mixed-signal PCB for an'),
    L.t('    ExpressLRS RC plane.'),
    L.t('  - USB-C source PCB arbitrating 20 V / 5 A for'),
    L.t('    drone bench debug.'),
    L.b(),
    L.d('about WARG:'),
    L.t('  Student design team at UW competing annually'),
    L.t('  in the AEAC Student Competition. Flagship'),
    L.t('  platform Valkyrie: 10 kg UAV, 60-min flight'),
    L.t('  time on 12s Li-ion, 5 kg payload.'),
    L.b(),
    L.lnk('  > uwarg.com', { href: 'https://www.uwarg.com/' }),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],

  'projects/reality_labs.md': [
    L.h('Waterloo Reality Labs'),
    L.h('====================='),
    L.b(),
    L.t('Team Lead · Jan 2024 – Aug 2025  (past)'),
    L.b(),
    L.t('Created the world\'s first collegiate engineering'),
    L.t('design team developing open-source, hackable VR'),
    L.t('and AR headsets at the University of Waterloo.'),
    L.b(),
    L.img('images/realityfromscratch.jpg', 'Reality From Scratch HMD',
          '[ fig.1  Reality From Scratch HMD prototype ]'),
    L.b(),
    L.d('flagship build — Varifocal HMD:'),
    L.t('  - Aims to solve the vergence-accommodation'),
    L.t('    conflict in VR headsets.'),
    L.t('  - Eye tracking approximates focal distance.'),
    L.t('  - Voice coils move lenses for real-time focal'),
    L.t('    length adjustment.'),
    L.t('  - Camera-based eye tracker: ESP32, OmniVision'),
    L.t('    camera, IR LEDs, FOSS tracking software.'),
    L.b(),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],

  'projects/study_lofi_beats.md': [
    L.h('Study & Lo-Fi Beats'),
    L.h('==================='),
    L.b(),
    L.t('Lo-fi beats produced on Ableton Live.'),
    L.b(),
    L.img('images/find-me-again.jpg', 'Find Me Again — album art',
          '[ fig.1  "Find Me Again" — cover art ]'),
    L.b(),
    L.d('stats:'),
    L.t('  - 50K+ streams across Spotify / Apple / YouTube'),
    L.t('  - Multiple Spotify editorial playlist placements'),
    L.t('  - Distribution via Amuse.io'),
    L.b(),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],

  'projects/3d_modelling_art.md': [
    L.h('3D Modelling & Visual Art'),
    L.h('========================='),
    L.b(),
    L.t('10+ art projects, built in Blender and Unity.'),
    L.b(),
    L.img('images/bshot.jpg', 'B-shot: Stray scene recreation in Blender',
          '[ fig.1  Stray shop scene, recreated in Blender ]'),
    L.img('images/wideshot.jpg', 'Wide shot of the same scene',
          '[ fig.2  Wide shot, same scene ]'),
    L.b(),
    L.lnk('  > back to ~/about_me.txt', { file: 'about_me.txt' }),
  ],
};

const FILE_ORDER = [
  'about_me.txt',
  'experience.txt',
  'skills.txt',
  'projects/warg.md',
  'projects/reality_labs.md',
  'projects/study_lofi_beats.md',
  'projects/3d_modelling_art.md',
];

const FILE_META = {
  'about_me.txt':                 { desc: 'who I am, what I work on' },
  'experience.txt':               { desc: 'internships, reverse-chron' },
  'skills.txt':                   { desc: 'stack + tools + protocols' },
  'projects/warg.md':             { desc: 'WARG — current focus' },
  'projects/reality_labs.md':     { desc: 'Waterloo Reality Labs (past)' },
  'projects/study_lofi_beats.md': { desc: 'lo-fi beats' },
  'projects/3d_modelling_art.md': { desc: '3D art' },
};

// ============================================================
// Shortcut rails
// ============================================================
const SC_DEFAULT_1 = [
  { k: '^G', lbl: 'Help',      cmd: 'help'  },
  { k: '^O', lbl: 'Write Out', cmd: 'write' },
  { k: '^W', lbl: 'Where Is',  cmd: 'where' },
  { k: '^K', lbl: 'Cut',       cmd: 'cut'   },
  { k: '^T', lbl: 'Execute',   cmd: 'exec'  },
  { k: '^C', lbl: 'Location',  cmd: 'loc'   },
];
const SC_DEFAULT_2 = [
  { k: '^X', lbl: 'Exit',       cmd: 'exit'    },
  { k: '^R', lbl: 'Read File',  cmd: 'read'    },
  { k: '^\\',lbl: 'Replace',    cmd: 'replace' },
  { k: '^U', lbl: 'Paste',      cmd: 'paste'   },
  { k: '^J', lbl: 'Justify',    cmd: 'justify' },
  { k: '^_', lbl: 'Go To Line', cmd: 'goto'    },
];
const SC_PROMPT_1 = [
  { k: '^G', lbl: 'Help',       cmd: 'help'     },
  { k: '↵',  lbl: 'Confirm',    cmd: 'confirm'  },
];
const SC_PROMPT_2 = [
  { k: '^C', lbl: 'Cancel',     cmd: 'cancel'   },
];

// ============================================================
// Helpers
// ============================================================
function fmtNumLines(arr) {
  return `${arr.length} line${arr.length === 1 ? '' : 's'}`;
}

// ============================================================
// Tweaks default
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  theme:    'classic',
  font:     'JetBrains Mono',
  fontSize: 15,
  scan:     0.16,
  glow:     0.05,
  tilt:     'subtle',
  bezel:    true,
  lineNums: false,
  nanoVer:  '7.2',
}/*EDITMODE-END*/;

// ============================================================
// Components
// ============================================================
function Line({ line, idx, current, onClick }) {
  const cls = ['line', `k-${line.k}`];
  if (line.k === 'link') cls.push('link');
  if (line.k === 'h')    cls.push('h');
  if (line.k === 'dim')  cls.push('dim');
  if (current)           cls.push('current');

  if (line.k === 'img') {
    return (
      <div className={cls.concat('img-line').join(' ')} data-idx={idx}>
        <span className="gutter">{ /* gutter slot */ }</span>
        <div className="content">
          <div className="frame">
            <img src={line.src} alt={line.alt} loading="lazy" />
          </div>
          <div className="cap">{line.cap || `[ ${line.alt} ]`}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cls.join(' ')} data-idx={idx} onClick={onClick}>
      <span className="gutter">{ /* set by parent via --gut */ }</span>
      <span className="content">{line.s || ' '}</span>
    </div>
  );
}

function NanoBuffer({
  lines, cursor, setCursor, onActivate, lineNums, bodyRef, gutterContent,
}) {
  return (
    <div className="body" ref={bodyRef} tabIndex={-1}>
      {lines.map((ln, i) => {
        if (ln.k === 'img') {
          return (
            <div key={i} className={`line k-img img-line ${cursor === i ? 'current' : ''}`}>
              {lineNums && <span className="gutter">{gutterContent(i)}</span>}
              <div className="content">
                <div className="frame">
                  <img src={ln.src} alt={ln.alt} loading="lazy" />
                </div>
                <div className="cap">{ln.cap || `[ ${ln.alt} ]`}</div>
              </div>
            </div>
          );
        }
        const isLink = ln.k === 'link';
        const cls = ['line', `k-${ln.k}`];
        if (isLink)         cls.push('link');
        if (ln.k === 'h')   cls.push('h');
        if (ln.k === 'dim') cls.push('dim');
        if (cursor === i)   cls.push('current');
        return (
          <div
            key={i}
            className={cls.join(' ')}
            onClick={() => { setCursor(i); if (isLink) onActivate(i); }}
            onMouseEnter={() => { /* could preview link target */ }}
          >
            {lineNums && <span className="gutter">{gutterContent(i)}</span>}
            <span className="content">{ln.s || ' '}</span>
          </div>
        );
      })}
    </div>
  );
}

function Shortcuts({ row, onCmd }) {
  return (
    <div className="shortcuts">
      {row.map((s, i) => (
        <span key={i} className="sc" onClick={() => onCmd(s.cmd)} title={`${s.k} ${s.lbl}`}>
          <span className="k">{s.k}</span>
          <span className="lbl">{s.lbl}</span>
        </span>
      ))}
    </div>
  );
}

function HelpOverlay({ onClose }) {
  return (
    <div className="overlay">
      <div className="bar inv title-bar">
        <span className="l">  GNU nano 7.2  </span>
        <span className="c">Main nano help text</span>
        <span className="r">  </span>
      </div>
      <div className="body">
        {[
          'The nano editor is designed to emulate the functionality and',
          'ease-of-use of the UW Pico text editor.  There are four main',
          'sections of this site:',
          '',
          '  ABOUT          who I am, what I work on, where to find me',
          '  PROJECTS       a directory of project buffers, opened with ^R',
          '  CONTACT        email / linkedin / github (open with Enter)',
          '  HELP           this text — close with ^X',
          '',
          'The following function keys are available in this buffer:',
          '',
          '  ^G    show this help text',
          '  ^X    close the current buffer / exit',
          '  ^O    "write out" — flashes a save toast (cosmetic)',
          '  ^R    insert another file into the current buffer (file picker)',
          '  ^W    search the current file for text',
          '  ^_    go to a specific line number',
          '  ^C    show cursor position (line, col, byte)',
          '',
          '  Arrows / j / k   move the cursor up & down',
          '  Enter            follow a link on the current line',
          '  Tab / Shift+Tab  cycle through buffers',
          '  Esc              dismiss a prompt or this help screen',
        ].map((s, i) => (
          <div key={i} className="line k-text"><span className="content">{s || ' '}</span></div>
        ))}
      </div>
      <div className="bar status">^X Exit  ^G Help</div>
      <div className="shortcuts">
        <span className="sc" onClick={onClose}><span className="k">^X</span><span className="lbl">Exit</span></span>
        <span className="sc" onClick={onClose}><span className="k">Esc</span><span className="lbl">Close</span></span>
      </div>
    </div>
  );
}

function ExitOverlay({ onCancel }) {
  return (
    <div className="overlay">
      <div className="bar inv title-bar">
        <span className="l">  GNU nano 7.2  </span>
        <span className="c"></span>
        <span className="r">  </span>
      </div>
      <div className="body" style={{ display:'grid', placeItems:'center' }}>
        <div style={{ textAlign:'center', maxWidth: '60ch' }}>
          <div className="line k-h"><span className="content">[ goodbye ]</span></div>
          <div className="line k-text"><span className="content"> </span></div>
          <div className="line k-text"><span className="content">Thanks for visiting.</span></div>
          <div className="line k-text"><span className="content">Reach out: kenny.na@uwaterloo.ca</span></div>
          <div className="line k-text"><span className="content"> </span></div>
          <div className="line k-dim"><span className="content">(Press any key to return — nothing was actually saved.)</span></div>
        </div>
      </div>
      <div className="bar status inv">[ Buffer closed.  Press any key to reopen. ]</div>
      <div className="shortcuts">
        <span className="sc" onClick={onCancel}><span className="k">↵</span><span className="lbl">Reopen</span></span>
      </div>
    </div>
  );
}

// ============================================================
// Main App
// ============================================================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [path, setPath] = useState('about_me.txt');
  const [cursor, setCursor] = useState(0);
  const [statusMsg, setStatusMsg] = useState('[ Welcome to nano.  For basic help, type Ctrl+G. ]');
  const [statusInv, setStatusInv] = useState(true);
  const [prompt, setPrompt] = useState(null);   // {kind, value, cb?}
  const [showPicker, setShowPicker] = useState(false);
  const [pickerIdx, setPickerIdx] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [modified, setModified] = useState(false);
  const [booted, setBooted] = useState(false);

  const bodyRef = useRef(null);
  const promptRef = useRef(null);

  const lines = FILES[path] || [];

  // ---- side-effects on tweaks ----
  useEffect(() => {
    document.body.dataset.theme = t.theme;
    document.body.dataset.bezel = t.bezel ? '1' : '0';
    document.documentElement.style.setProperty('--font',
      `"${t.font}", ui-monospace, Menlo, Consolas, monospace`);
    document.documentElement.style.setProperty('--fs', `${t.fontSize}px`);
    document.documentElement.style.setProperty('--scan', String(t.scan));
    document.documentElement.style.setProperty('--glow', String(t.glow));
    document.documentElement.style.setProperty('--gut',
      t.lineNums ? '3.5ch' : '0');
    const tilt = { off: '0deg', subtle: '1.6deg', dramatic: '5deg' }[t.tilt] || '0deg';
    document.documentElement.style.setProperty('--tilt-x', tilt);
  }, [t]);

  // ---- subtle mouse parallax (only when tilt enabled) ----
  useEffect(() => {
    if (t.tilt === 'off') return;
    const handler = (e) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 2;
      const amp = t.tilt === 'dramatic' ? 6 : 2.2;
      document.documentElement.style.setProperty('--tilt-y', `${xPct * amp}deg`);
      const baseX = { subtle: 1.6, dramatic: 4 }[t.tilt] || 0;
      document.documentElement.style.setProperty('--tilt-x',
        `${(baseX - yPct * amp * 0.6).toFixed(2)}deg`);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [t.tilt]);

  // ---- boot sweep ----
  useEffect(() => {
    const id = setTimeout(() => setBooted(true), 1500);
    return () => clearTimeout(id);
  }, []);

  // ---- clear welcome status after a delay ----
  useEffect(() => {
    const id = setTimeout(() => {
      setStatusMsg(''); setStatusInv(false);
    }, 5500);
    return () => clearTimeout(id);
  }, []);

  // ---- ephemeral status helper ----
  const flash = useCallback((msg, opts = {}) => {
    setStatusMsg(msg);
    setStatusInv(opts.inv !== false);
    if (opts.ms !== 0) {
      setTimeout(() => setStatusMsg(''), opts.ms || 3500);
    }
  }, []);

  const popToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  }, []);

  // ---- file switching ----
  const openFile = useCallback((p, opts = {}) => {
    if (!FILES[p]) { flash(`[ Error reading ${p}: No such file ]`); return; }
    setPath(p);
    setCursor(0);
    setModified(false);
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    if (!opts.silent) flash(`[ Read ${fmtNumLines(FILES[p])} from ${p} ]`);
  }, [flash]);

  // ---- line activation (Enter on a link) ----
  const activate = useCallback((i) => {
    const ln = lines[i];
    if (!ln || ln.k !== 'link') return;
    if (ln.file) {
      openFile(ln.file);
    } else if (ln.href) {
      flash(`[ Opening ${ln.href} ... ]`);
      if (ln.href.startsWith('mailto:')) {
        window.location.href = ln.href;
      } else {
        window.open(ln.href, '_blank', 'noopener');
      }
    }
  }, [lines, openFile, flash]);

  // ---- scroll current line into view (no scrollIntoView) ----
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const row = el.querySelector('.line.current');
    if (!row) return;
    const rt = row.offsetTop, rh = row.offsetHeight;
    const st = el.scrollTop, sh = el.clientHeight;
    if (rt < st + 8)               el.scrollTop = Math.max(0, rt - 8);
    else if (rt + rh > st + sh - 8) el.scrollTop = rt + rh - sh + 8;
  }, [cursor, path]);

  // ---- command dispatcher ----
  const runCmd = useCallback((cmd) => {
    switch (cmd) {
      case 'help':    setHelpOpen(true); break;
      case 'write':   popToast(`[ Wrote ${fmtNumLines(lines)} ]`); setModified(false); break;
      case 'where':   setPrompt({ kind: 'where',   value: '' }); break;
      case 'read':    setShowPicker(true); setPickerIdx(0); break;
      case 'exit':    setExitOpen(true); break;
      case 'goto':    setPrompt({ kind: 'goto',    value: '' }); break;
      case 'replace': setPrompt({ kind: 'replace', value: '' }); break;
      case 'loc': {
        flash(`[ line ${cursor + 1}/${lines.length}  (${Math.round((cursor + 1) / lines.length * 100)}%) ]`);
        break;
      }
      case 'cut':     flash(`[ Cut ${cursor === 0 ? 'nothing — read-only buffer' : 'denied — buffer is read-only'} ]`); break;
      case 'paste':   flash('[ Cutbuffer is empty ]'); break;
      case 'justify': flash('[ Nothing to justify ]'); break;
      case 'exec':    setPrompt({ kind: 'exec',    value: '' }); break;
      case 'confirm':
      case 'cancel':  setPrompt(null); break;
      default:        flash(`[ Unknown function ]`);
    }
  }, [cursor, lines, popToast, flash]);

  // ---- prompt submit ----
  const submitPrompt = useCallback(() => {
    if (!prompt) return;
    const v = prompt.value.trim();
    if (prompt.kind === 'where' && v) {
      const idx = lines.findIndex((ln, i) =>
        i > cursor && (ln.s || '').toLowerCase().includes(v.toLowerCase()));
      const fallback = lines.findIndex(ln =>
        (ln.s || '').toLowerCase().includes(v.toLowerCase()));
      const target = idx >= 0 ? idx : fallback;
      if (target >= 0) { setCursor(target); flash(`[ Found "${v}" on line ${target + 1} ]`); }
      else flash(`[ "${v}" not found ]`);
    } else if (prompt.kind === 'goto' && v) {
      const n = parseInt(v, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= lines.length) {
        setCursor(n - 1); flash(`[ at line ${n} ]`);
      } else flash(`[ "${v}" is out of range ]`);
    } else if (prompt.kind === 'replace') {
      flash('[ Replace is read-only here — try ^R to switch buffers ]');
    } else if (prompt.kind === 'exec') {
      const out = ({
        'whoami':  'kenny',
        'pwd':     '/home/kenny',
        'ls':      FILE_ORDER.join('   '),
        'date':    new Date().toString(),
        'uname':   'GNU/nano 7.2 (browser; portfolio build)',
      })[v];
      flash(out ? `[ $ ${v} → ${out} ]` : `[ $ ${v}: command not found ]`);
    }
    setPrompt(null);
  }, [prompt, lines, cursor, flash]);

  // ---- keyboard ----
  useEffect(() => {
    const onKey = (e) => {
      // exit overlay: any key closes
      if (exitOpen) { e.preventDefault(); setExitOpen(false); return; }
      // help overlay: ^X or Esc closes
      if (helpOpen) {
        if (e.key === 'Escape' || (e.ctrlKey && e.key.toLowerCase() === 'x')) {
          e.preventDefault(); setHelpOpen(false);
        }
        return;
      }
      // file picker
      if (showPicker) {
        if (e.key === 'Escape')      { e.preventDefault(); setShowPicker(false); }
        else if (e.key === 'ArrowDown'){ e.preventDefault(); setPickerIdx(i => Math.min(FILE_ORDER.length - 1, i + 1)); }
        else if (e.key === 'ArrowUp')  { e.preventDefault(); setPickerIdx(i => Math.max(0, i - 1)); }
        else if (e.key === 'Enter')    { e.preventDefault(); openFile(FILE_ORDER[pickerIdx]); setShowPicker(false); }
        else if (/^[1-9]$/.test(e.key)){
          const n = parseInt(e.key, 10) - 1;
          if (n < FILE_ORDER.length) { openFile(FILE_ORDER[n]); setShowPicker(false); }
        }
        return;
      }
      // prompt input is handled by its own onKeyDown; skip global for typing
      if (prompt) {
        if (e.key === 'Escape') { e.preventDefault(); setPrompt(null); }
        return;
      }

      // global Ctrl shortcuts
      if (e.ctrlKey && !e.metaKey && !e.altKey) {
        const m = e.key.toLowerCase();
        const map = {
          'g': 'help', 'o': 'write', 'w': 'where', 'k': 'cut',
          't': 'exec', 'x': 'exit',  'r': 'read',  'u': 'paste',
          'j': 'justify',
        };
        // ^_ and ^\ and ^C — use raw key
        if (e.key === '_')   { e.preventDefault(); runCmd('goto'); return; }
        if (e.key === '\\')  { e.preventDefault(); runCmd('replace'); return; }
        if (m === 'c')       { e.preventDefault(); runCmd('loc'); return; }
        if (map[m])          { e.preventDefault(); runCmd(map[m]); return; }
      }

      // navigation
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 'j') {
        e.preventDefault(); setCursor(c => Math.min(lines.length - 1, c + 1));
      } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'k') {
        e.preventDefault(); setCursor(c => Math.max(0, c - 1));
      } else if (e.key === 'PageDown') {
        e.preventDefault(); setCursor(c => Math.min(lines.length - 1, c + 12));
      } else if (e.key === 'PageUp') {
        e.preventDefault(); setCursor(c => Math.max(0, c - 12));
      } else if (e.key === 'Home') {
        e.preventDefault(); setCursor(0);
      } else if (e.key === 'End') {
        e.preventDefault(); setCursor(lines.length - 1);
      } else if (e.key === 'Enter') {
        e.preventDefault(); activate(cursor);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const idx = FILE_ORDER.indexOf(path);
        const next = (idx + (e.shiftKey ? -1 : 1) + FILE_ORDER.length) % FILE_ORDER.length;
        openFile(FILE_ORDER[next]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exitOpen, helpOpen, showPicker, prompt, pickerIdx, cursor, lines, path, runCmd, activate, openFile]);

  // focus prompt input when opened
  useEffect(() => {
    if (prompt && promptRef.current) promptRef.current.focus();
  }, [prompt]);

  // ---- gutter content provider ----
  const gutter = useCallback((i) => String(i + 1).padStart(3, ' '), []);

  // ---- render ----
  const filename = '~/' + path;
  const titleCenter = (
    <span>
      <span style={{ opacity: 0.7 }}>File: </span>{filename}
    </span>
  );

  return (
    <div className="app-root">
      <div className="stage">
        <div className="bezel">
          <div className="screen">
            <div className="screen-inner">
              <div className="nano">
                <div className="bar inv title-bar">
                  <span className="l">  GNU nano {t.nanoVer}  </span>
                  <span className="c">{titleCenter}</span>
                  <span className="r">{modified ? 'Modified  ' : '  '}</span>
                </div>

                <NanoBuffer
                  lines={lines}
                  cursor={cursor}
                  setCursor={setCursor}
                  onActivate={activate}
                  lineNums={t.lineNums}
                  bodyRef={bodyRef}
                  gutterContent={gutter}
                />

                {prompt ? (
                  <div className="prompt">
                    <span className="label">
                      {prompt.kind === 'where'   ? 'Search:'         :
                       prompt.kind === 'goto'    ? 'Enter line nr:'  :
                       prompt.kind === 'replace' ? 'Search (to replace):' :
                       prompt.kind === 'exec'    ? 'Command to execute:'  : 'Input:'}
                    </span>
                    <input
                      ref={promptRef}
                      value={prompt.value}
                      onChange={(e) => setPrompt({ ...prompt, value: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter')  { e.preventDefault(); submitPrompt(); }
                        if (e.key === 'Escape') { e.preventDefault(); setPrompt(null); }
                      }}
                    />
                  </div>
                ) : (
                  <div className={`bar status ${statusInv ? 'inv' : ''} ${statusMsg ? '' : 'empty'}`}>
                    {statusMsg || '\u00a0'}
                  </div>
                )}

                <Shortcuts row={prompt ? SC_PROMPT_1 : SC_DEFAULT_1} onCmd={prompt ? (c) => {
                  if (c === 'confirm') submitPrompt(); else runCmd(c);
                } : runCmd} />
                <Shortcuts row={prompt ? SC_PROMPT_2 : SC_DEFAULT_2} onCmd={prompt ? (c) => {
                  if (c === 'cancel') setPrompt(null); else runCmd(c);
                } : runCmd} />

                {showPicker && (
                  <div className="picker">
                    <div className="label">^R  Insert file from buffer list — ↑/↓ + Enter (or 1-9)</div>
                    {FILE_ORDER.map((f, i) => (
                      <div
                        key={f}
                        className={`opt ${i === pickerIdx ? 'sel' : ''}`}
                        onMouseEnter={() => setPickerIdx(i)}
                        onClick={() => { openFile(f); setShowPicker(false); }}
                      >
                        <span>{i + 1}. {f}</span>
                        <span className="meta">{FILE_META[f]?.desc} · {FILES[f].length}L</span>
                      </div>
                    ))}
                  </div>
                )}

                {toast && <div className="toast">{toast}</div>}
                {helpOpen && <HelpOverlay onClose={() => setHelpOpen(false)} />}
                {exitOpen && <ExitOverlay onCancel={() => setExitOpen(false)} />}
              </div>
              <div className="glow"></div>
              <div className="scanlines"></div>
              <div className="vignette"></div>
              {!booted && <div className="boot-sweep"></div>}
            </div>
          </div>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Display" />
        <TweakRadio  label="Theme"
          value={t.theme}
          options={['classic', 'amber', 'matrix', 'solarized', 'dracula', 'paperwhite']}
          onChange={(v) => setTweak('theme', v)} />
        <TweakSelect label="Font"
          value={t.font}
          options={['JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro', 'VT323']}
          onChange={(v) => setTweak('font', v)} />
        <TweakSlider label="Font size"
          value={t.fontSize} min={11} max={22} step={1} unit="px"
          onChange={(v) => setTweak('fontSize', v)} />
        <TweakToggle label="Line numbers"
          value={t.lineNums}
          onChange={(v) => setTweak('lineNums', v)} />

        <TweakSection label="CRT" />
        <TweakSlider label="Scanlines"
          value={t.scan} min={0} max={0.45} step={0.01}
          onChange={(v) => setTweak('scan', v)} />
        <TweakSlider label="Phosphor glow"
          value={t.glow} min={0} max={0.18} step={0.005}
          onChange={(v) => setTweak('glow', v)} />

        <TweakSection label="3D" />
        <TweakToggle label="Bezel (monitor)"
          value={t.bezel}
          onChange={(v) => setTweak('bezel', v)} />
        <TweakRadio  label="Tilt"
          value={t.tilt}
          options={['off', 'subtle', 'dramatic']}
          onChange={(v) => setTweak('tilt', v)} />

        <TweakSection label="Meta" />
        <TweakText   label="nano version"
          value={t.nanoVer}
          onChange={(v) => setTweak('nanoVer', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
