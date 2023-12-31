import { FC } from 'react';

import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WindowsProvider } from './contexts/WindowsContext.tsx';
import 'overlayscrollbars/overlayscrollbars.css';
import { ProjectProvider } from './contexts/ProjectContext.tsx';
import Router from './routes/Router.tsx';

const App: FC = () => {
  return (
    <ProjectProvider>
      <AuthProvider>
        <WindowsProvider>
          <Router />
        </WindowsProvider>
      </AuthProvider>
    </ProjectProvider>
  );
};

export default App;
