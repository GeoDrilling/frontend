import React, { DragEvent, FC, useState } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import ProjectService from '../../../services/ProjectService.ts';
import { LogView, CurveTrack, Curve, DepthTrack } from 'geochart';
interface TabletProps {
  className?: string;
}
interface CurveData {
  name: string;
  data: number[];
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { id } = useProjectContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateCurve, setDataCurve] = useState<CurveData[]>([]);
  const [depth, setDepth] = useState<number[]>([]);
  const DEPTH = 'DEPT';

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !dateCurve.map((e) => e.name).includes(curveName)) {
      if (curveName != DEPTH) setDataCurve([...dateCurve, { name: curveName, data: [] }]);
      fetchCurve(curveName);
    }
  };

  async function fetchCurve(curveName: string) {
    try {
      const response = await ProjectService.getCurve(id, curveName);
      if (curveName != DEPTH)
        setDataCurve([...dateCurve, { name: curveName, data: JSON.parse(response.data.curveDataInJson) }]);
      else setDepth(JSON.parse(response.data.curveDataInJson));
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  }
  console.log(depth.length);
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        className={styles.tablet}
      >
        {/*domain={xRange}*/}
        <LogView depth={depth} domain={{ min: 3200, max: 3500 }} orientation='horizontal'>
          {dateCurve.map((curve) => (
            <CurveTrack>
              {/*<Curve name={curve.name} data={curve.data} style={{ color: '#B80C09' }}/>*/}
              <Curve name={curve.name} data={curve.data} style={{ color: '#FBBB3B' }} />
            </CurveTrack>
          ))}
          {dateCurve.length > 0 && <DepthTrack main={{ name: 'MD', color: '#021D38' }} />}
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
