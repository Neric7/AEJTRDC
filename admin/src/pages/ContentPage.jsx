import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { 
  newsAPI, 
  projectsAPI, 
  jobsAPI, 
  alertsAPI,
  teamAPI,
  partnersAPI,
  reportsAPI,
  mediaAPI 
} from '../services/adminApi';
import toast from 'react-hot-toast';
import './ContentPage.css';

// Importation des éditeurs
import NewsEditor from '../components/ContentEditor/NewsEditor';
import ProjectEditor from '../components/ContentEditor/ProjectEditor';
import JobEditor from '../components/ContentEditor/JobEditor';
import AlertEditor from '../components/ContentEditor/AlertEditor';

const ContentPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const contentConfig = {
    news: {
      title: 'Actualités',
      api: newsAPI,
      editor: NewsEditor,
      columns: ['Titre', 'Catégorie', 'Statut', 'Date', 'Actions'],
    },
    projects: {
      title: 'Projets',
      api: projectsAPI,
      editor: ProjectEditor,
      columns: ['Titre', 'Lieu', 'Statut', 'Budget', 'Actions'],
    },
    jobs: {
      title: 'Offres d\'emploi',
      api: jobsAPI,
      editor: JobEditor,
      columns: ['Titre', 'Type', 'Lieu', 'Statut', 'Actions'],
    },
    alerts: {
      title: 'Alertes humanitaires',
      api: alertsAPI,
      editor: AlertEditor,
      columns: ['Titre', 'Priorité', 'Statut', 'Date', 'Actions'],
    },
    team: {
      title: 'Équipe',
      api: teamAPI,
      editor: null,
      columns: ['Nom', 'Poste', 'Email', 'Téléphone', 'Actions'],
    },
    partners: {
      title: 'Partenaires',
      api: partnersAPI,
      editor: null,
      columns: ['Nom', 'Type', 'Site web', 'Statut', 'Actions'],
    },
    reports: {
      title: 'Rapports',
      api: reportsAPI,
      editor: null,
      columns: ['Titre', 'Type', 'Année', 'Téléchargements', 'Actions'],
    },
    media: {
      title: 'Médias',
      api: mediaAPI,
      editor: null,
      columns: ['Nom', 'Type', 'Taille', 'Date', 'Actions'],
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
                    <td>{item.title || item.name}</td>
                    <td>{item.category || item.type || item.location}</td>
                    <td>
                      <span className={`status-badge status-${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>{item.date || item.budget || item.priority}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn btn-view"
                          title="Voir"
                        >
                          <Eye size={18} />
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