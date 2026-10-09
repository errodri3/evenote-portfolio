import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Ph from '../components/Ph'
import { DEV, dateLine } from '../components/draft'
import { markArrived, markDelivered, useMail } from '../components/mail'
import NoteDialog from '../components/NoteDialog'
import Thumb from '../components/Thumb'
import { NOTES, START_NOTE } from '../data/notes'
import './Home.css'

// The secret note before it's opened: a sealed envelope with a NEW tag
function Sealed() {
  return (
    <span className="thumb sealed">
      <svg viewBox="0 0 100 60" aria-hidden="true">
        <path d="M22 14h56v34H22z" fill="#fff" stroke="#9CC8EE" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 14l28 20 28-20" fill="#EEF6FD" stroke="#9CC8EE" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="50" cy="33" r="5" fill="#E0627A" />
      </svg>
      <span className="new-tag">NEW</span>
    </span>
  )
}

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
  const mail = useMail()

  // the secret note is only on the wave once it's been delivered (see components/mail.js)
  const notes = NOTES.filter((n) => !n.secret || mail.delivered)
  const last = notes.length - 1
  const clamp = (i) => Math.max(0, Math.min(last, i))
  const secretAt = notes.findIndex((n) => n.secret)

  // the note was just delivered: play the arrival once, then slide over to it
  const arriving = mail.delivered && !mail.arrived
  useEffect(() => {
    if (!arriving) return
    const slide = setTimeout(() => setSel(secretAt), 450)
    const done = setTimeout(markArrived, 2600)
    return () => { clearTimeout(slide); clearTimeout(done) }
  }, [arriving, secretAt])


  // slide show: move to the next note every few seconds
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setSel((s) => (s + 1) % notes.length), 2600)
    return () => clearInterval(t)
  }, [playing, notes.length])

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
      if (e.key === 'ArrowLeft') setSel((s) => Math.max(0, s - 1))
      if (e.key === 'ArrowRight') setSel((s) => Math.min(last, s + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [last])

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
        setSel((s) => Math.max(0, Math.min(last, s + step)))
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
  }, [gap, last])

  // click once to pick a note, click the picked note to open it
  function clickNote(i) {
    if (drag.current.moved) return
    if (i !== sel) return setSel(i)
    navigate(notes[i].to)
  }

  // ▼ menu: Delivery Check (like SpotPass in Swapnote)
  function deliveryCheck() {
    setMenu(false)
    if (mail.unlocked && !mail.delivered) markDelivered()      // it arrives right now, with the animation
    else if (mail.delivered && !mail.opened) setDialog('waiting')
    else if (mail.opened) setDialog('none-read')
    else setDialog('none-yet')
  }

  // what shows under the wave for the picked note
  const note = notes[Math.min(sel, last)]
  const sealed = note.secret && !mail.opened

  return (
    <section className="home" aria-label="Home">
      {/* the "screen": everything lives inside this frame */}
      <div className="stage checker" onPointerDownCapture={(e) => { if (!e.target.closest('.home-menu, .menu-tile')) setPlaying(false) }}>
        {/* green wave behind the notes */}
        <svg className="ribbon" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-20 120C150 30 300 30 460 110S780 200 940 120S1150 40 1220 90"
            fill="none" stroke="#CFE8B4" strokeWidth="54" strokeLinecap="round" opacity=".75" />
        </svg>

        {/* the notes */}
        <div className={'track' + (dragging ? ' dragging' : '')} ref={trackRef}
          onPointerDown={onPointerDown} style={{ '--nw': noteW + 'px' }}>
          {notes.map((n, i) => {
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
                {n.secret && arriving && <span className="burst" aria-hidden="true">{Array.from({ length: 8 }, (_, k) => <i key={k} style={{ '--a': `${k * 45}deg` }} />)}</span>}
                <span className={n.secret && arriving ? 'arrive' : undefined} style={{ display: 'block' }}>
                  {n.secret && !mail.opened ? <Sealed /> : <Thumb note={n} />}
                </span>
              </button>
            )
          })}
        </div>

        {/* title of the picked note */}
        <div className="sel-meta">
          <div className="sel-title">{sealed ? 'New note from Eve!' : note.title}</div>
          <div className="sel-sub">{!sealed && <Ph>{dateLine(note.dates)}</Ph>}</div>
        </div>

        {/* arrows + slider */}
        <div className="scrub">
          <button className="round" type="button" aria-label="Previous note" onClick={() => setSel(clamp(sel - 1))}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <input className="scrubber" type="range" min="0" max={last} step="1" value={sel}
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

        {dialog === 'waiting' && (
          <NoteDialog text="Your new note from Eve is waiting on the wave. Look for the NEW tag!"
            actions={[['Show me', () => { setSel(secretAt); setDialog(null) }]]} onClose={() => setDialog(null)} />
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