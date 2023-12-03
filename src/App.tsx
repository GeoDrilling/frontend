import { FC } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import { AuthProvider } from './contexts/AuthContext.tsx';
import GeoNavigation from '@pages/GeoNavigation/GeoNavigation.tsx';
import { WindowsProvider } from './contexts/WindowsContext.tsx';
import 'overlayscrollbars/overlayscrollbars.css';

const App: FC = observer(() => {
  return (
    <AuthProvider>
      <WindowsProvider>
        <GeoNavigation />
      </WindowsProvider>
    </AuthProvider>
  );
});

export default App;
