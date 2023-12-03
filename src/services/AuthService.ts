import axios, { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/AuthResponse.ts';
import $api, { API_URL } from '../http';
export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/authenticate', { email, password });
  }
  static async register(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', { name, email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('/auth/logout');
  }
  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return axios.post<AuthResponse>(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
  }
}
