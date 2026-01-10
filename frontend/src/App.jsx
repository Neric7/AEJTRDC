import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './i18n';
import { ScrollToTop } from './hooks/useScrollToTop';

// Components
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import History from './components/about/History'
import MissionVisionValeurs from './components/about/MissionVisionValeurs'
import Objectives from './components/about/Objectives'
import DomaineDetail from './components/details_domains/DomaineDetail'
import MyApplicationsPage from './components/careers/MyApplicationsPage';

// Pages
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import NewsPage from './pages/NewsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage'
import PartnersPage from './pages/PartnersPage';
import DomainsPage from './pages/DomainsPage';
import ProjectsPage from './pages/ProjectsPage';
import CareersPage from './pages/CareersPage';
import JobsPage from './pages/JobsPage';
import DonatePage from './pages/DonatePage';
import TeamPage from './pages/TeamPage'; 
import HumanitarianSpacePage from './pages/HumanitarianSpacePage'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
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

            {/* Bénévolat */}
            <Route path="/volunteer" element={<CareersPage />} />

            {/* Offres d'emploi */}
            <Route path="/careers" element={<JobsPage />} />

            {/* Donate */}
            <Route path="/donate" element={<DonatePage />} />

            {/* Humanitarian Space */}
            <Route path="/humanitarian" element={<HumanitarianSpacePage />} />

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

            {/* SUIVI DES CANDIDATURES (PROTÉGÉE) */}
            <Route
              path="/my-applications"
              element={
                <ProtectedRoute>
                  <MyApplicationsPage />
                </ProtectedRoute>
              }
            />

            {/* Histoire */}
            <Route path="/about/history" element={<History />} />

            {/* Mission&Vision */}
            <Route path="/about/mission" element={<MissionVisionValeurs />} />

            {/* Objectifs */}
            <Route path="/about/objectives" element={<Objectives />} />

            {/* ← NOUVEAU: Équipe */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about/team" element={<TeamPage />} />

            {/* Partenaires */}
            <Route path="/partners" element={<PartnersPage />} />

            {/* Domains */}
            <Route path="/domains" element={<DomainsPage />} />

            {/* Details Domains */}
            <Route path="/domains/:id" element={<DomaineDetail />} />

            {/* Projects */}
            <Route path="/projects" element={<ProjectsPage />} />
            
            {/* Page 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  )
}

export default App