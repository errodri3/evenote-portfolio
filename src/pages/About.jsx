import { Link } from 'react-router-dom'
import Ph from '../components/Ph'
import { EXPERIENCE, TOOLBOX, OUTSIDE, LINKS } from '../data/about'
import './About.css'

export default function About() {
  return (
    <section className="ab" aria-label="About">
      {/* intro + polaroid */}
      <div className="ab-hero">
        <div className="ab-intro">
          <span className="eyebrow">note 01 · about</span>
          <h1 className="ab-title">Design should feel <span className="squig">personal!</span></h1>
          <p className="ab-lede">
            I design first and code second, so the thing I build feels the way I pictured it. Most of my work is about
            learning: tools and stories for kids, lessons for teachers, and research on how people learn with AI.
          </p>
          <div className="ab-links">
            <Link className="ulink" to="/why">why does this site look like a note app? →</Link>
            <Link className="ulink" to="/why#how">curious how I built this site? →</Link>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {LINKS.resume
              ? <a className="pill" href={LINKS.resume} target="_blank" rel="noopener">View Resume</a>
              : <button className="pill" type="button">View Resume <span className="ph">[add link]</span></button>}
            <Link className="pill ghost" to="/write">Write me a note</Link>
          </div>
        </div>

        <figure className="polaroid">
          <img src="/me.jpg" alt="Eve @ Birch Aquarium" />
          <figcaption>Hi! I'm Eve</figcaption>
        </figure>
      </div>

      {/* experience + communities */}
      <div className="ab-sec">
        <h2 className="ab-label">experience + communities</h2>
        <ul className="xp-list">
          {EXPERIENCE.map(([org, role], i) => (
            <li key={i}>
              <span className="xp-org"><Ph>{org}</Ph></span>
              <span className="xp-role"><Ph>{role}</Ph></span>
            </li>
          ))}
        </ul>
      </div>

      {/* toolbox */}
      <div className="ab-sec">
        <h2 className="ab-label">toolbox</h2>
        <div className="tool-grid">
          {TOOLBOX.map(([group, items]) => (
            <div key={group} className="tool">
              <h3>{group}</h3>
              <div className="tags">
                {items.map((t) => <span key={t} className="tag tool-tag"><Ph>{t}</Ph></span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* outside of work */}
      <div className="ab-sec">
        <h2 className="ab-label">outside of work you can find me...</h2>
        <ul className="out-list">
          {OUTSIDE.map(([verb, what]) => <li key={verb}><b>{verb}</b> <Ph>{what}</Ph></li>)}
        </ul>
      </div>

      <div className="ab-end">
        <p>want to see what I've built? <Link className="ulink" to="/work">→ selected work</Link></p>
        <p>curious why it looks like a note app? <Link className="ulink" to="/why">that's its own note →</Link></p>
      </div>
    </section>
  )
}