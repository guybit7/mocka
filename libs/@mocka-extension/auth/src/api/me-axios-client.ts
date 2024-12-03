import axios from 'axios';
// const env = import.meta.env;
export const meAxiosClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

meAxiosClient.interceptors.request.use(
  config => {
    // You can modify the config here (e.g., add authorization token)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

meAxiosClient.interceptors.response.use(
  response => {
    return response.data; // Return the response directly
  },
  error => {
    // Handle errors globally (e.g., logging, showing notifications)
    return Promise.reject(error);
  }
);

export default meAxiosClient;
