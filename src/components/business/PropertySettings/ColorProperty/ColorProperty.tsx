import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IColorProperty } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './ColorProperty.module.css';

interface ColorPropertyProps {
  property: IColorProperty;
  changeProperty: (value: string) => void;
}
const ColorProperty: FC<ColorPropertyProps> = ({ property, changeProperty }) => {
  const [value, setValue] = useState<string>(property.value);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    setValue(property.value);
  }, [property.value]);
  return (
    <div className={styles.container}>
      <input
        type='color'
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={() => changeProperty(value)}
        className={styles.input}
      />
    </div>
  );
};

export default ColorProperty;
