import { useEffect, useRef, useState } from 'react'
import Ph from './Ph'
import './Attachments.css'

const pad = (n) => String(n).padStart(2, '0')
const clock = (s) => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`

// small reusable icons
const ICON = {
  left: <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />,
  right: <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />,
  play: <path d="M7 4l13 8-13 8z" fill="currentColor" />,
  pause: <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
}
const Icon = ({ name }) => <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{ICON[name]}</svg>

// make any element full screen (works for the slide screen and the video)
function goFullscreen(el) {
  if (!el) return
  if (el.requestFullscreen) el.requestFullscreen()
  else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen() // iPhone video
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
}

// ---------- the pop-up handheld ----------
export function Viewer({ files, mode, setMode, onClose }) {
  const { slides, video } = files
  const list = slides
    ? Array.from({ length: slides.count }, (_, k) => `${slides.folder}${pad(k + 1)}.${slides.ext}`)
    : []

  const [i, setI] = useState(0)            // current slide
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)
  const vidRef = useRef(null)
  const screenRef = useRef(null)
  const closeRef = useRef(null)
  const stripRef = useRef(null)

  // on open: focus Close, stop the page behind from scrolling. On close: undo both.
  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = ''; opener?.focus?.() }
  }, [])

  // Escape closes (unless we're in full screen), arrow keys flip slides
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose()
      if (mode === 'slides' && e.key === 'ArrowRight') setI((n) => Math.min(list.length - 1, n + 1))
      if (mode === 'slides' && e.key === 'ArrowLeft') setI((n) => Math.max(0, n - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, list.length, onClose])

  // keep the current preview in view inside the strip, and preload the next slide
  useEffect(() => {
    const strip = stripRef.current
    const on = strip?.querySelector('.av-th.on')
    if (strip && on) {
      const offset = on.getBoundingClientRect().left - strip.getBoundingClientRect().left
      strip.scrollTo({ left: strip.scrollLeft + offset - strip.clientWidth / 2 + on.clientWidth / 2, behavior: 'smooth' })
    }
    if (list[i + 1]) new Image().src = list[i + 1]
  }, [i, mode]) // eslint-disable-line react-hooks/exhaustive-deps

  // switching tabs resets the video
  const switchTo = (m) => { setPlaying(false); setTime(0); setMode(m) }

  const togglePlay = () => {
    const v = vidRef.current
    if (!v) return
    v.paused ? v.play() : v.pause()
  }

  return (
    <div className="av-overlay" role="dialog" aria-modal="true" aria-label="Attachment viewer"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="av-hh">
        {/* top half: the big screen */}
        <div className="av-lid">
          <span className="av-cam" aria-hidden="true" />
          <div className="av-top" ref={screenRef}>
            {mode === 'slides' ? (
              <>
                <img src={list[i]} alt={`Slide ${i + 1} of ${list.length}`} />
                <span className="av-flag" aria-hidden="true">{i + 1}</span>
              </>
            ) : (
              <>
                <video
                  ref={vidRef}
                  src={video.src}
                  poster={video.poster}
                  preload="metadata"
                  playsInline
                  onClick={togglePlay}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
                />
                {!playing && time === 0 && (
                  <button className="av-cover" type="button" onClick={togglePlay}>
                    <span className="av-bigplay" aria-hidden="true">
                      <svg width="34" height="34" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="#fff" /></svg>
                    </span>
                    <span className="av-cover-t">Play note</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="av-hinge" aria-hidden="true" />

        {/* bottom half: controls */}
        <div className="av-base">
          <div className="av-dpad" aria-hidden="true" />
          <div className="av-bot">
            {slides && video && (
              <div className="av-tabs">
                <button className="av-tab" type="button" aria-pressed={mode === 'slides'} onClick={() => switchTo('slides')}>📎 Slides</button>
                <button className="av-tab" type="button" aria-pressed={mode === 'video'} onClick={() => switchTo('video')}>▶ Video</button>
              </div>
            )}

            {mode === 'slides' ? (
              <>
                {/* clickable slide previews */}
                <div className="av-strip" ref={stripRef}>
                  {list.map((src, k) => (
                    <button key={src} className={'av-th' + (k === i ? ' on' : '')} type="button"
                      aria-label={`Slide ${k + 1}`} aria-current={k === i} onClick={() => setI(k)}>
                      <img src={src} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
                <div className="av-ctrl">
                  <button className="av-rb" type="button" aria-label="Previous slide" disabled={i === 0} onClick={() => setI(i - 1)}><Icon name="left" /></button>
                  <span className="av-count">{i + 1} / {list.length}</span>
                  <button className="av-rb" type="button" aria-label="Next slide" disabled={i === list.length - 1} onClick={() => setI(i + 1)}><Icon name="right" /></button>
                  <button className="av-rb" type="button" aria-label="Full screen" onClick={() => goFullscreen(screenRef.current)}><Icon name="expand" /></button>
                  <button className="av-close" type="button" ref={closeRef} onClick={onClose}>Close</button>
                </div>
              </>
            ) : (
              <>
                <div className="av-seekrow">
                  <input className="av-seek" type="range" min="0" max={dur || 0} step="0.1" value={time}
                    aria-label="Video position"
                    onChange={(e) => { vidRef.current.currentTime = +e.target.value; setTime(+e.target.value) }} />
                  <span className="av-time">{clock(time)} / {clock(dur)}</span>
                </div>
                <div className="av-ctrl">
                  <button className="av-rb" type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={togglePlay}>
                    <Icon name={playing ? 'pause' : 'play'} />
                  </button>
                  <button className="av-rb" type="button" aria-label="Full screen" onClick={() => goFullscreen(vidRef.current)}><Icon name="expand" /></button>
                  <button className="av-close" type="button" ref={closeRef} onClick={onClose}>Close</button>
                </div>
              </>
            )}
          </div>
          <div className="av-abxy" aria-hidden="true"><span className="x">X</span><span className="y">Y</span><span className="b">B</span><span className="a">A</span></div>
        </div>
      </div>
    </div>
  )
}

// ---------- the "Attached to this note" section at the end of the page ----------
export default function Attachments({ files, onOpen }) {
  const { slides, video, pdf } = files

  return (
    <section className="attach-sec" id="attachments" aria-label="Attachments">
      <span className="eyebrow">📎 attached to this note</span>
      <h2>See the full case study</h2>

      <div className="attach">
        {slides && (
          <button className="stamp" type="button" onClick={() => onOpen('slides')}>
            <span className="clip" aria-hidden="true" />
            <span className="stamp-img"><img src={`${slides.folder}01.${slides.ext}`} alt="" /></span>
            <span className="stamp-t">📎 Case study slides</span>
            <span className="stamp-s">{slides.count} pages · demo day deck</span>
          </button>
        )}
        {video && (
          <button className="stamp" type="button" onClick={() => onOpen('video')}>
            <span className="clip" aria-hidden="true" />
            <span className="stamp-img">
              <img src={video.poster} alt="" />
              <span className="stamp-play" aria-hidden="true"><span>
                <svg width="22" height="22" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="#fff" /></svg>
              </span></span>
            </span>
            <span className="stamp-t">▶ Demo video</span>
            <span className="stamp-s">Hi-fi prototype walkthrough · <Ph>{video.length}</Ph></span>
          </button>
        )}
      </div>

      {/* plain links for anyone who just wants the files */}
      <div className="plain-links">
        {pdf && <a href={pdf} download>Download PDF ↓</a>}
        {video && <a href={video.src} target="_blank" rel="noopener">Watch video in a new tab ↗</a>}
      </div>
    </section>
  )
}