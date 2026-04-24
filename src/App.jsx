import Header from './components/Header'
import Home from './pages/Hero'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Background from './components/Background'
import Journey from './pages/Journey'

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* Fixed behind everything — persists across all page navigations */}
      <Background />

      {/* All page content sits above the background */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path='/journey' element={<Journey />}/>
        </Routes>
        <Footer />
      </div>

    </div>
  )
}

export default App