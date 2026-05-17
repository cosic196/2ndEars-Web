/* landing.jsx — Direction B: "Big-Type Editorial"
   Massive wordmark + sentence-as-hero. Numbered sections like a manual.
   Generous whitespace. App screenshot drops in as one big horizontal card. */

// ─── Screenshot carousel ──────────────────────────────────────────────────────

const APP_SHOTS = [
  { src: 'assets/screenshot-routing.png',  label: 'ROUTING TAB'  },
  { src: 'assets/screenshot-analysis.png', label: 'ANALYSIS TAB' },
  { src: 'assets/screenshot-masking.png',  label: 'MASKING TAB'  },
];

function AppScreenshotCarousel() {
  const N = APP_SHOTS.length;
  const [idx, setIdx] = React.useState(0);
  const [animating, setAnimating] = React.useState(false);
  const [aspect, setAspect] = React.useState(null);
  const [lightbox, setLightbox] = React.useState(false);
  const [lbIdx, setLbIdx] = React.useState(0);
  const firstImgRef = React.useRef(null);

  React.useEffect(() => {
    const img = firstImgRef.current;
    if (img && img.complete && img.naturalWidth) {
      setAspect(img.naturalWidth / img.naturalHeight);
    }
  }, []);

  function onFirstLoad(e) {
    const { naturalWidth: w, naturalHeight: h } = e.target;
    if (w && h) setAspect(w / h);
  }

  function goTo(next) {
    if (animating || next === idx) return;
    setAnimating(true);
    setIdx(next);
    setTimeout(() => setAnimating(false), 520);
  }
  const prev = () => goTo((idx - 1 + N) % N);
  const next = () => goTo((idx + 1) % N);

  React.useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft')  setLbIdx(i => (i - 1 + N) % N);
      if (e.key === 'ArrowRight') setLbIdx(i => (i + 1) % N);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const swipeX = React.useRef(null);
  const onCarouselTouchStart = (e) => { swipeX.current = e.touches[0].clientX; };
  const onCarouselTouchEnd = (e) => {
    if (swipeX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? next() : prev();
  };

  const aspectRatio = aspect ? String(aspect) : '1442/722';

  return (
    <>
      <div className="row-between" style={{ marginBottom: 18 }}>
        <span className="mono-l">FIG · 1 · DESKTOP APP, {APP_SHOTS[idx].label}</span>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          className="screenshot-card"
          style={{ aspectRatio: aspectRatio }}
          onClick={() => { setLbIdx(idx); setLightbox(true); }}
          onTouchStart={onCarouselTouchStart}
          onTouchEnd={onCarouselTouchEnd}
        >
          <div
            className="screenshot-strip"
            style={{
              width: `${N * 100}%`,
              transform: `translateX(-${idx * (100 / N)}%)`,
            }}
          >
            {APP_SHOTS.map((shot, i) => (
              <img
                key={shot.src}
                ref={i === 0 ? firstImgRef : undefined}
                src={shot.src}
                alt={shot.label}
                className="screenshot-strip-img"
                style={{ width: `${100 / N}%` }}
                onLoad={i === 0 ? onFirstLoad : undefined}
                draggable={false}
              />
            ))}
          </div>

          <button
            className="screenshot-arrow screenshot-arrow--prev"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous screenshot"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="screenshot-arrow screenshot-arrow--next"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next screenshot"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="screenshot-hint screenshot-hint--desktop">click to enlarge · use arrows to switch</div>
          <div className="screenshot-hint screenshot-hint--touch">tap to enlarge · swipe to switch</div>
        </div>

        <div className="screenshot-dots">
          {APP_SHOTS.map((shot, i) => (
            <button
              key={i}
              className={`screenshot-dot${i === idx ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`View ${shot.label}`}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <AppScreenshotLightbox
          shots={APP_SHOTS}
          idx={lbIdx}
          setIdx={setLbIdx}
          onClose={() => setLightbox(false)}
          N={N}
        />
      )}
    </>
  );
}

function AppScreenshotLightbox({ shots, idx, setIdx, onClose, N }) {
  const [closing, setClosing] = React.useState(false);

  function close() {
    setClosing(true);
    setTimeout(onClose, 260);
  }

  const touchX = React.useRef(null);
  const touchY = React.useRef(null);
  function onTouchStart(e) {
    touchX.current = e.touches[0].clientX;
    touchY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    const dy = e.changedTouches[0].clientY - touchY.current;
    touchX.current = null; touchY.current = null;
    if (Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx)) { close(); return; }
    if (Math.abs(dx) < 40) return;
    setIdx(i => dx < 0 ? (i + 1) % N : (i - 1 + N) % N);
  }

  return (
    <div
      className={`screenshot-lb-backdrop${closing ? ' is-closing' : ''}`}
      onClick={close}
    >
      <button className="screenshot-lb-close" onClick={close} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
      <div
        className={`screenshot-lb-inner${closing ? ' is-closing' : ''}`}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={idx}
          src={shots[idx].src}
          alt={shots[idx].label}
          className="screenshot-lb-img"
          draggable={false}
        />
        <button
          className="screenshot-arrow screenshot-lb-arrow screenshot-arrow--prev"
          onClick={() => setIdx(i => (i - 1 + N) % N)}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="screenshot-arrow screenshot-lb-arrow screenshot-arrow--next"
          onClick={() => setIdx(i => (i + 1) % N)}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="screenshot-lb-caption">{shots[idx].label}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function LandingB() {
  return (
    <div className="site" style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      {/* ── Hero: huge wordmark / sentence ─────────────────────────────── */}
      <section className="hero-b-section" style={{ padding: '120px 32px 96px', borderBottom: '1px solid var(--site-line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 64, alignItems: 'end' }}>
            <div>
              <div className="row" style={{ gap: 14, marginBottom: 28 }}>
                <span className="logo-mark" style={{ width: 56, height: 56, color: 'var(--site-fg)' }} />
                <div className="stack-tight" style={{ gap: 2 }}>
                  <span className="mono-l">PUBLIC BETA</span>
                  <span style={{ fontSize: 12, color: 'var(--site-fg-2)' }}>An AI-assisted mixing toolkit.</span>
                </div>
              </div>
              <h1 style={{
                fontSize: 96, lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600,
                color: 'var(--site-fg)',
              }}>
                A second pair<br />
                of ears<br />
                <span style={{ color: 'var(--site-fg-3)', fontStyle: 'italic', fontWeight: 400 }}>that doesn't</span><br />
                <span style={{ color: 'var(--site-fg-3)', fontStyle: 'italic', fontWeight: 400 }}>get tired.</span>
              </h1>
            </div>
            <div className="stack" style={{ gap: 20, paddingBottom: 12 }}>
              <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--site-fg-1)', textWrap: 'pretty' }}>
                2ndEars sits in your DAW. It listens. It measures. It tells you what's really happening in your mix — grounded in numbers, not vibes. <span style={{ color: 'var(--site-fg)' }}>A local AI model runs on your machine.</span> Your audio never goes anywhere it doesn't already live.
              </p>
              <div className="dashed-hr" />
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 8, fontFamily: 'var(--font-mono)' }}>
                <span className="mono-l">STATUS</span><span style={{ fontSize: 12, color: 'var(--site-fg-1)' }}>Open beta · free</span>
                <span className="mono-l">RUNS ON</span><span style={{ fontSize: 12, color: 'var(--site-fg-1)' }}>Windows · macOS</span>
                <span className="mono-l">FORMATS</span><span style={{ fontSize: 12, color: 'var(--site-fg-1)' }}>VST3</span>
              </div>
              <DownloadButton size="md" align="left" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 01 What it is ──────────────────────────────────────────────── */}
      <section className="section" id="what">
        <div className="container">
          <SectionLabel n="01" title="What it is" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
            <p style={{ fontSize: 22, lineHeight: 1.35, color: 'var(--site-fg)', letterSpacing: '-0.015em', textWrap: 'balance' }}>
              A measurement-grounded mixing assistant. Not a preset, not a "smart" EQ. A second opinion you can ask questions of.
            </p>
            <div className="grid-3" style={{ gap: 32 }}>
              {VALUE_PROPS.map((p) => (
                <div key={p.label} className="stack" style={{ gap: 10 }}>
                  <span className="mono-l" style={{ color: 'var(--site-accent)' }}>{p.label}</span>
                  <h3 style={{ fontSize: 18, lineHeight: 1.25, color: 'var(--site-fg)' }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── App screenshot carousel ─────────────────────────────────────── */}
      <section className="section-narrow">
        <div className="container">
          <AppScreenshotCarousel />
        </div>
      </section>

      {/* ── 02 How it works ───────────────────────────────────────────── */}
      <section className="section" id="how" style={{ background: 'var(--site-bg-2)' }}>
        <div className="container">
          <SectionLabel n="02" title="How it works" subtitle="Three pieces · one system" />
          <div className="grid-3" style={{ gap: 24 }}>
            {HOW_IT_WORKS.map(s => (
              <div key={s.step} style={{ paddingTop: 16, borderTop: '1px solid var(--site-line)' }}>
                <div className="row-between" style={{ marginBottom: 18 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>{s.step}</span>
                  <span className="mono-l">{s.role}</span>
                </div>
                <h3 style={{ fontSize: 26, letterSpacing: '-0.02em', lineHeight: 1.2, color: 'var(--site-fg)', marginBottom: 12 }}>{s.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--site-fg-1)', marginBottom: 16 }}>{s.body}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                  {s.spec.map(t => (
                    <li key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--site-fg-2)', letterSpacing: '0.02em' }}>· {t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="plugin-pair-row" style={{ marginTop: 48, display: 'flex', gap: 24, justifyContent: 'center' }}>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}><LeftEarMock /></div>
            <div style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}><RightEarMock /></div>
          </div>
        </div>
      </section>

      {/* ── 03 Demo video ──────────────────────────────────────────────── */}
      {/* <section className="section">
        <div className="container">
          <SectionLabel n="03" title="See it work" subtitle="1:42 · audio on" />
          <VideoPlaceholder height={520} />
        </div>
      </section> */}

      {/* ── 04 Beginners + Pros ───────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--site-bg-2)' }}>
        <div className="container">
          <SectionLabel n="03" title="Built for both ends of the room" />
          <BeginnersAndProsInline />
        </div>
      </section>

      {/* ── 05 Privacy ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionLabel n="04" title="Privacy" subtitle="Offline by default" />
          <PrivacyInline />
        </div>
      </section>

      {/* ── 06 Features ────────────────────────────────────────────────── */}
      <section className="section" id="features" style={{ background: 'var(--site-bg-2)' }}>
        <div className="container">
          <SectionLabel n="05" title="Features" subtitle="Four engines · one chat" />
          <div style={{ borderTop: '1px solid var(--site-line)' }}>
            {FEATURES.map(([label, desc], i) => (
              <div key={label} style={{
                display: 'grid', gridTemplateColumns: '180px 1fr auto',
                padding: '20px 0', gap: 28,
                borderBottom: '1px solid var(--site-line)',
                alignItems: 'baseline',
              }}>
                <span className="mono-l" style={{ color: 'var(--site-fg)' }}>{label}</span>
                <span style={{ fontSize: 15, color: 'var(--site-fg-1)', lineHeight: 1.5 }}>{desc}</span>
                <span className="mono-tiny" style={{ color: 'var(--site-fg-3)' }}>{String(i + 1).padStart(2, '0')} / {String(FEATURES.length).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 Pricing ─────────────────────────────────────────────────── */}
      <section className="section" id="pricing">
        <div className="container">
          <SectionLabel n="06" title="Pricing" subtitle="Open beta · free to use" />
          <PricingInline />
        </div>
      </section>

      {/* ── 08 System requirements ──────────────────────────────────────── */}
      <section className="section-narrow" id="requirements">
        <div className="container">
          <SectionLabel n="07" title="System requirements" />
          <div className="grid-2" style={{ gap: 32 }}>
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--site-line)' }}>
              <span className="mono-l" style={{ display: 'block', marginBottom: 20 }}>MINIMUM</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 8 }}>
                <span className="mono-l">OS</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>Win 10+ · macOS 12+</span>
                <span className="mono-l">RAM</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>16 GB</span>
                <span className="mono-l">DISK</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>8 GB free</span>
              </div>
            </div>
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--site-line)' }}>
              <span className="mono-l" style={{ display: 'block', marginBottom: 20 }}>RECOMMENDED</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 18, rowGap: 8 }}>
                <span className="mono-l">OS</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>Win 11 · macOS 14+ (Apple Silicon)</span>
                <span className="mono-l">RAM</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>32 GB · or 16 GB + GTX 1060</span>
                <span className="mono-l">DISK</span>
                <span style={{ fontSize: 12, color: 'var(--site-fg-1)', fontFamily: 'var(--font-mono)' }}>8 GB free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WindowsWarningModal />
    </div>
  );
}

function SectionLabel({ n, title, subtitle }) {
  return (
    <div className="section-label" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40, alignItems: 'baseline', marginBottom: 40, paddingBottom: 18, borderBottom: '1px solid var(--site-line)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>§ {n}</span>
      <div className="row" style={{ gap: 16, justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: 38, letterSpacing: '-0.025em', color: 'var(--site-fg)', lineHeight: 1.1, fontWeight: 600 }}>{title}</h2>
        {subtitle && <span className="mono-l">{subtitle}</span>}
      </div>
    </div>
  );
}

function BeginnersAndProsInline() {
  return (
    <div className="grid-2" style={{ gap: 48 }}>
      <div className="stack" style={{ gap: 14 }}>
        <span className="mono-l label-accent">FOR BEGINNERS</span>
        <h3 style={{ fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>Learn the why behind every fader.</h3>
        <p style={{ fontSize: 15, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>
          Most mix tutorials tell you what to do. 2ndEars tells you <em style={{ fontStyle: 'normal', color: 'var(--site-fg)' }}>why</em> your mix sounds the way it does. Ask anything in plain English. The assistant cites the number it's looking at, so you walk away knowing what changed.
        </p>
        <div className="stack" style={{ marginTop: 8, gap: 8 }}>
          {[
            ['"Why does my kick feel weak?"', 'Sub at 60 Hz is masked by Bass DI at −7 dB.'],
            ['"Is my vocal too quiet?"', 'Vocal Lead is −4 LUFS below mix avg.'],
            ['"How do I tame the sibilance?"', 'Vocal energy 6–8 kHz is +3 dB over Pop ref.'],
          ].map(([q, a]) => (
            <div key={q} style={{ display: 'grid', gap: 4, padding: '14px 16px', background: 'var(--site-card)', border: '1px solid var(--site-line)', borderRadius: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--site-fg)' }}>{q}</span>
              <span style={{ fontSize: 12, color: 'var(--site-fg-2)', fontFamily: 'var(--font-mono)' }}>→ {a}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stack" style={{ gap: 14 }}>
        <span className="mono-l label-accent">FOR PROS</span>
        <h3 style={{ fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--site-fg)' }}>A second pair of ears that doesn't get tired.</h3>
        <p style={{ fontSize: 15, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>
          You've been mixing for six hours. Your ears are gone. 2ndEars surfaces what you stopped noticing — masking conflicts, dynamic-range drops, stereo imbalance on a vocal that drifted at hour three. No taste, no bias. Just measurements.
        </p>
        <div className="pro-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 8 }}>
          {[
            ['LUFS', '−14.2'],
            ['PEAK', '−1.0'],
            ['CREST', '11.4'],
            ['WIDTH', '0.62'],
            ['DR', '8.2'],
            ['MASKING', 'Low-end'],
          ].map(([k, v]) => (
            <div key={k} className="pro-metric-cell" style={{ padding: '12px 14px', background: 'var(--site-card)', border: '1px solid var(--site-line)', borderRadius: 6 }}>
              <div className="mono-l" style={{ fontSize: 9.5 }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: 'var(--site-fg)', marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PrivacyInline() {
  return (
    <div className="grid-2" style={{ gap: 56, alignItems: 'center' }}>
      <div className="stack-tight" style={{ gap: 16 }}>
        <p style={{ fontSize: 22, lineHeight: 1.4, color: 'var(--site-fg)', letterSpacing: '-0.012em' }}>
          Your stems never leave your machine. The assistant runs a local AI model. No cloud, no account, no telemetry.
        </p>
        <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>
          After install, 2ndEars works fully offline. On a plane, in a studio, anywhere. We can't see your audio because we never receive it.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gap: 8 }}>
          {['Local AI', 'No cloud sync', 'No accounts, no logins', 'Works on a plane'].map(t => (
            <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--site-fg-1)' }}>
              <span style={{ width: 14, height: 14, color: 'var(--site-accent)', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 10 10"><path d="M2 5 L4.2 7.2 L8 3" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <PrivacyDiagram />
    </div>
  );
}

function PricingInline() {
  return (
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
          <span style={{ fontSize: 64, fontWeight: 600, color: 'var(--site-fg)', letterSpacing: '-0.03em', lineHeight: 1 }}>Free</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--site-fg-1)', maxWidth: 460, marginTop: 6 }}>
          2ndEars is currently in an open beta program. Download it, use it, keep it — no license needed. Beta users keep their version forever.
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['No license required', 'No card required', 'Keep your beta version forever', 'Win 10+ · macOS 12+'].map(t => (
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
        <DownloadButton size="lg" align="center" />
      </div>
    </div>
  );
}

window.LandingB = LandingB;
