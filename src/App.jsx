import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Handheld from './components/Handheld'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Why from './pages/Why'
import WriteNote from './pages/WriteNote'

export default function App() {
  const { pathname } = useLocation()

  // Show the handheld first, but only when someone lands on the home page.
  // Direct links (like /work/nudge) skip straight to that page.
  const [started, setStarted] = useState(pathname !== '/')

  if (!started) return <Handheld onStart={() => setStarted(true)} />

  return (
    <div className="app">
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
    </div>
  )
}