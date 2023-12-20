import { FC, useState } from 'react';
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

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const curveName = event.dataTransfer.getData('text/plain');
    setCurvesList((prev) => {
      // Проверяем, существует ли уже такое имя в списке
      if (!prev.includes(curveName)) {
        return [...prev, curveName];
      }
      return prev;
    });
  };

  async function fetchProject(curveName: string) {
    try {
      // Использование await для получения результата асинхронного вызова
      const response = await ProjectService.getCurve(id.toString(), curveName);

      // Предполагаем, что response.data является массивом чисел
      setDataCurve(response.data.curveDataInJson);
    } catch (error) {
      console.error('Ошибка при запросе к серверу:', error);
    }
  }

  const handleRemoveCurve = (curveToRemove: string) => {
    setCurvesList(curvesList.filter((curve) => curve !== curveToRemove));
  };
  const handleBackendRequest = (curve: string) => {
    fetchProject(curve);
  };
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
        className={styles.tablet}
      >
        <ul className={styles.curvesList}>
          {curvesList.map((curve, index) => (
            <li key={index} className={styles.listItem}>
              {curve}
              <div>
                <button onClick={() => handleRemoveCurve(curve)} className={`${styles.button} ${styles.deleteButton}`}>
                  Удалить
                </button>
                <button onClick={() => handleBackendRequest(curve)} className={styles.button}>
                  Запрос к Бэку
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tablet;
