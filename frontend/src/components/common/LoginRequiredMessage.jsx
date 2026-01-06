import { Link, useLocation } from 'react-router-dom';
import { Lock, LogIn, UserPlus } from 'lucide-react';
import './LoginRequiredMessage.css';

export default function LoginRequiredMessage({ 
  title = "Connexion requise",
  message = "Vous devez vous connecter pour accéder à cette section.",
  showRegister = true 
}) {
  const location = useLocation();

  return (
    <div className="login-required-container">
      <div className="login-required-card">
        <div className="lock-icon">
          <Lock size={64} />
        </div>
        
        <h2 className="login-required-title">{title}</h2>
        <p className="login-required-message">{message}</p>
        
        <div className="login-required-actions">
          <Link 
            to="/login" 
            state={{ from: location.pathname }}
            className="btn btn-primary"
          >
            <LogIn size={20} />
            Se connecter
          </Link>
          
          {showRegister && (
            <Link 
              to="/register" 
              state={{ from: location.pathname }}
              className="btn btn-secondary"
            >
              <UserPlus size={20} />
              Créer un compte
            </Link>
          )}
        </div>
        
        <p className="login-required-note">
          Après connexion, vous serez automatiquement redirigé vers la page demandée.
        </p>
      </div>
    </div>
  );
}