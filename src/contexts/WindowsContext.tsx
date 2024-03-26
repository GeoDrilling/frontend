import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';

interface WindowsContext {
  isExplorer: boolean;
  isAreaEquivalence: boolean;
  isTablet: boolean;
  isSettings: boolean;
  isModel: boolean;
  toggleExplorer: () => void;
  toggleAreaEquivalence: () => void;
  toggleTablet: () => void;
  toggleSettings: () => void;
  toggleModel: () => void;
}

export const WindowsContext = createContext<WindowsContext>({} as WindowsContext);
export const WindowsProvider: FCC = ({ children }) => {
  const [isExplorer, setIsExplorer] = useState<boolean>(true);
  const [isAreaEquivalence, setIsAreaEquivalence] = useState<boolean>(true);
  const [isTablet, setIsTablet] = useState<boolean>(true);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const [isModel, setIsModel] = useState<boolean>(false);

  const toggleTablet = useCallback(() => {
    setIsTablet(!isTablet);
  }, [isTablet]);
  const toggle4SideEffect = useCallback(
    (
      isWindow: boolean,
      setIsWindow: Dispatch<SetStateAction<boolean>>,
      isSecondWindow: boolean,
      setIsSecondWindow: Dispatch<SetStateAction<boolean>>,
      isThirdWindow: boolean,
      setIsThirdWindow: Dispatch<SetStateAction<boolean>>,
      isLastWindow: boolean,
    ) => {
      return function () {
        if (!isWindow && Number(isSecondWindow) + Number(isThirdWindow) + Number(isLastWindow) == 2) {
          if (isSecondWindow) setIsSecondWindow(false);
          else if (isThirdWindow) setIsThirdWindow(false);
        }
        setIsWindow(!isWindow);
      };
    },
    [],
  );
  const value = useMemo(
    () => ({
      isExplorer,
      isAreaEquivalence,
      isTablet,
      isSettings,
      isModel,
      toggleExplorer: toggle4SideEffect(
        isExplorer,
        setIsExplorer,
        isAreaEquivalence,
        setIsAreaEquivalence,
        isSettings,
        setIsSettings,
        isModel,
      ),
      toggleAreaEquivalence: toggle4SideEffect(
        isAreaEquivalence,
        setIsAreaEquivalence,
        isExplorer,
        setIsExplorer,
        isSettings,
        setIsSettings,
        isModel,
      ),
      toggleTablet: toggleTablet,
      toggleSettings: toggle4SideEffect(
        isSettings,
        setIsSettings,
        isAreaEquivalence,
        setIsAreaEquivalence,
        isExplorer,
        setIsExplorer,
        isModel,
      ),
      toggleModel: toggle4SideEffect(
        isModel,
        setIsModel,
        isAreaEquivalence,
        setIsAreaEquivalence,
        isExplorer,
        setIsExplorer,
        isSettings,
      ),
    }),
    [isExplorer, isAreaEquivalence, isTablet, isSettings, isModel, toggle4SideEffect, toggleTablet],
  );

  return <WindowsContext.Provider value={value}>{children}</WindowsContext.Provider>;
};
