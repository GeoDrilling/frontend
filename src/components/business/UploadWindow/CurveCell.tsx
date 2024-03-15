import { FC } from 'react';
import styles from '@components/business/UploadWindow/UploadWindow.module.css';
import { Selections } from '../../../models/Selection.ts';
interface CurveCellProps {
  handleCellClick: (zoneName: string, columnNumber: number) => void;
  clickedZone: string;
  clickedColumn: number;
  selections: Selections;
  name: string;
  columnNumber: number;
}
const CurveCell: FC<CurveCellProps> = ({
  handleCellClick,
  clickedZone,
  clickedColumn,
  selections,
  name,
  columnNumber,
}) => {
  return (
    <td
      onClick={() => handleCellClick(name, columnNumber)}
      className={clickedZone === `${name}` && clickedColumn == columnNumber ? styles.selectedCell : ''}
    >
      {selections[name]?.state1 === 7 ? (
        <div className={styles['locked']}>
          <img src='/src/assets/images/icon/Vector.png' alt='' className={styles['icon']} />
          {columnNumber === 1 ? selections[name]?.selection1 || '' : selections[name]?.selection2 || ''}
        </div>
      ) : columnNumber === 1 ? (
        <div>{selections[name]?.selection1 || ''}</div>
      ) : (
        <div>{selections[name]?.selection2 || ''}</div>
      )}
    </td>
  );
};

export default CurveCell;
