import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '@pages/Landing/Landing';
import Register from '@pages/Register/Register';
import Login from "@pages/Login/Login.tsx";
import './index.css';


const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
};

export default App;
