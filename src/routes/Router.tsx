import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes.tsx';
import { PrivateRoute } from './PrivateRoute.tsx';
import { PublicRoute } from './PublicRoute.tsx';
import { useAuthContext } from '../hooks/context/useAuth.ts';

const Router: FC = () => {
  const authContext = useAuthContext();
  if (authContext.isLoading) {
    return <div></div>;
  }
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        {privateRoutes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Route>
      <Route element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route path={route.path} element={route.element} key={route.path} />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
