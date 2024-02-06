import React, { DragEvent, FC, useEffect, useState } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import ProjectService from '../../../services/ProjectService.ts';
import { Curve, CurveTrack, DepthTrack, LogView } from 'geochart';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import { ContextType, IColorProperty } from '../../../models/ContextualSettingsTypes.ts';
import { OrderCurveProperties, trackProperties } from '../../../utils/ContextualSettingsConstatns.ts';

interface TabletProps {
  className?: string;
}

interface CurveData {
  name: string;
  data: number[];
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { setContextType, setTracksProperties, tracksProperties, setTrackIndex } = useContextualSettings();
  const { id, getDepth, setDepth, depth } = useProjectContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateCurves, setDataCurves] = useState<CurveData[]>([]);
  const DEPTH = 'DEPT';

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !dateCurves.map((e) => e.name).includes(curveName)) {
      if (curveName != DEPTH) setDataCurves([...dateCurves, { name: curveName, data: [] }]);
      fetchCurve(curveName);
    }
  };

  async function fetchCurve(curveName: string) {
    try {
      const response = await ProjectService.getCurve(id, curveName);
      if (curveName != DEPTH) {
        setDataCurves([...dateCurves, { name: curveName, data: JSON.parse(response.data.curveDataInJson) }]);
        setTracksProperties([...tracksProperties, trackProperties]);
      } else setDepth(JSON.parse(response.data.curveDataInJson));
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  }

  useEffect(() => {
    getDepth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames(styles.container, className)} onClick={() => setContextType(ContextType.TABLET)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        className={styles.tablet}
      >
        <LogView depth={depth} domain={{ min: 3200, max: 3500 }} orientation='horizontal'>
          {dateCurves.map((curve, index) => (
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
          {dateCurves.length > 0 && <DepthTrack main={{ name: 'MD', color: '#021D38' }} />}
          {/*<CurveTrack>
            <Curve name="ROP AVG" data={[]} style={{ color: '#B80C09' }} />
            <Curve name="ACTECDX" data={[]} style={{ color: '#FBBB3B' }} />
          </CurveTrack>
          <CurveTrack scale="logarithmic">
            <Curve name="RACSHX" data={[]} style={{ color: '#156FA3' }} />
            <Curve name="ACTECDX" data={[]} style={{ color: '#021D38' }} />
          </CurveTrack>
          <DepthTrack main={{ name: 'MD', color: '#021D38' }} secondary={{ name: 'TVD', color: '#FBBB3B' }} />*/}
        </LogView>
      </div>
    </div>
  );
};

export default Tablet;
