import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ConfirmModal from '../components/common/ConfirmModal';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaLock, FaCheck, FaSave, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaBriefcase, FaTimes, FaTrash } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateProfile, uploadAvatar, deleteAvatar, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // États pour les modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
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
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Initialiser les données du profil
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
      });
    }
  }, [user]);

  // Calculer la progression dynamiquement
  const calculateProgress = () => {
    if (!user) return 0;
    
    let progress = 10; // Account setup
    
    if (user.avatar) progress += 20;
    if (user.name) progress += 15;
    if (user.phone) progress += 15;
    if (user.location) progress += 20;
    if (user.bio && user.bio.length > 20) progress += 20;
    
    return Math.min(progress, 100);
  };

  const progress = calculateProgress();

  const getProgressItems = () => [
    { label: 'Setup account', completed: true, value: 10 },
    { label: 'Upload your photo', completed: !!user?.avatar, value: 20 },
    { label: 'Personal Info', completed: !!(user?.name && user?.phone), value: 15 },
    { label: 'Location', completed: !!user?.location, value: 20 },
    { label: 'Biography', completed: !!(user?.bio && user.bio.length > 20), value: 20 },
  ];

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

  // Gestion avatar
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith('image/')) {
      setProfileStatus({ type: 'error', message: 'Veuillez sélectionner une image valide' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setProfileStatus({ type: 'error', message: 'L\'image ne doit pas dépasser 2MB' });
      return;
    }

    setAvatarFile(file);
    
    // Prévisualisation
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setAvatarLoading(true);
    setProfileStatus({ type: '', message: '' });

    try {
      const response = await uploadAvatar(avatarFile);
      setProfileStatus({ type: 'success', message: response.message || 'Avatar uploadé avec succès !' });
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (err) {
      setProfileStatus({ type: 'error', message: err.message });
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleAvatarDelete = async () => {
    setShowDeleteAvatarModal(true);
  };

  const confirmAvatarDelete = async () => {
    setAvatarLoading(true);
    setProfileStatus({ type: '', message: '' });

    try {
      const response = await deleteAvatar();
      setProfileStatus({ type: 'success', message: response.message || 'Avatar supprimé avec succès !' });
      setAvatarPreview(null);
      setAvatarFile(null);
      setShowDeleteAvatarModal(false);
    } catch (err) {
      setProfileStatus({ type: 'error', message: err.message });
    } finally {
      setAvatarLoading(false);
    }
  };

  const cancelAvatarPreview = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
        phone: profileData.phone || null,
        bio: profileData.bio || null,
        location: profileData.location || null,
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
    
    // Validation frontend
    if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordStatus({ type: 'error', message: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwordData.password.length < 8) {
      setPasswordStatus({ type: 'error', message: 'Le mot de passe doit contenir au moins 8 caractères' });
      return;
    }

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

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const strokeDashoffset = 352 - (352 * progress) / 100;

  return (
    <section className={styles.profileSection}>
      <div className={styles.container}>
        <div className={styles.gridLayout}>
          
          {/* Sidebar gauche */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>PROFILE</h3>
            </div>
            
            <nav className={styles.sidebarNav}>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`${styles.navButton} ${activeTab === 'profile' ? styles.navButtonActive : ''}`}
              >
                <FaUser className={styles.navIcon} />
                <span>Edit Profile</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`${styles.navButton} ${activeTab === 'security' ? styles.navButtonActive : ''}`}
              >
                <FaLock className={styles.navIcon} />
                <span>Password</span>
              </button>
            </nav>

            <div className={styles.sidebarFooter}>
              <h4 className={styles.sidebarTitle}>SECURE</h4>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <FaSignOutAlt className={styles.navIcon} />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className={styles.mainContent}>
            {activeTab === 'profile' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Edit Profile</h2>
                  </div>
                </div>

                {/* Section Avatar */}
                <div className={styles.avatarSection}>
                  <div className={styles.avatarWrapper}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/jpg,image/webp"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                    
                    <div className={styles.avatarContainer} onClick={handleAvatarClick}>
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className={styles.avatar} />
                      ) : user.avatar ? (
                        <img src={user.avatar} alt={user.name} className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarInitials}>{initials}</div>
                      )}
                      
                      {!avatarLoading && (
                        <div className={styles.avatarOverlay}>
                          <FaCamera className={styles.cameraIcon} />
                        </div>
                      )}
                      
                      {avatarLoading && (
                        <div className={styles.avatarOverlay} style={{ background: 'rgba(0,0,0,0.7)', opacity: 1 }}>
                          <span className={styles.spinner}></span>
                        </div>
                      )}
                    </div>
                    
                    {avatarPreview && !avatarLoading && (
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button
                          onClick={handleAvatarUpload}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          <FaCheck /> Upload
                        </button>
                        <button
                          onClick={cancelAvatarPreview}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    )}
                    
                    {user.avatar && !avatarPreview && !avatarLoading && (
                      <button
                        onClick={handleAvatarDelete}
                        style={{
                          marginTop: '0.5rem',
                          padding: '0.5rem 1rem',
                          background: 'transparent',
                          color: '#ef4444',
                          border: '1px solid #ef4444',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.avatarInfo}>
                    <h3 className={styles.avatarInfoTitle}>Upload new photo</h3>
                    <p className={styles.avatarInfoText}>At least 800×800 px recommended.</p>
                    <p className={styles.avatarInfoText}>JPG, PNG or WEBP is allowed (Max 2MB)</p>
                  </div>
                </div>

                {profileStatus.message && (
                  <div className={`${styles.alert} ${profileStatus.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                    <span className={styles.alertIcon}>
                      {profileStatus.type === 'success' ? <FaCheck /> : '⚠'}
                    </span>
                    {profileStatus.message}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit}>
                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Personal Info</h3>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Full Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className={styles.input}
                          value={profileData.name}
                          onChange={handleProfileChange}
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className={styles.input}
                          value={profileData.email}
                          disabled
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Phone</label>
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
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Location</h3>
                    </div>
                    
                    <div className={styles.formGroup} style={{ position: 'relative' }}>
                      <FaMapMarkerAlt className={styles.inputIcon} />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        placeholder="Enter your location"
                        className={`${styles.input} ${styles.inputWithIcon}`}
                      />
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Bio</h3>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className={styles.textarea}
                        placeholder="Write something about yourself..."
                        rows={4}
                      />
                      <small className={styles.helpText}>
                        {profileData.bio.length} / 2000 characters
                      </small>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={profileLoading}
                  >
                    {profileLoading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save changes
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Change Password</h2>
                    <p className={styles.cardSubtitle}>Ensure your account is using a strong password</p>
                  </div>
                </div>

                {passwordStatus.message && (
                  <div className={`${styles.alert} ${passwordStatus.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
                    <span className={styles.alertIcon}>
                      {passwordStatus.type === 'success' ? <FaCheck /> : '⚠'}
                    </span>
                    {passwordStatus.message}
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit}>
                  <div className={styles.formSection}>
                    <div className={styles.formGroup}>
                      <label htmlFor="current_password" className={styles.label}>Current Password *</label>
                      <input
                        id="current_password"
                        name="current_password"
                        type="password"
                        className={styles.input}
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                        placeholder="••••••••"
                        required
                      />
                    </div>

                    <div className={styles.formRow} style={{ gridTemplateColumns: '1fr 1fr', border: 'none', paddingBottom: 0 }}>
                      <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>New Password *</label>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className={styles.input}
                          value={passwordData.password}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          minLength={8}
                          required
                        />
                        <small className={styles.helpText}>Minimum 8 characters</small>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="password_confirmation" className={styles.label}>Confirm Password *</label>
                        <input
                          id="password_confirmation"
                          name="password_confirmation"
                          type="password"
                          className={styles.input}
                          value={passwordData.password_confirmation}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? (
                      <>
                        <span className={styles.spinner}></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Update Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </main>

          {/* Sidebar droite - Progression DYNAMIQUE */}
          <aside className={styles.progressSidebar}>
            <div className={styles.progressHeader}>
              <div className={styles.progressCircle}>
                <svg className={styles.progressSvg}>
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="56" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="8"
                    strokeDasharray="352"
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className={styles.progressValue}>{progress}%</div>
              </div>
              <h3 className={styles.progressTitle}>Complete your profile</h3>
            </div>

            <div className={styles.progressList}>
              {getProgressItems().map((item, index) => (
                <div key={index} className={styles.progressItem}>
                  <div className={styles.progressItemLeft}>
                    {item.completed ? (
                      <FaCheck className={styles.checkIcon} />
                    ) : (
                      <div className={styles.checkboxIcon}></div>
                    )}
                    <span className={styles.progressItemText}>{item.label}</span>
                  </div>
                  <span className={`${styles.progressItemValue} ${item.completed ? '' : styles.progressItemValueActive}`}>
                    {item.completed ? `${item.value}%` : `+${item.value}%`}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.progressActions}>
              <button className={styles.actionButton}>
                <FaBriefcase />
                Tools
              </button>
              <button onClick={handleProfileSubmit} className={styles.actionButton} disabled={profileLoading}>
                <FaSave />
                Save
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal de confirmation de déconnexion */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Se déconnecter ?"
        message="Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à votre compte."
        confirmText="Se déconnecter"
        cancelText="Annuler"
        variant="logout"
        loading={isLoggingOut}
      />

      {/* Modal de confirmation de suppression d'avatar */}
      <ConfirmModal
        isOpen={showDeleteAvatarModal}
        onClose={() => setShowDeleteAvatarModal(false)}
        onConfirm={confirmAvatarDelete}
        title="Supprimer la photo ?"
        message="Êtes-vous sûr de vouloir supprimer votre photo de profil ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        variant="delete"
        loading={avatarLoading}
      />
    </section>
  );
}