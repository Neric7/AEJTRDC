import React from 'react';
import styles from './Contact.module.css';
import { CONTACT_INFO } from '../../data/contactData'; 

const SocialLinks = () => {
    const socialLinks = CONTACT_INFO.social;

    const socialPlatforms = [
        {
            name: 'Facebook',
            url: socialLinks.facebook,
            icon: 'fa-facebook-f',
            color: '#1877f2',
            ariaLabel: 'Visitez notre page Facebook'
        },
        {
            name: 'X (Twitter)',
            url: socialLinks.x,
            icon: 'fa-twitter',
            color: '#000000',
            ariaLabel: 'Suivez-nous sur X (Twitter)'
        },
        {
            name: 'Instagram',
            url: socialLinks.instagram,
            icon: 'fa-instagram',
            color: '#e4405f',
            ariaLabel: 'Découvrez notre Instagram'
        },
        {
            name: 'LinkedIn',
            url: socialLinks.linkedIn,
            icon: 'fa-linkedin-in',
            color: '#0077b5',
            ariaLabel: 'Connectez-vous sur LinkedIn'
        }
    ];

    return (
        <div className={styles.socialLinks}>
            <h3 className={styles.socialTitle}>Suivez-nous sur les réseaux sociaux</h3>
            <p className={styles.socialSubtitle}>
                Restez connectés et ne manquez aucune actualité
            </p>
            
            <div className={styles.linksContainer}>
                {socialPlatforms.map((platform, index) => (
                    platform.url && (
                        <a
                            key={index}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label={platform.ariaLabel}
                            title={platform.name}
                        >
                            <i className={`fa ${platform.icon}`}></i>
                        </a>
                    )
                ))}
            </div>

            <div className={styles.socialFooter}>
                <p>Partagez notre mission et engagez-vous avec notre communauté</p>
            </div>
        </div>
    );
};

export default SocialLinks;