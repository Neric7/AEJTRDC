import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye, ExternalLink } from 'lucide-react';
import { 
  newsAPI, 
  projectsAPI, 
  jobsAPI, 
  alertsAPI,
  teamAPI,
  partnersAPI,
  reportsAPI,
  mediaAPI,
  domainsAPI
} from '../services/adminApi';
import toast from 'react-hot-toast';
import './ContentPage.css';

// Importation des éditeurs
import NewsEditor from '../components/ContentEditor/NewsEditor';
import ProjectEditor from '../components/ContentEditor/ProjectEditor';
import JobEditor from '../components/ContentEditor/JobEditor';
import AlertEditor from '../components/ContentEditor/AlertEditor';
import DomainEditor from '../components/ContentEditor/DomainEditor';

const ContentPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // URL du frontend
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

  const contentConfig = {
    news: {
      title: 'Actualités',
      api: newsAPI,
      editor: NewsEditor,
      columns: ['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/news/${item.slug || item.id}`,
    },
    projects: {
      title: 'Projets',
      api: projectsAPI,
      editor: ProjectEditor,
      columns: ['Titre', 'Lieu', 'Statut', 'Budget', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/projects/${item.slug || item.id}`,
    },
    domains: {
      title: 'Domaines d\'intervention',
      api: domainsAPI,
      editor: DomainEditor,
      columns: ['Titre', 'Slug', 'Ordre', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/domains/${item.id}`, // Utiliser ID au lieu de slug
    },
    jobs: {
      title: 'Offres d\'emploi',
      api: jobsAPI,
      editor: JobEditor,
      columns: ['Titre', 'Type', 'Lieu', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/careers`,
    },
    alerts: {
      title: 'Alertes humanitaires',
      api: alertsAPI,
      editor: AlertEditor,
      columns: ['Titre', 'Priorité', 'Statut', 'Date', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/humanitarian`,
    },
    team: {
      title: 'Équipe',
      api: teamAPI,
      editor: null,
      columns: ['Nom', 'Poste', 'Email', 'Téléphone', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/about/team`,
    },
    partners: {
      title: 'Partenaires',
      api: partnersAPI,
      editor: null,
      columns: ['Nom', 'Type', 'Site web', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/partners`,
    },
    reports: {
      title: 'Rapports',
      api: reportsAPI,
      editor: null,
      columns: ['Titre', 'Type', 'Année', 'Téléchargements', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/transparency/reports`,
    },
    media: {
      title: 'Médias',
      api: mediaAPI,
      editor: null,
      columns: ['Nom', 'Type', 'Taille', 'Date', 'Actions'],
      viewUrl: null,
    },
  };

  const config = contentConfig[type] || contentConfig.news;

  useEffect(() => {
    fetchItems();
  }, [type, filterStatus]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = filterStatus !== 'all' ? { status: filterStatus } : {};
      const response = await config.api.getAll(params);
      setItems(response.data.data || response.data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setShowEditor(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditor(true);
  };

  const handleView = (item) => {
    if (config.viewUrl) {
      const url = config.viewUrl(item);
      window.open(url, '_blank');
    } else {
      toast.info('Aperçu non disponible pour ce type de contenu');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
      return;
    }

    try {
      await config.api.delete(id);
      toast.success('Élément supprimé avec succès');
      fetchItems();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSave = () => {
    setShowEditor(false);
    setSelectedItem(null);
    fetchItems();
  };

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Fonction pour afficher les données selon le type
  const renderTableRow = (item) => {
    switch (type) {
      case 'domains':
        return (
          <>
            <td>{item.titre}</td>
            <td><code>{item.slug}</code></td>
            <td>{item.ordre || 0}</td>
            <td>
              <span className={`status-badge status-${item.actif ? 'published' : 'archived'}`}>
                {item.actif ? 'Actif' : 'Inactif'}
              </span>
            </td>
          </>
        );
      case 'news':
        return (
          <>
            <td>{item.title}</td>
            <td>{item.category || 'general'}</td>
            <td>
              <span className={`status-badge status-${item.status}`}>
                {item.status === 'published' ? 'Publié' : item.status === 'draft' ? 'Brouillon' : 'Archivé'}
              </span>
            </td>
            <td>{item.published_at ? new Date(item.published_at).toLocaleDateString('fr-FR') : '-'}</td>
          </>
        );
      case 'projects':
        return (
          <>
            <td>{item.title}</td>
            <td>{item.location}</td>
            <td>
              <span className={`status-badge status-${item.status}`}>
                {item.status === 'active' ? 'Actif' : item.status === 'completed' ? 'Terminé' : 'Inactif'}
              </span>
            </td>
            <td>{item.budget ? `${item.budget} $` : '-'}</td>
          </>
        );
      default:
        return (
          <>
            <td>{item.title || item.name || item.titre}</td>
            <td>{item.category || item.type || item.location}</td>
            <td>
              <span className={`status-badge status-${item.status || 'published'}`}>
                {item.status || 'publié'}
              </span>
            </td>
            <td>{item.date || item.budget || item.priority}</td>
          </>
        );
    }
  };

  return (
    <div className="content-container">
      <div className="content-header">
        <div>
          <h1>{config.title}</h1>
          <p>Gérez vos {config.title.toLowerCase()}</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={20} />
          Ajouter
        </button>
      </div>

      <div className="content-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {type !== 'domains' && (
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        )}
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="no-data">
            <p>Aucun élément trouvé</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {config.columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    {renderTableRow(item)}
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn btn-view"
                          onClick={() => handleView(item)}
                          title="Voir sur le site"
                        >
                          <ExternalLink size={18} />
                        </button>
                        <button
                          className="action-btn btn-edit"
                          onClick={() => handleEdit(item)}
                          title="Modifier"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(item.id)}
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Éditeur */}
      {showEditor && config.editor && (
        <div className="modal-overlay" onClick={() => setShowEditor(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {config.editor && (
              <config.editor
                item={selectedItem}
                onSave={handleSave}
                onCancel={() => setShowEditor(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;