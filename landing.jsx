/* landing-c.jsx — Direction C: "Plugin-First"
   Hero leads with the actual product UI (LeftEar + RightEar plugins side
   by side). Subsequent sections explain the desktop app underneath.
   More dramatic / cinematic than A or B. */

function LandingC() {
  return (
    <div className="site" style={{ display: 'flex', flexDirection: 'column' }}>
      <NavBar />

      {/* ── Hero: plugins as the product ───────────────────────────────── */}
      <section className="hero-section" style={{
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 30%, color-mix(in oklch, var(--site-accent) 10%, transparent), transparent 60%), var(--site-bg)',
      }}>
        {/* horizontal hairline grid for "scope" feel */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--site-line) 1px, transparent 1px)',
          backgroundSize: '100% 48px',
          opacity: 0.18,
          pointerEvents: 'none',
          maskImage: 'linear-gradient(transparent, black 20%, black 80%, transparent)',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 56px' }}>
            <span className="chip" style={{ marginBottom: 22 }}><span className="chip-dot" /> LEFTEAR · RIGHTEAR · 2NDEARS</span>
            <h1 style={{
              fontSize: 72, lineHeight: 0.98, letterSpacing: '-0.038em', fontWeight: 600,
              color: 'var(--site-fg)', textWrap: 'balance',
            }}>
              Drop these on<br />your tracks.<br />
              <span style={{ color: 'var(--site-accent)' }}>We do the rest.</span>
            </h1>
            <p style={{ fontSize: 17, color: 'var(--site-fg-1)', maxWidth: 580, margin: '24px auto 0', lineHeight: 1.55, textWrap: 'pretty' }}>
              Two plugins for your DAW. One desktop app that listens, measures, and answers. A local AI model that never sends your stems anywhere.
            </p>
            <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
              <BuyCta size="lg" />
            </div>
          </div>

          {/* Two plugins floating */}
          <div className="plugin-hero-row" style={{
            position: 'relative',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 32,
            paddingBottom: 24,
          }}>
            <div className="plugin-hero-card" style={{ transform: 'rotate(-1.2deg) translateY(8px)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.5))' }}>
              <LeftEarMock peak={0.72} />
            </div>
            <div className="plugin-hero-card" style={{ transform: 'rotate(1.2deg)', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.5))' }}>
              <RightEarMock peak={0.86} />
            </div>
          </div>

          <div className="plugin-labels-row" style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, flexWrap: 'wrap' }}>
            <PluginLabel name="LeftEar" role="Per-track · captures audio + routing" />
            <PluginLabel name="RightEar" role="Master-side · carries track context" />
          </div>
        </div>
      </section>

      {/* ── The signal flow strip ─────────────────────────────────────── */}
      <section style={{
        background: 'var(--site-bg-2)',
        borderTop: '1px solid var(--site-line)', borderBottom: '1px solid var(--site-line)',
        padding: '32px 32px',
      }}>
        <div className="container">
          <div className="row" style={{ gap: 18, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {[
              ['01', 'PLAY AUDIO IN YOUR DAW'],
              ['02', 'PLUGINS STREAM TO 2NDEARS'],
              ['03', 'APP REBUILDS ROUTING GRAPH'],
              ['04', 'ANALYSIS RUNS LOCALLY'],
              ['05', 'ASK THE ASSISTANT'],
            ].map(([n, l], i, arr) => (
              <div key={n} className="row" style={{ gap: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                  color: i === 0 ? 'var(--site-accent)' : 'var(--site-fg-2)',
                  letterSpacing: '0.04em',
                  padding: '2px 6px',
                  border: `1px solid ${i === 0 ? 'var(--site-accent)' : 'var(--site-line)'}`,
                  borderRadius: 3,
                }}>{n}</span>
                <span className="mono-l" style={{ fontSize: 11, color: 'var(--site-fg-1)' }}>{l}</span>
                {i < arr.length - 1 && <span style={{ color: 'var(--site-fg-3)' }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Then: the desktop app ─────────────────────────────────────── */}
      <section className="section" id="how">
        <div className="container">
          <div className="section-head">
            <span className="mono-l section-eyebrow">THE DESKTOP APP</span>
            <h2 className="section-title">Everything in your session, rebuilt.</h2>
            <p className="section-lede">The plugins send audio and routing metadata over local IPC. The desktop app reconstructs your project — sources, buses, master — and runs analysis on every node.</p>
          </div>
          <div className="app-mock-frame">
            <DesktopAppMock height={580} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
            {[
              ['ROUTING', 'Click any node to audition it in isolation.'],
              ['ANALYSIS', 'LUFS · peak · spectral balance per track.'],
              ['MASKING', 'Per-pair conflicts with severity ratings.'],
              ['ASSISTANT', 'Streamed locally. 5 turns per session.'],
            ].map(([k, v]) => (
              <div key={k} className="card" style={{ padding: 18 }}>
                <div className="mono-l label-accent" style={{ marginBottom: 6 }}>{k}</div>
                <div style={{ fontSize: 13, color: 'var(--site-fg-1)', lineHeight: 1.5 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it is (3-card) ────────────────────────────────────────── */}
      <section className="section" id="what" style={{ background: 'var(--site-bg-2)' }}>
        <div className="container">
          <div className="section-head">
            <span className="mono-l section-eyebrow">WHAT IT IS</span>
            <h2 className="section-title">A second opinion. Not a smart EQ.</h2>
          </div>
          <div className="grid-3">
            {VALUE_PROPS.map(p => (
              <div key={p.label} className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="mono-l label-accent">{p.label}</span>
                <h3 style={{ fontSize: 19, lineHeight: 1.25, color: 'var(--site-fg)' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo video ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="mono-l section-eyebrow">DEMO</span>
            <h2 className="section-title">90 seconds. Real session. No edits.</h2>
          </div>
          <VideoPlaceholder height={520} />
        </div>
      </section>

      {/* ── Conversation example ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--site-bg-2)' }}>
        <div className="container">
          <div className="section-head">
            <span className="mono-l section-eyebrow">A REAL CONVERSATION</span>
            <h2 className="section-title">Ask anything. Get a number-grounded answer.</h2>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <ConvoCard
              q="What's the biggest issue with this mix?"
              a={<>
                <strong>Sub is hot.</strong> Kick (80–120 Hz) is masking Bass DI at −7 dB on the Drum Bus.
                <br /><br />
                Try a <strong>1–2 dB cut at 90 Hz</strong> on the bass, sidechained to the kick.
              </>}
            />
            <ConvoCard
              q="Is the low end balanced?"
              a={<>
                <strong>Slightly weighted low-mid.</strong> Bus carries 33% of total energy vs. 22% reference for pop / rock.
                <br /><br />
                A gentle <strong>200 Hz dip</strong> on Gtr Bus would open space without thinning the guitars.
              </>}
            />
          </div>
        </div>
      </section>

      {/* ── Beginners + Pros ───────────────────────────────────────────── */}
      <BeginnersAndPros />

      {/* ── Privacy ────────────────────────────────────────────────────── */}
      <PrivacyCallout variant="inverted" />

      {/* ── Features list ─────────────────────────────────────────────── */}
      <FeatureList />

      {/* ── Pricing ────────────────────────────────────────────────────── */}
      <PricingCard />

      <Footer />
    </div>
  );
}

function PluginLabel({ name, role }) {
  return (
    <div className="stack-tight" style={{ alignItems: 'center', gap: 4, minWidth: 320 }}>
      <div className="row" style={{ gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--site-accent)' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--site-fg)' }}>{name}</span>
      </div>
      <span className="mono-l" style={{ color: 'var(--site-fg-2)', fontSize: 10 }}>{role}</span>
    </div>
  );
}

function ConvoCard({ q, a }) {
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{
        alignSelf: 'flex-end', padding: '10px 14px',
        background: 'var(--site-card-2)', borderRadius: 8,
        fontSize: 13.5, color: 'var(--site-fg)',
        display: 'inline-block', marginBottom: 16,
        border: '1px solid var(--site-line)',
      }}>{q}</div>
      <div className="row" style={{ gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: 'color-mix(in oklch, var(--ai) 22%, transparent)',
          border: '1px solid color-mix(in oklch, var(--ai) 40%, transparent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--ai)' }} />
        </div>
        <span className="mono-l" style={{ color: 'var(--site-fg-2)' }}>ASSISTANT</span>
      </div>
      <p style={{ fontSize: 14, color: 'var(--site-fg-1)', lineHeight: 1.6 }}>{a}</p>
    </div>
  );
}

window.LandingC = LandingC;
