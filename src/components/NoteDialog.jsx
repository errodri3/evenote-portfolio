import { useEffect, useRef } from 'react'
import './NoteDialog.css'

// A pop-up message, like "You have a new note from Nikki!" in Swapnote.
// actions = [['Button text', onClick], ...]   fresh = show the envelope flying in
export default function NoteDialog({ text, actions, onClose, fresh }) {
  const firstRef = useRef(null)
  const closeRef = useRef(onClose)
  useEffect(() => { closeRef.current = onClose })

  // focus the first button, Escape closes, focus goes back when it closes
  useEffect(() => {
    const opener = document.activeElement
    firstRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') closeRef.current() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); opener?.focus?.() }
  }, [])

  return (
    <div className="nd-shade" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="nd" role="alertdialog" aria-modal="true" aria-label={text}>
        {fresh && (
          <svg className="nd-env" viewBox="0 0 100 64" aria-hidden="true">
            <path d="M8 10h84v46H8z" fill="#fff" stroke="#79B3E3" strokeWidth="3" strokeLinejoin="round" />
            <path d="M8 10l42 28 42-28" fill="#EEF6FD" stroke="#79B3E3" strokeWidth="3" strokeLinejoin="round" />
            <path d="M44 30l12 8-12 8z" fill="#79B3E3" />
          </svg>
        )}
        <p className="nd-text">{text}</p>
        <div className="nd-actions">
          {actions.map(([label, fn], i) => (
            <button key={label} ref={i === 0 ? firstRef : null} type="button"
              className={'nd-btn' + (i === 0 ? ' main' : '')} onClick={fn}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
