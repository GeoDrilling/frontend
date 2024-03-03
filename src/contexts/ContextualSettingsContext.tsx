import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import { ContextType, ITabletProperties, ITrackProperties } from '../models/ContextualSettingsTypes.ts';
import { _tabletProperties } from '../utils/ContextualSettingsConstatns.ts';

interface ContextualSettingsContext {
  contextType: ContextType;
  setContextType: Dispatch<SetStateAction<ContextType>>;
  tabletProperties: ITabletProperties;
  setTableProperties: Dispatch<SetStateAction<ITabletProperties>>;
  tracksProperties: ITrackProperties[];
  setTracksProperties: Dispatch<SetStateAction<ITrackProperties[]>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  clearSettings: () => void;
}

export const ContextualSettingsContext = createContext<ContextualSettingsContext>({} as ContextualSettingsContext);

export const ContextualSettingsProvider: FCC = ({ children }) => {
  const [contextType, setContextType] = useState<ContextType>(ContextType.TABLET);
  const [tabletProperties, setTableProperties] = useState<ITabletProperties>(_tabletProperties);
  const [tracksProperties, setTracksProperties] = useState<ITrackProperties[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const clearSettings = useCallback(() => {
    setContextType(ContextType.TABLET);
    setTableProperties(_tabletProperties);
    setTracksProperties([]);
    setTrackIndex(0);
  }, []);

  const value = useMemo(
    () => ({
      contextType,
      setContextType,
      tabletProperties,
      setTableProperties,
      tracksProperties,
      setTracksProperties,
      trackIndex,
      setTrackIndex,
      clearSettings,
    }),
    [contextType, tabletProperties, tracksProperties, trackIndex, clearSettings],
  );
  return <ContextualSettingsContext.Provider value={value}>{children}</ContextualSettingsContext.Provider>;
};
