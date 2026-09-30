import Mascot from './Mascot'
import { SIDEBAR } from '../data/about'
import './Sidebar.css'

export default function Sidebar({ open, hidden, onClose, onHandheld }) {
  return (
    <aside id="sidebar" className={'side' + (open ? ' open' : '')} aria-label="About Eve" inert={hidden}>
      {/* X button, only shows on small screens */}
      <button className="side-close" type="button" aria-label="Close panel" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </button>

      {/* logo slot: swap for your drawn logo later */}
      <Mascot size={72} />
      <div className="side-name">Evelyn<br />Rodriguez.</div>
      <p className="side-quote">{SIDEBAR.quote}</p>

      <dl className="side-roles">
        {SIDEBAR.roles.map(([at, what]) => (
          <div key={at}><dt>{at}</dt><dd>{what}</dd></div>
        ))}
      </dl>

      {/* drawing slot, like Elaine's walking illustration */}
      <div className="side-art">[your drawing]</div>

      <button className="side-btn" type="button" onClick={onHandheld}>Back to handheld</button>
    </aside>
  )
}