import React, { DragEvent, FC, useEffect, useMemo } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { Curve, CurveTrack, DepthTrack, LogView, ModelCurve } from 'geochart';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import {
  ContextType,
  IColorProperty,
  IEnumProperty,
  INumberProperty,
  ValueBoolean,
  ValueOrientation,
  ValueScale,
} from '../../../models/ContextualSettingsTypes.ts';
import {
  groupsCurveProperties,
  OrderCurveProperties,
  OrderTabletGrid,
  OrderTabletGroups,
  OrderTabletMain,
  OrderTrackGrid,
  OrderTrackGroups,
  OrderTrackMain,
} from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';
import UploadWindow from '@components/business/UploadWindow/UploadWindow.tsx';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';
import { useModel } from '../../../hooks/context/useModel.ts';

interface TabletProps {
  className?: string;
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { isVisible } = useUploadContext();
  const { setContextType, tracksProperties, setTracksProperties, setTrackIndex, tabletProperties } =
    useContextualSettings();
  const { id, depth, curves, getCurveData } = useProjectContext();
  const { models } = useModel();

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
  const getEssential = async () => {
    const depth = curves.find((curve) => curve.name === DEPTH);
    const tvd = curves.find((curve) => curve.name === 'TVD');
    if (depth && depth.data && depth.data.length < 1) await downloadCurve(DEPTH, 0);
    if (tvd && tvd.data && tvd.data.length < 1) await downloadCurve('TVD', 0);
  };

  const downloadWithRetry = async () => {
    getEssential();
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
  const tvd = useMemo(() => curves.find((c) => c.name === 'TVD' && c.data), [curves]);
  return (
    <div className={classNames(styles.container, className)}>
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
        <div className={classNames(styles.container)} onClick={() => setContextType(ContextType.TABLET)}>
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
                scope={
                  (
                    tabletProperties.properties[OrderTabletGroups.MAIN].properties[
                      OrderTabletMain.SCOPE
                    ] as INumberProperty
                  ).value
                }
                depth={depth}
                domain={{
                  min: (
                    tabletProperties.properties[OrderTabletGroups.MAIN].properties[
                      OrderTabletMain.START_DEPTH
                    ] as INumberProperty
                  ).value,
                  max: (
                    tabletProperties.properties[OrderTabletGroups.MAIN].properties[
                      OrderTabletMain.END_DEPTH
                    ] as INumberProperty
                  ).value,
                }}
                orientation={
                  (
                    tabletProperties.properties[OrderTabletGroups.MAIN].properties[
                      OrderTabletMain.ORIENTATION
                    ] as IEnumProperty
                  ).value as ValueOrientation
                }
                grid={{
                  main: {
                    interval: (
                      tabletProperties.properties[OrderTabletGroups.GRID].properties[
                        OrderTabletGrid.INTERVAL
                      ] as INumberProperty
                    ).value,
                    style: {
                      thickness: (
                        tabletProperties.properties[OrderTabletGroups.GRID].properties[
                          OrderTabletGrid.THICKNESS_MAIN
                        ] as INumberProperty
                      ).value,
                    },
                  },
                  secondary: {
                    lines: (
                      tabletProperties.properties[OrderTabletGroups.GRID].properties[
                        OrderTabletGrid.LINES
                      ] as INumberProperty
                    ).value,
                    style: {
                      thickness: (
                        tabletProperties.properties[OrderTabletGroups.GRID].properties[
                          OrderTabletGrid.THICKNESS_LINES
                        ] as INumberProperty
                      ).value,
                    },
                  },
                }}
              >
                {models.length > 0 && (
                  <ModelCurve
                    data={[
                      {
                        x: 3100,
                        y: models[0].tvdStart,
                        alpha: models[0].alpha,
                        roUp: models[0].roUp,
                        roDown: models[0].roDown,
                      },
                    ]}
                    domain={{ min: 2292, max: 2314 }}
                    height={350}
                  >
                    {tvd && <Curve name='TVD' data={tvd.data} style={{ color: '#510D0A', thickness: 3 }} />}
                  </ModelCurve>
                )}
                {tracksProperties.map((track, trackIndex) => {
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
                      <CurveTrack
                        scale={
                          (track.properties[OrderTrackGroups.MAIN].properties[OrderTrackMain.SCALE] as IEnumProperty)
                            .value as ValueScale
                        }
                        height={
                          (track.properties[OrderTrackGroups.MAIN].properties[OrderTrackMain.HEIGHT] as INumberProperty)
                            .value
                        }
                        grid={{
                          main: {
                            lines: (
                              track.properties[OrderTrackGroups.GRID].properties[
                                OrderTrackGrid.COUNT_MAIN
                              ] as INumberProperty
                            ).value,
                            isDisplayed:
                              ((
                                track.properties[OrderTrackGroups.GRID].properties[
                                  OrderTrackGrid.DISPLAY
                                ] as IEnumProperty
                              ).value as ValueBoolean) !== '',
                          },
                          secondary: {
                            lines: (
                              track.properties[OrderTrackGroups.GRID].properties[
                                OrderTrackGrid.COUNT_SECONDARY
                              ] as INumberProperty
                            ).value,
                            isDisplayed:
                              ((
                                track.properties[OrderTrackGroups.GRID].properties[
                                  OrderTrackGrid.DISPLAY
                                ] as IEnumProperty
                              ).value as ValueBoolean) !== '',
                            leftOffset: (
                              track.properties[OrderTrackGroups.GRID].properties[
                                OrderTrackGrid.LEFT_OFF
                              ] as INumberProperty
                            ).value,
                            rightOffset: (
                              track.properties[OrderTrackGroups.GRID].properties[
                                OrderTrackGrid.RIGHT_OFF
                              ] as INumberProperty
                            ).value,
                          },
                        }}
                      >
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
                        })}
                      </CurveTrack>
                    </div>
                  );
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
