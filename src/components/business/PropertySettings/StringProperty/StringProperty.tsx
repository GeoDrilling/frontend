import { ChangeEvent, FC, useState } from 'react';
import { IStringProperty } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './StringProperty.module.css';
interface StringPropertyProps {
  property: IStringProperty;
  changeProperty: (value: string) => void;
}
const StringProperty: FC<StringPropertyProps> = ({ property, changeProperty }) => {
  const [value, setValue] = useState<string>(property.value);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => changeProperty(value)}
        className={styles.input}
      />
    </div>
  );
};

export default StringProperty;
