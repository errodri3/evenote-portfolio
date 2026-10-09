import { useState } from 'react'
import { Link } from 'react-router-dom'
import Mascot from './Mascot'
import { DEV } from './draft'
import { SIDEBAR, MASCOT_LINES } from '../data/about'
import './Sidebar.css'

// One line from the logo's speech bubble
function Line({ line }) {
  const [text, to] = line.link || []
  return (
    <>
      <b>{line.t}</b>
      {line.s && <span>{line.s}</span>}
      {to && (to.startsWith('/')
        ? <Link to={to}>{text}</Link>
        : <a href={to} target="_blank" rel="noopener">{text}</a>)}
    </>
  )
}

export default function Sidebar({ open, hidden, onClose }) {
  // hover (or tap) the logo: it says something. Next time (or tap again), it says the next thing.
  const [talk, setTalk] = useState(null)   // null, or where to draw the bubble
  const [i, setI] = useState(0)

  function show(e) {
    const r = e.currentTarget.getBoundingClientRect()
    setTalk({ left: r.right + 14, top: r.top + r.height / 2 })
  }
  function hide() {
    if (!talk) return
    setTalk(null)
    setI((n) => (n + 1) % MASCOT_LINES.length)
  }

  return (
    <aside id="sidebar" className={'side' + (open ? ' open' : '')} aria-label="About Eve" inert={hidden}>
      {/* X button, only shows on small screens */}
      <button className="side-close" type="button" aria-label="Close panel" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </button>

      {/* logo (swap Mascot for your drawn logo later) + its speech bubble */}
      <div className="side-logo-wrap" onPointerLeave={(e) => { if (e.pointerType === 'mouse') hide() }}>
        <button className={'side-logo' + (talk ? ' talking' : '')} type="button" aria-label="Say hi"
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') show(e) }} onBlur={hide}
          onClick={(e) => (talk ? setI((n) => (n + 1) % MASCOT_LINES.length) : show(e))}>
          <Mascot size={72} />
        </button>
        {talk && (
          <div className="side-bubble" role="status" style={{ '--x': `${talk.left}px`, '--y': `${talk.top}px` }}>
            <Line line={MASCOT_LINES[i]} />
          </div>
        )}
      </div>

      <div className="side-name">Evelyn<br />Rodriguez.</div>
      <p className="side-quote">{SIDEBAR.quote}</p>

      <dl className="side-roles">
        {SIDEBAR.roles.map(([at, what]) => (
          <div key={at}><dt>{at}</dt><dd>{what}</dd></div>
        ))}
      </dl>

      {/* (only shows on your computer until you add a drawing) */}
      {DEV ? <div className="side-art">[your drawing]</div> : <div className="side-spacer" />}
    </aside>
  )
}
