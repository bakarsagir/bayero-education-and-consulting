import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Home } from './pages/home'
import { StudyAbroad } from './pages/study-abroad'
import { Programs } from './pages/programs'
import { Universities } from './pages/universities'
import Services from './pages/services'
import { Resources } from './pages/resources'
import Contact from './pages/contact'
import { NotFound } from './pages/not-found'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study-abroad" element={<StudyAbroad />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App