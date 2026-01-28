import React, { useState } from 'react';
import { Download, FileText, Shield, Users, Heart, Lock, Scale, ChevronDown, ExternalLink, Search } from 'lucide-react';
import './PolicyDocuments.css';

const PolicyDocuments = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  // URL du PDF unique contenant toutes les politiques
  const PDF_URL = '/documents/policies/POLITIQUE_INTERNE_AEJT-RDCONGO.pdf';

  // Fonction de téléchargement du PDF
  const handleDownload = (policyTitle) => {
    // Créer un lien temporaire pour télécharger
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = 'POLITIQUE_INTERNE_AEJT-RDCONGO.pdf'; // Nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Optionnel : Logger pour analytics
    console.log(`Téléchargement de la politique: ${policyTitle}`);
  };

  // Fonction pour ouvrir le PDF dans un nouvel onglet
  const handleView = () => {
    window.open(PDF_URL, '_blank');
  };

  // Données des politiques internes
  const policies = [
    {
      id: 1,
      title: "Politique Interne Générale",
      category: "general",
      icon: FileText,
      color: "#2C5F2D",
      description: "Cadre normatif et opérationnel de l'organisation définissant les principes fondamentaux, valeurs et engagements de l'AEJT-RDCONGO.",
      sections: [
        "Principes fondamentaux et valeurs",
        "Code de conduite et éthique professionnelle",
        "Politique de sauvegarde et protection de l'enfance",
        "Redevabilité envers les populations affectées",
        "Gestion opérationnelle et développement durable"
      ],
      fileSize: "850 KB",
      lastUpdated: "23 Septembre 2024",
      downloadUrl: PDF_URL
    },
    {
      id: 2,
      title: "Politique Anti-Fraude et Corruption",
      category: "integrity",
      icon: Shield,
      color: "#C41E3A",
      description: "Mécanismes de prévention, détection et gestion des cas de fraude et corruption. Engagement de tolérance zéro.",
      sections: [
        "Définitions et principes fondamentaux",
        "Mesures de prévention (gestion financière, recrutement)",
        "Mécanismes de signalement et protection des lanceurs d'alerte",
        "Procédure d'enquête et sanctions",
        "Formation et sensibilisation"
      ],
      fileSize: "620 KB",
      lastUpdated: "28 Janvier 2026",
      downloadUrl: PDF_URL
    },
    {
      id: 3,
      title: "Politique de Protection de l'Enfance",
      category: "safeguarding",
      icon: Heart,
      color: "#FF6B35",
      description: "Standards de sauvegarde garantissant un environnement sûr pour chaque enfant, conforme aux conventions internationales.",
      sections: [
        "Définitions et principes directeurs",
        "Recrutement sûr et vérification des antécédents",
        "Code de conduite pour le personnel",
        "Mécanismes de signalement des abus",
        "Procédures d'intervention et sanctions"
      ],
      fileSize: "780 KB",
      lastUpdated: "28 Janvier 2026",
      downloadUrl: PDF_URL
    },
    {
      id: 4,
      title: "Politique Genre et Inclusion",
      category: "inclusion",
      icon: Users,
      color: "#7B2CBF",
      description: "Promotion de l'égalité des sexes et inclusion de tous sans discrimination de genre, âge, handicap ou origine.",
      sections: [
        "Égalité des genres dans les programmes",
        "Prévention des violences basées sur le genre",
        "Inclusion des personnes handicapées",
        "Non-discrimination et équité",
        "Indicateurs de suivi genre"
      ],
      fileSize: "590 KB",
      lastUpdated: "28 Janvier 2026",
      downloadUrl: PDF_URL
    },
    {
      id: 5,
      title: "Code de Conduite du Personnel",
      category: "conduct",
      icon: Scale,
      color: "#0077B6",
      description: "Règles de comportement professionnel et éthique pour tous les employés, volontaires et partenaires.",
      sections: [
        "Valeurs et principes de conduite",
        "Relations professionnelles et respect",
        "Utilisation des ressources de l'organisation",
        "Comportements interdits",
        "Sanctions disciplinaires"
      ],
      fileSize: "510 KB",
      lastUpdated: "28 Janvier 2026",
      downloadUrl: PDF_URL
    },
    {
      id: 6,
      title: "Politique de Confidentialité et Intégrité",
      category: "privacy",
      icon: Lock,
      color: "#06A77D",
      description: "Protection des données personnelles des bénéficiaires, partenaires et personnel conformément aux standards internationaux.",
      sections: [
        "Collecte et traitement des données",
        "Consentement éclairé et droits des personnes",
        "Sécurité et stockage des données",
        "Partage d'informations avec des tiers",
        "Conservation et destruction des données"
      ],
      fileSize: "470 KB",
      lastUpdated: "28 Janvier 2026",
      downloadUrl: PDF_URL
    }
  ];

  const categories = [
    { id: 'all', label: 'Toutes les politiques', count: policies.length },
    { id: 'general', label: 'Politique Générale', count: 1 },
    { id: 'integrity', label: 'Intégrité', count: 1 },
    { id: 'safeguarding', label: 'Sauvegarde', count: 1 },
    { id: 'inclusion', label: 'Inclusion', count: 1 },
    { id: 'conduct', label: 'Conduite', count: 1 },
    { id: 'privacy', label: 'Confidentialité', count: 1 }
  ];

  // Filtrage des politiques
  const filteredPolicies = policies.filter(policy => {
    const matchesCategory = activeCategory === 'all' || policy.category === activeCategory;
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (policyId) => {
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };

  return (
    <div className="policy-documents-container">
      {/* En-tête */}
      <div className="policy-header">
        <div className="policy-header-content">
          <div className="policy-title-section">
            <h1 className="policy-main-title">Politiques Internes</h1>
            <p className="policy-subtitle">
              Documents officiels définissant notre cadre normatif, nos engagements éthiques 
              et nos standards de protection. Conformes aux principes humanitaires internationaux.
            </p>
          </div>
          
          {/* Barre de recherche */}
          <div className="policy-search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Rechercher une politique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="policy-categories">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          >
            {category.label}
            <span className="category-count">{category.count}</span>
          </button>
        ))}
      </div>

      {/* Liste des politiques */}
      <div className="policies-grid">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => {
            const Icon = policy.icon;
            const isExpanded = expandedPolicy === policy.id;
            
            return (
              <div 
                key={policy.id} 
                className="policy-card"
                style={{ '--policy-color': policy.color }}
              >
                {/* En-tête de la carte */}
                <div className="policy-card-header">
                  <div className="policy-icon-wrapper">
                    <Icon size={32} className="policy-icon" />
                  </div>
                  <div className="policy-meta">
                    <h3 className="policy-card-title">{policy.title}</h3>
                    <div className="policy-info">
                      <span className="policy-size">{policy.fileSize}</span>
                      <span className="policy-divider">•</span>
                      <span className="policy-date">Mis à jour : {policy.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="policy-description">{policy.description}</p>

                {/* Sections (repliable) */}
                <div className={`policy-sections ${isExpanded ? 'expanded' : ''}`}>
                  <button 
                    className="sections-toggle"
                    onClick={() => toggleExpand(policy.id)}
                  >
                    <span>Contenu de la politique</span>
                    <ChevronDown 
                      size={20} 
                      className={`chevron-icon ${isExpanded ? 'rotated' : ''}`}
                    />
                  </button>
                  
                  {isExpanded && (
                    <ul className="sections-list">
                      {policy.sections.map((section, index) => (
                        <li key={index} className="section-item">
                          <div className="section-bullet"></div>
                          {section}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Actions */}
                <div className="policy-actions">
                  <button 
                    className="btn-download"
                    onClick={() => handleDownload(policy.title)}
                  >
                    <Download size={18} />
                    <span>Télécharger PDF</span>
                  </button>
                  <button 
                    className="btn-view"
                    onClick={handleView}
                  >
                    <ExternalLink size={18} />
                    <span>Consulter</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-results">
            <FileText size={64} className="no-results-icon" />
            <h3>Aucune politique trouvée</h3>
            <p>Essayez de modifier vos critères de recherche ou de filtrage.</p>
          </div>
        )}
      </div>

      {/* Pied de page informatif */}
      <div className="policy-footer-info">
        <div className="info-card">
          <Shield size={24} />
          <div>
            <h4>Engagement de Transparence</h4>
            <p>Toutes nos politiques sont régulièrement révisées et accessibles au public.</p>
          </div>
        </div>
        <div className="info-card">
          <Lock size={24} />
          <div>
            <h4>Conformité</h4>
            <p>Alignées sur les standards internationaux (CHS, PSEA, RGPD, CIDE).</p>
          </div>
        </div>
        <div className="info-card">
          <Users size={24} />
          <div>
            <h4>Application Universelle</h4>
            <p>Ces politiques s'appliquent à tous les membres, employés, volontaires et partenaires.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDocuments;