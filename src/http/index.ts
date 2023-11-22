import axios from 'axios';
import { AuthResponse } from '../models/AuthResponse.ts';
export const API_URL = 'http://localhost:8080';
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.statusCode == 401 && originalConfig && !originalConfig._isRetry) {
      originalConfig._isRetry = true;
      try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalConfig);
      } catch (e) {
        console.log(e);
        console.log('fail auth');
      }
    }
    throw error;
  },
);

export default $api;
