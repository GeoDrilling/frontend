import {FC, MouseEvent, useEffect, useState} from 'react';
import {IUser} from "../../models/IUser.ts";
import UserService from "../../services/UserService.ts";
import Button from "@components/UI/button/Button.tsx";
import {observer} from "mobx-react-lite";
import {useAuthContext} from "../../hooks/context/useAuth.ts";

const GeoNavigation: FC = observer(() => {
    const [user, setUser] = useState<IUser>()
    const authContext = useAuthContext()
    useEffect( () => {
        getUser()
    }, []);
    const getUser = async () => {
        const response = await UserService.fetchUser()
        setUser(response.data)
    }
    const logout = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        authContext.logout()
    }
    return (
        <div>
            <h1>User info:</h1>
            <div>
                <div>{user?.name}</div>
                <div>{user?.email}</div>
            </div>

            <Button onClick={e => logout(e)}>Log out</Button>
        </div>
    );
});

export default GeoNavigation;