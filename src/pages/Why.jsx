import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './About.css'
import './CaseStudy.css'

export default function Why() {
  // if the link was /why#how, scroll down to that section
  const { hash } = useLocation()
  useEffect(() => {
    if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <article className="cs">
      <Link className="back" to="/">← back home</Link>

      <div className="why-note">
        <span className="eyebrow">note 05 · about this site</span>
        <h1 className="cs-title">Why Swapnote?</h1>
        <p className="cs-lede">
          Swapnote was a 3DS app where you wrote little hand-drawn notes and traded them with friends. I was seven when I
          started drawing in it. It's where I first got into art and design, so it felt right to build my portfolio the same way.
        </p>
        <span className="pg-num" aria-hidden="true">5</span>
      </div>

      <section className="cs-sec">
        <span className="eyebrow">the idea</span>
        <h2>A portfolio you flip through</h2>
        <p>Most portfolios feel like a resume with pictures. I wanted mine to feel like opening something a friend made for you: a little playful, a little handmade, and still easy to read.</p>
        <div className="why-grid">
          <div className="why"><h3>Projects are notes</h3><p>Each project is a note you pick up and open. The front shows a peek of what's inside.</p></div>
          <div className="why"><h3>Contact is a note too</h3><p>Instead of a plain form, you can type or draw me a note, the same way you would to a friend.</p></div>
          <div className="why"><h3>Cozy but clear</h3><p>The fun lives on the home screen. Case studies stay clean and simple so they're easy to read.</p></div>
        </div>
      </section>

      <section className="cs-sec">
        <span className="eyebrow">the details</span>
        <h2>Small things I kept</h2>
        <p>The handheld you start on, the stylus cursor, the green wave the notes float on, the corner brackets when you pick one, the page number flag, and the date under every note. <span className="ph">[Add anything else you want to call out.]</span></p>
      </section>

      <section className="cs-sec" id="how">
        <span className="eyebrow">how I built it</span>
        <h2>From sketch to site</h2>
        <p><span className="ph">[Your sketches and concept boards, the tools you used (Vite, React, and so on), and what was hardest to build.]</span></p>
        <figure className="cs-shot"><span>[Concept board image]</span></figure>
      </section>

      <div className="ab-end">
        <p>want to see what I've built? <Link className="ulink" to="/work">→ selected work</Link></p>
        <p>or <Link className="ulink" to="/write">write me a note →</Link></p>
      </div>
    </article>
  )
}