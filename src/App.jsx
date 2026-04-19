import Header from './components/Header'
import Home from './pages/Hero'
import About from './pages/About'
import Contact from './pages/Content'
import Projects from './pages/Projects'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Header />
      <Footer />
    </>
  )
}

export default App