import Mascot from './Mascot'
import './Handheld.css'

export function WelcomeScreen() {
  return (
    <div className="wel">
      <div className="wel-tag">Eve</div>
      <div className="wel-card">
        <div className="wel-text">
          <div className="wel-title">Welcome to<br />Eve's Portfolio!</div>
          <svg viewBox="0 0 420 30" style={{ width: '70%', display: 'block', marginTop: '1cqw' }} aria-hidden="true">
            <path className="draw" d="M4 18C60 4 110 28 170 14S280 4 340 18S400 22 416 12"
              fill="none" stroke="#7CC04B" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <div className="wel-sub">Web Developer + UI/UX Designer</div>
        </div>
      </div>
      <Mascot className="wel-mascot bob" />
      <span className="pg-flag" aria-hidden="true">1</span>
    </div>
  )
}

// makes n empty <i> tags (speaker holes)
const dots = (n) => Array.from({ length: n }, (_, i) => <i key={i} />)

export default function Handheld({ onStart }) {
  return (
    <section id="landing" aria-label="Welcome">
      <div className="hh">
        {/* top half */}
        <div className="lid">
          <span className="cam" aria-hidden="true" />
          <div className="grille l" aria-hidden="true">{dots(9)}</div>
          <div className="grille r" aria-hidden="true">{dots(9)}</div>
          <span className="slider3d" aria-hidden="true" />
          <div className="top-bezel">
            <div className="top-screen"><WelcomeScreen /></div>
          </div>
        </div>

        <div className="hinge" aria-hidden="true" />

        {/* bottom half */}
        <div className="base">
          <div className="lctl" aria-hidden="true">
            <div className="cpad"><i /></div>
            <div className="dpad" />
          </div>

          <div className="mid">
            <div className="bot-bezel">
              <div className="bot-screen checker">
                <div>
                  <div className="bs-name">Evelyn Rodriguez</div>
                  <div className="bs-role">Informatics + HCI · UC Irvine</div>
                </div>
                <button className="start-btn" type="button" onClick={onStart}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
                  Start
                </button>
              </div>
            </div>
            <div className="sysbar">
              <button type="button" tabIndex={-1} aria-hidden="true">SELECT</button>
              <button type="button" tabIndex={-1} aria-hidden="true" onClick={onStart}>HOME</button>
              <button type="button" tabIndex={-1} aria-hidden="true" onClick={onStart}>START</button>
            </div>
          </div>

          <div className="rctl">
            <div className="abxy">
              <span className="x" aria-hidden="true">X</span>
              <span className="y" aria-hidden="true">Y</span>
              <span className="b" aria-hidden="true">B</span>
              <button className="a" type="button" aria-label="A button: start" onClick={onStart}>A</button>
            </div>
            <span className="power" aria-hidden="true">
              <svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 3v8" /><path d="M6.5 7a8 8 0 1 0 11 0" /></g></svg>
            </span>
          </div>

          <div className="leds" aria-hidden="true"><i /><i /><i /></div>
        </div>
      </div>
      <div className="landing-hint">Press Start to open my portfolio</div>
    </section>
  )
}