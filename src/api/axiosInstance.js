import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  // If your Rails (or other) backend uses cookie-based auth / sessions add this:
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config if needed (e.g., add headers, authentication tokens)
    // Try multiple possible token storage keys
    const token =
      localStorage.getItem('authToken') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('credential');

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV !== 'production') {
      // Lightweight debug (can be removed later)
      // eslint-disable-next-line no-console
      console.debug('[axios][request]', config.method?.toUpperCase(), config.url, {
        hasAuthHeader: !!config.headers.Authorization,
        withCredentials: config.withCredentials,
      });
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request Error:', error);

    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[axios][response]', response.config.method?.toUpperCase(), response.config.url, response.status);
    }
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response Error:', error);
    if (error?.response?.status === 401) {
      // Optional: could dispatch a logout event or attempt silent reauth
      // eslint-disable-next-line no-console
      console.warn('[axios] 401 Unauthorized for', error.config?.url);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
