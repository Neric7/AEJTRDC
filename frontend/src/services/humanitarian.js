// frontend/src/services/humanitarian.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const humanitarianService = {
  /*
  |--------------------------------------------------------------------------
  | VIOLATIONS - Routes Publiques
  |--------------------------------------------------------------------------
  */
  async submitViolationReport(data) {
    const response = await apiClient.post('/humanitarian/violations/report', data);
    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | VIOLATIONS - Routes Admin
  |--------------------------------------------------------------------------
  */
  async getViolations(params = {}) {
    const response = await apiClient.get('/admin/humanitarian/violations', { params });
    return response.data.data;
  },

  async getViolation(id) {
    const response = await apiClient.get(`/admin/humanitarian/violations/${id}`);
    return response.data.data;
  },

  async updateViolationStatus(id, data) {
    const response = await apiClient.put(`/admin/humanitarian/violations/${id}/status`, data);
    return response.data;
  },

  async deleteViolation(id) {
    const response = await apiClient.delete(`/admin/humanitarian/violations/${id}`);
    return response.data;
  },

  async getViolationStats() {
    const response = await apiClient.get('/admin/humanitarian/violations/stats');
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | ETHICAL COMMITMENTS
  |--------------------------------------------------------------------------
  */
  async getEthicalCommitments(params = {}) {
    const response = await apiClient.get('/humanitarian/ethical-commitments', { params });
    return response.data.data;
  },

  async getEthicalCommitment(id) {
    const response = await apiClient.get(`/humanitarian/ethical-commitments/${id}`);
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | ALERTES HUMANITAIRES - PUBLIC
  |--------------------------------------------------------------------------
  */
  async getPublicAlerts(params = {}) {
    const response = await apiClient.get('/humanitarian/alerts', { params });
    return response.data.data || [];
  },

  async getPublicAlert(id) {
    const response = await apiClient.get(`/humanitarian/alerts/${id}`);
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | ALERTES HUMANITAIRES - ADMIN
  |--------------------------------------------------------------------------
  */
  async getAlerts(params = {}) {
    const response = await apiClient.get('/admin/humanitarian/alerts', { params });
    return response.data.data || [];
  },

  async getAlert(id) {
    const response = await apiClient.get(`/admin/humanitarian/alerts/${id}`);
    return response.data.data;
  },

  async createAlert(data) {
    const response = await apiClient.post('/admin/humanitarian/alerts', data);
    return response.data.data;
  },

  async updateAlert(id, data) {
    const response = await apiClient.put(`/admin/humanitarian/alerts/${id}`, data);
    return response.data.data;
  },

  async deleteAlert(id) {
    const response = await apiClient.delete(`/admin/humanitarian/alerts/${id}`);
    return response.data;
  },

  async activateAlert(id) {
    const response = await apiClient.patch(`/admin/humanitarian/alerts/${id}/activate`);
    return response.data;
  },

  async deactivateAlert(id) {
    const response = await apiClient.patch(`/admin/humanitarian/alerts/${id}/deactivate`);
    return response.data;
  },

  async getAlertsStats() {
    const response = await apiClient.get('/admin/humanitarian/alerts/stats');
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | PLAIDOYER / ADVOCACY - PUBLIC
  |--------------------------------------------------------------------------
  */
  async getPublicAdvocacyCampaigns(params = {}) {
    const response = await apiClient.get('/humanitarian/advocacy', { params });
    return response.data.data || [];
  },

  async getPublicAdvocacyCampaign(id) {
    const response = await apiClient.get(`/humanitarian/advocacy/${id}`);
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | PLAIDOYER / ADVOCACY - ADMIN
  |--------------------------------------------------------------------------
  */
  async getAdvocacyCampaigns(params = {}) {
    const response = await apiClient.get('/admin/humanitarian/advocacy', { params });
    return response.data.data || [];
  },

  async getAdvocacyCampaign(id) {
    const response = await apiClient.get(`/admin/humanitarian/advocacy/${id}`);
    return response.data.data;
  },

  async createAdvocacyCampaign(data) {
    const response = await apiClient.post('/admin/humanitarian/advocacy', data);
    return response.data.data;
  },

  async updateAdvocacyCampaign(id, data) {
    const response = await apiClient.put(`/admin/humanitarian/advocacy/${id}`, data);
    return response.data.data;
  },

  async deleteAdvocacyCampaign(id) {
    const response = await apiClient.delete(`/admin/humanitarian/advocacy/${id}`);
    return response.data;
  },

  async getAdvocacyStats() {
    const response = await apiClient.get('/admin/humanitarian/advocacy/stats');
    return response.data.data;
  },

  /*
  |--------------------------------------------------------------------------
  | MÉTHODES ALIAS POUR COMPATIBILITÉ
  |--------------------------------------------------------------------------
  */
  
  // Alias pour les anciennes méthodes
  async getAdvocacyActions(params = {}) {
    return this.getAdvocacyCampaigns(params);
  },

  async getAdvocacyAction(id) {
    return this.getAdvocacyCampaign(id);
  },

  async createAdvocacy(data) {
    return this.createAdvocacyCampaign(data);
  },

  async updateAdvocacy(id, data) {
    return this.updateAdvocacyCampaign(id, data);
  },

  async deleteAdvocacy(id) {
    return this.deleteAdvocacyCampaign(id);
  }
};

export default humanitarianService;