import { useState } from 'react';
import { FaHeart, FaSeedling, FaHandshake, FaBullseye } from 'react-icons/fa';
import VolunteerForm from '../components/careers/VolunteerForm';
import './CareersPage.css';

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState('form'); // form, process

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="container">
          <h1>Devenir Bénévole</h1>
          <p>Faites partie de notre mission pour aider ceux qui en ont besoin</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="careers-tabs">
        <div className="container">
          <div className="tabs-navigation">
            <button
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              Candidature Bénévole
            </button>
            <button
              className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
              onClick={() => setActiveTab('process')}
            >
              Processus de Candidature
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="careers-content">
        <div className="container">
          {/* Form Tab */}
          {activeTab === 'form' && (
            <div className="tab-content">
              <section className="why-volunteer">
                <h2>Pourquoi devenir bénévole ?</h2>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <FaHeart />
                    </div>
                    <h3>Faire la différence</h3>
                    <p>Contribuez directement à améliorer la vie des personnes dans le besoin</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <FaSeedling />
                    </div>
                    <h3>Développer vos compétences</h3>
                    <p>Acquérez de nouvelles compétences et renforcez votre expérience professionnelle</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <FaHandshake />
                    </div>
                    <h3>Rencontrer des gens</h3>
                    <p>Rejoignez une équipe passionnée et engagée partageant les mêmes valeurs</p>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-icon">
                      <FaBullseye />
                    </div>
                    <h3>Impact mesurable</h3>
                    <p>Voyez concrètement les résultats de votre engagement sur le terrain</p>
                  </div>
                </div>
              </section>

              <section className="volunteer-testimonials">
                <h2>Témoignages de bénévoles</h2>
                <div className="testimonials-grid">
                  <div className="testimonial-card">
                    <div className="testimonial-photo">
                      <img src="/images/volunteers/volunteer1.jpg" alt="Marie" />
                    </div>
                    <p className="testimonial-text">
                      "Mon expérience en tant que bénévole a été transformatrice. J'ai appris beaucoup et j'ai surtout vu l'impact concret de nos actions."
                    </p>
                    <p className="testimonial-author">
                      <strong>Marie K.</strong> - Bénévole depuis 2 ans
                    </p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-photo">
                      <img src="/images/volunteers/volunteer2.jpg" alt="Jean" />
                    </div>
                    <p className="testimonial-text">
                      "Faire partie de cette équipe m'a permis de mettre mes compétences au service d'une cause qui me tient à cœur."
                    </p>
                    <p className="testimonial-author">
                      <strong>Jean M.</strong> - Bénévole depuis 1 an
                    </p>
                  </div>
                  <div className="testimonial-card">
                    <div className="testimonial-photo">
                      <img src="/images/volunteers/volunteer3.jpg" alt="Sophie" />
                    </div>
                    <p className="testimonial-text">
                      "Une expérience humaine incroyable qui donne du sens à ma vie quotidienne."
                    </p>
                    <p className="testimonial-author">
                      <strong>Sophie L.</strong> - Bénévole depuis 3 ans
                    </p>
                  </div>
                </div>
              </section>

          <VolunteerForm />
            </div>
          )}

          {/* Process Tab */}
          {activeTab === 'process' && (
            <div className="tab-content">
              <section className="process-section">
            <h2>Processus de Candidature</h2>
            
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Soumission de candidature</h3>
                  <p>Remplissez le formulaire ci-dessus avec vos informations et votre CV. Assurez-vous de bien détailler vos motivations et compétences.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Examen du dossier</h3>
                  <p>Notre équipe examine votre candidature dans un délai de 5 à 7 jours ouvrables. Nous étudions attentivement chaque profil.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Entretien</h3>
                  <p>Si votre profil correspond à nos besoins, nous vous contactons pour un entretien (en personne ou par visioconférence).</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Formation et intégration</h3>
                  <p>Les bénévoles retenus bénéficient d'une formation d'orientation et d'un accompagnement pour bien démarrer leur mission.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Début de la mission</h3>
                  <p>Vous commencez votre engagement avec nous et faites partie de notre équipe engagée pour le changement.</p>
                </div>
              </div>
            </div>

            <div className="requirements-section">
              <h3>Ce que nous recherchons</h3>
              <ul className="requirements-list">
                <li>✓ Engagement et motivation pour notre mission</li>
                <li>✓ Esprit d'équipe et capacité d'adaptation</li>
                <li>✓ Compétences pertinentes dans votre domaine</li>
                <li>✓ Disponibilité régulière (selon la mission)</li>
                <li>✓ Respect de nos valeurs et de notre code de conduite</li>
              </ul>
            </div>

            <div className="contact-info">
              <h3>Questions ?</h3>
              <p>Pour toute question sur le processus de candidature, contactez-nous à :</p>
              <p><strong>Email:</strong> benevolat@aejtrdc.org</p>
              <p><strong>Téléphone:</strong> +243 XXX XXX XXX</p>
            </div>
          </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;