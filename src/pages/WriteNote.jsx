import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Mascot from '../components/Mascot'
import './WriteNote.css'

const W = 1000, H = 600   // canvas drawing size (it scales to fit the screen)
const PAGES = 4
const INKS = [['Black', '#2B2B2B'], ['Red', '#D8434E'], ['Blue', '#3B7DD8'], ['Green', '#3E9A4E']]
const STATIONERY = ['st-green', 'st-dots', 'st-blue']
// colors used when turning a page into an image (match WriteNote.css)
const PAPER = {
  'st-green': { frame: '#A9CF7E', line: '#E4EAD8', dotted: false },
  'st-dots': { frame: '#EFD34A', line: '#E4EAD8', dotted: true },
  'st-blue': { frame: '#9CC8EE', line: '#DCE9F6', dotted: false },
}

// small line icons for the toolbar
const ICONS = {
  type: <><path d="M4 7V5h16v2" /><path d="M12 5v14M9 19h6" /></>,
  pen: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></>,
  eraser: <><path d="M8 20h12" /><path d="M4 15l9-9 6 6-8 8H8z" /><path d="M9 10l6 6" /></>,
  trash: <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />,
  up: <path d="M5 15l7-7 7 7" />,
  down: <path d="M5 9l7 7 7-7" />,
  send: <><path d="M12 20V5" /><path d="M5 11l7-7 7 7" /></>,
}
function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</g>
    </svg>
  )
}

// e.g. "09/30/2026 Wed."
function today() {
  const d = new Date()
  const days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.']
  const p = (n) => String(n).padStart(2, '0')
  return `${p(d.getMonth() + 1)}/${p(d.getDate())}/${d.getFullYear()} ${days[d.getDay()]}`
}

// split typed text into lines that fit the paper width
function wrapText(ctx, text, maxWidth) {
  const lines = []
  text.split('\n').forEach((para) => {
    let line = ''
    para.split(' ').forEach((word) => {
      const test = line ? line + ' ' + word : word
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word }
      else line = test
    })
    lines.push(line)
  })
  return lines
}

export default function WriteNote() {
  const canvases = useRef([])                     // the 4 canvas elements
  const drawn = useRef(Array(PAGES).fill(false))  // which pages have drawings
  const stroke = useRef(null)                     // the line being drawn right now

  const [mode, setMode] = useState('type')        // 'type' | 'pen' | 'eraser'
  const [ink, setInk] = useState(0)
  const [page, setPage] = useState(0)
  const [st, setSt] = useState(0)                 // stationery style
  const [texts, setTexts] = useState(Array(PAGES).fill(''))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')        // message under the toolbar
  const [sending, setSending] = useState(false)
  const [flying, setFlying] = useState(false)     // send animation
  const [sent, setSent] = useState(false)

  // round pen ends for smooth lines
  useEffect(() => {
    canvases.current.forEach((c) => {
      if (!c) return
      const ctx = c.getContext('2d')
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    })
  }, [sent])

  // turn a mouse/touch position into canvas coordinates
  function point(e, c) {
    const r = c.getBoundingClientRect()
    return { x: ((e.clientX - r.left) * W) / r.width, y: ((e.clientY - r.top) * H) / r.height }
  }

  // ----- drawing -----
  function onDown(e, i) {
    if (mode === 'type') return
    e.preventDefault()
    const c = canvases.current[i]
    c.setPointerCapture(e.pointerId)
    const ctx = c.getContext('2d')
    ctx.globalCompositeOperation = mode === 'eraser' ? 'destination-out' : 'source-over'
    ctx.strokeStyle = ctx.fillStyle = INKS[ink][1]
    ctx.lineWidth = mode === 'eraser' ? 34 : 6
    const p = point(e, c)
    ctx.beginPath(); ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2); ctx.fill()
    if (mode === 'pen') drawn.current[i] = true
    stroke.current = { i, last: p }
  }
  function onMove(e, i) {
    const s = stroke.current
    if (!s || s.i !== i) return
    const c = canvases.current[i]
    const ctx = c.getContext('2d')
    const p = point(e, c)
    ctx.beginPath(); ctx.moveTo(s.last.x, s.last.y); ctx.lineTo(p.x, p.y); ctx.stroke()
    s.last = p
  }
  const onUp = () => { stroke.current = null }

  // ----- turn one page into a PNG image (paper + lines + text + drawing) -----
  function renderPage(i) {
    const out = document.createElement('canvas')
    out.width = W; out.height = H
    const ctx = out.getContext('2d')
    const paper = PAPER[STATIONERY[st]]

    // paper + lines
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = paper.line
    for (let y = 138; y < H - 50; y += 80) ctx.fillRect(50, y, W - 100, 2)

    // frame
    ctx.strokeStyle = paper.frame
    ctx.lineWidth = paper.dotted ? 12 : 7
    if (paper.dotted) { ctx.setLineDash([0, 22]); ctx.lineCap = 'round' }
    ctx.beginPath(); ctx.roundRect(26, 26, W - 52, H - 52, 10); ctx.stroke()
    ctx.setLineDash([])

    // typed text
    ctx.fillStyle = INKS[ink][1]
    ctx.font = '56px Gaegu, cursive'
    wrapText(ctx, texts[i], W - 100).slice(0, 5).forEach((line, k) => ctx.fillText(line, 50, 131 + k * 80))

    // drawing on top
    ctx.drawImage(canvases.current[i], 0, 0)

    // green page flag
    ctx.fillStyle = '#7CC04B'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 5
    ctx.beginPath(); ctx.arc(W - 54, H - 54, 32, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    ctx.fillStyle = '#fff'; ctx.font = 'bold 34px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(String(i + 1), W - 54, H - 52)

    return out.toDataURL('image/png')
  }

  // ----- toolbar actions -----
  function clearPage() {
    canvases.current[page].getContext('2d').clearRect(0, 0, W, H)
    drawn.current[page] = false
    setTexts((t) => t.map((v, k) => (k === page ? '' : v)))
  }

  function reset() {
    canvases.current.forEach((c) => c?.getContext('2d').clearRect(0, 0, W, H))
    drawn.current = Array(PAGES).fill(false)
    setTexts(Array(PAGES).fill('')); setName(''); setEmail(''); setStatus('')
    setPage(0); setMode('type'); setFlying(false); setSent(false)
  }

  // ----- send -----
  async function onSubmit(e) {
    e.preventDefault()
    if (sending) return
    const used = texts.map((t, i) => t.trim() || drawn.current[i])  // which pages have something
    if (!name.trim()) return setStatus('Add your name so I know who the note is from.')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setStatus('Add an email address like you@email.com so I can write back.')
    if (!used.some(Boolean)) return setStatus('Your note is empty. Type or draw something first.')
    setStatus('')

    const pages = []
    used.forEach((u, i) => { if (u) pages.push({ text: texts[i], image: renderPage(i) }) })
    const payload = { name: name.trim(), email: email.trim(), pages }

    if (import.meta.env.DEV) {
      // the /api function only runs on Vercel, so locally we just log it
      console.info('Dev mode: note not sent. This is what would be sent:', payload)
    } else {
      setSending(true)
      try {
        const res = await fetch('/api/send-note', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
      } catch {
        setSending(false)
        return setStatus("Your note didn't send. Check your connection and try again.")
      }
      setSending(false)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return setSent(true)
    setFlying(true)
    setTimeout(() => { setSent(true); window.scrollTo(0, 0) }, 800)
  }

  // ----- thank-you screen -----
  if (sent) {
    return (
      <div className="sent">
        <Mascot size={110} className="bob" />
        <h2>Thank you!</h2>
        <p>Your note is on its way. I'll write back soon.</p>
        <div className="sent-actions">
          <Link className="pill" to="/">Back home</Link>
          <button className="pill ghost" type="button" onClick={reset}>Write another</button>
        </div>
      </div>
    )
  }

  // ----- compose screen -----
  return (
    <form className="compose" onSubmit={onSubmit} noValidate>
      <div className="page-head">
        <span className="eyebrow">Write a Note</span>
        <h1 className="page-title compose-title">Send me a note</h1>
        <p className="page-lede compose-lede">Type a message, draw something, or both. To: <b>Evelyn</b></p>
      </div>

      <div className="fields">
        <label className="field">Your name
          <input type="text" autoComplete="name" placeholder="Who's this from?" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">Your email
          <input type="email" autoComplete="email" placeholder="So I can write back" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>

      {/* the note paper */}
      <div className={'screen-top' + (flying ? ' fly' : '')}>
        <div className={`paper ${STATIONERY[st]} ${mode === 'type' ? 'mode-type' : 'mode-draw'}`}>
          <div className="lines" aria-hidden="true" />
          {Array.from({ length: PAGES }, (_, i) => (
            <div key={i} className="pg" hidden={i !== page}>
              <textarea
                aria-label={`Note text, page ${i + 1}`}
                placeholder={i === 0 ? 'Hi Eve! ...' : ''}
                style={{ color: INKS[ink][1] }}
                value={texts[i]}
                onChange={(e) => setTexts((t) => t.map((v, k) => (k === i ? e.target.value : v)))}
              />
              <canvas
                ref={(el) => { canvases.current[i] = el }}
                width={W} height={H}
                aria-label={`Drawing area, page ${i + 1}`}
                onPointerDown={(e) => onDown(e, i)}
                onPointerMove={(e) => onMove(e, i)}
                onPointerUp={onUp}
                onPointerCancel={onUp}
              />
            </div>
          ))}
          <span className="note-flag" aria-hidden="true">{page + 1}</span>
        </div>
        <div className="paper-date">{today()}</div>
      </div>

      {/* toolbar */}
      <div className="toolbar" role="toolbar" aria-label="Note tools">
        <Link className="tb quit" to="/">Quit</Link>

        <div className="tgroup">
          <button className="tb" type="button" aria-pressed={mode === 'type'} onClick={() => setMode('type')}><Icon name="type" />Type</button>
          <button className="tb" type="button" aria-pressed={mode === 'pen'} onClick={() => setMode('pen')}><Icon name="pen" />Pen</button>
          <button className="tb" type="button" aria-pressed={mode === 'eraser'} onClick={() => setMode('eraser')}><Icon name="eraser" />Eraser</button>
        </div>

        <div className="tgroup">
          {INKS.map(([label, hex], i) => (
            <button key={label} className="ink" type="button" aria-pressed={i === ink} aria-label={`${label} ink`}
              style={{ background: hex }}
              onClick={() => { setInk(i); if (mode === 'eraser') setMode('pen') }} />
          ))}
        </div>

        <div className="tgroup">
          <button className="tb" type="button" onClick={() => setSt((s) => (s + 1) % STATIONERY.length)}>Stationery</button>
          <button className="tb" type="button" aria-label="Clear this page" onClick={clearPage}><Icon name="trash" /></button>
        </div>

        <div className="tgroup">
          <button className="pg-btn" type="button" aria-label="Previous page" onClick={() => setPage((p) => (p + PAGES - 1) % PAGES)}><Icon name="up" size={16} /></button>
          <span className="pgnum">{page + 1} / {PAGES}</span>
          <button className="pg-btn" type="button" aria-label="Next page" onClick={() => setPage((p) => (p + 1) % PAGES)}><Icon name="down" size={16} /></button>
        </div>

        <button className="tb send" type="submit" disabled={sending}><Icon name="send" />{sending ? 'Sending…' : 'Send'}</button>
      </div>

      <div className="status" aria-live="polite">{status}</div>
    </form>
  )
}