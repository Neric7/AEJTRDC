import './i18n'  // ⬅️ AJOUTEZ CETTE LIGNE EN PREMIER
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global stylesheet intentionally removed to avoid style conflicts
import App from './App.jsx'
import './index.css'  // Cette ligne doit être présente
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)