import { FC } from 'react';

import './index.css';
import { observer } from 'mobx-react-lite';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Router from './routes/Router.tsx';

const App: FC = observer(() => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
});

export default App;
