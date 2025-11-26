import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import { FaUser, FaEnvelope, FaPhone, FaImage, FaEdit, FaLock, FaKey, FaShieldAlt, FaCheck, FaSave, FaSignOutAlt } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' ou 'security'
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [profileStatus, setProfileStatus] = useState({ type: '', message: '' });
  const [passwordStatus, setPasswordStatus] = useState({ type: '', message: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  if (!user) {
    return (
      <div style={{ padding: '6rem 0' }}>
        <Loader />
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : 'US';

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileStatus({ type: '', message: '' });

    try {
      const payload = {
        name: profileData.name,
        phone: profileData.phone,
        bio: profileData.bio,
        avatar: profileData.avatar || null,
      };

      const response = await updateProfile(payload);
      setProfileStatus({ type: 'success', message: response.message || 'Profil mis à jour avec succès !' });
    } catch (err) {
      setProfileStatus({ type: 'error', message: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordStatus({ type: '', message: '' });

    try {
      const response = await changePassword(passwordData);
      setPasswordStatus({ type: 'success', message: response.message || 'Mot de passe modifié avec succès !' });
      setPasswordData({
        current_password: '',
        password: '',
        password_confirmation: '',
      });
    } catch (err) {
      setPasswordStatus({ type: 'error', message: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <section className={styles.profileSection}>
      <div className={styles.container}>
        
        {/* En-tête avec cover et avatar */}
        <div className={styles.profileCover}>
          <div className={styles.coverGradient}></div>
          <div className={styles.avatarWrapper}>
            {profileData.avatar ? (
              <img src={profileData.avatar} alt={user.name} className={styles.avatarLarge} />
            ) : (
              <div className={styles.avatarLarge}>{initials}</div>
            )}
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{user.name}</h1>
              <p className={styles.userEmail}>{user.email}</p>
              <span className={styles.roleBadge}>
                {user.role === 'admin' ? (
                  <>
                    <FaShieldAlt /> Administrateur
                  </>
                ) : (
                  <>
                    <FaUser /> Utilisateur
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'profile' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser className={styles.tabIcon} />
              Profil
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'security' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <FaLock className={styles.tabIcon} />
              Sécurité
            </button>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            <FaSignOutAlt /> Déconnexion
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className={styles.tabContent}>
          
          {/* Onglet Profil */}
          {activeTab === 'profile' && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Informations personnelles</h2>
                  <p className={styles.cardSubtitle}>Gérez vos informations de profil</p>
                </div>
              </div>

              {profileStatus.message && (
                <div className={profileStatus.type === 'success' ? styles.alertSuccess : styles.alertError}>
                  <span className={styles.alertIcon}>
                    {profileStatus.type === 'success' ? <FaCheck /> : '⚠'}
                  </span>
                  {profileStatus.message}
                </div>
              )}

              <div className={styles.formWrapper}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      <FaUser className={styles.labelIcon} />
                      Nom complet
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={styles.input}
                      value={profileData.name}
                      onChange={handleProfileChange}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      <FaEnvelope className={styles.labelIcon} />
                      Adresse e-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`${styles.input} ${styles.inputDisabled}`}
                      value={profileData.email}
                      disabled
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      <FaPhone className={styles.labelIcon} />
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={styles.input}
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="avatar" className={styles.label}>
                      <FaImage className={styles.labelIcon} />
                      URL Avatar
                    </label>
                    <input
                      id="avatar"
                      name="avatar"
                      type="url"
                      className={styles.input}
                      value={profileData.avatar}
                      onChange={handleProfileChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="bio" className={styles.label}>
                    <FaEdit className={styles.labelIcon} />
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    className={styles.textarea}
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    placeholder="Parlez-nous de vous..."
                    rows={4}
                  />
                </div>

                <div className={styles.formActions}>
                  <button 
                    onClick={handleProfileSubmit}
                    className={styles.btnPrimary}
                    disabled={profileLoading}
                  >
                    {profileLoading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Sécurité */}
          {activeTab === 'security' && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h2 className={styles.cardTitle}>Modifier le mot de passe</h2>
                  <p className={styles.cardSubtitle}>Assurez-vous d'utiliser un mot de passe sécurisé</p>
                </div>
              </div>

              {passwordStatus.message && (
                <div className={passwordStatus.type === 'success' ? styles.alertSuccess : styles.alertError}>
                  <span className={styles.alertIcon}>
                    {passwordStatus.type === 'success' ? <FaCheck /> : '⚠'}
                  </span>
                  {passwordStatus.message}
                </div>
              )}

              <div className={styles.formWrapper}>
                <div className={styles.formGroup}>
                  <label htmlFor="current_password" className={styles.label}>
                    <FaKey className={styles.labelIcon} />
                    Mot de passe actuel
                  </label>
                  <input
                    id="current_password"
                    name="current_password"
                    type="password"
                    className={styles.input}
                    value={passwordData.current_password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                      <FaLock className={styles.labelIcon} />
                      Nouveau mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={styles.input}
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      minLength={8}
                    />
                    <small className={styles.helpText}>Minimum 8 caractères</small>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="password_confirmation" className={styles.label}>
                      <FaCheck className={styles.labelIcon} />
                      Confirmer le mot de passe
                    </label>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      className={styles.input}
                      value={passwordData.password_confirmation}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button 
                    onClick={handlePasswordSubmit}
                    className={styles.btnPrimary}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Mettre à jour le mot de passe
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}