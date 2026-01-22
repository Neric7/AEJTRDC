import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaDollarSign, FaComment, FaMobileAlt, FaUniversity, FaPaypal } from 'react-icons/fa';
import './DonationForm.css';

function DonationForm({ selectedAmount, donationType, onAmountChange }) {
  const [formData, setFormData] = useState({
    amount: selectedAmount || '',
    customAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false,
    newsletter: true,
    paymentMethod: 'mobile' // Valeur par défaut
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const paymentMethods = [
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'M-Pesa, Airtel Money, Orange Money',
      icon: <FaMobileAlt />,
      note: 'Pour les donateurs en RDC'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Paiement sécurisé international',
      icon: <FaPaypal />,
      note: 'Pour les donateurs hors RDC'
    },
    {
      id: 'bank',
      name: 'Virement bancaire',
      description: 'Transfert direct vers notre compte',
      icon: <FaUniversity />,
      note: 'Pour les entreprises et gros donateurs'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAmountSelect = (amount) => {
    setFormData(prev => ({ ...prev, amount, customAmount: '' }));
    onAmountChange(amount);
  };

  const handleCustomAmount = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, customAmount: value, amount: '' }));
    if (value) {
      onAmountChange(parseFloat(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount && !formData.customAmount) {
      newErrors.amount = 'Veuillez sélectionner ou saisir un montant';
    }
    
    if (formData.customAmount && parseFloat(formData.customAmount) < 5) {
      newErrors.customAmount = 'Le montant minimum est de 5$';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Veuillez sélectionner un moyen de paiement';
    }
    
    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const donationAmount = formData.customAmount || formData.amount;
      const paymentData = {
        ...formData,
        finalAmount: donationAmount,
        type: donationType,
        paymentMethod: formData.paymentMethod
      };

      console.log('Donation submitted:', paymentData);
      
      // Redirection selon le moyen de paiement
      if (formData.paymentMethod === 'mobile') {
        // Pour Mobile Money
        alert(`Merci pour votre générosité ! 
        
Veuillez effectuer votre paiement Mobile Money au numéro :
📱 +243 859 140 150

Montant: $${donationAmount}
        
Pour les donateurs hors RDC, utilisez TapTap Send.`);
        
        // Ouvrir TapTap Send dans un nouvel onglet
        window.open('https://www.taptapsend.com/', '_blank');
        
      } else if (formData.paymentMethod === 'paypal') {
        // Redirection vers PayPal
        alert('Redirection vers PayPal...');
        // Ici, vous intégreriez l'API PayPal
        // window.location.href = 'votre-lien-paypal';
        
      } else if (formData.paymentMethod === 'bank') {
        // Afficher les détails bancaires
        alert(`Merci pour votre générosité !
        
Veuillez effectuer un virement bancaire aux coordonnées suivantes :

🏦 TRUST MERCHANT BANK
💳 Compte USD: 00017-22100-30255320001-44
👤 Titulaire: Association des Enfants et Jeunes Travailleurs
🌐 Code Swift: TRMSCD3L

Après votre virement, merci d'envoyer un email à donations@aejtrdc.org`);
      }
      
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPaymentInstructions = () => {
    switch(formData.paymentMethod) {
      case 'mobile':
        return (
          <div className="payment-instructions">
            <div className="instructions-header">
              <FaMobileAlt />
              <h5>Instructions Mobile Money</h5>
            </div>
            <div className="instructions-content">
              <div className="instruction-item">
                <span className="instruction-label">Numéro Mobile Money :</span>
                <span className="instruction-value">+243 859 140 150</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-label">Pour hors RDC :</span>
                <a href="https://www.taptapsend.com/" target="_blank" rel="noopener noreferrer" className="instruction-link">
                  Utilisez TapTap Send
                </a>
              </div>
              <p className="instruction-note">
                Après paiement, vous recevrez une confirmation par email.
              </p>
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="payment-instructions">
            <div className="instructions-header">
              <FaUniversity />
              <h5>Instructions Virement Bancaire</h5>
            </div>
            <div className="instructions-content">
              <div className="instruction-item">
                <span className="instruction-label">Banque :</span>
                <span className="instruction-value">TRUST MERCHANT BANK</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-label">Code Swift :</span>
                <span className="instruction-value">TRMSCD3L</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-label">Nom du compte :</span>
                <span className="instruction-value">Association des Enfants et Jeunes Travailleurs</span>
              </div>
              <div className="instruction-item">
                <span className="instruction-label">Compte USD :</span>
                <span className="instruction-value">00017-22100-30255320001-44</span>
              </div>
              <p className="instruction-note">
                Après votre virement, merci d'envoyer un email à donations@aejtrdc.org
              </p>
            </div>
          </div>
        );
      
      case 'paypal':
        return (
          <div className="payment-instructions">
            <div className="instructions-header">
              <FaPaypal />
              <h5>Instructions PayPal</h5>
            </div>
            <div className="instructions-content">
              <p className="instruction-note">
                Vous serez redirigé vers PayPal pour finaliser votre paiement sécurisé.
                Cette option est recommandée pour les donateurs hors de la RDC.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="donation-form-container">
      <div className="form-header">
        <h3>Complétez votre don</h3>
        <p>Tous les champs marqués d'un * sont obligatoires</p>
      </div>

      <form onSubmit={handleSubmit} className="donation-form">
        
        {/* Amount Selection */}
        <div className="form-section">
          <label className="section-label">Montant du don *</label>
          
          <div className="amount-grid">
            {predefinedAmounts.map(amount => (
              <button
                key={amount}
                type="button"
                className={`amount-btn ${formData.amount === amount ? 'selected' : ''}`}
                onClick={() => handleAmountSelect(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="custom-amount-wrapper">
            <div className="input-with-icon">
              <FaDollarSign className="input-icon" />
              <input
                type="number"
                name="customAmount"
                value={formData.customAmount}
                onChange={handleCustomAmount}
                placeholder="Autre montant"
                className="custom-amount-input"
                min="5"
              />
            </div>
          </div>
          
          {errors.amount && <span className="error-message">{errors.amount}</span>}
          {errors.customAmount && <span className="error-message">{errors.customAmount}</span>}
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <label className="section-label">Vos informations</label>
          
          <div className="form-row">
            <div className="form-group">
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom *"
                  className={errors.firstName ? 'error' : ''}
                />
              </div>
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom *"
                  className={errors.lastName ? 'error' : ''}
                />
              </div>
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="input-with-icon">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Téléphone (optionnel)"
                className={errors.phone ? 'error' : ''}
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="form-section">
          <label className="section-label">Moyen de paiement *</label>
          
          <div className="payment-methods-grid">
            {paymentMethods.map(method => (
              <label 
                key={method.id}
                className={`payment-method-option ${formData.paymentMethod === method.id ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={formData.paymentMethod === method.id}
                  onChange={handleChange}
                  className="payment-method-radio"
                />
                <div className="payment-method-content">
                  <div className="payment-method-icon">
                    {method.icon}
                  </div>
                  <div className="payment-method-info">
                    <h5>{method.name}</h5>
                    <p>{method.description}</p>
                    <span className="payment-method-note">{method.note}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
          
          {errors.paymentMethod && (
            <span className="error-message">{errors.paymentMethod}</span>
          )}
          
          {/* Payment Instructions */}
          {formData.paymentMethod && renderPaymentInstructions()}
        </div>

        {/* Message */}
        <div className="form-section">
          <label className="section-label">Message (optionnel)</label>
          <div className="input-with-icon">
            <FaComment className="input-icon textarea-icon" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Laissez-nous un message d'encouragement..."
              rows="4"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="form-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            <span>Je souhaite rester anonyme</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
            />
            <span>Je souhaite recevoir des nouvelles de l'AEJT-RDC</span>
          </label>
        </div>

        {/* Summary */}
        <div className="donation-summary">
          <div className="summary-row">
            <span>Montant</span>
            <strong>${formData.customAmount || formData.amount || '0'}</strong>
          </div>
          <div className="summary-row">
            <span>Type</span>
            <strong>{donationType === 'monthly' ? 'Mensuel' : 'Ponctuel'}</strong>
          </div>
          <div className="summary-row">
            <span>Moyen de paiement</span>
            <strong>
              {paymentMethods.find(m => m.id === formData.paymentMethod)?.name || 'Non sélectionné'}
            </strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${formData.customAmount || formData.amount || '0'}</strong>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Traitement en cours...
            </>
          ) : (
            <>
              <FaDollarSign />
              {formData.paymentMethod === 'paypal' ? 'Payer avec PayPal' : 'Procéder au paiement'}
            </>
          )}
        </button>

        <p className="form-note">
          En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          Tous les paiements sont sécurisés et cryptés.
        </p>
      </form>
    </div>
  );
}

export default DonationForm;