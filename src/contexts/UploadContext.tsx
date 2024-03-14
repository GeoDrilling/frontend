// UploadContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UploadContextProps {
  isVisible: boolean;
  //selections: Selections;
  setVisible: (isVis: boolean) => void;
  //setselections: (isVis: Selections) => void;
}

const UploadContext = createContext<UploadContextProps | undefined>(undefined);

interface UploadContextProviderProps {
  children: ReactNode;
}

const UploadContextProvider: React.FC<UploadContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  //const [selection, setselections] = useState();

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
export { UploadContextProvider, useUploadContext };
