import { createContext, useState, useContext } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    confirmText: 'Confirmer',
    cancelText: 'Annuler',
    confirmButtonClass: 'btn-danger',
    onConfirm: () => {},
  });

  const showConfirm = ({
    title = 'Confirmation',
    message = 'Êtes-vous sûr ?',
    type = 'warning',
    confirmText = 'Confirmer',
    cancelText = 'Annuler',
    confirmButtonClass = 'btn-danger',
  }) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        title,
        message,
        type,
        confirmText,
        cancelText,
        confirmButtonClass,
        onConfirm: () => {
          resolve(true);
          closeDialog();
        },
      });
    });
  };

  const showDeleteConfirm = (itemName = 'cet élément') => {
    return showConfirm({
      title: 'Confirmer la suppression',
      message: `Êtes-vous sûr de vouloir supprimer ${itemName} ? Cette action est irréversible.`,
      type: 'danger',
      confirmText: 'Oui, supprimer',
      cancelText: 'Annuler',
      confirmButtonClass: 'btn-danger',
    });
  };

  const showSuccessConfirm = (title, message) => {
    return showConfirm({
      title,
      message,
      type: 'success',
      confirmText: 'OK',
      cancelText: 'Fermer',
      confirmButtonClass: 'btn-success',
    });
  };

  const showInfoConfirm = (title, message) => {
    return showConfirm({
      title,
      message,
      type: 'info',
      confirmText: 'OK',
      cancelText: 'Fermer',
      confirmButtonClass: 'btn-primary',
    });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AlertContext.Provider
      value={{
        showConfirm,
        showDeleteConfirm,
        showSuccessConfirm,
        showInfoConfirm,
      }}
    >
      {children}
      <ConfirmDialog
        isOpen={dialog.isOpen}
        onClose={closeDialog}
        onConfirm={dialog.onConfirm}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        confirmButtonClass={dialog.confirmButtonClass}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert doit être utilisé dans un AlertProvider');
  }
  return context;
};