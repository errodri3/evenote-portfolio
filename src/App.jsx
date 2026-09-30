import { Routes, Route } from 'react-router-dom'
import TopBar from './components/TopBar'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Why from './pages/Why'
import WriteNote from './pages/WriteNote'

export default function App() {
  return (
    <div className="app">
      <TopBar />
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