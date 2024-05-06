import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import { IGradient } from '../models/ContextualSettingsTypes.ts';
export interface GradientContext {
  gradient: IGradient[];
  setGradient: Dispatch<SetStateAction<IGradient[]>>;
}

export const GradientContext = createContext<GradientContext>({} as GradientContext);

export const GradientContextProvider: FCC = ({ children }) => {
  const [gradient, setGradient] = useState<IGradient[]>([]);
  const value = useMemo(
    () => ({
      gradient,
      setGradient,
    }),
    [gradient, setGradient],
  );
  return <GradientContext.Provider value={value}>{children}</GradientContext.Provider>;
};
