import React from 'react';
import PartnerLogo from './PartnerLogo';
import './PartnerGrid.css';

const PartnerGrid = () => {
  const partners = [
    {
      id: 1,
      name: "ONU FEMMES",
      logo: "/src/assets/images/partners/onu-femmes.png",
      description: "Entité des Nations Unies pour l'égalité des sexes et l'autonomisation des femmes",
      website: "https://www.unwomen.org"
    },
    {
      id: 2,
      name: "RFEGL",
      logo: "/src/assets/images/partners/rfegl.png",
      description: "Réseau des Femmes pour la Gouvernance et la Leadership",
      website: "#"
    },
    {
      id: 3,
      name: "UNHCR",
      logo: "/src/assets/images/partners/unhcr.png",
      description: "Haut Commissariat des Nations Unies pour les réfugiés",
      website: "https://www.unhcr.org"
    },
    {
      id: 4,
      name: "CARE",
      logo: "/src/assets/images/partners/care.png",
      description: "Organisation humanitaire de lutte contre la pauvreté",
      website: "https://www.care.org"
    },
    {
      id: 5,
      name: "UNICEF",
      logo: "/src/assets/images/partners/unicef.png",
      description: "Fonds des Nations Unies pour l'enfance",
      website: "https://www.unicef.org"
    },
    {
      id: 6,
      name: "IFP",
      logo: "/src/assets/images/partners/ifp.png",
      description: "Institut de Formation Professionnelle",
      website: "#"
    },
    {
      id: 7,
      name: "CONAFOHD",
      logo: "/src/assets/images/partners/conafohd.png",
      description: "Conseil National des Femmes pour le Développement",
      website: "#"
    },
    {
      id: 8,
      name: "MAEJT",
      logo: "/src/assets/images/partners/maejt.png",
      description: "Mouvement Africain des Enfants et Jeunes Travailleurs",
      website: "#"
    }
  ];

  return (
    <div className="partner-grid">
      {partners.map(partner => (
        <PartnerLogo key={partner.id} partner={partner} />
      ))}
    </div>
  );
};

export default PartnerGrid;