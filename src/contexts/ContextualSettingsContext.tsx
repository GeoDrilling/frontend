import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import {
  ContextType,
  EnumType,
  IBaseProperty,
  IGroupProperties,
  INumberProperty,
  ITabletProperties,
  ITrackProperties,
  OrientationEnum,
  PropertyType,
} from '../models/ContextualSettingsTypes.ts';
import { trackProperties } from '../utils/ContextualSettingsConstatns.ts';

interface ContextualSettingsContext {
  contextType: ContextType;
  setContextType: Dispatch<SetStateAction<ContextType>>;
  tabletProperties: ITabletProperties;
  setTableProperties: Dispatch<SetStateAction<ITabletProperties>>;
  tracksProperties: ITrackProperties[];
  setTracksProperties: Dispatch<SetStateAction<ITrackProperties[]>>;
  trackIndex: number;
  setTrackIndex: Dispatch<SetStateAction<number>>;
}

export const ContextualSettingsContext = createContext<ContextualSettingsContext>({} as ContextualSettingsContext);

export const ContextualSettingsProvider: FCC = ({ children }) => {
  const testProperty: INumberProperty = {
    name: 'Test name',
    type: PropertyType.NUMBER,
    value: 1,
  };
  const group: IGroupProperties = {
    name: 'Main',
    properties: [
      { ...testProperty, name: 'Test name very very long' },
      { ...testProperty, type: PropertyType.STRING },
      { ...testProperty, type: PropertyType.COLOR, value: '#FFFFFF' } as IBaseProperty,
      {
        ...testProperty,
        type: PropertyType.ENUM,
        enumType: EnumType.ORIENTATION,
        value: OrientationEnum.VERTICAL,
      } as IBaseProperty,
      testProperty,
    ],
  };
  const testTableProp: ITabletProperties = { properties: [group, group] };

  const testTrackProp: ITrackProperties[] = [trackProperties];

  const [contextType, setContextType] = useState<ContextType>(ContextType.TABLET);
  const [tabletProperties, setTableProperties] = useState<ITabletProperties>(testTableProp);
  const [tracksProperties, setTracksProperties] = useState<ITrackProperties[]>(testTrackProp);
  const [trackIndex, setTrackIndex] = useState<number>(0);

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
    }),
    [contextType, tabletProperties, tracksProperties, trackIndex],
  );
  return <ContextualSettingsContext.Provider value={value}>{children}</ContextualSettingsContext.Provider>;
};
