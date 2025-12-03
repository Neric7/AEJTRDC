import React from 'react';
import './TestimonySection.css';

const TestimonySection = ({ testimonies }) => {
  return (
    <div className="testimony-section">
      <div className="testimony-container">
        <h2 className="testimony-title">Témoignages de bénéficiaires</h2>
        <div className="testimonies-grid">
          {testimonies.map((testimony, index) => (
            <div key={index} className="testimony-card">
              <div className="quote-icon">"</div>
              <p className="testimony-text">{testimony.text}</p>
              <div className="testimony-author">
                <div className="author-avatar">
                  {testimony.name.charAt(0)}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimony.name}</div>
                  <div className="author-role">{testimony.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonySection;