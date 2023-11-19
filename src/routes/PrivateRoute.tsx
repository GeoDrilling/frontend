import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from "../hooks/context/useAuth.ts";


export const PrivateRoute: FC = () => {
    const { isAuth } = useAuthContext();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};