import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Handheld from './components/Handheld'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Why from './pages/Why'
import WriteNote from './pages/WriteNote'

// Scroll to the top whenever the page changes (unless the link has a #section)
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
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

  // Show the handheld first, but only when someone lands on the home page.
  // Direct links (like /work/nudge) skip straight to that page.
  const [started, setStarted] = useState(pathname !== '/')
  useStylusTaps()

  if (!started) return <Handheld onStart={() => setStarted(true)} />

  return (
    <div className="app">
      <ScrollToTop />
      <TopBar onHandheld={() => setStarted(false)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<CaseStudy />} />
          <Route path="/why" element={<Why />} />
          <Route path="/write" element={<WriteNote />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}