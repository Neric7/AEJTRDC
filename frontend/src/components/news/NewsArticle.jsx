import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function NewsArticle({ article, onBack, onRelatedArticle }) {
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    fetchRelatedArticles();
  }, [article.id]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await api.get(`/news/${article.id}/related`);
      setRelatedArticles(response.data);
    } catch (error) {
      console.error('Erreur chargement articles connexes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          ← Retour aux actualités
        </button>

        {/* Article principal */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags?.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Métadonnées */}
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <span>Par {article.author}</span>
              <span>•</span>
              <span>{new Date(article.published_at).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <span>{article.views} vues</span>
            </div>

            {/* Extrait */}
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Contenu */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </div>
        </article>

        {/* Articles connexes */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Articles connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(related => (
                <div 
                  key={related.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                  onClick={() => onRelatedArticle(related.id)}
                >
                  {related.image && (
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}