/* shared.jsx — atoms + copy used by all three landing directions. */

const EMAIL = 'info@2ndears.com';
const PRICE = '$99';
const TRIAL = '2-week free trial';
const BUY_URL = '#';        // wire to polar.sh later
const DOWNLOAD_URLS = {
  windows: 'https://github.com/cosic196/2ndEars-Web/releases/latest/download/2ndEars-Downloader.exe',
  macos:   'https://github.com/cosic196/2ndEars-Web/releases/latest/download/2ndEars-Downloader.dmg',
};
// Legacy alias — kept so any stray reference still resolves to something.
const DOWNLOAD_URL = DOWNLOAD_URLS.windows;

const PLATFORMS = {
  windows: { id: 'windows', label: 'Windows', short: 'Win',   ext: '.exe', req: 'Windows 10+' },
  macos:   { id: 'macos',   label: 'macOS',   short: 'macOS', ext: '.dmg', req: 'macOS 12+'   },
};

// ─── Platform detection ─────────────────────────────────────────────────────
function detectPlatform() {
  if (typeof navigator === 'undefined') return 'windows';
  const ua = (navigator.userAgent || '') + ' ' + (navigator.platform || '');
  if (/Mac|iPhone|iPad|iPod/i.test(ua)) return 'macos';
  return 'windows'; // default — the product is Win-first
}

// Global shared state for chosen platform + UI pattern. Lives on window so the
// modal + every button stay in sync via a tiny event-bus (no React context needed
// since handlers fire from anywhere).
window.__downloadState = window.__downloadState || {
  platform: detectPlatform(),       // 'windows' | 'macos'
  forcedPlatform: null,             // null = auto-detected; else override
  pattern: 'side-by-side',          // 'auto-toggle' | 'side-by-side' | 'picker-modal'
  listeners: new Set(),
};

function useDownloadState() {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    window.__downloadState.listeners.add(force);
    return () => window.__downloadState.listeners.delete(force);
  }, []);
  const st = window.__downloadState;
  return {
    platform: st.forcedPlatform || st.platform,
    forcedPlatform: st.forcedPlatform,
    pattern: st.pattern,
    setPlatform: (p) => { st.platform = p; st.listeners.forEach(fn => fn()); },
    setForcedPlatform: (p) => { st.forcedPlatform = p; st.listeners.forEach(fn => fn()); },
    setPattern: (p) => { st.pattern = p; st.listeners.forEach(fn => fn()); },
  };
}

// ─── Download gate ──────────────────────────────────────────────────────────
// 2ndEars is in open beta. The Windows build is unsigned (SmartScreen); the
// macOS build is signed but not notarized (Gatekeeper still warns). Every
// Download click opens a platform-aware modal that walks the user through
// the OS-specific warnings before the file starts downloading.
function handleDownloadClick(e, platformOverride) {
  if (e && e.preventDefault) e.preventDefault();
  if (platformOverride) {
    window.__downloadState.platform = platformOverride;
    window.__downloadState.forcedPlatform = null;
    window.__downloadState.listeners.forEach(fn => fn());
  }
  if (typeof window.__openDownloadModal === 'function') {
    window.__openDownloadModal();
  } else {
    const p = platformOverride || window.__downloadState.platform;
    window.location.href = DOWNLOAD_URLS[p] || DOWNLOAD_URLS.windows;
  }
}

// ─── Copy blocks ────────────────────────────────────────────────────────────
const VALUE_PROPS = [
  {
    label: 'IN YOUR DAW',
    title: 'Lives in your session.',
    body: 'Drop LeftEar and RightEar on any track or bus. The desktop app picks up routing, audio, and metadata. No re-export, no bouncing stems, no leaving your DAW.',
  },
  {
    label: 'OFFLINE',
    title: 'Never leaves your machine.',
    body: 'The mixing assistant runs a local model. No cloud, no account, no telemetry. Your sessions and stems stay on disk — yours.',
  },
  {
    label: 'UNBIASED',
    title: 'No taste, just measurements.',
    body: 'LUFS, peak, crest factor, 6-band balance, stereo width, transients, per-pair masking. The assistant grounds every suggestion in what it actually heard.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    name: 'LeftEar',
    role: 'VST plugin · per-bus',
    body: 'A single instance per bus. Captures audio plus routing metadata so the desktop app can rebuild your session graph.',
    spec: ['Sends audio to 2ndEars', 'VST3'],
  },
  {
    step: '02',
    name: 'RightEar',
    role: 'VST plugin · On each track',
    body: 'Pairs with LeftEar. Carries an optional 120-char track description so the assistant knows what it\'s listening to — "lead vocal, doubled, slight rasp" — not just "Audio 14".',
    spec: ['Track description (0/120)', 'Hint context for the assistant', 'VST3'],
  },
  {
    step: '03',
    name: '2ndEars',
    role: 'Desktop app · Win + macOS',
    body: 'Receives audio, rebuilds Sources → Buses → Master, runs analysis, and hosts the chat. Click any node to audition it in isolation. Ask anything in plain English.',
    spec: ['Routing · Analysis · Masking', 'Local AI'],
  },
];

const FEATURES = [
  ['ANALYSIS', 'LUFS, peak, crest factor, stereo width and transient density — measured per track. The full picture the AI assistant draws on.'],
  ['SPECTRAL BALANCE', '6-band energy breakdown for every track, so you can see exactly where each one sits in the spectrum.'],
  ['MASKING DETECTION', 'Finds common masking patterns — low-end conflicts, low-mid buildup, crowded mids, harsh highs, buried leads — names the tracks that collide, and suggests concrete EQ, compression, level and pan fixes for each.'],
  ['ROUTING GRAPH', 'Sources → buses → master, rebuilt straight from the plugins. Click any node to audition it, or see how many LU each source adds to the master.'],
  ['AI ASSISTANT', 'A mixing assistant that runs entirely on your machine. Every suggestion cites the exact measurement behind it.'],
  ];

const FAQ = [
  ['Does it use AI?', 'Yes — a local AI model running on your machine. Nothing is sent to a server.'],
  ['What about my stems?', 'Audio stays on disk. The plugins stream to the desktop app directly.'],
  ['Will it mix for me?', "No. It gives you a second opinion grounded in measurements. The mix is still yours."],
];

// ─── Atoms ──────────────────────────────────────────────────────────────────

function Logo({ size = 22 }) {
  return (
    <span className="brand" style={{ fontSize: size > 28 ? 22 : 15 }}>
      <span className="logo-mark" style={{ width: size, height: size, color: 'var(--site-fg)' }} />
      <span>2ndEars</span>
    </span>
  );
}

function NavBar({ accent = 'amber' }) {
  return (
    <nav className="site-nav">
      <div className="inner">
        <Logo />
        <div className="links">
          <a href="#what">What it is</a>
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a href={DOWNLOAD_URL} onClick={handleDownloadClick} className="btn btn-primary" style={{ padding: '7px 14px' }}>
          Download
        </a>
      </div>
    </nav>
  );
}

function BuyCta({ size = 'md', layout = 'inline' }) {
  const big = size === 'lg';
  const padding = big ? '14px 24px' : '11px 18px';
  const fontSize = big ? 14 : 13;
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      <a href={DOWNLOAD_URL} onClick={handleDownloadClick} className="btn btn-primary" style={{ padding, fontSize }}>
        Download · free open beta
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-foot">
      <div className="inner">
        <div className="foot-col" style={{ gap: 14 }}>
          <Logo />
          <div style={{ fontSize: 12, color: 'var(--site-fg-2)', maxWidth: 280 }}>
            An AI-assisted mixing toolkit. Lives in your DAW. Runs on your machine.
          </div>
        </div>
        <div className="foot-col">
          <span className="foot-meta">Download</span>
          <a href={DOWNLOAD_URL} onClick={handleDownloadClick} className="foot-email">Free open beta</a>
          <span style={{ fontSize: 11, color: 'var(--site-fg-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            No license required
          </span>
        </div>
        <div className="foot-col">
          <span className="foot-meta">Contact</span>
          <a href={`mailto:${EMAIL}`} className="foot-email">{EMAIL}</a>
          <span style={{ fontSize: 11, color: 'var(--site-fg-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            Support · feedback · feature requests
          </span>
        </div>
        <div className="foot-col" style={{ alignItems: 'flex-end' }}>
          <span className="foot-meta">BETA</span>
          <span style={{ fontSize: 11, color: 'var(--site-fg-3)', fontFamily: 'var(--font-mono)' }}>
            Windows · macOS · VST3
          </span>
          <span style={{ fontSize: 11, color: 'var(--site-fg-3)', fontFamily: 'var(--font-mono)' }}>
            © 2026 2ndEars
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Privacy callout (shared across all directions, with layout variants) ──
function PrivacyCallout({ variant = 'default' }) {
  if (variant === 'inverted') {
    return (
      <section className="section" style={{ background: 'var(--bg-0)', color: 'var(--fg-0)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div className="stack-tight" style={{ gap: 18 }}>
            <span className="mono-l label-accent">PRIVACY · OFFLINE BY DEFAULT</span>
            <h2 style={{ fontSize: 36, lineHeight: 1.15, letterSpacing: '-0.025em' }}>
              Your stems are <em style={{ fontStyle: 'normal', color: 'var(--signal)' }}>yours</em>. We never see them.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-1)', maxWidth: 540, lineHeight: 1.55 }}>
              The mixing assistant runs a local AI model on your machine. No internet connection is required after install. No account. No telemetry. No data ever leaves your computer — not your audio, not your prompts, not your sessions.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'grid', gap: 6 }}>
              {['Local LLM', 'No cloud sync', 'No accounts, no logins', 'Works on a plane'].map(t => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--fg-1)' }}>
                  <span style={{ width: 14, height: 14, color: 'var(--signal)' }}>
                    <svg width="14" height="14" viewBox="0 0 10 10"><path d="M2 5 L4.2 7.2 L8 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ position: 'relative' }}>
            <PrivacyDiagram />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section">
      <div className="container">
        <div className="card" style={{ padding: '48px 48px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div className="stack-tight" style={{ gap: 18 }}>
            <span className="mono-l label-accent">PRIVACY · OFFLINE BY DEFAULT</span>
            <h2 style={{ fontSize: 30, lineHeight: 1.15, letterSpacing: '-0.025em', color: 'var(--site-fg)' }}>
              Your stems never leave your machine.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--site-fg-1)', lineHeight: 1.55 }}>
              The assistant runs a local AI model. No cloud, no account, no telemetry. After install, 2ndEars works fully offline — on a plane, in a studio, anywhere. We never see your audio because we never receive it.
            </p>
          </div>
          <PrivacyDiagram />
        </div>
      </div>
    </section>
  );
}

function PrivacyDiagram() {
  // Abstract: a closed signal loop contained inside a boundary. Outside the
  // boundary, faded unreachable nodes hint at "the cloud" without ever
  // touching the inside. No text.
  const LOOP = 'M 220 50 C 320 50, 380 110, 380 170 C 380 230, 320 290, 220 290 C 120 290, 60 230, 60 170 C 60 110, 120 50, 220 50 Z';
  return (
    <svg viewBox="0 0 440 340" width="100%" style={{ display: 'block', maxHeight: 340 }} aria-hidden="true">
      <defs>
        <linearGradient id="pd-loop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--site-line-1)" />
          <stop offset="60%" stopColor="var(--site-accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--site-line-1)" />
        </linearGradient>
        <radialGradient id="pd-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--site-accent)" stopOpacity="0.22" />
          <stop offset="60%" stopColor="var(--site-accent)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--site-accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pd-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--site-accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--site-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer "elsewhere" — faint unreachable nodes, never touching the loop. */}
      {[[24, 30], [410, 38], [22, 300], [414, 308], [220, 18], [220, 322]].map(([cx, cy], i) => (
        <g key={i} opacity="0.42">
          <circle cx={cx} cy={cy} r="5" fill="none" stroke="var(--site-line-1)" strokeDasharray="2 2" />
          <circle cx={cx} cy={cy} r="1.4" fill="var(--site-fg-3)" />
        </g>
      ))}
      {/* Connector stubs from those outer nodes that fade out before reaching the loop. */}
      {[[24, 30, 80, 86], [410, 38, 360, 92], [22, 300, 80, 248], [414, 308, 360, 250]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--site-line)" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
      ))}

      {/* Soft halo behind the boundary — the "warmth" of the machine. */}
      <circle cx="220" cy="170" r="160" fill="url(#pd-halo)" />

      {/* Boundary: closed loop carrying signal. */}
      <path d={LOOP} fill="color-mix(in oklch, var(--site-accent) 3%, transparent)"
        stroke="url(#pd-loop)" strokeWidth="1.3" />

      {/* Inner concentric trace — a quieter second ring inside. */}
      <path d="M 220 90 C 290 90, 340 130, 340 170 C 340 210, 290 250, 220 250 C 150 250, 100 210, 100 170 C 100 130, 150 90, 220 90 Z"
        fill="none" stroke="var(--site-line)" strokeWidth="0.8" opacity="0.5" />

      {/* Four anchor nodes sitting on the boundary. */}
      {[[220, 50], [380, 170], [220, 290], [60, 170]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="8" fill="var(--site-card)" stroke="var(--site-line-1)" />
          <circle cx={cx} cy={cy} r="2.2" fill="var(--site-fg-1)" />
        </g>
      ))}

      {/* Center core — pulsing soft, then a hard amber dot. */}
      <circle cx="220" cy="170" r="36" fill="url(#pd-core)">
        <animate attributeName="r" values="32;42;32" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.85;0.5;0.85" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="220" cy="170" r="5" fill="var(--site-accent)">
        <animate attributeName="opacity" values="1;0.55;1" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Signal dot traveling around the closed loop — the audio that stays inside. */}
      <circle r="4" fill="var(--site-accent)">
        <animateMotion dur="7s" repeatCount="indefinite" path={LOOP} />
      </circle>
      <circle r="4" fill="var(--site-accent)" opacity="0.5">
        <animateMotion dur="7s" repeatCount="indefinite" begin="-3.5s" path={LOOP} />
      </circle>
    </svg>
  );
}

// ─── Pricing card ──────────────────────────────────────────────────────────
function PricingCard({ id = 'pricing' }) {
  return (
    <section className="section" id={id}>
      <div className="container-narrow">
        <div className="section-head" style={{ textAlign: 'center', alignItems: 'center' }}>
          <span className="mono-l section-eyebrow">PRICING</span>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Open beta. Free to use.</h2>
        </div>
        <div className="card" style={{
          padding: '40px 48px',
          display: 'grid', gridTemplateColumns: '1fr auto',
          alignItems: 'center', gap: 40,
        }}>
          <div className="stack-tight" style={{ gap: 12 }}>
            <div className="row" style={{ gap: 10 }}>
              <span className="chip"><span className="chip-dot" /> OPEN BETA · NO LICENSE REQUIRED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontFamily: 'var(--font-mono)' }}>
              <span style={{ fontSize: 56, fontWeight: 600, color: 'var(--site-fg)', letterSpacing: '-0.03em', lineHeight: 1 }}>Free</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--site-fg-1)', maxWidth: 440, marginTop: 6 }}>
              2ndEars is currently in an open beta program. Download it, use it, keep it — no license needed. Beta users keep their version forever.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gap: 8 }}>
              {[
                'No license required',
                'No card required',
                'Keep your beta version forever',
                'Windows 10+ · macOS 12+',
              ].map(t => (
                <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--site-fg-1)' }}>
                  <span style={{ width: 14, height: 14, color: 'var(--site-accent)', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 10 10"><path d="M2 5 L4.2 7.2 L8 3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="stack-tight" style={{ gap: 10, alignItems: 'stretch', minWidth: 240 }}>
            <a href={DOWNLOAD_URL} onClick={handleDownloadClick} className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px 20px', fontSize: 14 }}>
              Download · free open beta
            </a>
            <WindowsWarningNote />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Feature list (compact two-col) ────────────────────────────────────────
function FeatureList({ id = 'features' }) {
  return (
    <section className="section" id={id} style={{ background: 'var(--site-bg-2)' }}>
      <div className="container">
        <div className="section-head">
          <span className="mono-l section-eyebrow">FEATURES</span>
          <h2 className="section-title">What's in the app.</h2>
          <p className="section-lede">Six measurement engines, one chat interface, and a routing graph that mirrors your session. Built for producers who already know what a crest factor is.</p>
        </div>
        <div style={{ borderTop: '1px solid var(--site-line)' }}>
          {FEATURES.map(([label, desc], i) => (
            <div key={label} style={{
              display: 'grid', gridTemplateColumns: '180px 1fr auto',
              padding: '20px 0', gap: 28,
              borderBottom: '1px solid var(--site-line)',
              alignItems: 'center',
            }}>
              <span className="mono-l" style={{ color: 'var(--site-fg)' }}>{label}</span>
              <span style={{ fontSize: 15, color: 'var(--site-fg-1)', lineHeight: 1.5 }}>{desc}</span>
              <span className="mono-tiny" style={{ color: 'var(--site-fg-3)' }}>{String(i + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Beginners + Pros block ────────────────────────────────────────────────
function BeginnersAndPros() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid-2" style={{ gap: 24 }}>
          <div className="card-flat" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="mono-l">FOR BEGINNERS</span>
            <h3 style={{ fontSize: 22, lineHeight: 1.25, color: 'var(--site-fg)' }}>Learn the why behind every fader.</h3>
            <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>
              Most mix tutorials tell you what to do. 2ndEars tells you <em style={{ fontStyle: 'normal', color: 'var(--site-fg)' }}>why</em> your mix sounds the way it does — which frequencies are fighting, which tracks are buried, where the dynamics collapse. Ask anything. The assistant cites the number it's looking at.
            </p>
            <div style={{ marginTop: 8, display: 'grid', gap: 10 }}>
              {[
                ['"Why does my kick feel weak?"', 'Sub at 60 Hz is fighting bass DI.'],
                ['"Is my vocal too quiet?"', 'Vocal Lead is −4 LUFS below mix avg.'],
              ].map(([q, a]) => (
                <div key={q} style={{ display: 'grid', gap: 4, padding: '12px 14px', background: 'var(--site-card)', border: '1px solid var(--site-line)', borderRadius: 6 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--site-fg)' }}>{q}</span>
                  <span style={{ fontSize: 12, color: 'var(--site-fg-2)', fontFamily: 'var(--font-mono)' }}>→ {a}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-flat" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span className="mono-l">FOR PROS</span>
            <h3 style={{ fontSize: 22, lineHeight: 1.25, color: 'var(--site-fg)' }}>A second pair of ears that doesn't get tired.</h3>
            <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>
              You've been on the mix for six hours. Your ears are gone. 2ndEars surfaces what you stopped noticing — masking conflicts, dynamic-range drops on the master bus, stereo imbalance on a vocal that drifted at hour three. No taste, no bias. Just measurements.
            </p>
            <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                ['LUFS', '−14.2'],
                ['CREST', '11.4'],
                ['MASKING', '3 high'],
              ].map(([k, v]) => (
                <div key={k} style={{ padding: '12px 14px', background: 'var(--site-card)', border: '1px solid var(--site-line)', borderRadius: 6, textAlign: 'left' }}>
                  <div className="mono-l" style={{ fontSize: 9.5 }}>{k}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: 'var(--site-fg)', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── OS picker (segmented toggle) ──────────────────────────────────────────
function OSGlyph({ id, size = 12 }) {
  if (id === 'macos') {
    return (
      <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M6 4.2 Q6 2 7.6 2 Q9.2 2 9.2 3.5 Q9.2 5 7.6 5 H4.4 Q2.8 5 2.8 6.5 Q2.8 8 4.4 8 Q6 8 6 5.8 V4.2 Z M6 4.2 Q6 5.8 6 7.4" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <circle cx="6" cy="6" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  // windows — 4-pane glyph
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="1.8" y="1.8" width="3.6" height="3.6" fill="currentColor" opacity="0.85" />
      <rect x="6.6" y="1.8" width="3.6" height="3.6" fill="currentColor" opacity="0.85" />
      <rect x="1.8" y="6.6" width="3.6" height="3.6" fill="currentColor" opacity="0.85" />
      <rect x="6.6" y="6.6" width="3.6" height="3.6" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function OSSwitch({ value, onChange, size = 'md' }) {
  const compact = size === 'sm';
  return (
    <div className={`os-switch ${compact ? 'os-switch--sm' : ''}`} role="tablist" aria-label="Choose platform">
      {['windows', 'macos'].map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={active}
            className={`os-switch__btn ${active ? 'is-active' : ''}`}
            onClick={(e) => { e.preventDefault(); onChange(p); }}
          >
            <OSGlyph id={p} size={compact ? 10 : 11} />
            <span>{PLATFORMS[p].label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── DownloadButton: the unified CTA used by hero / pricing / nav ──────────
// Patterns (switchable via Tweaks):
//   • 'auto-toggle'    — primary button labeled "Download for <OS>" with a
//                        small OS toggle directly under it.
//   • 'side-by-side'   — two equal buttons: "Download for Windows" / "...macOS".
//   • 'picker-modal'   — single neutral "Download" button; modal asks platform first.
function DownloadButton({ size = 'md', variant = 'primary', showHint = true, align = 'center', forcePattern, hideToggle = false }) {
  const { platform, setPlatform, pattern } = useDownloadState();
  const usePattern = forcePattern || pattern;
  const big = size === 'lg';
  const padding = big ? '14px 22px' : (size === 'sm' ? '8px 14px' : '11px 18px');
  const fontSize = big ? 14 : (size === 'sm' ? 12.5 : 13);
  const btnClass = `btn ${variant === 'primary' ? 'btn-primary' : ''}`;

  if (usePattern === 'side-by-side') {
    return (
      <div className="dl-cta-wrap" style={{ alignItems: align === 'left' ? 'flex-start' : 'stretch' }}>
        <div className="dl-side-row">
          {['windows', 'macos'].map((p) => (
            <a
              key={p}
              href={DOWNLOAD_URLS[p]}
              onClick={(e) => handleDownloadClick(e, p)}
              className={`btn ${p === platform ? 'btn-primary' : ''}`}
              style={{ padding, fontSize, justifyContent: 'center', gap: 9 }}
            >
              <OSGlyph id={p} size={13} />
              <span>Download for {PLATFORMS[p].label}</span>
            </a>
          ))}
        </div>
        {showHint && <DownloadHint align={align} />}
      </div>
    );
  }

  if (usePattern === 'picker-modal') {
    return (
      <div className="dl-cta-wrap" style={{ alignItems: align === 'left' ? 'flex-start' : 'stretch' }}>
        <a
          href={DOWNLOAD_URLS[platform]}
          onClick={(e) => handleDownloadClick(e)}
          className={btnClass}
          style={{ padding, fontSize, justifyContent: 'center' }}
        >
          Download · free open beta
        </a>
        {showHint && <DownloadHint align={align} />}
      </div>
    );
  }

  // auto-toggle (default): big button labeled with detected OS + toggle below
  return (
    <div className="dl-cta-wrap" style={{ alignItems: align === 'left' ? 'flex-start' : 'stretch' }}>
      <a
        href={DOWNLOAD_URLS[platform]}
        onClick={(e) => handleDownloadClick(e, platform)}
        className={btnClass}
        style={{ padding, fontSize, justifyContent: 'center', gap: 9 }}
      >
        <OSGlyph id={platform} size={big ? 15 : 13} />
        <span>Download for {PLATFORMS[platform].label}</span>
        <span style={{ opacity: 0.6, fontWeight: 500 }}>· free open beta</span>
      </a>
      {!hideToggle && (
        <div className="dl-os-row" style={{ justifyContent: align === 'left' ? 'flex-start' : 'center' }}>
          <span className="mono-tiny" style={{ color: 'var(--site-fg-3)' }}>OR</span>
          <OSSwitch value={platform} onChange={(p) => setPlatform(p)} size="sm" />
        </div>
      )}
      {showHint && <DownloadHint align={align} />}
    </div>
  );
}

// ─── Inline "warning" hint under each Download button ──────────────────────
function DownloadHint({ align = 'center' }) {
  const { platform } = useDownloadState();
  const copy = platform === 'macos'
    ? 'Signed beta · how to skip the macOS Gatekeeper warning'
    : 'Unsigned beta · how to skip the Windows warning';
  return (
    <button
      type="button"
      className="dl-warn-link"
      onClick={(e) => handleDownloadClick(e)}
      style={{ justifyContent: align === 'left' ? 'flex-start' : 'center' }}
    >
      <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M6 1 L11 10.5 L1 10.5 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <path d="M6 5 V7.5 M6 9 v0.1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
      <span>{copy}</span>
    </button>
  );
}

// Back-compat alias — landing.jsx imports it by this name.
const WindowsWarningNote = DownloadHint;

// ─── Pre-download modal — platform-aware ───────────────────────────────────
// One modal handles both OSes. The platform tabs at the top let the user
// switch; the step list rewrites in place. Mounts once at the page root.
function DownloadModal() {
  const [open, setOpen] = React.useState(false);
  const { platform, setPlatform } = useDownloadState();

  React.useEffect(() => {
    window.__openDownloadModal = () => setOpen(true);
    return () => { delete window.__openDownloadModal; };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  const close = () => setOpen(false);
  const proceed = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setOpen(false);
    setTimeout(() => { window.location.href = DOWNLOAD_URLS[platform]; }, 60);
  };

  const isMac = platform === 'macos';

  return (
    <div className="dl-modal-backdrop" onClick={close}>
      <div
        className="dl-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dl-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="dl-modal-close" onClick={close} aria-label="Close">×</button>

        <div className="dl-modal-platform">
          <span className="mono-l" style={{ color: 'var(--site-fg-3)' }}>PLATFORM</span>
          <OSSwitch value={platform} onChange={setPlatform} />
        </div>

        <span className="mono-l label-accent">
          {isMac ? 'HEADS UP · MACOS GATEKEEPER' : 'HEADS UP · WINDOWS SMARTSCREEN'}
        </span>
        <h2 id="dl-modal-title" className="dl-modal-title">
          {isMac
            ? "Your Mac will warn you. That's expected."
            : "Windows will warn you. That's expected."}
        </h2>
        <p className="dl-modal-lede">
          {isMac ? (
            <>2ndEars is in open beta. The build is code-signed but not yet notarized,
            so Gatekeeper will warn that Apple <em>"cannot check it for malicious software"</em>.
            It's safe to install — here's how to get past the warning on any macOS version.</>
          ) : (
            <>2ndEars is in open beta and not yet code-signed, so Windows will flag it as
            coming from an "unknown publisher". It's safe to install — here's how to
            get past the two warnings you'll see.</>
          )}
        </p>

        {isMac ? (
          <ol className="dl-steps">
            <li>
              <span className="dl-step-n">1</span>
              <div className="dl-step-body">
                <h3>Open the .dmg, drag 2ndEars to Applications</h3>
                <p>Double-click the downloaded <strong>2ndEars-Downloader.dmg</strong>,
                then drag the <strong>2ndEars</strong> icon onto the <strong>Applications</strong> folder shortcut inside the window.</p>
              </div>
            </li>
            <li>
              <span className="dl-step-n">2</span>
              <div className="dl-step-body">
                <h3>First launch — right-click → Open</h3>
                <p>Open <strong>Applications</strong>, <strong>right-click</strong> (or Control-click)
                <em> 2ndEars</em>, choose <strong>Open</strong>, then click <strong>Open</strong> again
                in the dialog that appears. <span style={{ color: 'var(--site-fg-3)' }}>You only need to do this once.</span></p>
              </div>
            </li>
            <li>
              <span className="dl-step-n">3</span>
              <div className="dl-step-body">
                <h3>On macOS Sequoia (15) or later</h3>
                <p>Apple removed the right-click shortcut. Instead, try to open 2ndEars normally
                (Gatekeeper will block it), then open <strong>System Settings → Privacy &amp; Security</strong>,
                scroll down to <em>"2ndEars was blocked from use…"</em> and click <strong>Open Anyway</strong>.</p>
              </div>
            </li>
          </ol>
        ) : (
          <ol className="dl-steps">
            <li>
              <span className="dl-step-n">1</span>
              <div className="dl-step-body">
                <h3>Your browser may flag the download</h3>
                <p>
                  If Chrome or Edge says <em>"this file isn't commonly downloaded"</em>,
                  click <strong>Keep</strong> (Chrome) or the <strong>⋯ menu → Keep</strong> (Edge).
                </p>
              </div>
            </li>
            <li>
              <span className="dl-step-n">2</span>
              <div className="dl-step-body">
                <h3>SmartScreen appears when you run the installer</h3>
                <p>
                  You'll see <em>"Windows protected your PC"</em>. Click the small
                  <strong> More info</strong> link, then the <strong>Run anyway</strong> button
                  that appears.
                </p>
              </div>
            </li>
            <li>
              <span className="dl-step-n">3</span>
              <div className="dl-step-body">
                <h3>UAC will ask for permission</h3>
                <p>Windows asks whether to allow changes for the install. Click <strong>Yes</strong>.</p>
              </div>
            </li>
          </ol>
        )}

        <p className="dl-modal-fine">
          {isMac
            ? 'Apple notarization is on the roadmap before 1.0. For now, the macOS beta stays un-notarized so we can ship updates quickly.'
            : 'A signing certificate is on the roadmap before 1.0. For now, the Windows beta stays unsigned so we can ship updates quickly.'}
        </p>

        <div className="dl-modal-actions">
          <button type="button" className="btn btn-ghost" onClick={close}>Cancel</button>
          <a className="btn btn-primary" href={DOWNLOAD_URLS[platform]} onClick={proceed} style={{ gap: 9 }}>
            <OSGlyph id={platform} size={13} />
            <span>Got it · Download {PLATFORMS[platform].ext}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Back-compat alias — landing.jsx mounts this name at the page root.
const WindowsWarningModal = DownloadModal;

Object.assign(window, {
  EMAIL, PRICE, TRIAL, BUY_URL, DOWNLOAD_URL, DOWNLOAD_URLS, PLATFORMS,
  VALUE_PROPS, HOW_IT_WORKS, FEATURES, FAQ,
  Logo, NavBar, BuyCta, Footer,
  PrivacyCallout, PrivacyDiagram, PricingCard, FeatureList, BeginnersAndPros,
  WindowsWarningModal, WindowsWarningNote, DownloadModal, DownloadHint,
  DownloadButton, OSSwitch, OSGlyph,
  detectPlatform, useDownloadState, handleDownloadClick,
});
