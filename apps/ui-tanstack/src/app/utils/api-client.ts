import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // You can modify the config here (e.g., add authorization token)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response; // Return the response directly
  },
  error => {
    // Handle errors globally (e.g., logging, showing notifications)
    return Promise.reject(error);
  }
);

export default apiClient;
