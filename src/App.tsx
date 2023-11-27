import { FC } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import { AuthProvider } from './contexts/AuthContext.tsx';
import GeoNavigation from '@pages/GeoNavigation/GeoNavigation.tsx';

const App: FC = observer(() => {
  return (
    <AuthProvider>
      <GeoNavigation />
    </AuthProvider>
  );
});

export default App;
