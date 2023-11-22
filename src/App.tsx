import { FC, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '@pages/Landing/Landing';
import Register from '@pages/Register/Register';
import Login from '@pages/Login/Login.tsx';
import './index.css';
import { Context } from './main.tsx';

const App: FC = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  });
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
