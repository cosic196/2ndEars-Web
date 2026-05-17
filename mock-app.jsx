/* mock-app.jsx — visual recreations of the 2ndEars desktop app + plugins.
   Used inline in landing pages as "screenshot placeholders" that still feel
   like real product imagery. Each component renders pure SVG/HTML at a
   fixed virtual width; scale via CSS transform when needed. */

const { useState, useEffect } = React;

// ─── Meter cells — driven by a peak (0..1) ─────────────────────────────────
function MeterCells({ peak = 0.7, count = 22 }) {
  const cells = [];
  for (let i = 0; i < count; i++) {
    const t = (i + 1) / count;
    let cls = 'meter-cell';
    if (t <= peak) {
      if (t < 0.55) cls += ' on-green';
      else if (t < 0.85) cls += ' on-amber';
      else cls += ' on-red';
    }
    cells.push(<span key={i} className={cls} />);
  }
  return <div className="meter-cells">{cells}</div>;
}

// ─── Letter badge (from the plugin screenshot) ─────────────────────────────
function LetterBadge({ letter = 'L', side = 'LEFT' }) {
  return (
    <div style={{
      width: 70, height: 70, borderRadius: 6,
      background: 'oklch(0.18 0.008 60)',
      border: '1px solid oklch(0.30 0.008 60)',
      position: 'relative',
      backgroundImage: 'linear-gradient(oklch(0.24 0.008 60 / .25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.24 0.008 60 / .25) 1px, transparent 1px)',
      backgroundSize: '8px 8px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 6, left: 6,
        fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em',
        color: 'var(--fg-2)', textTransform: 'uppercase'
      }}>{side}</div>
      <div style={{
        position: 'absolute', top: 8, right: 8,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--signal)',
        boxShadow: '0 0 8px var(--signal)'
      }} />
      <div style={{
        fontFamily: 'var(--font-mono)', fontWeight: 700,
        fontSize: 38, color: 'var(--signal)',
        textShadow: '0 0 12px color-mix(in oklch, var(--signal) 35%, transparent)',
      }}>{letter}</div>
    </div>
  );
}

// ─── Plugin window mock — chrome + content ──────────────────────────────────
function PluginWindow({ name = 'LeftEar/GROUP', side = 'LEFTEAR', children, style }) {
  return (
    <div style={{
      width: 380, borderRadius: 4,
      background: 'oklch(0.155 0.005 60)',
      border: '1px solid oklch(0.32 0.008 60)',
      boxShadow: '0 24px 48px -16px rgba(0,0,0,.55), 0 0 0 1px oklch(0.22 0.006 60)',
      overflow: 'hidden',
      fontFamily: 'var(--font-ui)',
      ...style,
    }}>
      {/* DAW host titlebar */}
      <div style={{
        height: 22,
        background: 'linear-gradient(oklch(0.92 0.005 60), oklch(0.82 0.005 60))',
        borderBottom: '1px solid oklch(0.55 0.005 60)',
        display: 'flex', alignItems: 'center',
        padding: '0 6px 0 10px', gap: 6,
        fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'oklch(0.18 0.005 60)'
      }}>
        <span style={{ flex: 1 }}>{name}</span>
        <span style={{
          width: 18, height: 14, background: '#c54a3a', borderRadius: 2,
          color: '#fff', fontSize: 11, lineHeight: '14px', textAlign: 'center'
        }}>×</span>
      </div>
      {/* Plugin header */}
      <div style={{
        height: 30, padding: '0 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid oklch(0.22 0.006 60)'
      }}>
        <span className="logo-mark" style={{ width: 14, height: 14, color: 'var(--fg-1)' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-0)' }}>2ndEars</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>{side}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function LeftEarMock({ peak = 0.74 }) {
  return (
    <PluginWindow name="LeftEar/GROUP" side="LEFTEAR">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <LetterBadge letter="L" side="LEFT" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono-l" style={{ marginBottom: 6, color: 'var(--fg-2)' }}>INPUT</div>
          <MeterCells peak={peak} count={24} />
        </div>
      </div>
      <div style={{
        marginTop: 16, paddingTop: 14, borderTop: '1px solid oklch(0.22 0.006 60)',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg-0)' }}>Master Bus</div>
          <div style={{ fontSize: 11, color: 'var(--fg-2)', marginTop: 2 }}>Enable on master track only</div>
        </div>
        <div style={{
          width: 36, height: 18, borderRadius: 9,
          background: 'oklch(0.24 0.006 60)',
          border: '1px solid oklch(0.30 0.008 60)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: 1, left: 1,
            width: 14, height: 14, borderRadius: '50%',
            background: 'oklch(0.55 0.006 60)'
          }} />
        </div>
        <div className="mono-l">OFF</div>
      </div>
    </PluginWindow>
  );
}

function RightEarMock({ peak = 0.82 }) {
  return (
    <PluginWindow name="RightEar/GROUP" side="RIGHTEAR">
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <LetterBadge letter="R" side="RIGHT" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mono-l" style={{ marginBottom: 6, color: 'var(--fg-2)' }}>INPUT</div>
          <MeterCells peak={peak} count={24} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span className="dot-signal" />
            <span style={{ fontSize: 11, color: 'var(--fg-1)' }}>Sending</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <div className="row-between" style={{ marginBottom: 6 }}>
          <span className="mono-l">TRACK DESCRIPTION</span>
          <span className="mono-l" style={{ color: 'var(--fg-3)' }}>OPTIONAL</span>
        </div>
        <div style={{
          background: 'oklch(0.12 0.005 60)',
          border: '1px solid oklch(0.22 0.006 60)',
          borderRadius: 4, padding: '10px 12px',
          fontSize: 11.5, lineHeight: 1.45,
          color: 'var(--fg-3)', fontStyle: 'italic',
          minHeight: 56,
        }}>e.g. Lead vocal, doubled, slight rasp — sits front and centre.</div>
        <div className="row-between" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 10.5, color: 'var(--fg-3)' }}>Helps the assistant reason about this track</span>
          <span className="mono-tiny" style={{ color: 'var(--signal)' }}>0/120</span>
        </div>
      </div>
    </PluginWindow>
  );
}

// ─── Routing graph illustration ─────────────────────────────────────────────
// A simplified, hero-friendly version of the actual app routing graph.
function RoutingGraphIllustration({ active = 'Master', height = 320 }) {
  const sources = ['Kick', 'Snare', 'OH L/R', 'Bass DI', 'Vocal Lead', 'Gtr Rhythm'];
  const buses = ['Drum Bus', 'Bass Bus', 'Vox Bus', 'Gtr Bus'];
  const edgesS2B = {
    'Kick': 'Drum Bus', 'Snare': 'Drum Bus', 'OH L/R': 'Drum Bus',
    'Bass DI': 'Bass Bus',
    'Vocal Lead': 'Vox Bus',
    'Gtr Rhythm': 'Gtr Bus',
  };

  const colW = 200;
  const gap = 80;
  const totalW = colW * 3 + gap * 2;
  const yPad = 24;
  const itemH = 38;
  const itemGap = 10;

  const ySrc = (i) => yPad + i * (itemH + itemGap);
  const yBus = (i) => yPad + 30 + i * ((sources.length * (itemH + itemGap)) / buses.length - itemGap / 2);
  const xCol = (c) => c * (colW + gap);

  return (
    <svg viewBox={`0 0 ${totalW} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.30 0.008 60)" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="wire-cool" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.30 0.008 60)" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.5" />
        </linearGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Column labels */}
      {['SOURCES', 'BUS · L1', 'MASTER'].map((l, i) => (
        <text key={l} x={xCol(i)} y={12} fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--fg-2)" letterSpacing="1">{l}</text>
      ))}

      {/* Wires sources → buses */}
      {sources.map((s, i) => {
        const bIdx = buses.indexOf(edgesS2B[s]);
        const y1 = ySrc(i) + itemH / 2;
        const y2 = yBus(bIdx) + itemH / 2;
        const x1 = xCol(0) + colW;
        const x2 = xCol(1);
        const mid = (x1 + x2) / 2;
        return (
          <path key={s} d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
            stroke="url(#wire-cool)" strokeWidth="1.2" fill="none" opacity="0.55" />
        );
      })}

      {/* Wires buses → master */}
      {buses.map((b, i) => {
        const y1 = yBus(i) + itemH / 2;
        const y2 = height / 2;
        const x1 = xCol(1) + colW;
        const x2 = xCol(2);
        const mid = (x1 + x2) / 2;
        const isActive = b === 'Drum Bus';
        return (
          <path key={b} d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
            stroke={isActive ? 'url(#wire)' : 'url(#wire-cool)'}
            strokeWidth={isActive ? 1.5 : 1.2}
            fill="none"
            opacity={isActive ? 0.95 : 0.55}
            filter={isActive ? 'url(#glow)' : ''} />
        );
      })}

      {/* Source nodes */}
      {sources.map((s, i) => (
        <g key={s} transform={`translate(${xCol(0)}, ${ySrc(i)})`}>
          <rect width={colW} height={itemH} rx="6" fill="var(--bg-2)" stroke="var(--line-0)" />
          <rect width="3" height={itemH} rx="1.5" fill="var(--node-src)" />
          <text x="14" y={itemH / 2 + 4} fontFamily="var(--font-ui)" fontSize="12" fontWeight="500" fill="var(--fg-0)">{s}</text>
          <text x={colW - 14} y={itemH / 2 + 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)">−{(15 + i * 1.4).toFixed(1)}</text>
        </g>
      ))}

      {/* Bus nodes */}
      {buses.map((b, i) => {
        const isActive = b === 'Drum Bus';
        return (
          <g key={b} transform={`translate(${xCol(1)}, ${yBus(i)})`}>
            <rect width={colW} height={itemH} rx="6"
              fill={isActive ? 'color-mix(in oklch, var(--signal) 8%, var(--bg-2))' : 'var(--bg-2)'}
              stroke={isActive ? 'var(--signal)' : 'var(--line-0)'}
              strokeWidth={isActive ? 1 : 1} />
            <rect width="3" height={itemH} rx="1.5" fill="var(--node-bus)" />
            <text x="14" y={itemH / 2 + 4} fontFamily="var(--font-ui)" fontSize="12" fontWeight="500" fill="var(--fg-0)">{b}</text>
            {isActive && (
              <circle cx={colW - 14} cy={itemH / 2} r="3.5" fill="var(--signal)">
                <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}

      {/* Master node */}
      <g transform={`translate(${xCol(2)}, ${height / 2 - itemH / 2})`}>
        <rect width={colW} height={itemH} rx="6" fill="var(--bg-2)" stroke="var(--line-0)" />
        <rect width="3" height={itemH} rx="1.5" fill="var(--node-master)" />
        <text x="14" y={itemH / 2 + 4} fontFamily="var(--font-ui)" fontSize="12" fontWeight="500" fill="var(--fg-0)">Master</text>
        <text x={colW - 14} y={itemH / 2 + 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-1)">−9.8</text>
      </g>
    </svg>
  );
}

// ─── Full desktop app figure (real screenshots, tabbed) ────────────────────
const APP_SHOTS = [
  { id: 'routing',  label: 'Routing',  caption: 'Sources → Buses → Master. Click a node to audition that stem.', src: 'assets/screenshot-routing.png' },
  { id: 'analysis', label: 'Analysis', caption: 'Per-track spectrum, LUFS & peak.',     src: 'assets/screenshot-analysis.png' },
  { id: 'masking',  label: 'Masking',  caption: 'Conflict patterns with computed fixes.', src: 'assets/screenshot-masking.png' },
];

function Chevron({ dir = 'right', size = 14 }) {
  const d = dir === 'right' ? 'M3 1 L7 5 L3 9' : 'M7 1 L3 5 L7 9';
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowButton({ dir, onClick, ariaLabel, style, className }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label={ariaLabel}
      className={`shots-arrow${className ? ' ' + className : ''}`}
      style={{
        width: 40, height: 40, borderRadius: 999,
        background: 'color-mix(in oklch, var(--bg-0) 78%, transparent)',
        border: '1px solid var(--line-1)',
        color: 'var(--fg-0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transition: 'background 0.12s ease, border-color 0.12s ease',
        ...style,
      }}>
      <Chevron dir={dir} size={14} />
    </button>
  );
}

function DesktopAppMock({ height = 540 }) {
  const [idx, setIdx] = React.useState(0);
  const [fs, setFs] = React.useState(false);
  // Aspect ratio auto-detected from the first loaded screenshot. Fallback
  // matches the originals (1442 × 722) until the image's onLoad fires.
  const [aspectRatio, setAspectRatio] = React.useState('1442 / 722');
  const cardRef = React.useRef(null);
  const [originRect, setOriginRect] = React.useState(null);
  const shot = APP_SHOTS[idx];
  const total = APP_SHOTS.length;

  const next = React.useCallback(() => setIdx(i => (i + 1) % total), [total]);
  const prev = React.useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);

  // capture inline-image rect so lightbox can zoom OUT of it on close
  const openFs = React.useCallback(() => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      setOriginRect({ left: r.left, top: r.top, width: r.width, height: r.height });
    }
    setFs(true);
  }, []);

  // Touch swipe — horizontal drag past a threshold cycles screenshots
  const touchRef = React.useRef({ startX: 0, startY: 0, active: false, decided: false });
  const onTouchStart = React.useCallback((e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startY: t.clientY, active: true, decided: false, axis: null };
  }, []);
  const onTouchMove = React.useCallback((e) => {
    const s = touchRef.current;
    if (!s.active || e.touches.length !== 1) return;
    if (s.axis) return; // already decided
    const t = e.touches[0];
    const dx = t.clientX - s.startX;
    const dy = t.clientY - s.startY;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
      s.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
  }, []);
  const onTouchEnd = React.useCallback((e) => {
    const s = touchRef.current;
    if (!s.active) return;
    const t = (e.changedTouches && e.changedTouches[0]) || null;
    const dx = t ? t.clientX - s.startX : 0;
    s.active = false;
    if (s.axis === 'x' && Math.abs(dx) > 40) {
      // swipe — also cancel the click-to-fullscreen that would fire next
      s.swiped = true;
      if (dx < 0) next(); else prev();
    } else {
      s.swiped = false;
    }
  }, [next, prev]);
  const onCardClick = React.useCallback(() => {
    // Skip opening fullscreen if this click was really a swipe-end
    if (touchRef.current.swiped) { touchRef.current.swiped = false; return; }
    openFs();
  }, [openFs]);

  const indicator = (
    <span className="mono-tiny" style={{ color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      <span style={{ color: 'var(--fg-0)' }}>{String(idx + 1).padStart(2, '0')}</span>
      <span style={{ opacity: 0.5 }}> / {String(total).padStart(2, '0')}</span>
      <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
      <span style={{ color: 'var(--signal)' }}>{shot.label}</span>
      <span style={{ margin: '0 8px', opacity: 0.5 }}>·</span>
      <span style={{ color: 'var(--fg-1)', textTransform: 'none', letterSpacing: '0.02em' }}>{shot.caption}</span>
    </span>
  );

  return (
    <>
      <div
        className="app-shots"
        style={{ width: '100%', position: 'relative' }}
      >
        {/* image card — click to open fullscreen */}
        <div
          ref={cardRef}
          onClick={onCardClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={`Open ${shot.label} screenshot fullscreen`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFs(); }
            else if (!fs && e.key === 'ArrowRight') { e.preventDefault(); next(); }
            else if (!fs && e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
          }}
          style={{
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
            background: 'var(--bg-0)',
            border: '1px solid var(--line-0)',
            boxShadow: '0 32px 80px -24px rgba(0,0,0,.6), 0 0 0 1px oklch(0.22 0.006 60)',
            aspectRatio,
            position: 'relative',
            cursor: 'zoom-in',
            touchAction: 'pan-y', // allow vertical scroll, capture horizontal
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
          }}>
          {/* sliding strip */}
          <div
            className="shots-strip"
            style={{
              position: 'absolute', inset: 0,
              display: 'flex',
              width: `${total * 100}%`,
              transform: `translate3d(-${idx * (100 / total)}%, 0, 0)`,
              transition: 'transform 0.5s cubic-bezier(0.65, 0, 0.2, 1)',
              willChange: 'transform',
            }}>
            {APP_SHOTS.map((s, i) => (
              <div
                key={s.id}
                style={{
                  width: `${100 / total}%`,
                  height: '100%',
                  flexShrink: 0,
                  position: 'relative',
                }}>
                <img
                  src={s.src}
                  alt={`2ndEars — ${s.label} tab`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  onLoad={i === 0 ? (e) => {
                    const im = e.currentTarget;
                    if (im.naturalWidth && im.naturalHeight) {
                      setAspectRatio(`${im.naturalWidth} / ${im.naturalHeight}`);
                    }
                  } : undefined}
                  style={{
                    width: '100%', height: '100%',
                    display: 'block', objectFit: 'cover',
                    // hide the active image while the lightbox is open (it's
                    // visually replaced by the zooming lightbox image — this
                    // makes the FLIP-style zoom-out feel like the same image)
                    visibility: (fs && i === idx) ? 'hidden' : 'visible',
                  }}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* arrows positioned over the image */}
          <ArrowButton
            dir="left"
            ariaLabel="Previous screenshot"
            onClick={prev}
            style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
          />
          <ArrowButton
            dir="right"
            ariaLabel="Next screenshot"
            onClick={next}
            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}
          />

          {/* dot indicators bottom-center */}
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 6, padding: '6px 10px',
            background: 'color-mix(in oklch, var(--bg-0) 78%, transparent)',
            border: '1px solid var(--line-0)',
            borderRadius: 999,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 2,
          }}>
            {APP_SHOTS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Go to ${s.label}`}
                style={{
                  width: i === idx ? 18 : 6, height: 6, borderRadius: 999,
                  background: i === idx ? 'var(--signal)' : 'var(--line-1)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 0.22s ease, background 0.12s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* caption row below */}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          {indicator}
          <span className="mono-tiny" style={{ color: 'var(--site-fg-3)' }}>
            <span className="shots-hint-desktop">click to enlarge · ← → to switch</span>
            <span className="shots-hint-touch" style={{ display: 'none' }}>tap to enlarge · swipe to switch</span>
          </span>
        </div>
      </div>

      {/* fullscreen lightbox */}
      {fs && (
        <FullscreenShot
          shot={shot}
          idx={idx}
          total={total}
          originRect={originRect}
          onClose={() => setFs(false)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function FullscreenShot({ shot, idx, total, originRect, onClose, onPrev, onNext }) {
  // phase: 'entering' → 'open' → 'exiting'
  const [phase, setPhase] = React.useState('entering');
  const imgRef = React.useRef(null);
  const [transformFromOrigin, setTransformFromOrigin] = React.useState(null);

  // compute the transform that places the final-size image *over* the inline card
  const computeOriginTransform = React.useCallback(() => {
    if (!originRect || !imgRef.current) return null;
    const r = imgRef.current.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return null;
    const tx = (originRect.left + originRect.width / 2) - (r.left + r.width / 2);
    const ty = (originRect.top + originRect.height / 2) - (r.top + r.height / 2);
    const sx = originRect.width / r.width;
    const sy = originRect.height / r.height;
    const s = Math.min(sx, sy); // uniform — image uses object-fit: contain
    return `translate(${tx}px, ${ty}px) scale(${s})`;
  }, [originRect]);

  // entrance: set the "from" transform synchronously, then on next frame clear it
  React.useLayoutEffect(() => {
    const fromT = computeOriginTransform();
    if (fromT) setTransformFromOrigin(fromT);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase('open'));
    });
    return () => cancelAnimationFrame(id);
  }, [computeOriginTransform]);

  const beginClose = React.useCallback(() => {
    // recompute origin transform (window may have scrolled / resized)
    const fromT = computeOriginTransform();
    if (fromT) setTransformFromOrigin(fromT);
    setPhase('exiting');
    window.setTimeout(onClose, 320);
  }, [computeOriginTransform, onClose]);

  // Keep a stable ref to beginClose so the history effect doesn't re-run
  const beginCloseRef = React.useRef(beginClose);
  React.useLayoutEffect(() => { beginCloseRef.current = beginClose; }, [beginClose]);

  // Push a history entry so the mobile back button closes the lightbox instead
  // of navigating away. On unmount, pop the entry if the user didn't already
  // dismiss via back (which would have already popped it).
  React.useEffect(() => {
    const popped = { v: false };
    history.pushState({ lightbox: true }, '');

    function onPopState() {
      popped.v = true;
      beginCloseRef.current();
    }

    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      if (!popped.v) history.back();
    };
  }, []);

  // keyboard
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape')         { e.preventDefault(); beginClose(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      else if (e.key === 'ArrowLeft')  { e.preventDefault(); onPrev(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [beginClose, onNext, onPrev]);

  // lock body scroll
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Touch swipe inside the lightbox
  const touchRef = React.useRef({ startX: 0, startY: 0, axis: null });
  const onTouchStart = React.useCallback((e) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchRef.current = { startX: t.clientX, startY: t.clientY, axis: null };
  }, []);
  const onTouchMove = React.useCallback((e) => {
    const s = touchRef.current;
    if (s.axis || e.touches.length !== 1) return;
    const t = e.touches[0];
    const dx = t.clientX - s.startX;
    const dy = t.clientY - s.startY;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) s.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
  }, []);
  const onTouchEnd = React.useCallback((e) => {
    const s = touchRef.current;
    const t = (e.changedTouches && e.changedTouches[0]) || null;
    if (!t) return;
    const dx = t.clientX - s.startX;
    const dy = t.clientY - s.startY;
    if (s.axis === 'x' && Math.abs(dx) > 40) {
      if (dx < 0) onNext(); else onPrev();
    } else if (s.axis === 'y' && dy > 80) {
      // swipe-down dismisses
      beginClose();
    }
  }, [beginClose, onNext, onPrev]);

  const isOpen = phase === 'open';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.label} screenshot fullscreen`}
      className="shots-fs"
      onClick={beginClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'color-mix(in oklch, var(--bg-0) 92%, black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 72px',
        cursor: 'zoom-out',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.28s ease',
        willChange: 'opacity',
      }}>
      {/* top chrome — fades in slightly delayed */}
      <div
        className="shots-fs-chrome"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: 20, left: 24, right: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--fg-2)',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-6px)',
          transition: 'opacity 0.25s ease 0.12s, transform 0.25s ease 0.12s',
        }}>
        <span>
          <span style={{ color: 'var(--fg-0)' }}>{String(idx + 1).padStart(2, '0')}</span>
          <span style={{ opacity: 0.5 }}> / {String(total).padStart(2, '0')}</span>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>·</span>
          <span style={{ color: 'var(--signal)' }}>{shot.label}</span>
        </span>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); beginClose(); }}
          aria-label="Close fullscreen"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px',
            background: 'var(--bg-2)', color: 'var(--fg-1)',
            border: '1px solid var(--line-0)', borderRadius: 4,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Close
        </button>
      </div>

      {/* image — animated zoom-from-origin */}
      <img
        ref={imgRef}
        src={shot.src}
        alt={`2ndEars — ${shot.label} tab (fullscreen)`}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%', maxHeight: '100%',
          objectFit: 'contain',
          borderRadius: 8,
          border: '1px solid var(--line-0)',
          boxShadow: '0 40px 100px -20px rgba(0,0,0,.7)',
          cursor: 'default',
          transformOrigin: 'center center',
          transform: isOpen ? 'none' : (transformFromOrigin || 'scale(0.92)'),
          transition: 'transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
        draggable={false}
      />

      {/* arrows — fade in */}
      <div style={{
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.25s ease 0.12s',
        position: 'absolute', inset: 0, pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <ArrowButton
            dir="left"
            ariaLabel="Previous screenshot"
            onClick={onPrev}
            className="shots-fs-arrow left"
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48 }}
          />
          <ArrowButton
            dir="right"
            ariaLabel="Next screenshot"
            onClick={onNext}
            className="shots-fs-arrow right"
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48 }}
          />
        </div>
      </div>

      {/* footer caption — fades in */}
      <div
        className="shots-fs-caption"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 22, left: '50%',
          fontSize: 13, color: 'var(--fg-1)', maxWidth: 640, textAlign: 'center',
          letterSpacing: '-0.005em',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, 6px)',
          transition: 'opacity 0.25s ease 0.14s, transform 0.25s ease 0.14s',
        }}>
        {shot.caption}
      </div>
    </div>
  );
}


// ─── Video placeholder ──────────────────────────────────────────────────────
function VideoPlaceholder({ label = 'Demo video', height = 480 }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%', height,
      borderRadius: 10,
      background: 'var(--site-card)',
      border: '1px solid var(--site-line)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--site-line) 1px, transparent 1px), linear-gradient(90deg, var(--site-line) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.35,
      }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <button style={{
          width: 68, height: 68, borderRadius: '50%',
          background: 'var(--site-accent)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'oklch(0.18 0.01 60)',
          boxShadow: '0 8px 32px -8px var(--site-accent)',
          cursor: 'pointer',
        }}>
          <svg width="22" height="22" viewBox="0 0 10 10"><path d="M2 1.5 L9 5 L2 8.5 Z" fill="currentColor" /></svg>
        </button>
        <span className="mono-l" style={{ color: 'var(--site-fg-2)' }}>{label} · placeholder</span>
      </div>
    </div>
  );
}

// ─── Spectrum bars (used in analysis-style decoration) ──────────────────────
function SpectrumBars({ bars = [0.6, 0.85, 0.55, 0.3, 0.5, 0.7, 0.9, 0.45, 0.25, 0.6, 0.5, 0.35], height = 40, width = 160 }) {
  const barW = (width - (bars.length - 1) * 2) / bars.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
      {bars.map((v, i) => (
        <rect key={i} x={i * (barW + 2)} y={height - v * height} width={barW} height={v * height} rx="1" fill="var(--site-accent)" opacity={0.3 + v * 0.6} />
      ))}
    </svg>
  );
}

Object.assign(window, {
  MeterCells, LetterBadge, PluginWindow,
  LeftEarMock, RightEarMock,
  RoutingGraphIllustration, DesktopAppMock,
  VideoPlaceholder, SpectrumBars,
});
