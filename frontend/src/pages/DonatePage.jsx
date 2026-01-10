import { useState } from 'react';
import { FaHeart, FaHandHoldingHeart, FaChild, FaGraduationCap, FaUtensils, FaHeartbeat } from 'react-icons/fa';
import DonationForm from '../components/donate/DonationForm';
import PaymentMethods from '../components/donate/PaymentMethods';
import ImpactStories from '../components/donate/ImpactStories';
import './DonatePage.css';

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationType, setDonationType] = useState('one-time');

  const impactLevels = [
    {
      amount: 25,
      icon: <FaUtensils />,
      title: 'Nourrir un enfant',
      description: 'Fournit des repas nutritifs pendant 1 mois',
      color: '#FDB913'
    },
    {
      amount: 50,
      icon: <FaGraduationCap />,
      title: 'Éducation',
      description: 'Fournitures scolaires pour 2 enfants',
      color: '#0B2B5B'
    },
    {
      amount: 100,
      icon: <FaHeartbeat />,
      title: 'Soins médicaux',
      description: 'Consultation et médicaments pour 5 enfants',
      color: '#7CB342'
    },
    {
      amount: 250,
      icon: <FaChild />,
      title: 'Parrainage complet',
      description: 'Soutien global pour 1 enfant pendant 3 mois',
      color: '#FDB913'
    }
  ];

  return (
    <div className="donate-page">
      {/* Hero Section */}
      <section className="donate-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaHeart />
            <span>Faire un don</span>
          </div>
          <h1 className="hero-title">
            Ensemble, Changeons <br />
            <span className="gradient-text">des Vies</span>
          </h1>
          <p className="hero-subtitle">
            Chaque contribution fait la différence dans la vie d'un enfant. <br />
            Votre générosité crée un avenir meilleur pour les enfants et jeunes travailleurs de la RDC.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Enfants aidés</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">18 ans</span>
              <span className="stat-label">D'expérience</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Impact direct</span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Cards */}
      <section className="impact-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Votre Impact</h2>
            <p className="section-subtitle">
              Découvrez comment votre don peut transformer des vies
            </p>
          </div>

          <div className="impact-grid">
            {impactLevels.map((level, index) => (
              <div 
                key={index}
                className={`impact-card ${selectedAmount === level.amount ? 'selected' : ''}`}
                onClick={() => setSelectedAmount(level.amount)}
                style={{ '--card-color': level.color }}
              >
                <div className="impact-icon" style={{ background: level.color }}>
                  {level.icon}
                </div>
                <div className="impact-amount">${level.amount}</div>
                <h3 className="impact-title">{level.title}</h3>
                <p className="impact-description">{level.description}</p>
                <button className="select-btn">
                  {selectedAmount === level.amount ? 'Sélectionné' : 'Choisir'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Type Toggle */}
      <section className="donation-type-section">
        <div className="container">
          <div className="type-toggle">
            <button 
              className={`toggle-btn ${donationType === 'one-time' ? 'active' : ''}`}
              onClick={() => setDonationType('one-time')}
            >
              <FaHandHoldingHeart />
              Don ponctuel
            </button>
            <button 
              className={`toggle-btn ${donationType === 'monthly' ? 'active' : ''}`}
              onClick={() => setDonationType('monthly')}
            >
              <FaHeart />
              Don mensuel
            </button>
          </div>
          {donationType === 'monthly' && (
            <div className="monthly-benefit">
              <p>
                <strong>Devenez partenaire mensuel :</strong> Un soutien régulier nous permet de planifier 
                nos actions à long terme et d'avoir un impact durable sur la vie des enfants.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Donation Form */}
      <section className="form-section">
        <div className="container">
          <div className="form-layout">
            <div className="form-column">
              <DonationForm 
                selectedAmount={selectedAmount}
                donationType={donationType}
                onAmountChange={setSelectedAmount}
              />
            </div>
            <div className="sidebar-column">
              <PaymentMethods />
              
              <div className="trust-badges">
                <h4>Pourquoi nous faire confiance ?</h4>
                <ul className="trust-list">
                  <li>✓ Transparence totale sur l'utilisation des dons</li>
                  <li>✓ Rapports d'activité réguliers</li>
                  <li>✓ Certifications et reconnaissances officielles</li>
                  <li>✓ 95% des fonds vont directement aux bénéficiaires</li>
                </ul>
              </div>

              <div className="security-note">
                <span className="security-icon">🔒</span>
                <p>Paiement 100% sécurisé. Vos données sont protégées.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <ImpactStories />

      {/* Other Ways to Help */}
      <section className="other-ways-section">
        <div className="container">
          <h2 className="section-title">Autres façons d'aider</h2>
          <div className="ways-grid">
            <div className="way-card">
              <div className="way-icon">🤝</div>
              <h3>Devenir bénévole</h3>
              <p>Rejoignez notre équipe et donnez de votre temps pour faire la différence.</p>
              <a href="/careers" className="way-link">En savoir plus →</a>
            </div>
            <div className="way-card">
              <div className="way-icon">🏢</div>
              <h3>Partenariat entreprise</h3>
              <p>Engagez votre entreprise dans une démarche solidaire et responsable.</p>
              <a href="/partners" className="way-link">Devenir partenaire →</a>
            </div>
            <div className="way-card">
              <div className="way-icon">📢</div>
              <h3>Partager notre cause</h3>
              <p>Aidez-nous à toucher plus de personnes en partageant notre mission.</p>
              <a href="#" className="way-link">Partager →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Questions fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Comment mon don est-il utilisé ?</h4>
              <p>95% de votre don va directement aux programmes terrain. Les 5% restants couvrent les frais administratifs essentiels.</p>
            </div>
            <div className="faq-item">
              <h4>Puis-je obtenir un reçu fiscal ?</h4>
              <p>Oui, vous recevrez automatiquement un reçu fiscal par email après votre don.</p>
            </div>
            <div className="faq-item">
              <h4>Puis-je annuler mon don mensuel ?</h4>
              <p>Oui, vous pouvez annuler votre don mensuel à tout moment depuis votre espace personnel.</p>
            </div>
            <div className="faq-item">
              <h4>Comment suivre l'impact de mon don ?</h4>
              <p>Vous recevrez des mises à jour régulières sur nos actions et l'impact de votre contribution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}