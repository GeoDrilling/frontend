import { FC } from 'react';

import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { WindowsProvider } from './contexts/WindowsContext.tsx';
import 'overlayscrollbars/overlayscrollbars.css';
import { ProjectProvider } from './contexts/ProjectContext.tsx';
import Router from './routes/Router.tsx';
import { ContextualSettingsProvider } from './contexts/ContextualSettingsContext.tsx';
import { UploadContextProvider } from './contexts/UploadContext.tsx';

const App: FC = () => {
  return (
    <UploadContextProvider>
      <ContextualSettingsProvider>
        <ProjectProvider>
          <AuthProvider>
            <WindowsProvider>
              <Router />
            </WindowsProvider>
          </AuthProvider>
        </ProjectProvider>
      </ContextualSettingsProvider>
    </UploadContextProvider>
  );
};

export default App;
