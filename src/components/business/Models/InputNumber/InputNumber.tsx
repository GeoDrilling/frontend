import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './InputNumber.module.css';

interface InputNumberProps {
  changeValue: (value: number) => void;
  parameterValue: number;
  isEdited?: boolean;
  isStartFocus?: boolean;
  suffix?: string;
}
const InputNumber: FC<InputNumberProps> = ({ changeValue, parameterValue, isEdited, isStartFocus, suffix }) => {
  const [value, setValue] = useState<string>(parameterValue.toString());
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
        onChange={(e) => onChange(e)}
        onBlur={() => changeValue(parseFloat(value))}
        className={styles.input}
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
