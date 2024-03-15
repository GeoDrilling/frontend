import { FC } from 'react';
import { Selections } from '../../../models/Selection.ts';
import styles from '@components/business/UploadWindow/UploadWindow.module.css';
import CurveCell from '@components/business/UploadWindow/CurveCell.tsx';
interface TrajectoryDataProps {
  handleCellClick: (zoneName: string, columnNumber: number) => void;
  clickedZone: string;
  clickedColumn: number;
  selections: Selections;
}
const TrajectoryData: FC<TrajectoryDataProps> = ({ handleCellClick, selections, clickedZone, clickedColumn }) => {
  const names2 = ['Отход', 'Глубина', 'Зенитный угол'];
  return (
    <table className={styles['custom-table']}>
      <caption className={styles.title}>Траектория</caption>
      <thead>
        <tr>
          <th>Целевое название</th>
          <th>Амплитуда</th>
        </tr>
      </thead>
      <tbody>
        {names2.map((name, index) => (
          <tr key={index} className={styles.row}>
            <td>{name}</td>
            <CurveCell
              handleCellClick={handleCellClick}
              clickedZone={clickedZone}
              clickedColumn={clickedColumn}
              selections={selections}
              name={name}
              columnNumber={1}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrajectoryData;
