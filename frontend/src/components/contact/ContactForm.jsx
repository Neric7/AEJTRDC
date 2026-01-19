import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        sujet: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Configuration EmailJS - REMPLACEZ CES VALEURS PAR LES VÔTRES
    const EMAILJS_CONFIG = {
        serviceId: 'service_1',
        templateId: 'template_yb5lmw1',
        publicKey: 'CWjeOWASjY7zeJz27'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Envoi avec EmailJS
            const result = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                {
                    nom: formData.nom,
                    email: formData.email,
                    sujet: formData.sujet,
                    message: formData.message
                },
                EMAILJS_CONFIG.publicKey
            );

            console.log('Email envoyé avec succès:', result.text);
            setSubmitStatus('success');
            setFormData({ nom: '', email: '', sujet: '', message: '' });
            
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        
        // Validation simple
        if (!formData.nom || !formData.email || !formData.sujet || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        handleSubmit();
    };

    return (
        <div style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <h3 style={{
                    margin: '0 0 24px 0',
                    fontSize: '24px',
                    color: '#333',
                    textAlign: 'center'
                }}>Envoyez-nous un message</h3>
                
                {submitStatus === 'success' && (
                    <div style={{
                        padding: '12px 16px',
                        marginBottom: '20px',
                        background: '#d4edda',
                        color: '#155724',
                        border: '1px solid #c3e6cb',
                        borderRadius: '6px',
                        fontSize: '14px'
                    }}>
                        ✓ Message envoyé avec succès ! Nous vous répondrons bientôt.
                    </div>
                )}
                
                {submitStatus === 'error' && (
                    <div style={{
                        padding: '12px 16px',
                        marginBottom: '20px',
                        background: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                        borderRadius: '6px',
                        fontSize: '14px'
                    }}>
                        ✗ Une erreur s'est produite. Veuillez réessayer.
                    </div>
                )}
                
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="nom" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px'
                    }}>Nom Complet *</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Votre nom complet"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="email" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px'
                    }}>Email Officiel *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="votre.email@exemple.com"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="sujet" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px'
                    }}>Sujet *</label>
                    <input
                        type="text"
                        id="sujet"
                        name="sujet"
                        value={formData.sujet}
                        onChange={handleChange}
                        placeholder="L'objet de votre message"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.3s'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="message" style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px'
                    }}>Votre Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Écrivez votre message ici..."
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.3s'
                        }}
                    ></textarea>
                </div>

                <button 
                    onClick={handleSubmitClick}
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '14px',
                        background: isSubmitting ? '#6c757d' : '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s'
                    }}
                    onMouseOver={(e) => {
                        if (!isSubmitting) e.target.style.background = '#0056b3';
                    }}
                    onMouseOut={(e) => {
                        if (!isSubmitting) e.target.style.background = '#007bff';
                    }}
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </button>
            </div>

        
        </div>
    );
};

export default ContactForm;