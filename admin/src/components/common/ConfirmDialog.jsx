import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'warning',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  confirmButtonClass = 'btn-danger'
}) => {
  if (!isOpen) return null;

  const icons = {
    warning: <AlertTriangle size={48} />,
    success: <CheckCircle size={48} />,
    info: <Info size={48} />,
    danger: <XCircle size={48} />,
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="confirm-dialog-overlay" onClick={handleBackdropClick}>
      <div className="confirm-dialog-container">
        <button className="confirm-dialog-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className={`confirm-dialog-icon confirm-dialog-icon-${type}`}>
          {icons[type]}
        </div>

        <h3 className="confirm-dialog-title">{title}</h3>
        
        <p className="confirm-dialog-message">{message}</p>

        <div className="confirm-dialog-actions">
          <button 
            className="confirm-dialog-btn btn-cancel" 
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button 
            className={`confirm-dialog-btn ${confirmButtonClass}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;