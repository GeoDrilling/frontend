// UploadContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UploadContextProps {
  isVisible: boolean;
  setVisible: (isVis: boolean) => void;
}

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

interface UploadContextProviderProps {
  children: ReactNode;
}

const UploadContextProvider: React.FC<UploadContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setVisible = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  return <UploadContext.Provider value={{ isVisible, setVisible }}>{children}</UploadContext.Provider>;
};

const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('err');
  }
  return context;
};
332;
export { UploadContextProvider, useUploadContext };
