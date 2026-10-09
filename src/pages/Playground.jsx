import { useEffect, useRef, useState } from 'react'
import Ph from '../components/Ph'
import Mascot from '../components/Mascot'
import { DEV, shows } from '../components/draft'
import { KINDS, PIECES } from '../data/playground'
import './Playground.css'

// Big view of one piece, with arrows to flip through the rest
function Lightbox({ list, index, setIndex, onClose }) {
  const p = list[index]
  const closeRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; opener?.focus?.() }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % list.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + list.length) % list.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [list.length, onClose, setIndex])

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={p.title}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <figure className="lb-card">
        <img src={p.src} alt={p.title} />
        <figcaption>
          <span className="lb-t"><Ph>{p.title}</Ph></span>
          <span className="lb-s">{p.kind} · {p.year}</span>
          {p.about && shows(p.about) && <span className="lb-a"><Ph>{p.about}</Ph></span>}
          {p.link && <a className="pill" href={p.link} target="_blank" rel="noopener">Visit site ↗</a>}
        </figcaption>
        <div className="lb-ctrl">
          {list.length > 1 && <button className="round" type="button" aria-label="Previous" onClick={() => setIndex((index - 1 + list.length) % list.length)}>‹</button>}
          <span className="lb-count">{index + 1} / {list.length}</span>
          {list.length > 1 && <button className="round" type="button" aria-label="Next" onClick={() => setIndex((index + 1) % list.length)}>›</button>}
          <button className="pill ghost" type="button" ref={closeRef} onClick={onClose}>Close</button>
        </div>
      </figure>
    </div>
  )
}

export default function Playground() {
  const [kind, setKind] = useState('All')
  const [broken, setBroken] = useState(() => new Set())   // images that didn't load
  const [open, setOpen] = useState(null)                  // index of the piece shown big

  // live site: only finished pieces (no [brackets], image exists)
  const ready = PIECES.filter((p) => DEV || (shows(p.title) && !broken.has(p.src)))
  const kinds = KINDS.filter((k) => ready.some((p) => p.kind === k))
  const list = kind === 'All' ? ready : ready.filter((p) => p.kind === kind)
  const markBroken = (src) => setBroken((b) => new Set(b).add(src))

  return (
    <section className="pg-page" aria-label="Playground">
      <div className="page-head">
        <span className="eyebrow">Playground</span>
        <h1 className="page-title">Things I make for fun</h1>
        <p className="page-lede">Art, illustrations, logos, and side projects. Work that isn't tied to a job, just me making things.</p>
      </div>

      {kinds.length > 1 && (
        <div className="pg-filters" role="group" aria-label="Filter by type">
          {['All', ...kinds].map((k) => (
            <button key={k} type="button" className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>{k}</button>
          ))}
        </div>
      )}

      {list.length === 0 ? (
        <div className="pg-empty">
          <Mascot size={64} className="bob" />
          <p className="pg-empty-t">New pieces are on the way!</p>
          <p className="pg-empty-s">I'm putting together my favorite drawings, logos, and side projects. Check back soon.</p>
        </div>
      ) : (
        <div className="pg-grid">
          {list.map((p, i) => (
            <figure key={p.src} className="piece" style={{ '--tilt': `${(i % 3) - 1}deg` }}>
              {broken.has(p.src) ? (
                <div className="piece-slot">
                  <span>{p.kind}</span>
                  <code>public{p.src}</code>
                </div>
              ) : (
                <button type="button" className="piece-img" aria-label={`Open ${p.title}`} onClick={() => setOpen(i)}>
                  <img src={p.src} alt="" loading="lazy" onError={() => markBroken(p.src)} />
                </button>
              )}
              <figcaption>
                <span className="piece-t"><Ph>{p.title}</Ph></span>
                <span className="piece-s">{p.kind} · {p.year}</span>
                {p.link && <a className="ulink" href={p.link} target="_blank" rel="noopener">visit site ↗</a>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {open !== null && list[open] && (
        <Lightbox list={list} index={open} setIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
