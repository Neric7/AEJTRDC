import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import History from './components/about/History'
import MissionVision from './components/about/MissionVision'
import Values from './components/about/Values'
import Objectives from './components/about/Objectives'
import NewsArticle from './components/news/NewsArticle';

// Pages
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Header fixe */}
        <Header />
        
        {/* Main Content - mt-24 pour compenser le header fixe */}
        <main className="mt-24">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<HomePage />} />
            <Route path="/index" element={<HomePage />} />

            {/* Page Contact */}
            <Route path="/about/contact" element={<ContactPage />} />

            {/* Actualités */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsPage />} />

            {/* Histoire */}
            <Route path="/about/history" element={<History />} />

            {/* Mission&Vision */}
            <Route path="/about/mission" element={<MissionVision />} />

            {/* Valeurs */}
            <Route path="/about/values" element={<Values />} />

            {/* Objectifs */}
            <Route path="/about/objectives" element={<Objectives />} />

            {/* Page 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </main>

        {/* Footer - À venir */}
        <Footer />
      </div>
      </Router>
  )
}

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-6">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <a 
          href="/" 
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

export default App