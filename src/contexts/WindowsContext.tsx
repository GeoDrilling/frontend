import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';

interface WindowsContext {
  isExplorer: boolean;
  isAreaEquivalence: boolean;
  isTablet: boolean;
  isSettings: boolean;
  toggleExplorer: () => void;
  toggleAreaEquivalence: () => void;
  toggleTablet: () => void;
  toggleSettings: () => void;
}

export const WindowsContext = createContext<WindowsContext>({} as WindowsContext);
export const WindowsProvider: FCC = ({ children }) => {
  const [isExplorer, setIsExplorer] = useState<boolean>(true);
  const [isAreaEquivalence, setIsAreaEquivalence] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(true);
  const [isSettings, setIsSettings] = useState<boolean>(true);

  const toggleTablet = useCallback(() => {
    return function () {
      setIsTablet(!isTablet);
    };
  }, [isTablet]);
  const toggleExplorer = useCallback(() => {
    if (!isExplorer && isSettings && isAreaEquivalence) {
      setIsAreaEquivalence(!isAreaEquivalence);
      setIsExplorer(!isExplorer);
    } else setIsExplorer(!isExplorer);
  }, [isExplorer, isSettings, isAreaEquivalence]);
  const toggleWindowSideEffect = (
    isWindow: boolean,
    setIsWindow: Dispatch<SetStateAction<boolean>>,
    isSecondWindow: boolean,
    setIsSecondWindow: Dispatch<SetStateAction<boolean>>,
    isLastWindow: boolean,
  ) => {
    return function () {
      if (!isWindow && isSecondWindow && isLastWindow) {
        setIsSecondWindow(!isSecondWindow);
        setIsWindow(!isWindow);
      } else setIsWindow(!isWindow);
    };
  };
  const value = useMemo(
    () => ({
      isExplorer,
      isAreaEquivalence,
      isTablet,
      isSettings,
      toggleExplorer: toggleExplorer,
      toggleAreaEquivalence: toggleWindowSideEffect(
        isAreaEquivalence,
        setIsAreaEquivalence,
        isSettings,
        setIsSettings,
        isExplorer,
      ),
      toggleTablet: toggleTablet,
      toggleSettings: toggleWindowSideEffect(
        isSettings,
        setIsSettings,
        isAreaEquivalence,
        setIsAreaEquivalence,
        isExplorer,
      ),
    }),
    [isExplorer, isAreaEquivalence, isTablet, isSettings, toggleExplorer, toggleTablet],
  );

  return <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>;
};
