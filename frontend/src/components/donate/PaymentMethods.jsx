import { FaCreditCard, FaPaypal, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import './PaymentMethods.css';

function PaymentMethods() {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: <FaCreditCard />,
      description: 'Visa, Mastercard, Amex',
      color: '#0B2B5B'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <FaPaypal />,
      description: 'Paiement sécurisé',
      color: '#FDB913'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: <FaMobileAlt />,
      description: 'M-Pesa, Orange Money',
      color: '#7CB342'
    },
    {
      id: 'bank',
      name: 'Virement bancaire',
      icon: <FaUniversity />,
      description: 'Transfert direct',
      color: '#0B2B5B'
    }
  ];

  return (
    <div className="payment-methods-container">
      <h4 className="payment-title">Moyens de paiement acceptés</h4>
      
      <div className="payment-grid">
        {paymentMethods.map(method => (
          <div key={method.id} className="payment-method-card">
            <div className="payment-icon" style={{ color: method.color }}>
              {method.icon}
            </div>
            <div className="payment-info">
              <h5>{method.name}</h5>
              <p>{method.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="payment-note">
        <div className="note-header">
          <span className="note-icon">ℹ️</span>
          <strong>Informations importantes</strong>
        </div>
        <ul className="note-list">
          <li>Tous les paiements sont sécurisés et cryptés</li>
          <li>Vous pouvez annuler un don mensuel à tout moment</li>
          <li>Un reçu vous sera envoyé par email</li>
        </ul>
      </div>

      <div className="bank-details">
        <h5>Coordonnées bancaires</h5>
        <div className="bank-info-grid">
          <div className="bank-info-item">
            <span className="info-label">Banque</span>
            <span className="info-value">Rawbank</span>
          </div>
          <div className="bank-info-item">
            <span className="info-label">Titulaire</span>
            <span className="info-value">AEJT-RDC</span>
          </div>
          <div className="bank-info-item">
            <span className="info-label">IBAN</span>
            <span className="info-value">CD XX XXXX XXXX XXXX XXXX</span>
          </div>
          <div className="bank-info-item">
            <span className="info-label">SWIFT</span>
            <span className="info-value">RAWBCDKI</span>
          </div>
        </div>
        <p className="bank-note">
          Pour un virement bancaire, merci de nous envoyer un email à donations@aejtrdc.org
        </p>
      </div>
    </div>
  );
}

export default PaymentMethods;