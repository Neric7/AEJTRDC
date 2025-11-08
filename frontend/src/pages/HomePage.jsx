import HeroBanner from '../components/home/HeroBanner';
import AboutSection from '../components/home/AboutSection';
import ImageCarousel from '../components/home/ImageCarousel';
import CTASection from '../components/home/CTASection';
import LatestNews from '../components/home/LatestNews';

export default function HomePage() {
  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <HeroBanner />
      
      {/* About Section */}
      <AboutSection />

      {/* Carrousel d'images des activités terrain */}
      <ImageCarousel />

      {/* Section Call-to-Action avec boutons */}
      <CTASection />

      {/* Section des 3 dernières actualités */}
      <LatestNews limit={4} />
      
      {/* Autres sections à venir : 
          - Programmes et projets
          - Partenaires
          - Actualités
          - Contact
      */}
    </div>
  );
}