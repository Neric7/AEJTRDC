import { useState, useEffect } from 'react';
import api from '../../services/api';
import styles from './ProjectFilter.module.css';

export default function ProjectFilter({ onFilterChange, currentFilters = {} }) {
  const [domains, setDomains] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      setLoading(true);
      
      // Charger les domaines
      const domainsResponse = await api.get('/domains');
      const domainsData = Array.isArray(domainsResponse.data)
        ? domainsResponse.data
        : (domainsResponse.data?.data || domainsResponse.data?.domains || []);
      
      // Mapper les domaines pour gérer à la fois 'name' et 'titre'
      const mappedDomains = domainsData.map(domain => ({
        id: domain.id,
        name: domain.name || domain.titre,
        titre: domain.titre || domain.name,
        icon: domain.icon
      }));
      
      console.log('✅ Domaines chargés:', mappedDomains);
      setDomains(mappedDomains);
      
      // Charger les statuts
      try {
        const statusesResponse = await api.get('/projects/statuses');
        const statusesData = statusesResponse.data?.statuses || [];
        setStatuses(statusesData);
      } catch (error) {
        console.warn('Utilisation des statuts par défaut');
        setStatuses([
          { value: 'planning', label: 'En planification' },
          { value: 'ongoing', label: 'En cours' },
          { value: 'completed', label: 'Terminé' },
          { value: 'suspended', label: 'Suspendu' }
        ]);
      }
      
    } catch (error) {
      console.error('❌ Erreur chargement options de filtre:', error);
      // Statuts par défaut en cas d'erreur
      setStatuses([
        { value: 'planning', label: 'En planification' },
        { value: 'ongoing', label: 'En cours' },
        { value: 'completed', label: 'Terminé' },
        { value: 'suspended', label: 'Suspendu' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (statusValue) => {
    const newStatus = currentFilters.status === statusValue ? '' : statusValue;
    onFilterChange({ ...currentFilters, status: newStatus });
  };

  const handleDomainChange = (domainId) => {
    const newDomain = currentFilters.domain === domainId ? '' : domainId;
    onFilterChange({ ...currentFilters, domain: newDomain });
  };

  const handleSearchChange = (e) => {
    onFilterChange({ ...currentFilters, search: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({ status: '', domain: '', search: '' });
  };

  const hasActiveFilters = currentFilters.status || currentFilters.domain || currentFilters.search;

  if (loading) {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.loadingMessage}>
          <div className={styles.miniSpinner}></div>
          Chargement des filtres...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.filterContainer}>
      {/* Barre de recherche et bouton toggle mobile */}
      <div className={styles.filterHeader}>
        <div className={styles.searchBox}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={currentFilters.search || ''}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          {currentFilters.search && (
            <button 
              className={styles.clearSearchButton}
              onClick={() => onFilterChange({ ...currentFilters, search: '' })}
              aria-label="Effacer la recherche"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
          Filtres
          {hasActiveFilters && <span className={styles.filterBadge}></span>}
        </button>
      </div>

      {/* Conteneur des filtres */}
      <div className={`${styles.filtersContent} ${isExpanded ? styles.expanded : ''}`}>
        {/* Filtre par statut */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Statut
          </h3>
          <div className={styles.filterOptions}>
            {statuses.map(status => (
              <button
                key={status.value}
                className={`${styles.filterButton} ${
                  currentFilters.status === status.value ? styles.active : ''
                }`}
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre par domaine */}
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            Domaine d'intervention
          </h3>
          <div className={styles.filterOptions}>
            {domains.length > 0 ? (
              domains.map(domain => (
                <button
                  key={domain.id}
                  className={`${styles.filterButton} ${
                    currentFilters.domain === domain.id ? styles.active : ''
                  }`}
                  onClick={() => handleDomainChange(domain.id)}
                  title={domain.name}  // ✅ Tooltip avec le nom complet
                >   
                  {domain.name}
                </button>
              ))
            ) : (
              <p className={styles.noOptions}>Aucun domaine disponible</p>
            )}
          </div>
        </div>

        {/* Bouton pour effacer les filtres */}
        {hasActiveFilters && (
          <div className={styles.filterActions}>
            <button className={styles.clearButton} onClick={clearFilters}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}