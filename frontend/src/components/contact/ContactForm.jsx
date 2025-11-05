import React, { useState } from 'react';
import styles from './Contact.module.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Réinitialiser le statut si l'utilisateur modifie le formulaire
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulation d'envoi (remplacer par votre API réelle)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Données du formulaire soumises :', formData);
            
            // Ici, intégrez votre logique d'envoi réelle
            // Exemple : await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
            
            setSubmitStatus('success');
            setFormData({ nom: '', email: '', sujet: '', message: '' });
            
            // Réinitialiser le message après 5 secondes
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h3 className={styles.formTitle}>Envoyez-nous un message</h3>
            
            {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                    ✓ Message envoyé avec succès ! Nous vous répondrons bientôt.
                </div>
            )}
            
            {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                    ✗ Une erreur s'est produite. Veuillez réessayer.
                </div>
            )}
            
            <div className={styles.fieldGroup}>
                <label htmlFor="nom">Nom Complet *</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom complet"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="email">Email Officiel *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre.email@exemple.com"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="sujet">Sujet *</label>
                <input
                    type="text"
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    placeholder="L'objet de votre message"
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.fieldGroup}>
                <label htmlFor="message">Votre Message *</label>
                <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Écrivez votre message ici..."
                    required
                    disabled={isSubmitting}
                ></textarea>
            </div>

            <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
        </form>
    );
};

export default ContactForm;