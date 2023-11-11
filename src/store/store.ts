import {IUser} from "../models/IUser.ts";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService.ts";
import axios, {AxiosError} from "axios";
import {API_URL} from "../http";
import {AuthResponse} from "../models/AuthResponse.ts";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = true
    counter: number = 0

    constructor() {
        makeAutoObservable(this)
    }
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }
    incrementCounter() {
        this.counter += 1
    }
    async registration(name: string, email: string, password: string) {
        try {
            const response = await AuthService.register(name, email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('remember', 'true')
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }
    async login(email: string, password: string, isRemember: boolean) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            isRemember ? localStorage.setItem('remember', 'true') : localStorage.removeItem('remember')
            this.setUser(response.data.user)
            this.setAuth(true)
        } catch (e) {
            console.log(e)
        }
    }
    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            localStorage.removeItem('remember')
            this.setAuth(false)
        } catch (e) {
            console.log(e)
        }
    }
    async checkAuth() {
        if (!(localStorage.getItem('token') && localStorage.getItem('remember'))) {
            this.setIsLoading(false)
            return
        }
        try {
            //this.setIsLoading(true);
            const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-token`,
                {}, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setUser(response.data.user)
            this.setAuth(true)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const error = e as AxiosError<AuthResponse>
                if (error?.response?.status == 406)
                    localStorage.removeItem('remember');
            }
        } finally {
            this.setIsLoading(false)
        }
    }

}