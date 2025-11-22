import { useState } from 'react';
import { Save, User, Lock, Bell, Globe, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import './SettingsPage.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@soscongo.org',
    phone: '+243 123 456 789',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNews: true,
    emailDonations: true,
    emailContacts: true,
    pushAlerts: false,
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Appel API pour sauvegarder le profil
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);

    try {
      // Appel API pour changer le mot de passe
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Mot de passe modifié avec succès');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Préférences de notification sauvegardées');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <User size={20} /> },
    { id: 'security', label: 'Sécurité', icon: <Lock size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'general', label: 'Général', icon: <Globe size={20} /> },
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Paramètres</h1>
        <p>Gérez vos préférences et paramètres</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {/* Profil */}
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Informations du profil</h3>
              </div>
              <form onSubmit={handleSaveProfile}>
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Save size={20} />
                  {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </form>
            </div>
          )}

          {/* Sécurité */}
          {activeTab === 'security' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Changer le mot de passe</h3>
              </div>
              <form onSubmit={handleSavePassword}>
                <div className="form-group">
                  <label className="form-label">Mot de passe actuel</label>
                  <input
                    type="password"
                    name="currentPassword"
                    className="form-input"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="newPassword"
                    className="form-input"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-input"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Shield size={20} />
                  {loading ? 'Modification...' : 'Modifier le mot de passe'}
                </button>
              </form>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Préférences de notification</h3>
              </div>
              <form onSubmit={handleSaveNotifications}>
                <div className="notification-item">
                  <div>
                    <p className="notification-title">Nouvelles actualités</p>
                    <p className="notification-desc">Recevoir une notification par email</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="emailNews"
                      checked={notifications.emailNews}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div>
                    <p className="notification-title">Nouveaux dons</p>
                    <p className="notification-desc">Recevoir une notification par email</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="emailDonations"
                      checked={notifications.emailDonations}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div>
                    <p className="notification-title">Messages de contact</p>
                    <p className="notification-desc">Recevoir une notification par email</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="emailContacts"
                      checked={notifications.emailContacts}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div>
                    <p className="notification-title">Alertes push</p>
                    <p className="notification-desc">Notifications push dans le navigateur</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="pushAlerts"
                      checked={notifications.pushAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <Save size={20} />
                  {loading ? 'Sauvegarde...' : 'Sauvegarder les préférences'}
                </button>
              </form>
            </div>
          )}

          {/* Général */}
          {activeTab === 'general' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Paramètres généraux</h3>
              </div>
              <p>Paramètres généraux à venir...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;