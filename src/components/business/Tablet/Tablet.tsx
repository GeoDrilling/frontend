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
  INumberProperty,
  ValueOrientation,
} from '../../../models/ContextualSettingsTypes.ts';
import { OrderCurveProperties, OrderTabletProperties } from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';
import { useUploadContext } from '../../../contexts/UploadContext.tsx';
import UploadWindow from '@components/business/UploadWindow/UploadWindow.tsx';

interface TabletProps {
  className?: string;
}

interface IDrawnTrack {
  curves: string[];
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { isVisible } = useUploadContext();
  const { setContextType, tracksProperties, setTrackIndex, tabletProperties } = useContextualSettings();
  const { id, depth, curves, getCurveData } = useProjectContext();
  const [drawnTracks, setDrawnTracks] = useState<IDrawnTrack[]>([]);
  const handleDropNewTrack = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName) {
      if (curveName != DEPTH) setDrawnTracks([...drawnTracks, { curves: [curveName] }]);
      getCurveData(id, curveName, true);
    }
  };
  const handleDropOldTrack = (event: DragEvent<HTMLDivElement>, trackIndex: number) => {
    event.preventDefault();
    event.stopPropagation();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !drawnTracks[trackIndex].curves.includes(curveName)) {
      if (curveName != DEPTH) {
        setDrawnTracks(
          drawnTracks.map((track, index) => {
            if (index === trackIndex) return { curves: [...track.curves, curveName] };
            return track;
          }),
        );
      }
      getCurveData(id, curveName);
    }
  };
  return (
    <div className={classNames(styles.container)}>
      {isVisible ? (
        <UploadWindow />
      ) : (
        <div className={classNames(styles.container, className)} onClick={() => setContextType(ContextType.TABLET)}>
          <WindowHeader
            image={'/src/assets/images/icon_tablet.svg'}
            closeWindow={toggleTablet}
            title={'Рабочая область'}
          />
          <div
            onDrop={handleDropNewTrack}
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
            className={styles.tablet}
          >
            <LogView
              depth={depth}
              domain={{
                min: (tabletProperties.properties[0].properties[OrderTabletProperties.START_DEPTH] as INumberProperty)
                  .value,
                max: (tabletProperties.properties[0].properties[OrderTabletProperties.END_DEPTH] as INumberProperty)
                  .value,
              }}
              orientation={
                (tabletProperties.properties[0].properties[OrderTabletProperties.ORIENTATION] as IEnumProperty)
                  .value as ValueOrientation
              }
            >
              {drawnTracks.map((track, trackIndex) => {
                if (track.curves.length > 0) {
                  return (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setContextType(ContextType.TRACK);
                        setTrackIndex(trackIndex);
                      }}
                      onDrop={(e) => handleDropOldTrack(e, trackIndex)}
                      key={trackIndex}
                    >
                      <CurveTrack scale='linear'>
                        {track.curves.map((curveName, curveIndex) => {
                          const curve = curves.find((curve) => curve.name === curveName && curve.data);
                          if (curve) {
                            return (
                              <Curve
                                key={curveIndex}
                                name={curve.name}
                                data={curve.data}
                                style={{
                                  color: (
                                    tracksProperties[trackIndex].properties[0].properties[
                                      OrderCurveProperties.COLOR
                                    ] as IColorProperty
                                  ).value,
                                }}
                              />
                            );
                          }
                        })}
                      </CurveTrack>
                    </div>
                  );
                }
              })}
              {drawnTracks.length > 0 && <DepthTrack main={{ name: 'MD', color: '#021D38' }} />}
            </LogView>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tablet;
