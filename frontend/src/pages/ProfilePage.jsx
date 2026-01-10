import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import ConfirmModal from '../components/common/ConfirmModal';
import api from '../services/api';
import { 
  FaUser, FaEnvelope, FaPhone, FaEdit, FaLock, FaCheck, 
  FaSave, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaBriefcase, 
  FaTimes, FaTrash, FaClipboardList, FaClock, FaCheckCircle, 
  FaTimesCircle, FaEye, FaFileAlt 
} from 'react-icons/fa';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateProfile, uploadAvatar, deleteAvatar, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);
  
  // États pour les candidatures
  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  // États pour les modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAvatarModal, setShowDeleteAvatarModal] = useState(false);
  const [showCancelApplicationModal, setShowCancelApplicationModal] = useState(false);
  const [showApplicationDetailModal, setShowApplicationDetailModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCancellingApplication, setIsCancellingApplication] = useState(false);
  
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

  // Charger les candidatures quand on passe à l'onglet
  useEffect(() => {
    if (activeTab === 'applications') {
      loadApplications();
    }
  }, [activeTab]);

  // Charger les candidatures
const loadApplications = async () => {
  setApplicationsLoading(true);
  try {
    // ✅ Nouveau chemin : /user/volunteers/my-applications
    const response = await api.get('/user/volunteers/my-applications');
    const data = response.data;
    
    console.log('📋 Candidatures récupérées:', data);
    
    setApplications(data.applications || data || []);
  } catch (err) {
    console.error('❌ Erreur lors du chargement des candidatures:', err);
    setApplications([]);
  } finally {
    setApplicationsLoading(false);
  }
};

// Annuler une candidature
const confirmCancelApplication = async () => {
  if (!selectedApplication) return;
  
  setIsCancellingApplication(true);
  try {
    // ✅ Nouveau chemin : /user/volunteers/{id}
    await api.delete(`/user/volunteers/${selectedApplication.id}`);
    
    console.log('✅ Candidature annulée avec succès');
    
    // Recharger les candidatures
    await loadApplications();
    setShowCancelApplicationModal(false);
    setSelectedApplication(null);
  } catch (err) {
    console.error('❌ Erreur lors de l\'annulation:', err);
    alert(err.response?.data?.message || 'Erreur lors de l\'annulation');
  } finally {
    setIsCancellingApplication(false);
  }
};

  const handleCancelApplication = (application) => {
    setSelectedApplication(application);
    setShowCancelApplicationModal(true);
  };
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowApplicationDetailModal(true);
  };

  // Calculer la progression dynamiquement
  const calculateProgress = () => {
    if (!user) return 0;
    
    let progress = 10;
    
    if (user.avatar) progress += 20;
    if (user.name) progress += 15;
    if (user.phone) progress += 15;
    if (user.location) progress += 20;
    if (user.bio && user.bio.length > 20) progress += 20;
    
    return Math.min(progress, 100);
  };

  const progress = calculateProgress();

  const getProgressItems = () => [
    { label: 'Créer un compte', completed: true, value: 10 },
    { label: 'Ajouter une photo', completed: !!user?.avatar, value: 20 },
    { label: 'Informations personnelles', completed: !!(user?.name && user?.phone), value: 15 },
    { label: 'Localisation', completed: !!user?.location, value: 20 },
    { label: 'Biographie', completed: !!(user?.bio && user.bio.length > 20), value: 20 },
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

    if (!file.type.startsWith('image/')) {
      setProfileStatus({ type: 'error', message: 'Veuillez sélectionner une image valide' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setProfileStatus({ type: 'error', message: 'L\'image ne doit pas dépasser 2MB' });
      return;
    }

    setAvatarFile(file);
    
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

  // Helper pour le statut
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', color: '#f59e0b', icon: FaClock },
      accepted: { label: 'Acceptée', color: '#10b981', icon: FaCheckCircle },
      rejected: { label: 'Refusée', color: '#ef4444', icon: FaTimesCircle },
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: config.color,
        backgroundColor: `${config.color}15`,
        border: `1px solid ${config.color}40`,
      }}>
        <Icon style={{ fontSize: '0.875rem' }} />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className={styles.profileSection}>
      <div className={styles.container}>
        <div className={styles.gridLayout}>
          
          {/* Sidebar gauche */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>PROFIL</h3>
            </div>
            
            <nav className={styles.sidebarNav}>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`${styles.navButton} ${activeTab === 'profile' ? styles.navButtonActive : ''}`}
              >
                <FaUser className={styles.navIcon} />
                <span>Modifier le profil</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('applications')}
                className={`${styles.navButton} ${activeTab === 'applications' ? styles.navButtonActive : ''}`}
              >
                <FaClipboardList className={styles.navIcon} />
                <span>Mes candidatures</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('security')}
                className={`${styles.navButton} ${activeTab === 'security' ? styles.navButtonActive : ''}`}
              >
                <FaLock className={styles.navIcon} />
                <span>Mot de passe</span>
              </button>
            </nav>

            <div className={styles.sidebarFooter}>
              <h4 className={styles.sidebarTitle}>SÉCURITÉ</h4>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <FaSignOutAlt className={styles.navIcon} />
                <span>Se déconnecter</span>
              </button>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className={styles.mainContent}>
            {activeTab === 'profile' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Modifier le profil</h2>
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
                        <img src={avatarPreview} alt="Aperçu" className={styles.avatar} />
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
                          <FaCheck /> Télécharger
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
                          <FaTimes /> Annuler
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
                        <FaTrash /> Supprimer
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.avatarInfo}>
                    <h3 className={styles.avatarInfoTitle}>Télécharger une nouvelle photo</h3>
                    <p className={styles.avatarInfoText}>Au moins 800×800 px recommandé.</p>
                    <p className={styles.avatarInfoText}>JPG, PNG ou WEBP autorisé (Max 2 Mo)</p>
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
                      <h3 className={styles.sectionTitle}>Informations personnelles</h3>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Nom complet *</label>
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
                        <label htmlFor="phone" className={styles.label}>Téléphone</label>
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
                      <h3 className={styles.sectionTitle}>Localisation</h3>
                    </div>
                    
                    <div className={styles.formGroup} style={{ position: 'relative' }}>
                      <FaMapMarkerAlt className={styles.inputIcon} />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        placeholder="Entrez votre localisation"
                        className={`${styles.input} ${styles.inputWithIcon}`}
                      />
                    </div>
                  </div>

                  <div className={styles.formSection}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Biographie</h3>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className={styles.textarea}
                        placeholder="Écrivez quelque chose sur vous..."
                        rows={4}
                      />
                      <small className={styles.helpText}>
                        {profileData.bio.length} / 2000 caractères
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
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Enregistrer les modifications
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Mes candidatures de bénévolat</h2>
                    <p className={styles.cardSubtitle}>Suivez l'état de vos candidatures</p>
                  </div>
                </div>

                {applicationsLoading ? (
                  <div style={{ padding: '3rem 0', textAlign: 'center' }}>
                    <span className={styles.spinner} style={{ margin: '0 auto' }}></span>
                    <p style={{ marginTop: '1rem', color: '#6b7280' }}>Chargement des candidatures...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem 1.5rem',
                    background: '#f9fafb',
                    borderRadius: '0.75rem',
                    border: '2px dashed #e5e7eb'
                  }}>
                    <FaClipboardList style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                      Aucune candidature
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                      Vous n'avez pas encore postulé pour devenir bénévole
                    </p>
                    <button
                      onClick={() => navigate('/volunteer')}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Devenir bénévole
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {applications.map((app) => (
                      <div
                        key={app.id}
                        style={{
                          padding: '1.5rem',
                          background: '#f9fafb',
                          borderRadius: '0.75rem',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                                {app.interest_domain}
                              </h3>
                              {getStatusBadge(app.status)}
                            </div>
                            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                              Candidature déposée le {formatDate(app.created_at)}
                            </p>
                          </div>
                        </div>

                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '1rem',
                          marginBottom: '1rem',
                          paddingTop: '1rem',
                          borderTop: '1px solid #e5e7eb'
                        }}>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.25rem' }}>
                              COMPÉTENCES
                            </p>
                            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0 }}>
                              {app.skills || 'Non spécifié'}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.25rem' }}>
                              DISPONIBILITÉ
                            </p>
                            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0 }}>
                              {app.availability || 'Non spécifié'}
                            </p>
                          </div>
                          <div>
                            <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 600, marginBottom: '0.25rem' }}>
                              LOCALISATION
                            </p>
                            <p style={{ color: '#374151', fontSize: '0.875rem', margin: 0 }}>
                              {app.city}, {app.country}
                            </p>
                          </div>
                        </div>

                        {app.admin_notes && (
                          <div style={{
                            padding: '1rem',
                            background: '#eff6ff',
                            borderRadius: '0.5rem',
                            border: '1px solid #bfdbfe',
                            marginBottom: '1rem'
                          }}>
                            <p style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.25rem' }}>
                              NOTE DE L'ADMINISTRATEUR
                            </p>
                            <p style={{ color: '#1e40af', fontSize: '0.875rem', margin: 0 }}>
                              {app.admin_notes}
                            </p>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleViewDetails(app)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.625rem 1rem',
                              background: 'white',
                              color: '#2563eb',
                              border: '1px solid #2563eb',
                              borderRadius: '0.5rem',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              cursor: 'pointer'
                            }}
                          >
                            <FaEye /> Voir les détails
                          </button>
                          
                          {app.cv_url && (
                            <a
                              href={app.cv_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1rem',
                                background: 'white',
                                color: '#059669',
                                border: '1px solid #059669',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                textDecoration: 'none'
                              }}
                            >
                              <FaFileAlt /> Télécharger mon CV
                            </a>
                          )}
                          
                          {app.status === 'pending' && (
                            <button
                              onClick={() => handleCancelApplication(app)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.625rem 1rem',
                                background: 'transparent',
                                color: '#dc2626',
                                border: '1px solid #dc2626',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                cursor: 'pointer'
                              }}
                            >
                              <FaTimes /> Annuler la candidature
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'security' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>Changer le mot de passe</h2>
                    <p className={styles.cardSubtitle}>Assurez-vous que votre compte utilise un mot de passe fort</p>
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
                      <label htmlFor="current_password" className={styles.label}>Mot de passe actuel *</label>
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
                        <label htmlFor="password" className={styles.label}>Nouveau mot de passe *</label>
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
                        <small className={styles.helpText}>Minimum 8 caractères</small>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="password_confirmation" className={styles.label}>Confirmer le mot de passe *</label>
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
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <FaLock />
                        Mettre à jour le mot de passe
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
              <h3 className={styles.progressTitle}>Complétez votre profil</h3>
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

      {/* Modal de confirmation d'annulation de candidature */}
      <ConfirmModal
        isOpen={showCancelApplicationModal}
        onClose={() => setShowCancelApplicationModal(false)}
        onConfirm={confirmCancelApplication}
        title="Annuler la candidature ?"
        message="Êtes-vous sûr de vouloir annuler cette candidature ? Cette action est irréversible."
        confirmText="Annuler la candidature"
        cancelText="Retour"
        variant="delete"
        loading={isCancellingApplication}
      />

      {/* Modal de détails de candidature */}
      {showApplicationDetailModal && selectedApplication && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setShowApplicationDetailModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '1rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '2rem'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Détails de la candidature
                </h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Déposée le {formatDate(selectedApplication.created_at)}
                </p>
              </div>
              <button
                onClick={() => setShowApplicationDetailModal(false)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  color: '#6b7280'
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              {getStatusBadge(selectedApplication.status)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>
                  DOMAINE D'INTÉRÊT
                </h3>
                <p style={{ color: '#111827', fontSize: '1rem' }}>
                  {selectedApplication.interest_domain}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>
                  INFORMATIONS PERSONNELLES
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Nom</p>
                    <p style={{ color: '#111827' }}>{selectedApplication.first_name} {selectedApplication.last_name}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Email</p>
                    <p style={{ color: '#111827' }}>{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Téléphone</p>
                    <p style={{ color: '#111827' }}>{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Localisation</p>
                    <p style={{ color: '#111827' }}>{selectedApplication.city}, {selectedApplication.country}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>
                  COMPÉTENCES
                </h3>
                <p style={{ color: '#111827' }}>
                  {selectedApplication.skills || 'Non spécifié'}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>
                  DISPONIBILITÉ
                </h3>
                <p style={{ color: '#111827' }}>
                  {selectedApplication.availability || 'Non spécifié'}
                </p>
              </div>

              {selectedApplication.message && (
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#6b7280', marginBottom: '0.5rem' }}>
                    MESSAGE
                  </h3>
                  <p style={{ color: '#111827', whiteSpace: 'pre-wrap' }}>
                    {selectedApplication.message}
                  </p>
                </div>
              )}

              {selectedApplication.admin_notes && (
                <div style={{
                  padding: '1rem',
                  background: '#eff6ff',
                  borderRadius: '0.5rem',
                  border: '1px solid #bfdbfe'
                }}>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1e40af', marginBottom: '0.5rem' }}>
                    NOTE DE L'ADMINISTRATEUR
                  </h3>
                  <p style={{ color: '#1e40af', whiteSpace: 'pre-wrap', margin: 0 }}>
                    {selectedApplication.admin_notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}