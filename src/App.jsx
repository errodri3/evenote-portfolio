import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Handheld from './components/Handheld'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Why from './pages/Why'
import WriteNote from './pages/WriteNote'
import Playground from './pages/Playground'
import NoteDialog from './components/NoteDialog'
import { markDelivered, markVisit, useMail } from './components/mail'

// true when the screen matches a media query (e.g. small screens)
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// Scroll to the top whenever the page changes (unless the link has a #section)
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

// "You have a new note from Eve!" pops up once someone has looked around enough
function NewNotePopup() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mail = useMail()
  const [ready, setReady] = useState(false)

  useEffect(() => { markVisit(pathname) }, [pathname])

  // wait a moment after the page loads so it doesn't pop up instantly
  const due = mail.unlocked && !mail.delivered && pathname !== '/why'
  useEffect(() => {
    if (!due) return
    const t = setTimeout(() => setReady(true), 1400)
    return () => clearTimeout(t)
  }, [due])

  if (!due || !ready) return null
  return (
    <NoteDialog text="You have a new note from Eve!" fresh
      actions={[['Open it', () => { markDelivered(); navigate('/') }], ['Later', markDelivered]]}
      onClose={markDelivered} />
  )
}

// Little green ring wherever someone taps/clicks, like a stylus
function useStylusTaps() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onDown = (e) => {
      const ring = document.createElement('span')
      ring.className = 'tap'
      ring.style.left = e.clientX + 'px'
      ring.style.top = e.clientY + 'px'
      document.body.appendChild(ring)
      setTimeout(() => ring.remove(), 460)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [])
}

export default function App() {
  const { pathname } = useLocation()
  const small = useMediaQuery('(max-width: 960px)')

  // Show the handheld first, but only when someone lands on the home page.
  const [started, setStarted] = useState(pathname !== '/')
  const [menuOpen, setMenuOpen] = useState(false)   // side panel on small screens
  useStylusTaps()

  // close the side panel when the page changes, or when Escape is pressed
  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function goHandheld() {
    setMenuOpen(false)
    setStarted(false)
    window.scrollTo(0, 0)
  }

  if (!started) return <Handheld onStart={() => setStarted(true)} />

  return (
    <div className="shell">
      <ScrollToTop />
      <NewNotePopup />
      <TopBar menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <Sidebar
        open={menuOpen}
        hidden={small && !menuOpen}   // hidden panels can't be tabbed into
        onClose={() => setMenuOpen(false)}
      />
      {small && menuOpen && <div className="backdrop" onClick={() => setMenuOpen(false)} />}

      <div className="main-col">
        <main className="content">
          <Routes>
            <Route path="/" element={<Home onBack={goHandheld} />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<CaseStudy />} />
            <Route path="/why" element={<Why />} />
            <Route path="/write" element={<WriteNote />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}