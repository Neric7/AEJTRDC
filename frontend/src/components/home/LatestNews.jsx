import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLatestNews } from '../../services/news';
import Card from '../common/Card';
import Button from '../common/Button';

export default function LatestNews({ limit = 3 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchLatestNews({ limit });
        if (mounted) setNews(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setError('Impossible de charger les actualités');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [limit]);

  if (loading) {
    return (
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900">Dernières Actualités</h2>
            <p className="text-secondary-600 mt-2">Restez informé de nos actions sur le terrain</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse" shadow="soft" radius="lg" padding="md">
                <div className="bg-gray-300 h-48 w-full rounded-md mb-4"></div>
                <div className="bg-gray-300 h-5 w-3/4 rounded mb-3"></div>
                <div className="bg-gray-200 h-3 w-full rounded mb-2"></div>
                <div className="bg-gray-200 h-3 w-5/6 rounded"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || news.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Dernières Actualités</h2>
          <p className="text-secondary-600 mt-2">Restez informé de nos actions sur le terrain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card
              key={article.id}
              className="h-full flex flex-col overflow-hidden"
              shadow="soft"
              radius="lg"
              padding="none"
              hover
            >
              {article.image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-1">
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                      {article.tags[0]}
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                {article.published_at && (
                  <div className="text-xs text-secondary-500 mb-3">
                    <time dateTime={article.published_at}>
                      {new Date(article.published_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                )}
                
                <p className="text-secondary-700 mb-4 flex-1 line-clamp-3">
                  {article.excerpt || article.content?.slice(0, 150)}
                </p>
                
                <Link to={`/news/${article.slug || article.id}`} className="mt-auto">
                  <Button variant="outline" size="sm" fullWidth>
                    Lire l'article
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/news">
            <Button variant="primary" size="lg">
              Voir toutes les actualités
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}