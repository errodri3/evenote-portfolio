import { Link, useLocation } from 'react-router-dom'
import Mascot from './Mascot'
import { LINKS } from '../data/about'
import './Footer.css'

const PAGES = [
  ['Home', '/'],
  ['About', '/about'],
  ['Selected Work', '/work'],
  ['write a note', '/write'],
]

// small line icons
const ICONS = {
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  github: <path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.6 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.4 0C6.1 1.1 5 1.4 5 1.4a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.5 8.5c0 5.1 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V21" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></>,
  arrow: <path d="M7 17L17 7M9 7h8v8" />,
}
function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</g>
    </svg>
  )
}

// A link that stays a placeholder until you add the URL in data/about.js
function Social({ href, label, className = 'soc', children }) {
  if (!href) {
    return (
      <a className={className} href="#" aria-label={label} title={`${label}: add link in data/about.js`}
        onClick={(e) => e.preventDefault()}>{children}</a>
    )
  }
  const external = href.startsWith('http')
  return (
    <a className={className} href={href} aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>
  )
}

// notes floating along the wave into a mailbox, then "THE END"
function Scene() {
  const star = (x, y, r) =>
    `M${x} ${y}l${r * .43} ${r} ${r} ${r * .43}-${r} ${r * .43}-${r * .43} ${r}-${r * .43}-${r}-${r}-${r * .43} ${r}-${r * .43}z`
  return (
    <svg viewBox="0 0 900 230">
      <g fill="none" stroke="#2F3A2C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* wave */}
        <path d="M-10 170C120 120 220 210 360 170S560 120 640 176" stroke="#CFE8B4" strokeWidth="40" />
        {/* notes */}
        <g transform="translate(92 118) rotate(-8)"><rect width="74" height="46" rx="6" fill="#fff" stroke="#79B3E3" strokeWidth="4" /><path d="M12 16h34M12 28h24" stroke="#9FB392" /></g>
        <g transform="translate(236 150) rotate(6)"><rect width="74" height="46" rx="6" fill="#fff" stroke="#79B3E3" strokeWidth="4" /><path d="M12 16h40M12 28h20" stroke="#9FB392" /><path d="M58 30l4-8 4 8" stroke="#E0627A" /></g>
        <g transform="translate(398 120) rotate(-4)"><rect width="74" height="46" rx="6" fill="#fff" stroke="#79B3E3" strokeWidth="4" /><path d="M12 16h30M12 28h36" stroke="#9FB392" /></g>
        {/* mailbox */}
        <path d="M640 214V120" /><path d="M632 214h16" />
        <path d="M596 120V92a28 28 0 0 1 28-28h60a28 28 0 0 1 28 28v28z" fill="#fff" />
        <path d="M624 64a28 28 0 0 1 28 28v28" />
        <path d="M712 84h18v-26h-18" fill="#F2A0B4" />
        {/* envelope flying in */}
        <g transform="translate(560 44) rotate(-18)"><rect width="56" height="36" rx="4" fill="#FFF8E3" /><path d="M0 2l28 18 28-18" /></g>
        <path d="M548 36c-10-6-20-4-26 4M536 58c-12 0-18 6-20 14" stroke="#9FB392" strokeDasharray="4 7" />
        {/* ground */}
        <path d="M40 214h820" stroke="#9FB392" />
        {/* THE END sign */}
        <path d="M744 214v-60h104v60" fill="#fff" /><path d="M734 154h124l-12-22h-100z" fill="#CFE8B4" />
        <path d="M758 146h76" />
        <text x="796" y="192" fontFamily="Gaegu, cursive" fontSize="20" fontWeight="700" textAnchor="middle" fill="#2F3A2C" stroke="none">THE END</text>
        {/* stars */}
        <path d={star(470, 40, 7)} fill="#F2D54A" stroke="#C9A21A" strokeWidth="1.5" />
        <path d={star(860, 70, 5)} fill="#F2D54A" stroke="#C9A21A" strokeWidth="1.5" />
        <path d={star(180, 50, 5)} fill="#F2D54A" stroke="#C9A21A" strokeWidth="1.5" />
      </g>
      {/* mascot next to the mailbox */}
      <foreignObject x="668" y="150" width="64" height="64"><Mascot size={64} /></foreignObject>
    </svg>
  )
}

export default function Footer() {
  const { pathname } = useLocation()
  // case studies count as Selected Work, Why counts as About
  const current = pathname.startsWith('/work') ? '/work' : pathname.startsWith('/why') ? '/about' : pathname
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <footer className="foot">
      {/* next note links + back to top */}
      <div className="foot-next">
        <span className="foot-label">next note ↓</span>
        <span className="foot-links">
          {PAGES.filter(([, to]) => to !== current).map(([label, to]) => (
            <Link key={to} className="ulink" to={to}>{label}</Link>
          ))}
        </span>
        <button className="foot-top" type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}>
          ↑ back to top
        </button>
      </div>

      <div className="foot-scene" aria-hidden="true"><Scene /></div>

      <div className="foot-bottom">
        <div className="foot-id">
          <div className="foot-brand">
            {/* logo slot: swap Mascot for your drawn logo later */}
            <Mascot size={46} />
            <span className="foot-name">Evelyn Rodriguez</span>
          </div>
          <p className="foot-made">
            made with <span className="heart" aria-label="love">♥</span>, a stylus,{' '}
            <Social href={LINKS.playlist} label="Playlist" className="">
              {LINKS.playlist ? 'this playlist ↗' : '[this playlist] ↗'}
            </Social>, and a lot of doodles...
          </p>
        </div>

        <div className="foot-right">
          <div className="socials">
            <Social href={LINKS.linkedin} label="LinkedIn"><Icon name="linkedin" /></Social>
            <Social href={LINKS.email && 'mailto:' + LINKS.email} label="Email"><Icon name="email" /></Social>
            <Social href={LINKS.github} label="GitHub"><Icon name="github" /></Social>
            <Social href={LINKS.instagram} label="Instagram"><Icon name="instagram" /></Social>
            <Social href={LINKS.resume} label="Resume" className="soc-resume">Resume <Icon name="arrow" size={14} /></Social>
          </div>
          <span className="fine">© {new Date().getFullYear()} Evelyn Rodriguez · designed &amp; built by me</span>
        </div>
      </div>
    </footer>
  )
}