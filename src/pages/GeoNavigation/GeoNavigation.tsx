import {FC, MouseEvent, useContext, useEffect, useState} from 'react';
import {IUser} from "../../models/IUser.ts";
import UserService from "../../services/UserService.tsx";
import Button from "@components/UI/button/Button.tsx";
import {Context} from "../../main.tsx";
import {observer} from "mobx-react-lite";

const GeoNavigation: FC = observer(() => {
    const [user, setUser] = useState<IUser>()
    const {store} = useContext(Context)
    useEffect( () => {
        getUser()
    }, []);
    const getUser = async () => {
        const response = await UserService.fetchUser()
        setUser(response.data)
    }
    const logout = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        store.logout()
    }
    return (
        <div>
            <h1>User info:</h1>
            <div>
                <div>{user?.name}</div>
                <div>{user?.email}</div>
                <div>{store.counter}</div>
            </div>
            <Button onClick={e => {
                e.preventDefault()
                store.incrementCounter()
            }}>+ 1</Button>
            <Button onClick={e => logout(e)}>Log out</Button>
        </div>
    );
});

export default GeoNavigation;