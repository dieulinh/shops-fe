import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},

});

axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config if needed (e.g., add headers, authentication tokens)
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      config.headers.Authorization = user.token;
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
    console.log('Response Interceptor new request');
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response Error:', error);

    return Promise.reject(error);
  }
);
export default axiosInstance;
