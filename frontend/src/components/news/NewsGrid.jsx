export default function NewsGrid({ news, onArticleSelect }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map(article => (
          <div 
            key={article.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            onClick={() => onArticleSelect(article.id)}
          >
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {article.tags?.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Par {article.author}</span>
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }