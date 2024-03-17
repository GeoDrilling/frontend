import React, { DragEvent, FC, useEffect } from 'react';
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
import {
  groupsCurveProperties,
  OrderCurveProperties,
  OrderTabletProperties,
} from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';
import UploadWindow from '@components/business/UploadWindow/UploadWindow.tsx';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';

interface TabletProps {
  className?: string;
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { isVisible } = useUploadContext();
  const { setContextType, tracksProperties, setTracksProperties, setTrackIndex, tabletProperties } =
    useContextualSettings();
  const { id, depth, curves, getCurveData } = useProjectContext();

  useEffect(() => {
    downloadWithRetry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const downloadCurve = async (name: string, tries: number) => {
    if (tries > 3) return;
    try {
      await getCurveData(id, name);
    } catch (e) {
      await downloadCurve(name, tries + 1);
    }
  };

  const downloadWithRetry = async () => {
    await downloadCurve(DEPTH, 0);
    for (const group of tracksProperties) {
      for (const curveProp of group.curves) {
        await downloadCurve(curveProp.name, 0);
      }
    }
  };

  const handleDropNewTrack = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName) {
      if (curveName != DEPTH) getCurveData(id, curveName, true);
      else getCurveData(id, curveName);
    }
  };
  const handleDropOldTrack = (event: DragEvent<HTMLDivElement>, trackIndex: number) => {
    event.preventDefault();
    event.stopPropagation();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !tracksProperties[trackIndex].curves.find((props) => props.name === curveName)) {
      if (curveName != DEPTH) {
        setTracksProperties(
          tracksProperties.map((trackProp, trackIdx) => {
            if (trackIdx === trackIndex)
              return {
                ...trackProp,
                curves: [...trackProp.curves, { name: curveName, properties: groupsCurveProperties }],
              };
            return trackProp;
          }),
        );
      }
      getCurveData(id, curveName);
    }
  };

  return (
    <div className={classNames(styles.container)}>
      {isVisible ? (
        <div className={styles.container}>
          <WindowHeader
            image={'/src/assets/images/icon_tablet.svg'}
            closeWindow={toggleTablet}
            title={'Рабочая область'}
          />
          <UploadWindow />
        </div>
      ) : (
        <div className={classNames(styles.container, className)} onClick={() => setContextType(ContextType.TABLET)}>
          <WindowHeader
            image={'/src/assets/images/icon_tablet.svg'}
            closeWindow={toggleTablet}
            title={'Рабочая область'}
          />
          {depth?.length > 0 ? (
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
                {tracksProperties.map((track, trackIndex) => {
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
                          {track.curves.map((curveProp, curveIndex) => {
                            const curve = curves.find((curve) => curve.name === curveProp.name && curve.data);
                            if (curve) {
                              return (
                                <Curve
                                  key={curveIndex}
                                  name={curve.name}
                                  data={curve.data}
                                  style={{
                                    color: (
                                      curveProp.properties[0].properties[OrderCurveProperties.COLOR] as IColorProperty
                                    ).value,
                                  }}
                                />
                              );
                            }
                            //retryGetCurveData(curveProp, trackIndex, curveIndex)
                          })}
                        </CurveTrack>
                      </div>
                    );
                  }
                })}
                {tracksProperties.length > 0 && <DepthTrack main={{ name: 'MD', color: '#021D38' }} />}
              </LogView>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default Tablet;
