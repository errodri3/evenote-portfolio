import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Thumb from '../components/Thumb'
import Ph from '../components/Ph'
import { DEV, shows } from '../components/draft'
import Attachments, { Viewer } from '../components/Attachments'
import { CASES, ORDER } from '../data/cases'
import { noteFor } from './Work'
import './Work.css'
import './CaseStudy.css'

const pad = (n) => String(n).padStart(2, '0')

// An image. If the file doesn't exist yet, shows a dashed box with the path to save it at.
function Img({ src, caption, half }) {
  const [missing, setMissing] = useState(false)
  if ((!src || missing) && !DEV) return null   // live site: no empty boxes
  if (!src || missing) {
    return (
      <figure className={'slot' + (half ? ' half' : '')}>
        <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
          <g fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="M3 18l6-5 4 3 3-2 5 4" /></g>
        </svg>
        <span>{caption}</span>
        <code>public{src}</code>
      </figure>
    )
  }
  return (
    <figure className="fig">
      <img src={src} alt={caption || ''} loading="lazy" onError={() => setMissing(true)} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

// One piece of content inside a note (see the list at the top of cases.jsx)
// Is there anything to show in this block on the live site?
function blockShows(b) {
  if (DEV) return true
  if (b.p) return shows(b.p)
  if (b.list) return b.list.some(shows)
  if (b.decision) return shows(b.decision.p) || shows(b.decision.b)
  return true
}

function Block({ b }) {
  if (!blockShows(b)) return null
  if (b.p) return <p><Ph>{b.p}</Ph></p>
  if (b.h3) return <h3>{b.h3}</h3>
  if (b.quote) return <blockquote className="quote">{b.quote}</blockquote>
  if (b.hmw) return <div className="hmw"><small>How might we</small>{b.hmw}</div>
  if (b.list) return <ul className="cs-list">{b.list.filter(shows).map((t) => <li key={t}><Ph>{t}</Ph></li>)}</ul>
  if (b.img) return <Img {...b.img} />
  if (b.pair) return <div className="pair">{b.pair.map((im) => <Img key={im.src} {...im} half />)}</div>
  if (b.stats) {
    return (
      <div className="stats">
        {b.stats.map(([n, label]) => (
          <div key={label} className="stat"><span className="stat-n">{n}</span><span className="stat-l">{label}</span></div>
        ))}
      </div>
    )
  }
  if (b.decision) {
    const d = b.decision
    return (
      <div className="decision">
        {d.tag && <span className="tag-red">{d.tag} </span>}
        {d.b && <b><Ph>{d.b}</Ph></b>}
        <p><Ph>{d.p}</Ph></p>
      </div>
    )
  }
  return null
}

// A fresh page for each project (the key resets everything when you switch projects)
export default function CaseStudy() {
  const { id } = useParams()
  return <CaseStudyPage key={id} id={id} />
}

function CaseStudyPage({ id }) {
  const c = CASES[id]
  const noteRefs = useRef([])
  const stackRef = useRef(null)
  const [active, setActive] = useState(0)      // which note you're reading
  const [viewer, setViewer] = useState(null)   // null | 'slides' | 'video'

  // notes with something to show (on the live site, notes that are only [bracket notes] are hidden)
  const body = c ? c.notes.filter((n) => DEV || n.body.some((b) => (b.p || b.list || b.decision || b.stats || b.quote || b.hmw) && blockShows(b))) : []
  // the list of notes: Overview first, then each note from cases.jsx
  const notes = c ? [{ short: 'Overview', num: '✦' }, ...body.map((n, i) => ({ ...n, num: pad(i + 1) }))] : []

  // figure out which note is on screen while scrolling
  useEffect(() => {
    const onScroll = () => {
      let current = 0
      noteRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = i
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // keep the active mini note visible inside the side stack
  useEffect(() => {
    const stack = stackRef.current
    const el = stack?.children[active]
    if (!stack || !el) return
    stack.scrollTo({
      top: el.offsetTop - stack.clientHeight / 2 + el.clientHeight / 2,
      left: el.offsetLeft - stack.clientWidth / 2 + el.clientWidth / 2,
      behavior: 'smooth',
    })
  }, [active])

  if (!c) return <Navigate to="/work" replace />  // unknown project → back to the list

  const nextId = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]
  const next = CASES[nextId]
  const jump = (i) => noteRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="cs-layout">
      {/* ---------- side: stack of notes + attachments tray ---------- */}
      <nav className="rail" aria-label="Case study sections">
        <span className="rail-label">notes</span>
        <div className="stack" ref={stackRef}>
          {notes.map((n, i) => (
            <button
              key={n.short}
              type="button"
              className={'mini' + (i === active ? ' on' : '') + (i < active ? ' read' : '')}
              aria-current={i === active ? 'true' : undefined}
              aria-label={`Go to ${n.short}`}
              onClick={() => jump(i)}
            >
              <span className="brk" aria-hidden="true"><i /><i /><i /><i /></span>
              <small>{n.num}</small>
              <span>{n.short}</span>
            </button>
          ))}
        </div>

        {c.attachments && (
          <div className="tray" aria-label="Attachments">
            <span className="rail-label">📎 attached</span>
            {c.attachments.slides && <button className="clipbtn" type="button" onClick={() => setViewer('slides')}>📎 <span>Slides</span></button>}
            {c.attachments.video && <button className="clipbtn" type="button" onClick={() => setViewer('video')}>▶ <span>Demo</span></button>}
          </div>
        )}
      </nav>

      {/* ---------- the notes ---------- */}
      <article className="cs">
        <Link className="back" to="/work">← back to work</Link>

        {/* Overview note */}
        <section className="cs-note" ref={(el) => { noteRefs.current[0] = el }}>
          <span className="eyebrow">
            selected work · <Ph>{c.year}</Ph>{c.lab && <> · {c.lab}</>}
          </span>
          {c.status && <span className="status-badge">🚧 {c.status}</span>}
          <h1 className="cs-title">{c.title}</h1>
          <p className="cs-lede"><Ph>{c.lede}</Ph></p>
          <div className="tags">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          {c.link && (
            <a className="site-btn" href={c.link.href} target="_blank" rel="noopener">{c.link.label} ↗</a>
          )}
          <dl className="meta">
            {[['role', c.role], ['timeline', c.timeline], ['tools', c.tools], ['team', c.team]]
              .filter(([, v]) => shows(v))
              .map(([k, v]) => <div key={k}><dt>{k}</dt><dd><Ph>{v}</Ph></dd></div>)}
          </dl>
          {c.owned && (
            <div className="owned">
              <b>What I owned</b>
              <ul>{c.owned.filter(shows).map((t) => <li key={t}><Ph>{t}</Ph></li>)}</ul>
            </div>
          )}
          {c.hero && <Img {...c.hero} />}
          <span className="note-flag" aria-hidden="true">✦</span>
        </section>

        {/* one note per section */}
        {body.map((n, i) => (
          <section key={n.short} className="cs-note" ref={(el) => { noteRefs.current[i + 1] = el }}>
            <span className="eyebrow">{pad(i + 1)} — {n.k}</span>
            <h2>{n.h}</h2>
            {n.body.map((b, k) => <Block key={k} b={b} />)}
            <span className="note-flag" aria-hidden="true">{pad(i + 1)}</span>
          </section>
        ))}

        {/* attachments: their own section, not a note */}
        {c.attachments && <Attachments files={c.attachments} onOpen={setViewer} />}

        {/* next project */}
        <section className="cs-next-wrap">
          <span className="eyebrow">Next note</span>
          <Link className="cs-next" to={`/work/${nextId}`}>
            <Thumb note={noteFor(nextId)} />
            <span>
              <span className="work-title" style={{ fontSize: 22 }}>{next.title}</span>
              <span className="work-one" style={{ margin: 0 }}>{next.one}</span>
            </span>
          </Link>
        </section>
      </article>

      {viewer && c.attachments && (
        <Viewer files={c.attachments} mode={viewer} setMode={setViewer} onClose={() => setViewer(null)} />
      )}
    </div>
  )
}