import GeoNavigation from '@pages/GeoNavigation/GeoNavigation.tsx';
import Login from '@pages/Login/Login.tsx';
import Register from '@pages/Register/Register.tsx';
import Landing from '@pages/Landing/Landing.tsx';
import { Navigate } from 'react-router-dom';
import ListProjectsPage from '@pages/ListProjects/ListProjectsPage.tsx';
import FrozenProjectsPage from '@pages/FrozenProjects/FrozenProjectsPage.tsx';

export const privateRoutes = [
  { path: '/projects/:id', element: <GeoNavigation /> },
  { path: '/projects', element: <ListProjectsPage /> },
  { path: '/projects/:id/frozen', element: <FrozenProjectsPage /> },
  { path: '*', element: <Navigate to={'/projects'} replace={true} /> },
];
export const publicRoutes = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Navigate to={'/'} replace={true} /> },
];
