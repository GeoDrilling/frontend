import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import {
  ContextType,
  IBaseProperty,
  IContainerGroupProperties,
  IGroupProperties,
  ITrackProperties,
} from '../models/ContextualSettingsTypes.ts';
import { _tabletProperties } from '../utils/ContextualSettingsConstatns.ts';

interface ContextualSettingsContext {
  contextType: ContextType;
  setContextType: Dispatch<SetStateAction<ContextType>>;
  tabletProperties: IContainerGroupProperties;
  depthTrackProperties: IContainerGroupProperties;
  modelCurveProperties: IContainerGroupProperties;
  setTableProperties: Dispatch<SetStateAction<IContainerGroupProperties>>;
  setDepthTrackProperties: Dispatch<SetStateAction<IContainerGroupProperties>>;
  setModelCurveProperties: Dispatch<SetStateAction<IContainerGroupProperties>>;
  tracksProperties: ITrackProperties[];
  setTracksProperties: Dispatch<SetStateAction<ITrackProperties[]>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
  clearSettings: () => void;
  clearTracks: () => void;
  updateProperty: (
    value: number | string,
    indexGroup: number,
    indexProp: number,
    properties: IGroupProperties[],
  ) => IGroupProperties[];
}

export const ContextualSettingsContext = createContext<ContextualSettingsContext>({} as ContextualSettingsContext);

export const ContextualSettingsProvider: FCC = ({ children }) => {
  const [contextType, setContextType] = useState<ContextType>(ContextType.TABLET);
  const [tabletProperties, setTableProperties] = useState<IContainerGroupProperties>(_tabletProperties);
  const [depthTrackProperties, setDepthTrackProperties] = useState<IContainerGroupProperties>({ properties: [] });
  const [modelCurveProperties, setModelCurveProperties] = useState<IContainerGroupProperties>({ properties: [] });
  const [tracksProperties, setTracksProperties] = useState<ITrackProperties[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);

  const clearSettings = useCallback(() => {
    setContextType(ContextType.TABLET);
    setTableProperties(_tabletProperties);
    setTracksProperties([]);
    setTrackIndex(0);
  }, []);
  const clearTracks = useCallback(() => {
    setTracksProperties([]);
    setTrackIndex(0);
  }, []);

  const updateProperty = useCallback(
    (
      value: number | string,
      indexGroup: number,
      indexProp: number,
      properties: IGroupProperties[],
    ): IGroupProperties[] => {
      return properties.map((group, idxGroup) => {
        if (idxGroup === indexGroup)
          return {
            ...group,
            properties: group.properties.map((prop, idxProp) => {
              if (idxProp === indexProp) return { ...prop, value: value } as IBaseProperty;
              return prop;
            }),
          } as IGroupProperties;
        return group;
      });
    },
    [],
  );

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
      clearTracks,
      depthTrackProperties,
      modelCurveProperties,
      setDepthTrackProperties,
      setModelCurveProperties,
      updateProperty,
    }),
    [
      contextType,
      tabletProperties,
      tracksProperties,
      trackIndex,
      clearSettings,
      clearTracks,
      modelCurveProperties,
      depthTrackProperties,
      setModelCurveProperties,
      setDepthTrackProperties,
      updateProperty,
    ],
  );
  return <ContextualSettingsContext.Provider value={value}>{children}</ContextualSettingsContext.Provider>;
};
