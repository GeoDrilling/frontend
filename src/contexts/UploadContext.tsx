import React, { createContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Selections } from '../models/Selection.ts';
import { SootOutResponse } from '../models/SootOutResponse.ts';

interface UploadContextProps {
  isVisible: boolean;
  setVisible: (isVis: boolean) => void;
  transformDataToSelections: (data: SootOutResponse) => Selections;
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined);

interface UploadContextProviderProps {
  children: ReactNode;
}

export const UploadContextProvider: React.FC<UploadContextProviderProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const setVisible = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  const transformDataToSelections = useCallback((data: SootOutResponse): Selections => {
    return {
      L: {
        selection1: data.roal,
        state1: data.roalp, // Исправлено с ROALp на roalp
        selection2: data.ropl, // Повторение roal, возможно, нужно использовать другое поле
        state2: data.roplp, // Исправлено с ROPLp на roplp
      },
      LD: {
        selection1: data.roald,
        state1: data.roaldp,
        selection2: data.ropld,
        state2: data.ropldp,
      },
      LE: {
        selection1: data.roale,
        state1: data.roalep,
        selection2: data.rople,
        state2: data.roplep,
      },
      H: {
        selection1: data.roah,
        state1: data.roahp,
        selection2: data.roph,
        state2: data.rophp,
      },
      HD: {
        selection1: data.roahd,
        state1: data.roahdp,
        selection2: data.rophd,
        state2: data.rophdp,
      },
      HE: {
        selection1: data.roahe,
        state1: data.roahep,
        selection2: data.rophe,
        state2: data.rophep,
      },
      Отход: {
        selection1: data.x,
        state1: data.xp,
        selection2: '-',
        state2: 0,
      },
      Глубина: {
        selection1: data.tvd,
        state1: data.tvdp,
        selection2: '-',
        state2: 0,
      },
      'Зенитный угол': {
        selection1: data.zeni,
        state1: data.zenip,
        selection2: '-',
        state2: 0,
      },
    };
  }, []);
  const value = useMemo(
    () => ({
      isVisible,
      setVisible,
      transformDataToSelections,
    }),
    [isVisible, transformDataToSelections],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
};
