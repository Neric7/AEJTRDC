import api from './api';

export async function register(payload) {
  const response = await api.post('/register', payload);
  return response.data;
}

export async function login(payload) {
  const response = await api.post('/login', payload);
  return response.data;
}

export async function logout() {
  const response = await api.post('/logout');
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await api.get('/user');
  return response.data;
}

export async function updateProfile(payload) {
  const response = await api.put('/user/profile', payload);
  return response.data;
}

export async function changePassword(payload) {
  const response = await api.put('/user/password', payload);
  return response.data;
}

