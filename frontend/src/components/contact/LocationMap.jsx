import React from 'react';
import styles from './Contact.module.css';
import { CONTACT_INFO } from '../../data/contactData'; 

const LocationMap = () => {
    const siege = CONTACT_INFO.locations[0];
    
    const getMapIframe = (location) => {
        return (
            <iframe 
                className={styles.mapIframe}
                title={`Carte de ${location.city}`}
                width="100%" 
                height="400" 
                loading="lazy"
                src={`https://maps.google.com/maps?q=${location.coords.lat},${location.coords.lng}&z=15&output=embed`}
                allowFullScreen
            ></iframe>
        );
    };

    const formatPhoneForWhatsApp = (phone) => {
        return phone.replace(/[\s+\(\)-]/g, '');
    };

    const formatPhoneForTel = (phone) => {
        return phone.replace(/\s/g, '');
    };
    
    return (
        <div className={styles.locationMap}>
            <h2 className={styles.sectionTitle}>Notre Localisation et Antennes</h2>
            
            {/* Affichage des coordonnées de contact principales */}
            <div className={styles.contactDetails}>
                <p>
                    <strong>📧 E-mail Officiel :</strong>
                    <a href={`mailto:${CONTACT_INFO.email}`}>
                        {CONTACT_INFO.email}
                    </a>
                </p>
                <p>
                    <strong>📞 Direction Nationale :</strong>
                    <a href={`tel:${formatPhoneForTel(CONTACT_INFO.directionNationale)}`}>
                        {CONTACT_INFO.directionNationale}
                    </a>
                </p>
                <p>
                    <a 
                        href={`https://wa.me/${formatPhoneForWhatsApp(CONTACT_INFO.directionNationale)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.whatsappLink}
                    >
                        <i className="fa fa-whatsapp"></i> Contacter par WhatsApp
                    </a>
                </p>
            </div>
            
            {/* Carte du Siège */}
            <div className={styles.mainLocation}>
                <h3 className={styles.locationTitle}>
                    🏢 {siege.name} - {siege.city}
                </h3>
                <p className={styles.locationAddress}>📍 {siege.address}</p>
                <div className={styles.mapContainer}>
                    {getMapIframe(siege)}
                </div>
            </div>

            {/* Liste des autres Antennes */}
            {CONTACT_INFO.locations.length > 1 && (
                <div className={styles.antennasSection}>
                    <h3 className={styles.locationTitle}>
                        📍 Nos Antennes Provinciales
                    </h3>
                    <ul className={styles.antennasList}>
                        {CONTACT_INFO.locations.slice(1).map((antenne, index) => (
                            <li key={index} className={styles.antenneItem}>
                                <strong>{antenne.city}</strong>
                                <p>{antenne.address}</p>
                                <a 
                                    href={antenne.mapUrl || `https://maps.google.com/maps?q=${antenne.coords.lat},${antenne.coords.lng}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className={styles.viewMapLink}
                                >
                                    🗺️ Voir sur la carte →
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LocationMap;