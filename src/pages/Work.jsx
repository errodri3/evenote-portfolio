import { Link } from 'react-router-dom'
import Thumb from '../components/Thumb'
import Ph from '../components/Ph'
import { dateLine } from '../components/draft'
import { CASES, ORDER } from '../data/cases'
import { NOTES } from '../data/notes'
import './Work.css'

// finds the home-screen note for a project, so we can reuse its preview
export const noteFor = (id) => NOTES.find((n) => n.to === `/work/${id}`)

export default function Work() {
  return (
    <section aria-label="Selected Work">
      <div className="page-head">
        <span className="eyebrow">Selected Work</span>
        <h1 className="page-title">Things I've designed and built</h1>
        <p className="page-lede">Research, curriculum, and product design. Each one opens into a note about what I did.</p>
      </div>

      <div className="work-list">
        {ORDER.map((id) => {
          const c = CASES[id]
          return (
            <Link key={id} className="work-row" to={`/work/${id}`}>
              <Thumb note={noteFor(id)} />
              <span>
                <span className="work-meta">
                  <Ph>{dateLine(noteFor(id)?.dates) || c.year}</Ph>{c.lab && <> · {c.lab}</>}
                  {c.status && <span className="status-badge">🚧 {c.status}</span>}
                </span>
                <span className="work-title">{c.title}</span>
                <span className="work-one">{c.one}</span>
                <span className="tags">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</span>
                <span className="read">{c.status ? 'Read project note →' : 'Read case study →'}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}