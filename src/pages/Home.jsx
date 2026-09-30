import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mascot from '../components/Mascot'
import Thumb from '../components/Thumb'
import { NOTES, START_NOTE } from '../data/notes'
import './Home.css'

const LAST = NOTES.length - 1
const clamp = (i) => Math.max(0, Math.min(LAST, i))

export default function Home() {
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const drag = useRef({ x: null, moved: false, off: 0 })

  const [sel, setSel] = useState(START_NOTE)   // which note is picked
  const [dragOff, setDragOff] = useState(0)    // how far you've dragged (in notes)
  const [dragging, setDragging] = useState(false)
  const [width, setWidth] = useState(900)      // width of the wave area

  // spacing depends on screen size
  const small = width < 620
  const noteW = small ? 150 : 210
  const gap = small ? Math.min(165, width * 0.44) : 250

  // keep track of the wave area's width when the window resizes
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  // left/right arrow keys move between notes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') setSel((s) => clamp(s - 1))
      if (e.key === 'ArrowRight') setSel((s) => clamp(s + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // dragging the wave
  function onPointerDown(e) {
    drag.current = { x: e.clientX, moved: false, off: 0 }
  }
  useEffect(() => {
    const move = (e) => {
      const d = drag.current
      if (d.x === null) return
      const dx = e.clientX - d.x
      if (Math.abs(dx) > 8) { d.moved = true; setDragging(true) }
      if (d.moved) {
        d.off = Math.max(-1.2, Math.min(1.2, dx / gap))
        setDragOff(d.off)
      }
    }
    const up = () => {
      const d = drag.current
      if (d.x === null) return
      if (d.moved) {
        const step = Math.round(-d.off)
        setSel((s) => clamp(s + step))
        setDragOff(0)
        setTimeout(() => { d.moved = false }, 0) // so the drag doesn't count as a click
      }
      d.x = null
      setDragging(false)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [gap])

  // click once to pick a note, click the picked note to open it
  function clickNote(i) {
    if (drag.current.moved) return
    if (i === sel) navigate(NOTES[i].to)
    else setSel(i)
  }

  const note = NOTES[sel]

  return (
    <section className="home" aria-label="Home">
      <div className="stage checker">
        {/* green wave behind the notes */}
        <svg className="ribbon" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 120C150 30 300 30 460 110S780 200 940 120S1150 40 1220 90"
            fill="none" stroke="#CFE8B4" strokeWidth="54" strokeLinecap="round" opacity=".75" />
        </svg>

        {/* mascot + speech bubble */}
        <div className="bubble-row">
          <Mascot className="bob" />
          <div className="bubble" aria-live="polite">{note.tip}</div>
        </div>

        {/* the notes */}
        <div className={'track' + (dragging ? ' dragging' : '')} ref={trackRef}
          onPointerDown={onPointerDown} style={{ '--nw': noteW + 'px' }}>
          {NOTES.map((n, i) => {
            const off = i - sel + dragOff        // position relative to the picked note
            const dist = Math.abs(off)
            const on = i === sel
            const x = off * gap
            const y = Math.sin(off * 1.05) * 38 - (on ? 10 : 0)   // follows the wave
            const scale = on ? 1.32 : Math.max(0.72, 0.95 - dist * 0.08)
            const rotate = on ? 0 : off > 0 ? 5 : -5
            const hidden = dist > 2.6
            return (
              <button
                key={n.title}
                type="button"
                className={'note' + (on ? ' on' : '')}
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: 20 - Math.round(dist * 2),
                  opacity: hidden ? 0 : 1,
                }}
                tabIndex={hidden ? -1 : 0}
                aria-label={n.title + (on ? '. Selected, press to open.' : '')}
                onClick={() => clickNote(i)}
              >
                <span className="brk" aria-hidden="true"><i /><i /><i /><i /></span>
                <Thumb note={n} />
              </button>
            )
          })}
        </div>

        {/* title of the picked note */}
        <div className="sel-meta">
          <div className="sel-title">{note.title}</div>
          <div className="sel-sub">{note.sub}</div>
        </div>

        {/* arrows + slider */}
        <div className="scrub">
          <button className="round" type="button" aria-label="Previous note" onClick={() => setSel(clamp(sel - 1))}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <input className="scrubber" type="range" min="0" max={LAST} step="1" value={sel}
            aria-label="Scroll through notes" onChange={(e) => setSel(+e.target.value)} />
          <button className="round" type="button" aria-label="Next note" onClick={() => setSel(clamp(sel + 1))}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {/* Write a Note bar */}
      <Link className="write-bar" to="/write">
        <span className="chk">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5 11-11" fill="none" stroke="var(--green-dk)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        Write a Note
      </Link>
    </section>
  )
}