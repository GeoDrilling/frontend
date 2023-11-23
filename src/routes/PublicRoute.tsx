import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../hooks/context/useAuth.ts';

export const PublicRoute: FC = () => {
  const { isAuth } = useAuthContext();

  if (isAuth) {
    return <Navigate to='/notes' replace />;
  }

  return <Outlet />;
};
