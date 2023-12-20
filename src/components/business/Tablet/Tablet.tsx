import React, {DragEvent, FC, useState} from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import ProjectService from '../../../services/ProjectService.ts';

interface TabletProps {
  className?: string;
}

const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  const { id } = useProjectContext();
  const [curvesList, setCurvesList] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDataCurve] = useState<number[]>([]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const curveName = event?.dataTransfer?.getData('text/plain');
    if (curveName && !curvesList.includes(curveName))
      setCurvesList([...curvesList, curveName])
  };

  async function fetchCurve(curveName: string) {
    try {
      const response = await ProjectService.getCurve(id, curveName);
      setDataCurve(response.data.curveDataInJson);
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  }
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        className={styles.tablet}
      >
      </div>
    </div>
  );
};

export default Tablet;
