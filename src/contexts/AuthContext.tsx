import { createContext, useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import { FCC } from '../types/types.tsx';
import { IUser } from '../models/IUser.ts';
import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../models/AuthResponse.ts';
import AuthService from '../services/AuthService.ts';

interface AuthContext {
  user: IUser;
  isAuth: boolean;
  isLoading: boolean;
  authError: string;
  regError: string;
  setAuthError: Dispatch<SetStateAction<string>>;
  setRegError: Dispatch<SetStateAction<string>>;
  registration: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string, isRemember: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider: FCC = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [authError, setAuthError] = useState('');
  const [regError, setRegError] = useState('');

  async function registration(name: string, email: string, password: string) {
    try {
      const response = await AuthService.register(name, email, password);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('remember', 'true');
      setIsAuth(true);
      setUser(response.data.user);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if ('Login is already taken' === e?.response?.data.message)
          setRegError('Пользователь с такой почтой существует');
        else setRegError('Технические неполадки, попробуйте позже');
      } else console.log(e);
    }
  }
  async function login(email: string, password: string, isRemember: boolean) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      isRemember ? localStorage.setItem('remember', 'true') : localStorage.removeItem('remember');
      setUser(response.data.user);
      setIsAuth(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if ('Bad credentials' === e?.response?.data.message) {
          setAuthError('Неправльный логин или пароль');
        } else setAuthError('Технические неполадки, попробуйте позже');
      } else console.log(e);
    }
  }
  async function logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('remember');
      setIsAuth(false);
    } catch (e) {
      console.log(e);
    }
  }

  const checkToken = async () => {
    if (!(localStorage.getItem('token') && localStorage.getItem('remember'))) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await AuthService.refresh();
      localStorage.setItem('token', response.data.accessToken);
      setUser(response.data.user);
      setIsAuth(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e as AxiosError<AuthResponse>;
        if (error?.response?.status == 406) localStorage.removeItem('remember');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const value = useMemo(
    () => ({
      isAuth,
      isLoading,
      user,
      authError,
      regError,
      setAuthError,
      setRegError,
      registration,
      login,
      logout,
    }),
    [isAuth, isLoading, user, authError, regError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
