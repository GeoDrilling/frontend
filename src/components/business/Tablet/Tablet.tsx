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
  OrderDepthTrackMain,
  OrderModelCurveMain,
  OrderTabletGrid,
  OrderTabletGroups,
  OrderTabletMain,
  OrderTrackGroups,
  OrderTrackMain,
  OrderTrackMainGrid,
  OrderTrackSecondaryGrid,
} from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';
import UploadWindow from '@components/business/UploadWindow/UploadWindow.tsx';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';
import { useModel } from '../../../hooks/context/useModel.ts';
import { useGradientContext } from '../../../hooks/context/useGradientContext.ts';

interface TabletProps {
  className?: string;
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { isVisible } = useUploadContext();
  const {
    setContextType,
    tracksProperties,
    setTracksProperties,
    setTrackIndex,
    tabletProperties,
    depthTrackProperties,
    modelCurveProperties,
  } = useContextualSettings();
  const { id, depth, curves, getCurveData } = useProjectContext();
  const { models } = useModel();
  const { gradient } = useGradientContext();

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
  /*const rgbToHex = useCallback( (rgb: string) => {
    const components = rgb.split(',')
    const r = Number(components[0].slice(5))
    const g = Number(components[1])
    const b = Number(components[2])
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }, [])*/
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
                      color: (
                        tabletProperties.properties[OrderTabletGroups.GRID].properties[
                          OrderTabletGrid.COLOR_MAIN
                        ] as IColorProperty
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
                      color: (
                        tabletProperties.properties[OrderTabletGroups.GRID].properties[
                          OrderTabletGrid.COLOR_SECONDARY
                        ] as IColorProperty
                      ).value,
                    },
                  },
                }}
              >
                {models.length > 0 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setContextType(ContextType.MODEL);
                    }}
                  >
                    <ModelCurve
                      data={models.map((m) => ({
                        x: m.start,
                        y: m.tvdStart,
                        alpha: m.alpha,
                        roUp: m.roUp,
                        roDown: m.roDown,
                      }))}
                      palette={{ gradient }}
                      domain={{
                        min: (modelCurveProperties.properties[0].properties[OrderModelCurveMain.MIN] as INumberProperty)
                          .value,
                        max: (modelCurveProperties.properties[0].properties[OrderModelCurveMain.MAX] as INumberProperty)
                          .value,
                      }}
                      height={
                        (modelCurveProperties.properties[0].properties[OrderModelCurveMain.HEIGHT] as INumberProperty)
                          .value
                      }
                      borders={{
                        horizontal: {
                          color: (
                            modelCurveProperties.properties[0].properties[
                              OrderModelCurveMain.COLOR_BORDER_LAYERS
                            ] as IColorProperty
                          ).value,
                          thickness: (
                            modelCurveProperties.properties[0].properties[
                              OrderModelCurveMain.THICKNESS_BORDER_LAYERS
                            ] as INumberProperty
                          ).value,
                        },
                        vertical: {
                          color: (
                            modelCurveProperties.properties[0].properties[
                              OrderModelCurveMain.COLOR_BORDER_MODEL
                            ] as IColorProperty
                          ).value,
                          thickness: (
                            modelCurveProperties.properties[0].properties[
                              OrderModelCurveMain.THICKNESS_BORDER_MODEL
                            ] as INumberProperty
                          ).value,
                        },
                      }}
                    >
                      {tvd && <Curve name='TVD' data={tvd.data} style={{ color: '#510D0A', thickness: 3 }} />}
                    </ModelCurve>
                  </div>
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
                              track.properties[OrderTrackGroups.MAIN_GRID].properties[
                                OrderTrackMainGrid.COUNT
                              ] as INumberProperty
                            ).value,
                            isDisplayed:
                              ((
                                track.properties[OrderTrackGroups.MAIN_GRID].properties[
                                  OrderTrackMainGrid.DISPLAY
                                ] as IEnumProperty
                              ).value as ValueBoolean) !== '',
                          },
                          secondary: {
                            lines: (
                              track.properties[OrderTrackGroups.SECONDARY_GRID].properties[
                                OrderTrackSecondaryGrid.COUNT
                              ] as INumberProperty
                            ).value,
                            isDisplayed:
                              ((
                                track.properties[OrderTrackGroups.SECONDARY_GRID].properties[
                                  OrderTrackSecondaryGrid.DISPLAY
                                ] as IEnumProperty
                              ).value as ValueBoolean) !== '',
                            leftOffset: (
                              track.properties[OrderTrackGroups.SECONDARY_GRID].properties[
                                OrderTrackSecondaryGrid.LEFT_OFF
                              ] as INumberProperty
                            ).value,
                            rightOffset: (
                              track.properties[OrderTrackGroups.SECONDARY_GRID].properties[
                                OrderTrackSecondaryGrid.RIGHT_OFF
                              ] as INumberProperty
                            ).value,
                          },
                        }}
                      >
                        {track.curves.map((curveProp, curveIndex) => {
                          const curve = curves.find(
                            (curve) =>
                              (curve.name === curveProp.name || curve.name === curveProp.name.substring(1)) &&
                              curve.data,
                          );
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
                                  thickness: (
                                    curveProp.properties[0].properties[
                                      OrderCurveProperties.THICKNESS
                                    ] as INumberProperty
                                  ).value,
                                }}
                                domain={{
                                  max: (curveProp.properties[0].properties[OrderCurveProperties.MAX] as INumberProperty)
                                    .value,
                                  min: (curveProp.properties[0].properties[OrderCurveProperties.MIN] as INumberProperty)
                                    .value,
                                }}
                              />
                            );
                          }
                        })}
                      </CurveTrack>
                    </div>
                  );
                })}
                {tracksProperties.length > 0 && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setContextType(ContextType.DEPTH_TRACK);
                    }}
                  >
                    <DepthTrack
                      height={
                        (depthTrackProperties.properties[0].properties[OrderDepthTrackMain.HEIGHT] as INumberProperty)
                          .value
                      }
                      main={{
                        name: 'MD',
                        color: (
                          depthTrackProperties.properties[0].properties[OrderDepthTrackMain.COLOR] as IColorProperty
                        ).value,
                        floatingPoint: (
                          depthTrackProperties.properties[0].properties[
                            OrderDepthTrackMain.FLOATING_POINT
                          ] as INumberProperty
                        ).value,
                      }}
                    />
                  </div>
                )}
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
