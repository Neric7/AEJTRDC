import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';
import './MemberCard.css';

const MemberCard = ({ member }) => {
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: <Linkedin size={18} />,
      twitter: <Twitter size={18} />,
      facebook: <Facebook size={18} />
    };
    return icons[platform] || null;
  };

  return (
    <div className="member-card">
      <div className="member-photo-container">
        {member.photo ? (
          <img 
            src={member.photo} 
            alt={member.full_name}
            className="member-photo"
          />
        ) : (
          <div className="member-photo-placeholder">
            <span className="member-initials">
              {member.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
      </div>

      <div className="member-content">
        <h3 className="member-name">{member.full_name}</h3>
        <p className="member-position">{member.position}</p>
        {member.role && (
          <p className="member-role">{member.role}</p>
        )}

        {member.bio && (
          <p className="member-bio">{member.bio}</p>
        )}

        <div className="member-contact">
          {member.email && (
            <a href={`mailto:${member.email}`} className="contact-link">
              <Mail size={16} />
              <span>{member.email}</span>
            </a>
          )}
          {member.phone && (
            <a href={`tel:${member.phone}`} className="contact-link">
              <Phone size={16} />
              <span>{member.phone}</span>
            </a>
          )}
        </div>

        {member.social_links && Object.keys(member.social_links).length > 0 && (
          <div className="member-social">
            {Object.entries(member.social_links).map(([platform, url]) => (
              <a 
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title={platform}
              >
                {getSocialIcon(platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCard;