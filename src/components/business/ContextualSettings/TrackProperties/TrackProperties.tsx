import { FC } from 'react';
import { ITrackProperties } from '../../../../models/ContextualSettingsTypes.ts';
import Properties from '@components/business/ContextualSettings/Properties/Properties.tsx';
import styles from './TrackProperties.module.css';
import { useScroll } from '../../../../hooks/useScroll.tsx';
interface TrackPropertiesProps {
  trackProp: ITrackProperties;
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
  changeCurveProperty: (value: number | string, curveIndex: number, groupIndex: number, propertyIndex: number) => void;
}
const TrackProperties: FC<TrackPropertiesProps> = ({ trackProp, changeProperty, changeCurveProperty }) => {
  const scrollRef = useScroll();
  return (
    <div className={styles.scroll} ref={scrollRef}>
      <div className={styles.container}>
        <Properties groups={trackProp.properties} changeProperty={changeProperty} />
        {trackProp.curves.map((curveProp, curvePropIdx) => (
          <Properties
            groups={curveProp.properties}
            key={curveProp.name}
            changeProperty={(v, gi, pi) => changeCurveProperty(v, curvePropIdx, gi, pi)}
            curveName={curveProp.name}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackProperties;
