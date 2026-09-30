import { NavLink } from 'react-router-dom'
import './TopBar.css'

export default function TopBar({ menuOpen, onMenu }) {
  return (
    <header className="topbar">
      {/* menu button, only shows on small screens */}
      <button className="menu-btn" type="button" aria-label="Open about panel"
        aria-expanded={menuOpen} aria-controls="sidebar" onClick={onMenu}>
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
      </button>
      <nav className="nav" aria-label="Main">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/work">Selected Work</NavLink>
      </nav>
    </header>
  )
}