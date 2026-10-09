import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './TopBar.css'

// The mail route: each tab is a stop on a dotted line.
// A paper airplane flies to the stop you pick, then that envelope opens.
const STOPS = [
  { label: 'home', to: '/' },
  { label: 'about', to: '/about' },
  { label: 'selected work', short: 'work', to: '/work' },
  { label: 'playground', short: 'play', to: '/playground' },
]

// which stop goes with the page you're on (-1 = none, like Write a Note)
function stopFor(pathname) {
  if (pathname === '/') return 0
  if (pathname.startsWith('/about') || pathname.startsWith('/why')) return 1
  if (pathname.startsWith('/work')) return 2
  if (pathname.startsWith('/playground')) return 3
  return -1
}

const FLIGHT_MS = 750
const pct = (i) => ((i + 0.5) / STOPS.length) * 100   // stop position along the line, in %

function Envelope({ open }) {
  // drawn back to front: back, open flap, letter, front, closed flap
  return (
    <svg className="env" viewBox="0 0 40 30" aria-hidden="true">
      <path className="env-back" d="M3 9h34v18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path className={'env-flap open-flap' + (open ? ' show' : '')} d="M3 9.5L20 -2 37 9.5z" />
      <rect className="env-letter" x="8" y="6" width="24" height="18" rx="2" />
      <path className="env-lines" d="M12 11h16M12 15h11" />
      <path className="env-front" d="M3 12l17 10 17-10v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path className={'env-flap shut-flap' + (open ? '' : ' show')} d="M3 9.5L20 21 37 9.5z" />
    </svg>
  )
}

export default function TopBar({ menuOpen, onMenu }) {
  const { pathname } = useLocation()
  const active = stopFor(pathname)

  // remember where the plane came from, so it faces the way it's flying
  const [prev, setPrev] = useState(active)
  const [dir, setDir] = useState(1)
  if (active !== prev) {
    if (active !== -1 && prev !== -1) setDir(active >= prev ? 1 : -1)
    setPrev(active)
  }

  // the envelope opens once the plane lands
  const [landed, setLanded] = useState(active)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setLanded(active), reduce ? 0 : FLIGHT_MS)
    return () => clearTimeout(t)
  }, [active])

  const at = active === -1 ? 0 : pct(active)

  return (
    <header className="topbar">
      {/* menu button, only shows on small screens */}
      <button className="menu-btn" type="button" aria-label="Open about panel"
        aria-expanded={menuOpen} aria-controls="sidebar" onClick={onMenu}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </button>

      <nav className="route" aria-label="Main">
        {/* dotted line + the part already traveled */}
        <span className="route-line" aria-hidden="true" />
        <span className="route-done" aria-hidden="true" style={{ width: `${at}%` }} />

        {/* paper airplane */}
        {active !== -1 && (
          <span className="plane" aria-hidden="true" style={{ left: `${at}%` }}>
            <span key={active} className={'plane-in' + (landed === active ? ' parked' : ' flying')}
              style={{ '--dir': dir }}>
              <svg viewBox="0 0 24 24"><path d="M2 11.5L22 3l-6.5 18-4-7.2z" /><path d="M11.5 13.8L22 3" /><path d="M11.5 13.8v5.7l3-3.4" /></svg>
            </span>
          </span>
        )}

        <ul className="stops">
          {STOPS.map((s, i) => {
            const open = i === active && landed === active
            return (
              <li key={s.to} style={{ left: `${pct(i)}%` }}>
                <NavLink to={s.to} end={s.to === '/'} className={'stop' + (open ? ' open' : '')}>
                  <span className="stop-dot"><Envelope open={open} /></span>
                  <span className="stop-label">
                    <span className="long">{s.label}</span>
                    <span className="short">{s.short || s.label}</span>
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
