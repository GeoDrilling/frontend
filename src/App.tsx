import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '@pages/Landing/Landing';
import Register from '@pages/Register/Register';

import './index.css';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Register />} />
    </Routes>
  );
};

export default App;
