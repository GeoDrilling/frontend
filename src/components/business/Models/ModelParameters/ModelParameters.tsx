import { FC } from 'react';
import styles from './ModelParameters.module.css';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';
import classNames from 'classnames';

interface ModelParametersProps {
  name: string;
  suffix?: string;
  value: number;
  onValueClick?: () => void;
  onValueChange?: (value: number) => void;
  isEditing?: boolean;
  isEdited?: boolean;
  startFocus?: boolean;
  className?: string;
}
const ModelParameters: FC<ModelParametersProps> = ({
  name,
  value,
  onValueClick,
  startFocus,
  isEditing,
  isEdited,
  onValueChange,
  suffix,
  className,
}) => {
  let formattedValue;
  try {
    formattedValue = value.toFixed(2) ? Number(value.toFixed(2)) : value;
  } catch (e) {
    formattedValue = value;
  }
  return (
    <tr className={classNames(styles.container, className)}>
      <td className={styles.name}>{name}</td>
      <td className={isEditing ? styles.value : classNames(styles.value, styles.pointer)} onClick={onValueClick}>
        {isEditing ? (
          <InputNumber
            changeValue={(value) => (onValueChange ? onValueChange(value) : undefined)}
            parameterValue={formattedValue}
            isEdited={isEdited}
            isStartFocus={startFocus}
            suffix={suffix}
          />
        ) : (
          <div className={styles.valueContainer}>
            <p className={styles.suffix}>
              {formattedValue} {suffix}
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ModelParameters;
