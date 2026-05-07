import axios from 'axios';

// ✅ Base URL للـ API الجديد على runasp.net
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mizan-legallibrary.runasp.net/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ───
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('studentToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ───
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('studentToken');
      localStorage.removeItem('adminName');
      localStorage.removeItem('studentName');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;