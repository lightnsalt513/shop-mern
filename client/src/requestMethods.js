import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const getToken = () => {
  return JSON.parse(JSON.parse(localStorage.getItem('persist:user'))?.currentUser)?.accessToken;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    if (config.baseURL === BASE_URL && !config.headers.token) {
      const token = getToken();
      if (token) {
        config.headers.token = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);