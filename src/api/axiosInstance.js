import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'},

});

// Request Interceptor


// Response Interceptor
// Add a request interceptor
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
    // if (localStorage.getItem("user")) {
    //   localStorage.removeItem("user")
    //   window.location.replace('/login');
    // }
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data if needed
    console.log('Response Interceptor');
    return response;
  },
  (error) => {
    // Handle response errors
    console.error('Response Error:', error);
    if ((error.response && error.response.status === 401) ||(error.response.status == 500 &&error.response.data.error == 'Signature has expired')) {
      // Clear the user's authentication token and redirect to the login page
      localStorage.removeItem("user")
      //   window.location.replace('/login');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
