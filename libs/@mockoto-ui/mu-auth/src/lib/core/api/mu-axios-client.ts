import axios from 'axios';
const env = import.meta.env;
export const muAxiosClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

muAxiosClient.interceptors.request.use(
  config => {
    // You can modify the config here (e.g., add authorization token)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

muAxiosClient.interceptors.response.use(
  response => {
    return response.data; // Return the response directly
  },
  error => {
    // Handle errors globally (e.g., logging, showing notifications)
    return Promise.reject(error);
  }
);

export default muAxiosClient;
