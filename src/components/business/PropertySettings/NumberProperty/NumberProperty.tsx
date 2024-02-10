import { ChangeEvent, FC, useState } from 'react';
import { INumberProperty } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './NumberPropert.module.css';
interface NumberPropertyProps {
  property: INumberProperty;
  changeProperty: (value: number) => void;
}
const NumberProperty: FC<NumberPropertyProps> = ({ property, changeProperty }) => {
  const s: string = property.value.toString();
  const [value, setValue] = useState<string>(s);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        type='number'
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => changeProperty(parseFloat(value))}
        className={styles.input}
      />
    </div>
  );
};

export default NumberProperty;
