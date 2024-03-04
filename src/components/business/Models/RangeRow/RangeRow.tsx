import { FC } from 'react';
import styles from './RangeRow.module.css';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';

interface RangeRowProps {
  name: string;
  max: number;
  min: number;
}
const RangeRow: FC<RangeRowProps> = ({ name, max, min }) => {
  return (
    <tr className={styles.container}>
      <td className={styles.padding}>{name}</td>
      <td>
        <InputNumber changeValue={() => {}} parameterValue={max} inputClassName={styles.input} />
      </td>
      <td>
        <InputNumber changeValue={() => {}} parameterValue={min} inputClassName={styles.input} />
      </td>
    </tr>
  );
};

export default RangeRow;
