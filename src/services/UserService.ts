import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser.ts";
import $api from "../http";

export default class UserService {
    static fetchUser(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/demo')
    }
}