import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { user, updateProfile, changePassword, logout } = useAuth();
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
      setProfileStatus({ type: 'success', message: response.message || 'Profil mis à jour.' });
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
      setPasswordStatus({ type: 'success', message: response.message || 'Mot de passe mis à jour.' });
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
        <aside className={styles.card}>
          <div className={styles.profileHeader}>
            {profileData.avatar ? (
              <img src={profileData.avatar} alt={user.name} className={styles.avatar} style={{ objectFit: 'cover' }} />
            ) : (
              <div className={styles.avatar}>{initials}</div>
            )}
            <div>
              <p className={styles.name}>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <span className={styles.chip}>
              {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
            </span>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p>
              <strong>Contact :</strong> {user.phone || 'Non renseigné'}
            </p>
            {user.bio && (
              <p>
                <strong>Bio :</strong> {user.bio}
              </p>
            )}
            <button className={styles.secondaryBtn} onClick={logout}>
              Se déconnecter
            </button>
          </div>
        </aside>

        <div className="forms">
          <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <h2 className={styles.cardsTitle}>Informations personnelles</h2>
            {profileStatus.message && (
              <p className={profileStatus.type === 'success' ? styles.success : styles.error}>{profileStatus.message}</p>
            )}

            <form className={styles.form} onSubmit={handleProfileSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Nom complet
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={styles.input}
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Adresse e-mail
                </label>
                <input id="email" name="email" type="email" className={styles.input} value={profileData.email} disabled />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={styles.input}
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="avatar" className={styles.label}>
                  URL de l&apos;avatar
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="url"
                  className={styles.input}
                  placeholder="https://..."
                  value={profileData.avatar}
                  onChange={handleProfileChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio" className={styles.label}>
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className={styles.textarea}
                  value={profileData.bio}
                  onChange={handleProfileChange}
                />
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.primaryBtn} disabled={profileLoading}>
                  {profileLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardsTitle}>Mot de passe</h2>
            {passwordStatus.message && (
              <p className={passwordStatus.type === 'success' ? styles.success : styles.error}>
                {passwordStatus.message}
              </p>
            )}

            <form className={styles.form} onSubmit={handlePasswordSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="current_password" className={styles.label}>
                  Mot de passe actuel
                </label>
                <input
                  id="current_password"
                  name="current_password"
                  type="password"
                  className={styles.input}
                  value={passwordData.current_password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>
                  Nouveau mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={styles.input}
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password_confirmation" className={styles.label}>
                  Confirmation
                </label>
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  className={styles.input}
                  value={passwordData.password_confirmation}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.primaryBtn} disabled={passwordLoading}>
                  {passwordLoading ? 'Mise à jour...' : 'Mettre à jour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

