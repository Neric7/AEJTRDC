import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import { FaUser, FaEnvelope, FaPhone, FaImage, FaEdit, FaLock, FaKey, FaShieldAlt, FaCheck, FaSave, FaSignOutAlt, FaCamera, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    bio: user?.bio || '',
    location: user?.location || '',
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
        location: profileData.location,
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
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>G</div>
            <span className={styles.logoText}>Gridlines UI</span>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <div className={styles.iconPlaceholder}></div>
            </button>
            <button className={styles.iconButton}>
              <div className={styles.iconPlaceholder}></div>
              <span className={styles.notificationBadge}>2</span>
            </button>
            <div className={styles.userAvatar}></div>
          </div>
        </div>
      </header>

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
              <button onClick={logout} className={styles.logoutButton}>
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
                    <div className={styles.avatarContainer}>
                      {profileData.avatar ? (
                        <img src={profileData.avatar} alt={user.name} className={styles.avatar} />
                      ) : (
                        <div className={styles.avatarInitials}>{initials}</div>
                      )}
                      <div className={styles.avatarOverlay}>
                        <FaCamera className={styles.cameraIcon} />
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.avatarInfo}>
                    <h3 className={styles.avatarInfoTitle}>Upload new photo</h3>
                    <p className={styles.avatarInfoText}>At least 800×800 px recommended.</p>
                    <p className={styles.avatarInfoText}>JPG or PNG is allowed</p>
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

                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Personal Info</h3>
                    <button type="button" className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>Full Name</label>
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
                    <button type="button" className={styles.editButton}>Cancel</button>
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
                    <button type="button" className={styles.editButton}>
                      <FaEdit /> Edit
                    </button>
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
                  </div>
                </div>

                <button
                  onClick={handleProfileSubmit}
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

                <div className={styles.formSection}>
                  <div className={styles.formGroup}>
                    <label htmlFor="current_password" className={styles.label}>Current Password</label>
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

                  <div className={styles.formRow} style={{ gridTemplateColumns: '1fr 1fr', border: 'none', paddingBottom: 0 }}>
                    <div className={styles.formGroup}>
                      <label htmlFor="password" className={styles.label}>New Password</label>
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
                      <small className={styles.helpText}>Minimum 8 characters</small>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="password_confirmation" className={styles.label}>Confirm Password</label>
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
                </div>

                <button
                  onClick={handlePasswordSubmit}
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
              </div>
            )}
          </main>

          {/* Sidebar droite - Progression */}
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
                    strokeDashoffset="211"
                    strokeLinecap="round"
                  />
                </svg>
                <div className={styles.progressValue}>40%</div>
              </div>
              <h3 className={styles.progressTitle}>Complete your profile</h3>
            </div>

            <div className={styles.progressList}>
              <div className={styles.progressItem}>
                <div className={styles.progressItemLeft}>
                  <FaCheck className={styles.checkIcon} />
                  <span className={styles.progressItemText}>Setup account</span>
                </div>
                <span className={styles.progressItemValue}>10%</span>
              </div>
              
              <div className={styles.progressItem}>
                <div className={styles.progressItemLeft}>
                  <FaCheck className={styles.checkIcon} />
                  <span className={styles.progressItemText}>Upload your photo</span>
                </div>
                <span className={styles.progressItemValue}>5%</span>
              </div>
              
              <div className={styles.progressItem}>
                <div className={styles.progressItemLeft}>
                  <FaCheck className={styles.checkIcon} />
                  <span className={styles.progressItemText}>Personal Info</span>
                </div>
                <span className={styles.progressItemValue}>10%</span>
              </div>
              
              <div className={styles.progressItem}>
                <div className={styles.progressItemLeft}>
                  <div className={styles.checkboxIcon}></div>
                  <span className={styles.progressItemText}>Location</span>
                </div>
                <span className={`${styles.progressItemValue} ${styles.progressItemValueActive}`}>+20%</span>
              </div>
              
              <div className={styles.progressItem}>
                <div className={styles.progressItemLeft}>
                  <FaCheck className={styles.checkIcon} />
                  <span className={styles.progressItemText}>Biography</span>
                </div>
                <span className={styles.progressItemValue}>15%</span>
              </div>
            </div>

            <div className={styles.progressActions}>
              <button className={styles.actionButton}>
                <FaBriefcase />
                Tools
              </button>
              <button className={styles.actionButton}>
                <FaSave />
                Save
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}