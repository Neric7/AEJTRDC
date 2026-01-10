// src/services/volunteers.js
import api from './api';

export const getMyApplications = async () => {
  const response = await api.get('/volunteers/my-applications');
  return response.data;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/volunteers/${id}`);
  return response.data;
};

export const cancelApplication = async (id) => {
  const response = await api.delete(`/volunteers/${id}`);
  return response.data;
};