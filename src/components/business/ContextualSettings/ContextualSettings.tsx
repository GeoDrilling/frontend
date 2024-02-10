import { FC } from 'react';
import styles from './ContextualSettings.module.css';
import classNames from 'classnames';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import {
  ContextType,
  IBaseProperty,
  IGroupProperties,
  ITrackProperties,
} from '../../../models/ContextualSettingsTypes.ts';
import Properties from '@components/business/ContextualSettings/Properties/Properties.tsx';

interface ContextualSettingsProps {
  className?: string;
}
const ContextualSettings: FC<ContextualSettingsProps> = ({ className }) => {
  const { toggleSettings } = useWindows();
  const { contextType, tabletProperties, setTableProperties, tracksProperties, setTracksProperties, trackIndex } =
    useContextualSettings();

  const updateProperty = (
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
  };
  const changeTabletProperty = (value: number | string, indexGroup: number, indexProp: number) => {
    setTableProperties({ properties: updateProperty(value, indexGroup, indexProp, tabletProperties.properties) });
  };
  const changeTrackProperty = (value: number | string, indexGroup: number, indexProp: number, indexTrack: number) => {
    const newProps: ITrackProperties[] = tracksProperties.map((track, idxTrack) => {
      if (idxTrack === indexTrack)
        return { ...track, properties: updateProperty(value, indexGroup, indexProp, track.properties) };
      return track;
    });
    setTracksProperties(newProps);
  };
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_properties.svg'} title={'Свойства'} closeWindow={toggleSettings} />
      <h4 className={styles.title}>{contextType}</h4>
      {contextType === ContextType.TABLET && (
        <Properties groups={tabletProperties.properties} changeProperty={changeTabletProperty} />
      )}
      {contextType === ContextType.TRACK && (
        <Properties
          groups={tracksProperties[trackIndex].properties}
          changeProperty={(v, ig, ip) => changeTrackProperty(v, ig, ip, trackIndex)}
        />
      )}
    </div>
  );
};

export default ContextualSettings;
