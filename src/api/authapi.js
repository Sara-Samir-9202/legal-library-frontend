import api from './axiosConfig';

export const login = async (email, password) => {
  const response = await api.post('/Auth/login', { email, password });  // لاحظ: /Auth/login
  const token = response.data.token || response.data.data?.token;
  if (token) localStorage.setItem('adminToken', token);
  return response.data;
};

export const logout = () => localStorage.removeItem('adminToken');
export const isAuthenticated = () => !!localStorage.getItem('adminToken');