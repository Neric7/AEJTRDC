import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaDollarSign, FaComment } from 'react-icons/fa';
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
    newsletter: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const donationAmount = formData.customAmount || formData.amount;
      
      console.log('Donation submitted:', {
        ...formData,
        finalAmount: donationAmount,
        type: donationType
      });
      
      alert('Merci pour votre générosité ! Redirection vers le paiement...');
      
    } catch (error) {
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
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
              Procéder au paiement
            </>
          )}
        </button>

        <p className="form-note">
          En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
        </p>
      </form>
    </div>
  );
}

export default DonationForm;