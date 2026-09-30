import { Link, NavLink } from 'react-router-dom'
import './TopBar.css'

export default function TopBar() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        {/* logo slot: your drawn logo goes here later */}
        <span className="brand-name">Evelyn Rodriguez</span>
        <span className="brand-role">Web Developer + UI/UX Designer</span>
      </Link>
      <nav className="nav" aria-label="Main">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/work">Selected Work</NavLink>
      </nav>
    </header>
  )
}