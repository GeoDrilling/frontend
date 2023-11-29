import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
interface WindowsContext {
  isExplorer: boolean;
  isAreaEquivalence: boolean;
  isTablet: boolean;
  toggleExplorer: () => void;
  toggleAreaEquivalence: () => void;
  toggleTablet: () => void;
}
export const WindowsContext = createContext<WindowsContext>({} as WindowsContext);
export const WindowsProvider: FCC = ({ children }) => {
  const [isExplorer, setIsExplorer] = useState<boolean>(true);
  const [isAreaEquivalence, setIsSidebar] = useState<boolean>(true);
  const [isTablet, setIsTablet] = useState<boolean>(true);

  const toggleWindow = (isWindow: boolean, setIsWindow: Dispatch<SetStateAction<boolean>>) => {
    return function () {
      setIsWindow(!isWindow);
    };
  };

  const value = useMemo(
    () => ({
      isExplorer,
      isAreaEquivalence,
      isTablet,
      toggleExplorer: toggleWindow(isExplorer, setIsExplorer),
      toggleAreaEquivalence: toggleWindow(isAreaEquivalence, setIsSidebar),
      toggleTablet: toggleWindow(isTablet, setIsTablet),
    }),
    [isExplorer, isAreaEquivalence, isTablet],
  );
  return <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>;
};
