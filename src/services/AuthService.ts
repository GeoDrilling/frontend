import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/AuthResponse.ts";
import $api from "../http";
import {IUser} from "../models/IUser.ts";
export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/authenticate', {email, password})
    }
    static async register(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/register', {name, email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }
    static async demo(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/demo');
    }
}