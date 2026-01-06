import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../common/Loader';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <div style={{ 
        padding: '4rem 0', 
        display: 'flex', 
        justifyContent: 'center',
        minHeight: '60vh',
        alignItems: 'center'
      }}>
        <Loader />
      </div>
    );
  }

  // Si non authentifié, rediriger vers la page de login
  // en sauvegardant la page demandée pour y revenir après connexion
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Si authentifié, afficher le contenu protégé
  return children;
}