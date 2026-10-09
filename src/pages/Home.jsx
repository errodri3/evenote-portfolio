import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Mascot from '../components/Mascot'
import Ph from '../components/Ph'
import { DEV, dateLine } from '../components/draft'
import { useMail } from '../components/mail'
import NoteDialog from '../components/NoteDialog'
import Thumb from '../components/Thumb'
import { NOTES, START_NOTE } from '../data/notes'
import './Home.css'

const LAST = NOTES.length - 1

// The secret note before it's opened: a sealed envelope (with a NEW tag once it's delivered)
function Sealed({ fresh, shake }) {
  return (
    <span className={'thumb sealed' + (shake ? ' shake' : '')}>
      <svg viewBox="0 0 100 60" aria-hidden="true">
        <path d="M22 14h56v34H22z" fill="#fff" stroke="#9CC8EE" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 14l28 20 28-20" fill="#EEF6FD" stroke="#9CC8EE" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="50" cy="33" r="5" fill="#E0627A" />
      </svg>
      {fresh && <span className="new-tag">NEW</span>}
    </span>
  )
}
const clamp = (i) => Math.max(0, Math.min(LAST, i))

export default function Home({ onBack }) {
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const drag = useRef({ x: null, moved: false, off: 0 })

  const [sel, setSel] = useState(START_NOTE)   // which note is picked
  const [dragOff, setDragOff] = useState(0)    // how far you've dragged (in notes)
  const [dragging, setDragging] = useState(false)
  const [width, setWidth] = useState(900)      // width of the wave area
  const [scale, setScale] = useState(1)        // 1 on laptops, bigger on big screens (see html font-size in index.css)
  const [menu, setMenu] = useState(false)      // the ▼ menu next to Write a Note
  const [playing, setPlaying] = useState(false) // slide show
  const [dialog, setDialog] = useState(null)   // Delivery Check message
  const [wiggle, setWiggle] = useState(false)  // sealed note shakes when it can't open yet
  const mail = useMail()

  // first thing the mascot says, until you move to another note
  const [greet, setGreet] = useState(!mail.opened)
  if (greet && sel !== START_NOTE) setGreet(false)

  // slide show: move to the next note every few seconds
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setSel((s) => (s + 1) % NOTES.length), 2600)
    return () => clearInterval(t)
  }, [playing])

  // spacing depends on screen size
  const small = width < 620
  const noteW = (small ? 150 : 220) * scale
  const gap = small ? Math.min(165, width * 0.44) : 260 * scale

  // keep track of the wave area's width (and the page scale) when the window resizes
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
      setScale(parseFloat(getComputedStyle(document.documentElement).fontSize) / 16)
    })
    ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  // left/right arrow keys move between notes
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenu(false)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') setPlaying(false)
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
    if (i !== sel) return setSel(i)
    const n = NOTES[i]
    if (n.secret && !mail.unlocked) {            // still sealed: give it a little shake
      setWiggle(true)
      setTimeout(() => setWiggle(false), 500)
      return
    }
    navigate(n.to)
  }

  // ▼ menu: Delivery Check (like SpotPass in Swapnote)
  function deliveryCheck() {
    setMenu(false)
    if (mail.unlocked && !mail.opened) setDialog('new')
    else if (mail.opened) setDialog('none-read')
    else setDialog('none-yet')
  }

  // what the mascot says / what shows under the wave for the picked note
  const note = NOTES[sel]
  const sealed = note.secret && !mail.opened
  const tip = greet
    ? "Hi! Psst... make sure to check ALL my notes for something cool."
    : sealed
      ? (mail.unlocked ? 'A new note just came in for you! Tap it to open.' : "Shh... this one's still sealed. Look around my notes first!")
      : note.tip

  return (
    <section className="home" aria-label="Home">
      {/* the "screen": everything lives inside this frame */}
      <div className="stage checker" onPointerDownCapture={(e) => { if (!e.target.closest('.home-menu, .menu-tile')) setPlaying(false) }}>
        {/* green wave behind the notes */}
        <svg className="ribbon" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 120C150 30 300 30 460 110S780 200 940 120S1150 40 1220 90"
            fill="none" stroke="#CFE8B4" strokeWidth="54" strokeLinecap="round" opacity=".75" />
        </svg>

        {/* mascot + speech bubble */}
        <div className="bubble-row">
          <Mascot className="bob" />
          <div className="bubble" aria-live="polite">{tip}</div>
        </div>

        {/* the notes */}
        <div className={'track' + (dragging ? ' dragging' : '')} ref={trackRef}
          onPointerDown={onPointerDown} style={{ '--nw': noteW + 'px' }}>
          {NOTES.map((n, i) => {
            const off = i - sel + dragOff
            const dist = Math.abs(off)
            const on = i === sel
            const x = off * gap
            const y = Math.sin(off * 1.05) * 38 - (on ? 10 : 0)
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
                aria-label={(n.secret && !mail.opened ? 'Sealed note' : n.title) + (on ? '. Selected, press to open.' : '')}
                onClick={() => clickNote(i)}
              >
                <span className="brk" aria-hidden="true"><i /><i /><i /><i /></span>
                {n.secret && !mail.opened
                  ? <Sealed fresh={mail.unlocked} shake={on && wiggle} />
                  : <Thumb note={n} />}
              </button>
            )
          })}
        </div>

        {/* title of the picked note */}
        <div className="sel-meta">
          <div className="sel-title">{sealed ? (mail.unlocked ? 'New note from Eve!' : 'Sealed note') : note.title}</div>
          <div className="sel-sub">{!sealed && <Ph>{dateLine(note.dates)}</Ph>}</div>
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

        {/* bottom of the screen: Write a Note + the ▼ menu button (like the real Swapnote) */}
        <div className="stage-bar">
          <Link className="write-bar" to="/write">
            <span className="chk">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5 11-11" fill="none" stroke="var(--green-dk)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Write a Note
          </Link>
          <span className="menu-wrap">
          <button className={'menu-tile' + (menu ? ' on' : '')} type="button" aria-label="More options"
            aria-expanded={menu} aria-controls="home-menu" onClick={() => setMenu(!menu)}>
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4" width="14" height="5" rx="1.5" fill="#fff" /><path d="M5 12h14l-7 8z" fill="#fff" /></svg>
          </button>

          {menu && (
            <>
              <div className="menu-shade" onClick={() => setMenu(false)} aria-hidden="true" />
              <div className="home-menu" id="home-menu" role="menu">
                <button type="button" role="menuitem" onClick={() => { setPlaying(!playing); setMenu(false) }}>
                  {playing ? <>Stop<br />Slide Show</> : <>Start<br />Slide Show</>}
                </button>
                <button type="button" role="menuitem" onClick={deliveryCheck}>Delivery<br />Check</button>
                <button type="button" role="menuitem" onClick={onBack}>Back to<br />Handheld</button>
                {/* Settings: music, sound effects, recruiter mode. Only shows on your computer until you build it. */}
                {DEV && <button type="button" role="menuitem" disabled>Settings<br /><span className="ph">[music, sounds, recruiter mode]</span></button>}
              </div>
            </>
          )}
          </span>
        </div>

        {dialog === 'new' && (
          <NoteDialog text="You have a new note from Eve!" fresh
            actions={[['Open it', () => navigate('/why')], ['Later', () => setDialog(null)]]} onClose={() => setDialog(null)} />
        )}
        {dialog === 'none-yet' && (
          <NoteDialog text="No new notes yet. Look around my About page and projects, then check again!"
            actions={[['OK', () => setDialog(null)]]} onClose={() => setDialog(null)} />
        )}
        {dialog === 'none-read' && (
          <NoteDialog text="No new notes. You've read them all!"
            actions={[['OK', () => setDialog(null)]]} onClose={() => setDialog(null)} />
        )}
      </div>
    </section>
  )
}