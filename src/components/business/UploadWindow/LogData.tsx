import { FC } from 'react';
import styles from '@components/business/UploadWindow/UploadWindow.module.css';
import { Selections } from '../../../models/Selection.ts';
import CurveCell from '@components/business/UploadWindow/CurveCell.tsx';

interface LogDataProps {
  handleCellClick: (zoneName: string, columnNumber: number) => void;
  clickedZone: string;
  clickedColumn: number;
  selections: Selections;
}

const LogData: FC<LogDataProps> = ({ handleCellClick, selections, clickedZone, clickedColumn }) => {
  const names1 = ['L', 'LD', 'LE', 'H', 'HD', 'HE'];
  return (
    <table className={styles['custom-table']}>
      <caption className={styles.title}>Данные ВИКПБ</caption>
      <thead>
        <tr>
          <th>Название зонда</th>
          <th>Амплитуда</th>
          <th>Фаза</th>
        </tr>
      </thead>
      <tbody>
        {names1.map((name, index) => (
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
            <CurveCell
              handleCellClick={handleCellClick}
              clickedZone={clickedZone}
              clickedColumn={clickedColumn}
              selections={selections}
              name={name}
              columnNumber={2}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LogData;
