import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Validation côté client
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setSubmitting(false);
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Les mots de passe ne correspondent pas');
      setSubmitting(false);
      return;
    }

    try {
      await register(formData);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      {/* Panneau gauche avec information */}
      <div className={styles.leftPanel}>
        <div className={styles.logoSection}>
          <div className={styles.logoCircle}>
            <img src="/logo.png" alt="AEJT-RDC" className={styles.logoImage} />
          </div>
        </div>

        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>
            Rejoignez<br />
            <span className={styles.highlight}>AEJT-RDC</span>
          </h1>
          <p className={styles.welcomeText}>
            Créez votre compte pour faire partie de notre communauté et contribuer à nos actions.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Accès à tous les projets</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Participation aux événements</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              <span>Réseau de partenaires</span>
            </div>
          </div>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.circle1}></div>
          <div className={styles.circle2}></div>
          <div className={styles.circle3}></div>
        </div>
      </div>

      {/* Panneau droit avec formulaire */}
      <div className={styles.rightPanel}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Créer un compte</h2>
            <p className={styles.formSubtitle}>Remplissez les informations ci-dessous</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={styles.input}
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.input}
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Téléphone <span className={styles.optional}>(optionnel)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={styles.input}
                placeholder="+243 XXX XXX XXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                className={styles.input}
                placeholder="Minimum 8 caractères"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password_confirmation" className={styles.label}>
                Confirmer le mot de passe
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                className={styles.input}
                placeholder="Retapez votre mot de passe"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? 'Création en cours...' : 'Créer mon compte'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>OU</span>
          </div>

          <p className={styles.registerPrompt}>
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className={styles.registerLink}>
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}