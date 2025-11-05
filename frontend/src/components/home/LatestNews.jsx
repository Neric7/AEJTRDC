import styles from './LatestNews.module.css';

export default function LatestNews() {
  const news = [
    {
      id: 1,
      image: '/src/assets/images/news/news-1.webp',
      category: 'Projet',
      date: '15 Oct 2025',
      title: 'Lancement du programme de formation professionnelle à Kinshasa',
      excerpt: '50 jeunes bénéficient d\'une formation en menuiserie et couture pour leur insertion socio-économique.',
      link: '/news/formation-kinshasa'
    },
    {
      id: 2,
      image: '/src/assets/images/news/news-2.jpeg',
      category: 'Actualité',
      date: '10 Oct 2025',
      title: 'Campagne de sensibilisation sur les droits de l\'enfant',
      excerpt: 'Plus de 200 familles sensibilisées dans les provinces du Nord-Kivu et Sud-Kivu.',
      link: '/news/campagne-droits-enfant'
    },
    {
      id: 3,
      image: '/src/assets/images/news/news-3.jpg',
      category: 'Événement',
      date: '05 Oct 2025',
      title: 'Journée mondiale de lutte contre le travail des enfants',
      excerpt: 'AEJTRD organise une journée de plaidoyer avec ses partenaires locaux et internationaux.',
      link: '/news/journee-mondiale'
    }
  ];

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.sectionTitle}>Nos Dernières Actualités</h2>
            <p className={styles.sectionSubtitle}>
              Restez informé de nos actions et projets en cours
            </p>
          </div>
          <a href="/news" className={styles.viewAllButton}>
            Voir toutes les actualités
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* News Grid */}
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <article key={item.id} className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={styles.newsImage}
                />
                <span className={styles.categoryBadge}>{item.category}</span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={styles.date}>{item.date}</span>
                </div>

                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsExcerpt}>{item.excerpt}</p>

                <a href={item.link} className={styles.readMoreLink}>
                  Lire la suite
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}