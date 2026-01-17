import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Calendar, Building2, Navigation, Loader } from 'lucide-react';
import interventionZonesService from '../services/interventionZones';
import './InterventionMap.css';

const InterventionMap = () => {
  const [zones, setZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);

  // Charger les zones depuis l'API
  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const response = await interventionZonesService.getAll();
      const zonesData = response.data.data || [];
      setZones(zonesData);
      
      // Si zones chargées, initialiser la carte
      if (zonesData.length > 0) {
        initializeMap(zonesData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des zones:', error);
      setZones([]);
      setMapError('Impossible de charger les zones d\'intervention');
    } finally {
      setLoading(false);
    }
  };

  const initializeMap = (zonesData) => {
    // Vérifier si Google Maps est chargé
    if (!window.google || !window.google.maps) {
      console.warn('Google Maps non chargé, chargement du script...');
      loadGoogleMapsScript(() => {
        createMap(zonesData);
      });
      return;
    }
    
    createMap(zonesData);
  };

  const loadGoogleMapsScript = (callback) => {
    // Vérifier si le script existe déjà
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      console.log('Script Google Maps déjà présent');
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'undefined') {
      setMapError('Clé Google Maps API manquante. Veuillez configurer VITE_GOOGLE_MAPS_API_KEY dans votre fichier .env');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps chargé avec succès');
      if (callback) callback();
    };

    script.onerror = () => {
      setMapError('Erreur lors du chargement de Google Maps');
    };

    document.head.appendChild(script);
  };

  const createMap = (zonesData) => {
    const mapContainer = mapRef.current;
    
    if (!mapContainer || !window.google || !window.google.maps) {
      console.error('Container ou Google Maps non disponible');
      return;
    }

    try {
      // Centre de la RDC
      const center = { lat: -4.0383, lng: 21.7587 };

      const map = new window.google.maps.Map(mapContainer, {
        center,
        zoom: 6,
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
          }
        ]
      });

      googleMapRef.current = map;

      // Créer les marqueurs
      const newMarkers = zonesData.map((zone) => {
        const marker = new window.google.maps.Marker({
          position: { 
            lat: parseFloat(zone.latitude), 
            lng: parseFloat(zone.longitude) 
          },
          map,
          title: zone.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: zone.type === 'headquarters' ? 12 : 8,
            fillColor: zone.color || '#2563eb',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          setSelectedZone(zone);
          map.panTo({ 
            lat: parseFloat(zone.latitude), 
            lng: parseFloat(zone.longitude) 
          });
          map.setZoom(10);
        });

        return marker;
      });

      markersRef.current = newMarkers;

      // Ajuster la vue pour afficher tous les marqueurs
      const bounds = new window.google.maps.LatLngBounds();
      zonesData.forEach((zone) => {
        bounds.extend({ 
          lat: parseFloat(zone.latitude), 
          lng: parseFloat(zone.longitude) 
        });
      });
      map.fitBounds(bounds);

    } catch (error) {
      console.error('Erreur lors de la création de la carte:', error);
      setMapError('Erreur lors de l\'initialisation de la carte');
    }
  };

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
    if (googleMapRef.current && window.google) {
      googleMapRef.current.panTo({ 
        lat: parseFloat(zone.latitude), 
        lng: parseFloat(zone.longitude) 
      });
      googleMapRef.current.setZoom(10);
    }
  };

  const getTypeLabel = (type) => {
    const types = {
      headquarters: 'Siège National',
      branch: 'Antenne Provinciale',
      extension: 'Extension Locale'
    };
    return types[type] || 'Extension';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <Loader className="spinner" />
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Carte non disponible</h3>
          <p className="text-gray-600">{mapError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="intervention-map-container">
      {/* En-tête */}
      <div className="bg-gradient-to-r p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Navigation className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Nos Zones d'Intervention</h2>
        </div>
        <p className="text-blue-100">
          L'AEJT-RDC est présente dans {zones.length} zones à travers la République Démocratique du Congo
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Liste des zones - Sidebar */}
        <div className="lg:w-1/3 bg-gray-50 p-4 overflow-y-auto max-h-[600px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Toutes les zones ({zones.length})
          </h3>
          
          <div className="space-y-3">
            {zones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => handleZoneClick(zone)}
                className={`zone-card ${selectedZone?.id === zone.id ? 'selected' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: zone.color || '#2563eb' }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{zone.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{getTypeLabel(zone.type)}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                      <MapPin className="w-3 h-3" />
                      <span>{zone.province}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carte Google Maps */}
        <div className="lg:w-2/3 relative">
          <div ref={mapRef} id="google-map" className="w-full h-[600px]" />
        </div>
      </div>

      {/* Détails de la zone sélectionnée */}
      {selectedZone && (
        <div className="zone-details">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: selectedZone.color || '#2563eb' }}
                />
                <div>
                  <h3>{selectedZone.name}</h3>
                  <p className="text-sm text-gray-600">{getTypeLabel(selectedZone.type)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedZone(null)}
                className="close-button"
              >
                ✕
              </button>
            </div>

            <div className="md:grid-cols-2 md:gap-6">
              {/* Informations générales */}
              <div className="space-y-4">
                <div className="info-row">
                  <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="info-label">Adresse</p>
                    <p className="info-value">{selectedZone.address}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="info-label">Province</p>
                    <p className="info-value">{selectedZone.province}</p>
                  </div>
                </div>

                <div className="info-row">
                  <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="info-label">Installation</p>
                    <p className="info-value">{selectedZone.year_established}</p>
                  </div>
                </div>

                {selectedZone.phone && (
                  <div className="info-row">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="info-label">Téléphone</p>
                      <a href={`tel:${selectedZone.phone}`} className="info-link">
                        {selectedZone.phone}
                      </a>
                    </div>
                  </div>
                )}

                {selectedZone.email && (
                  <div className="info-row">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="info-label">Email</p>
                      <a href={`mailto:${selectedZone.email}`} className="info-link">
                        {selectedZone.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Projets actifs */}
            {selectedZone.projects && selectedZone.projects.length > 0 && (
              <div className="projects-section">
                <h4>Projets actifs dans cette zone</h4>
                <div className="projects-tags">
                  {selectedZone.projects.map((project, index) => (
                    <span key={index} className="project-tag">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterventionMap;