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

// ─── Full desktop app mock (a faked window) ─────────────────────────────────
function DesktopAppMock({ height = 540 }) {
  return (
    <div style={{
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      background: 'var(--bg-0)',
      border: '1px solid var(--line-0)',
      boxShadow: '0 32px 80px -24px rgba(0,0,0,.6), 0 0 0 1px oklch(0.22 0.006 60)',
      fontFamily: 'var(--font-ui)',
      color: 'var(--fg-0)',
    }}>
      {/* macOS-ish window chrome */}
      <div style={{
        height: 28, background: 'var(--bg-1)',
        borderBottom: '1px solid var(--line-0)',
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px'
      }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ flex: 1, textAlign: 'center', fontSize: 11.5, color: 'var(--fg-2)' }}>2ndEars</span>
      </div>
      {/* App top bar */}
      <div style={{
        height: 44, background: 'var(--bg-1)',
        borderBottom: '1px solid var(--line-0)',
        display: 'flex', alignItems: 'center', gap: 14, padding: '0 16px'
      }}>
        <span className="logo-mark" style={{ width: 18, height: 18, color: 'var(--fg-0)' }} />
        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--fg-0)' }}>2ndEars</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8, padding: '4px 10px',
          borderRadius: 999, background: 'color-mix(in oklch, var(--signal) 10%, transparent)',
          border: '1px solid color-mix(in oklch, var(--signal) 28%, transparent)' }}>
          <span className="dot-signal" />
          <span style={{ fontSize: 11, color: 'var(--signal)' }}>Listening</span>
        </div>
        <div style={{ display: 'flex', gap: 18, marginLeft: 16 }}>
          <span className="mono-l">SR <span style={{ color: 'var(--fg-1)' }}>48.0k</span></span>
          <span className="mono-l">ANALYZERS <span style={{ color: 'var(--fg-1)' }}>2</span></span>
          <span className="mono-l">DURATION <span style={{ color: 'var(--fg-1)' }}>2:34</span></span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button style={{
            padding: '5px 10px', fontSize: 11.5, background: 'var(--bg-2)',
            color: 'var(--fg-1)', border: '1px solid var(--line-0)', borderRadius: 4,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <svg width="9" height="9" viewBox="0 0 10 10"><path d="M5.5 1v9 M1 5.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
            New Session
          </button>
        </div>
      </div>
      {/* Main grid: tabs+routing | chat. Class-based grid so mobile rules can
          exclude this from the universal collapse-to-1col override. */}
      <div className="app-mock-grid" style={{ height: height - 28 - 44 - 24 }}>
        <div style={{ borderRight: '1px solid var(--line-0)', display: 'flex', flexDirection: 'column' }}>
          {/* tab bar */}
          <div style={{ height: 36, borderBottom: '1px solid var(--line-0)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 18 }}>
            {['Routing', 'Analysis', 'Masking'].map((t, i) => (
              <span key={t} style={{
                fontSize: 12, fontWeight: 500,
                color: i === 0 ? 'var(--fg-0)' : 'var(--fg-2)',
                borderBottom: i === 0 ? '2px solid var(--signal)' : '2px solid transparent',
                padding: '8px 0'
              }}>{t}</span>
            ))}
            <span style={{ marginLeft: 'auto' }} className="mono-l">DURATION <span style={{ color: 'var(--fg-1)' }}>2:34</span></span>
          </div>
          <div style={{ flex: 1, padding: 16 }}>
            <RoutingGraphIllustration height={height - 28 - 44 - 24 - 36 - 32} />
          </div>
        </div>
        <ChatPanelMock />
      </div>
      {/* status bar */}
      <div style={{
        height: 24, background: 'var(--bg-1)', borderTop: '1px solid var(--line-0)',
        display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10
      }}>
        <span className="dot-signal" />
        <span className="mono-tiny" style={{ color: 'var(--fg-1)' }}>Playing <strong style={{ color: 'var(--fg-0)' }}>Drum Bus</strong> · −12.4 LUFS · −1.0 dBFS</span>
        <span style={{ marginLeft: 'auto' }} className="mono-tiny">⏎ to send · ⇧⏎ new line</span>
      </div>
    </div>
  );
}

function ChatPanelMock() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-1)' }}>
      <div style={{
        height: 36, padding: '0 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        borderBottom: '1px solid var(--line-0)'
      }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%',
          background: 'color-mix(in oklch, var(--ai) 22%, transparent)',
          border: '1px solid color-mix(in oklch, var(--ai) 40%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ai)', animation: 'aiPulse 1.6s ease-in-out infinite' }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Assistant</span>
        <span style={{ marginLeft: 'auto' }} className="mono-l">2/5 TURNS</span>
      </div>
      <div style={{ flex: 1, padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        <div style={{
          alignSelf: 'flex-start', maxWidth: '85%', fontSize: 11.5,
          color: 'var(--fg-2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em'
        }}>Analysis complete: 9 tracks analyzed.</div>
        <div style={{
          alignSelf: 'flex-end', maxWidth: '85%',
          background: 'var(--bg-3)', padding: '8px 12px',
          borderRadius: 8, fontSize: 12.5, color: 'var(--fg-0)',
        }}>What's the biggest issue with this mix?</div>
        <div style={{
          alignSelf: 'flex-start', maxWidth: '92%',
          fontSize: 12.5, color: 'var(--fg-0)', lineHeight: 1.55,
        }}>
          <strong>Sub is hot.</strong> Kick (80–120 Hz) is masking Bass DI at −7 dB on the Drum Bus — that's your biggest issue.
          <br /><br />
          Try a <strong>1–2 dB cut</strong> at 90 Hz on the bass, sidechained to the kick. The Vocal Lead is also fighting Snare in the mid band — pull the snare down 1 dB or carve a 1 kHz dip on the snare bus<span style={{
            display: 'inline-block', width: 6, height: 12, background: 'var(--ai)',
            marginLeft: 3, verticalAlign: -2, animation: 'pulseOpacity 1s ease infinite'
          }} />
        </div>
      </div>
      {/* suggestion chips */}
      <div style={{ padding: '0 14px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Is the low end balanced?', 'How do I tame the sibilance?', 'Critique my vocal chain'].map(t => (
          <span key={t} style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'var(--bg-2)', border: '1px solid var(--line-0)',
            fontSize: 11, color: 'var(--fg-1)'
          }}>{t}</span>
        ))}
      </div>
      {/* input row */}
      <div style={{
        margin: '0 14px 14px', padding: '8px 12px',
        background: 'var(--bg-2)', border: '1px solid var(--line-0)',
        borderRadius: 6, display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span style={{ flex: 1, fontSize: 12, color: 'var(--fg-3)' }}>Ask about balance, EQ, dynamics…</span>
        <button style={{
          width: 22, height: 22, borderRadius: 4,
          background: 'var(--signal)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'oklch(0.18 0.008 60)'
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5h7m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
        </button>
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
  RoutingGraphIllustration, DesktopAppMock, ChatPanelMock,
  VideoPlaceholder, SpectrumBars,
});
