import { useEffect } from 'react';
import { FaExclamationTriangle, FaTimes, FaSignOutAlt, FaTrash, FaCheckCircle } from 'react-icons/fa';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'danger', // 'danger', 'warning', 'success'
  icon = null,
  loading = false,
}) {
  // Bloquer le scroll quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Icônes par défaut selon le variant
  const defaultIcons = {
    danger: FaExclamationTriangle,
    warning: FaExclamationTriangle,
    success: FaCheckCircle,
    logout: FaSignOutAlt,
    delete: FaTrash,
  };

  const IconComponent = icon || defaultIcons[variant] || FaExclamationTriangle;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton fermer */}
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          <FaTimes />
        </button>

        {/* Icône */}
        <div className={`${styles.iconWrapper} ${styles[`icon${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}>
          <IconComponent className={styles.icon} />
        </div>

        {/* Contenu */}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message}>{message}</p>
        </div>

        {/* Boutons d'action */}
        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`${styles.confirmButton} ${styles[`confirm${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Chargement...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}