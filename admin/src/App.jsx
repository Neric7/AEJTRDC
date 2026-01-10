import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { authAPI } from './services/adminApi';
import { AlertProvider } from './context/AlertProvider';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContentPage from './pages/ContentPage';
import SettingsPage from './pages/SettingsPage';

// Components
import Sidebar from './components/Sidebar';
import SidebarToggle from './components/SidebarToggle'; // ← MÊME DOSSIER QUE Sidebar
import EthicalCommitmentsAdmin from './components/humanitarian/EthicalCommitmentsAdmin';
import ViolationReportAdmin from './components/humanitarian/ViolationReportAdmin';
import HumanitarianAlertsAdmin from './components/humanitarian/HumanitarianAlertsAdmin';
import AdvocacyTrackingAdmin from './components/humanitarian/AdvocacyTrackingAdmin';

// Route protégée
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authAPI.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Layout avec Sidebar
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* ← NOUVEAU: Bouton toggle flottant */}
      <SidebarToggle isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`admin-main ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <>
      <AlertProvider>
        <Routes>
          {/* Route publique - Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Routes protégées avec layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <DashboardPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/content/:type"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <ContentPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

            <Route path="humanitarian">
              {/* Engagements Éthiques */}
              <Route path="ethical-commitments" element={<EthicalCommitmentsAdmin />} />
              <Route path="violations" element={<ViolationReportAdmin />} />
              <Route path="alerts" element={<HumanitarianAlertsAdmin />} />
              <Route path="advocacy" element={<AdvocacyTrackingAdmin />} />

            </Route>

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <SettingsPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AlertProvider>

      {/* Toaster pour les notifications toast */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;