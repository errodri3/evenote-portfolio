import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Ph from '../components/Ph'
import { shows } from '../components/draft'
import { markOpened, useMail, PROJECTS_NEEDED } from '../components/mail'
import './CaseStudy.css'
import './Why.css'

// The secret note. Text with [brackets] only shows on your computer.
const DETAILS = "The handheld you start on, the stylus cursor, the green wave the notes float on, the corner brackets when you pick one, the page number flag, and the date under every note. [Add anything else you want to call out.]"
const HOW = '[Your sketches and concept boards, the tools you used (Vite, React, and so on), and what was hardest to build.]'

// Before it's delivered: a sealed envelope
function Sealed({ mail }) {
  const projects = mail.visited.filter((k) => k !== 'about').length
  return (
    <div className="why-sealed">
      <svg viewBox="0 0 100 64" aria-hidden="true">
        <path d="M8 10h84v46H8z" fill="#fff" stroke="#79B3E3" strokeWidth="3" strokeLinejoin="round" />
        <path d="M8 10l42 28 42-28" fill="#EEF6FD" stroke="#79B3E3" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="50" cy="36" r="6" fill="#E0627A" />
      </svg>
      <h1>This note hasn't been delivered yet</h1>
      <p>It's on its way! Look around my About page and at least {PROJECTS_NEEDED} projects, and it'll show up in your mail.</p>
      <ul className="why-checklist">
        <li className={mail.visited.includes('about') ? 'done' : ''}>Visit my <Link className="ulink" to="/about">About page</Link></li>
        <li className={projects >= PROJECTS_NEEDED ? 'done' : ''}>Look at {PROJECTS_NEEDED} <Link className="ulink" to="/work">projects</Link> ({Math.min(projects, PROJECTS_NEEDED)}/{PROJECTS_NEEDED})</li>
      </ul>
    </div>
  )
}

export default function Why() {
  const mail = useMail()
  const open = mail.unlocked

  // reading it counts as opening it
  useEffect(() => { if (open) markOpened() }, [open])

  if (!open) return <article className="cs why-page"><Sealed mail={mail} /></article>

  return (
    <article className="cs why-page">
      <Link className="back" to="/">← back home</Link>

      <section className="cs-note why-letter">
        <span className="eyebrow">a note from Eve · about this site</span>
        <h1 className="cs-title">Why does everything look like a 3DS note app?</h1>
        <p className="cs-lede">
          Swapnote was a 3DS app where you wrote little hand-drawn notes and traded them with friends. I was seven when I
          started drawing in it. It's where I first got into art and design, so it felt right to build my portfolio the same way.
        </p>

        <h2>A portfolio you flip through</h2>
        <p>Most portfolios feel like a resume with pictures. I wanted mine to feel like opening something a friend made for you: a little playful, a little handmade, and still easy to read.</p>
        <div className="why-grid">
          <div className="why-card"><h3>Projects are notes</h3><p>Each project is a note you pick up and open. The front shows a peek of what's inside.</p></div>
          <div className="why-card"><h3>Contact is a note too</h3><p>Instead of a plain form, you can type or draw me a note, the same way you would to a friend.</p></div>
          <div className="why-card"><h3>Cozy but clear</h3><p>The fun lives on the home screen. Case studies stay clean and simple so they're easy to read.</p></div>
        </div>

        <h2>Small things I kept</h2>
        <p><Ph>{DETAILS}</Ph></p>
        <p>And this note? In Swapnote, new notes showed up in your mail as you used the app. You found this one by looking around. Thanks for reading all the way here!</p>

        {shows(HOW) && (
          <>
            <h2>How I built it</h2>
            <p><Ph>{HOW}</Ph></p>
          </>
        )}

        <p className="why-sign">— Eve</p>
        <span className="note-flag" aria-hidden="true">✉</span>
      </section>

      <div className="why-end">
        <p>want to see what I've built? <Link className="ulink" to="/work">→ selected work</Link></p>
        <p>or <Link className="ulink" to="/write">write me a note back →</Link></p>
      </div>
    </article>
  )
}
