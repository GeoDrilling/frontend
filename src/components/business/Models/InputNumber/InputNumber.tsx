import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './InputNumber.module.css';
import classNames from 'classnames';

interface InputNumberProps {
  changeValue: (value?: number) => void;
  parameterValue?: number;
  isEdited?: boolean;
  isStartFocus?: boolean;
  suffix?: string;
  inputClassName?: string;
  isPlaceholder?: boolean;
}
const InputNumber: FC<InputNumberProps> = ({
  changeValue,
  parameterValue,
  isEdited,
  isStartFocus,
  suffix,
  inputClassName,
  isPlaceholder,
}) => {
  const [value, setValue] = useState<string>(parameterValue !== undefined ? parameterValue.toString() : '');
  useEffect(() => {
    setValue(parameterValue !== undefined ? parameterValue.toString() : '');
  }, [parameterValue]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    try {
      if (!isNaN(parseFloat(value))) {
        changeValue(parseFloat(value));
        return;
      }
    } catch (e) {
      console.log(e);
    }
    if (isPlaceholder) changeValue(undefined);
    else changeValue(0);
  };
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isStartFocus) ref.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      <input
        ref={ref}
        type='number'
        value={value}
        placeholder={isPlaceholder ? '-' : ''}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        className={classNames(styles.input, inputClassName)}
        style={{ color: isEdited ? 'var(--secondary)' : 'var(--primary)' }}
      />
      {suffix ? (
        <p className={styles.suffix} style={{ color: isEdited ? 'var(--secondary)' : 'var(--primary)' }}>
          {suffix}
        </p>
      ) : undefined}
    </div>
  );
};

export default InputNumber;
