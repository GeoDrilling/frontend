import React, { DragEvent, FC, useState } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { Curve, CurveTrack, DepthTrack, LogView } from 'geochart';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import {
  ContextType,
  IColorProperty,
  IEnumProperty,
  ValueOrientation,
} from '../../../models/ContextualSettingsTypes.ts';
import { OrderCurveProperties, OrderTabletProperties } from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';

interface TabletProps {
  className?: string;
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { setContextType, tracksProperties, setTrackIndex, tabletProperties } = useContextualSettings();
  const { id, depth, curves, getCurveData } = useProjectContext();
  const [drawnCurves, setDrawnCurves] = useState<string[]>([]);
  const handleDropNewTrack = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !drawnCurves.includes(curveName)) {
      if (curveName != DEPTH) setDrawnCurves([...drawnCurves, curveName]);
      getCurveData(id, curveName);
    }
  };

  return (
    <div className={classNames(styles.container, className)} onClick={() => setContextType(ContextType.TABLET)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div
        onDrop={handleDropNewTrack}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        className={styles.tablet}
      >
        <LogView
          depth={depth}
          domain={{ min: 3200, max: 3500 }}
          orientation={
            (tabletProperties.properties[0].properties[OrderTabletProperties.ORIENTATION] as IEnumProperty)
              .value as ValueOrientation
          }
        >
          {curves
            .filter((curve) => drawnCurves.includes(curve.name) && curve.data)
            .map((curve, index) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setContextType(ContextType.TRACK);
                  setTrackIndex(index);
                }}
                key={index}
              >
                <CurveTrack>
                  <Curve
                    name={curve.name}
                    data={curve.data}
                    style={{
                      color: (
                        tracksProperties[index].properties[0].properties[OrderCurveProperties.COLOR] as IColorProperty
                      ).value,
                    }}
                  />
                </CurveTrack>
              </div>
            ))}
          {drawnCurves.length > 0 && <DepthTrack main={{ name: 'MD', color: '#021D38' }} />}
        </LogView>
      </div>
    </div>
  );
};

export default Tablet;
