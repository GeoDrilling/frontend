import { IUser } from '../models/IUser.ts';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService.ts';
import axios from 'axios';
import { API_URL } from '../http';
import { AuthResponse } from '../models/AuthResponse.ts';

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setUser(user: IUser) {
    this.user = user;
  }
  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }
  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }
  async checkAuth() {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-token`, {}, { withCredentials: true });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setUser(response.data.user);
      this.setAuth(true);
    } catch (e) {
      console.log(e);
    }
  }
}
