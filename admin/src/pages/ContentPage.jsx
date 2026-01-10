import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, ExternalLink, User } from 'lucide-react';
import { 
  newsAPI, 
  projectsAPI, 
  jobsAPI, 
  alertsAPI,
  teamAPI,
  partnersAPI,
  reportsAPI,
  mediaAPI,
  domainsAPI,
  volunteersAPI
} from '../services/adminApi';
import toast from 'react-hot-toast';
import { useAlert } from '../context/AlertProvider';
import './ContentPage.css';

// Importation des éditeurs
import NewsEditor from '../components/ContentEditor/NewsEditor';
import ProjectEditor from '../components/ContentEditor/ProjectEditor';
import JobEditor from '../components/ContentEditor/JobEditor';
import DomainEditor from '../components/ContentEditor/DomainEditor';
import PartnerEditor from '../components/ContentEditor/PartnerEditor';
import VolunteerExaminer from '../components/ContentEditor/VolunteerExaminer';
import TeamEditor from '../components/ContentEditor/TeamEditor'; // ← AJOUT

const ContentPage = () => {
  const { type } = useParams();
  const { showDeleteConfirm } = useAlert();
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
      itemName: (item) => `l'actualité "${item.title}"`,
    },
    projects: {
      title: 'Projets',
      api: projectsAPI,
      editor: ProjectEditor,
      columns: ['Titre', 'Lieu', 'Statut', 'Budget', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/projects/${item.slug || item.id}`,
      itemName: (item) => `le projet "${item.title}"`,
    },
    domains: {
      title: 'Domaines d\'intervention',
      api: domainsAPI,
      editor: DomainEditor,
      columns: ['Titre', 'Slug', 'Ordre', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/domains/${item.id}`,
      itemName: (item) => `le domaine "${item.titre}"`,
    },
    jobs: {
      title: 'Offres d\'emploi',
      api: jobsAPI,
      editor: JobEditor,
      columns: ['Titre', 'Type', 'Lieu', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/careers`,
      itemName: (item) => `l'offre "${item.title}"`,
    },
    // ← CONFIGURATION ÉQUIPE
    team: {
      title: 'Équipe',
      api: teamAPI,
      editor: TeamEditor,
      columns: ['Photo', 'Nom', 'Catégorie', 'Poste', 'Email', 'Téléphone', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/team`,
      itemName: (item) => `${item.full_name}`,
      useCustomFilters: true, // Pour utiliser les filtres de catégorie
    },
    partners: {
      title: 'Partenaires',
      api: partnersAPI,
      editor: PartnerEditor,
      columns: ['Nom', 'Type', 'Site web', 'Statut', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/partners`,
      itemName: (item) => `le partenaire "${item.name}"`,
    },
    reports: {
      title: 'Rapports',
      api: reportsAPI,
      editor: null,
      columns: ['Titre', 'Type', 'Année', 'Téléchargements', 'Actions'],
      viewUrl: (item) => `${FRONTEND_URL}/transparency/reports`,
      itemName: (item) => `le rapport "${item.title}"`,
    },
    media: {
      title: 'Médias',
      api: mediaAPI,
      editor: null,
      columns: ['Nom', 'Type', 'Taille', 'Date', 'Actions'],
      viewUrl: null,
      itemName: (item) => `le média "${item.name}"`,
    },
    volunteers: {
      title: 'Bénévoles',
      api: volunteersAPI,
      editor: VolunteerExaminer,
      columns: ['Nom complet', 'Email', 'Téléphone', 'Domaine', 'Disponibilité', 'Statut', 'Date', 'Actions'],
      viewUrl: null,
      itemName: (item) => `la candidature de "${item.full_name}"`,
    },
  };

  const config = contentConfig[type] || contentConfig.news;

  useEffect(() => {
    fetchItems();
  }, [type, filterStatus]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      let params = {};
      
      // Pour l'équipe, utiliser les filtres de catégorie
      if (type === 'team') {
        if (filterStatus !== 'all') {
          params.category = filterStatus;
        }
      } else if (filterStatus !== 'all') {
        params.status = filterStatus;
      }
      
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

  const handleDelete = async (item) => {
    const itemName = config.itemName ? config.itemName(item) : 'cet élément';
    
    const confirmed = await showDeleteConfirm(itemName);
    
    if (!confirmed) return;

    try {
      await config.api.delete(item.id);
      toast.success('Élément supprimé avec succès');
      fetchItems();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Toggle statut pour l'équipe
  const handleToggleStatus = async (item) => {
    try {
      await teamAPI.toggleStatus(item.id);
      toast.success('Statut mis à jour');
      fetchItems();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour du statut');
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

  // Fonction pour les labels de disponibilité
  const getAvailabilityLabel = (availability) => {
    const map = {
      full_time: 'Temps plein',
      part_time: 'Temps partiel',
      weekends: 'Week-ends',
      flexible: 'Flexible'
    };
    return map[availability] || availability;
  };

  // Fonction pour les badges de statut
  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'En attente', class: 'status-draft' },
      accepted: { label: 'Accepté', class: 'status-published' },
      rejected: { label: 'Rejeté', class: 'status-archived' },
      in_progress: { label: 'En cours', class: 'status-active' }
    };
    const statusInfo = statusMap[status] || { label: status, class: '' };
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

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
      
      // ← NOUVEAU CAS POUR L'ÉQUIPE
      case 'team':
        return (
          <>
            <td>
              {item.photo ? (
                <img 
                  src={item.photo} 
                  alt={item.full_name || 'Member'}
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '8px', 
                    objectFit: 'cover' 
                  }}
                />
              ) : (
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {item.full_name ? item.full_name.split(' ').map(n => n[0]).join('').slice(0, 2) : '??'}
                </div>
              )}
            </td>
            <td>
              <div>
                <strong>{item.full_name || 'Sans nom'}</strong>
                {item.role && <div style={{ fontSize: '0.85rem', color: '#718096' }}>{item.role}</div>}
              </div>
            </td>
            <td>
              <span className={`type-badge type-${item.category}`}>
                {item.category === 'conseil_administration' ? 'Conseil' : 'Coordination'}
              </span>
            </td>
            <td>{item.position}</td>
            <td>{item.email}</td>
            <td>{item.phone || '-'}</td>
            <td>
              <button
                className={`status-badge ${item.is_active ? 'status-published' : 'status-archived'}`}
                onClick={() => handleToggleStatus(item)}
                style={{ cursor: 'pointer', border: 'none' }}
                title="Cliquer pour changer le statut"
              >
                {item.is_active ? <Eye size={14} style={{ marginRight: '4px' }} /> : <EyeOff size={14} style={{ marginRight: '4px' }} />}
                {item.is_active ? 'Actif' : 'Inactif'}
              </button>
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
      
      case 'partners':
        return (
          <>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.logo_url && (
                  <img 
                    src={item.logo_url} 
                    alt={item.name}
                    style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }}
                  />
                )}
                <span>{item.name}</span>
              </div>
            </td>
            <td>
              <span className={`type-badge type-${item.type}`}>
                {item.type === 'ong' ? 'ONG' : 
                item.type === 'international' ? 'International' :
                item.type === 'national' ? 'National' :
                item.type === 'local' ? 'Local' :
                item.type === 'gouvernemental' ? 'Gouvernemental' :
                item.type === 'prive' ? 'Privé' : item.type}
              </span>
            </td>
            <td>
              {item.website ? (
                <a href={item.website} target="_blank" rel="noopener noreferrer" className="link-website">
                  Visiter
                </a>
              ) : '-'}
            </td>
            <td>
              <span className={`status-badge status-${item.status}`}>
                {item.status === 'active' ? 'Actif' : 
                item.status === 'inactive' ? 'Inactif' : 'En attente'}
              </span>
            </td>
          </>
        );

      case 'jobs':
        return (
          <>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.title}
                {item.featured && (
                  <span style={{ 
                    background: '#fbbf24', 
                    color: '#78350f', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    ★ Vedette
                  </span>
                )}
              </div>
            </td>
            <td>
              <span className={`type-badge type-${item.type?.toLowerCase()}`}>
                {item.type}
              </span>
            </td>
            <td>{item.location}</td>
            <td>
              <span className={`status-badge status-${item.status}`}>
                {item.status === 'published' ? 'Publié' : 
                 item.status === 'draft' ? 'Brouillon' : 
                 item.status === 'closed' ? 'Fermé' : 'Archivé'}
              </span>
            </td>
          </>
        );

      case 'volunteers':
        return (
          <>
            <td style={{ fontWeight: 600 }}>{item.full_name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.interest_domain || 'Non spécifié'}</td>
            <td>{getAvailabilityLabel(item.availability)}</td>
            <td>{getStatusBadge(item.status)}</td>
            <td>{new Date(item.created_at).toLocaleDateString('fr-FR')}</td>
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
        {/* Masquer le bouton "Ajouter" pour les bénévoles */}
        {type !== 'volunteers' && (
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={20} />
            Ajouter
          </button>
        )}
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

        {/* Filtres conditionnels selon le type */}
        {type === 'team' ? (
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="conseil_administration">Conseil d'Administration</option>
              <option value="coordination">Coordination</option>
            </select>
          </div>
        ) : type === 'volunteers' ? (
          <div className="filter-group">
            <Filter size={20} />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="pending">En attente</option>
              <option value="in_progress">En cours</option>
              <option value="accepted">Accepté</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        ) : type !== 'domains' && (
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
                        {type !== 'volunteers' && config.viewUrl && (
                          <button
                            className="action-btn btn-view"
                            onClick={() => handleView(item)}
                            title="Voir sur le site"
                          >
                            <ExternalLink size={18} />
                          </button>
                        )}
                        <button
                          className="action-btn btn-edit"
                          onClick={() => handleEdit(item)}
                          title={type === 'volunteers' ? 'Examiner' : 'Modifier'}
                        >
                          {type === 'volunteers' ? <Eye size={18} /> : <Edit size={18} />}
                        </button>
                        <button
                          className="action-btn btn-delete"
                          onClick={() => handleDelete(item)}
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
                volunteer={selectedItem} // Pour VolunteerExaminer
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