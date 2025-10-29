import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/', // Usará la variable de entorno en prod, o localhost en dev
});

// Interceptor: Se ejecuta en cada petición para añadir el token de autenticación
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Django espera el token en el formato 'Bearer <token>'
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default apiClient;