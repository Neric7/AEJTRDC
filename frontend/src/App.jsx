import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import History from './components/about/History'
import MissionVisionValeurs from './components/about/MissionVisionValeurs.jsx'
import Objectives from './components/about/Objectives'

// Pages
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx'

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
            <Route path="/contact" element={<ContactPage />} />

            {/* Actualités */}
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsPage />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Histoire */}
            <Route path="/about/history" element={<History />} />

            {/* Mission&Vision */}
            <Route path="/about/mission" element={<MissionVisionValeurs />} />

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

export default App