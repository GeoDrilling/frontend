import { FC } from 'react';
import styles from './RangeRow.module.css';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';

interface RangeRowProps {
  name: string;
  max: number | undefined;
  min: number | undefined;
  onChange: (isMin: boolean, value?: number) => void;
}
const RangeRow: FC<RangeRowProps> = ({ name, max, min, onChange }) => {
  const onChangeNumber = (isMin: boolean, value?: number) => {
    onChange(isMin, value);
  };
  return (
    <tr className={styles.container}>
      <td className={styles.padding}>{name}</td>
      <td>
        <InputNumber
          changeValue={(v) => onChangeNumber(true, v)}
          parameterValue={min}
          inputClassName={styles.input}
          isPlaceholder={true}
        />
      </td>
      <td>
        <InputNumber
          changeValue={(v) => onChangeNumber(false, v)}
          parameterValue={max}
          inputClassName={styles.input}
          isPlaceholder={true}
        />
      </td>
    </tr>
  );
};

export default RangeRow;
