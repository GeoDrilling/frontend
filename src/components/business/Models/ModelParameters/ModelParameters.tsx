import { FC } from 'react';
import styles from './ModelParameters.module.css';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';
import classNames from 'classnames';

interface ModelParametersProps {
  name: string;
  suffix?: string;
  value?: number;
  onValueClick?: () => void;
  onValueChange?: (value?: number) => void;
  isEditing?: boolean;
  isEdited?: boolean;
  startFocus?: boolean;
  className?: string;
  valueClassName?: string;
  isRemovable?: boolean;
  isPlaceholder?: boolean;
  onRemove?: () => void;
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
  valueClassName,
  isRemovable,
  onRemove,
  isPlaceholder
}) => {
  let formattedValue;
  try {
    formattedValue = value && value.toFixed(2) ? Number(value.toFixed(2)) : value;
  } catch (e) {
    formattedValue = value;
  }
  return (
    <tr className={classNames(styles.container, className)}>
      {!isRemovable &&
          <td className={styles.name}>{name}</td>}
      {isRemovable &&
          <td className={styles.name}>
              <div className={styles.nameContainer}>
                {name}
                  <img className={styles.remove}
                       onClick={onRemove}
                      src={'/src/assets/images/icon_delete_level.svg'} alt={'del'}/>
              </div>
          </td>
      }
      <td className={isEditing ? styles.value : classNames(styles.value, styles.pointer)} onClick={onValueClick}>
        {isEditing ? (
          <InputNumber
            changeValue={(value) => (onValueChange ? onValueChange(value) : undefined)}
            parameterValue={formattedValue}
            isEdited={isEdited}
            isStartFocus={startFocus}
            suffix={suffix}
            isPlaceholder={isPlaceholder}
          />
        ) : (
          <div className={styles.valueContainer}>
            <p className={classNames(styles.suffix, valueClassName)}>
              {formattedValue} {suffix}
            </p>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ModelParameters;
