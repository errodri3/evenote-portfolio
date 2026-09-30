import { Link, Navigate, useParams } from 'react-router-dom'
import Thumb from '../components/Thumb'
import Ph from '../components/Ph'
import { CASES, ORDER } from '../data/cases'
import { noteFor } from './Work'
import './Work.css'
import './CaseStudy.css'

// gray dashed box where an image will go
function ImageSlot({ label }) {
  return (
    <figure className="cs-shot">
      <svg width="54" height="54" viewBox="0 0 24 24" aria-hidden="true">
        <g fill="none" stroke="#8FA882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="2" /><path d="M3 18l6-5 4 3 3-2 5 4" />
        </g>
      </svg>
      <span>[{label}]</span>
    </figure>
  )
}

export default function CaseStudy() {
  const { id } = useParams()
  const c = CASES[id]
  if (!c) return <Navigate to="/work" replace />  // unknown project → back to the list

  const nextId = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]
  const next = CASES[nextId]

  return (
    <article className="cs">
      <Link className="back" to="/work">← back to work</Link>

      {/* role / timeline / tools / team */}
      <dl className="meta">
        <div><dt>role</dt><dd><Ph>{c.role}</Ph></dd></div>
        <div><dt>timeline</dt><dd><Ph>{c.timeline}</Ph></dd></div>
        <div><dt>tools</dt><dd><Ph>{c.tools}</Ph></dd></div>
        <div><dt>team</dt><dd><Ph>{c.team}</Ph></dd></div>
      </dl>

      <h1 className="cs-title">{c.title}</h1>
      <p className="cs-lede"><Ph>{c.lede}</Ph></p>
      <div className="tags">
        <span className="tag" style={{ background: '#fff' }}><Ph>{c.year}</Ph></span>
        {c.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <ImageSlot label={`Hero image for ${c.short}`} />

      {/* 01 — context, 02 — problem, ... */}
      {c.sections.map((s, i) => (
        <section key={s.k} className="cs-sec">
          <span className="eyebrow">{String(i + 1).padStart(2, '0')} — {s.k}</span>
          <h2>{s.h}</h2>
          <p><Ph>{s.p}</Ph></p>

          {s.decisions && (
            <div className="decisions">
              {s.decisions.map((d) => (
                <div key={d.b} className="decision">
                  <b><Ph>{d.b}</Ph></b>
                  <p><Ph>{d.p}</Ph></p>
                </div>
              ))}
            </div>
          )}

          {s.image && <ImageSlot label={`${s.h} image`} />}

          {s.stats && (
            <div className="stats">
              {s.stats.map(([n, label]) => (
                <div key={label} className="stat">
                  <span className="stat-n">{n}</span>
                  <span className="stat-l">{label}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* next project */}
      <section className="cs-sec">
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
  )
}