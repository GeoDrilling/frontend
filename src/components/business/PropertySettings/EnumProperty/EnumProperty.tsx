import { FC } from 'react';
import { EnumType, IEnumProperty, IEnumOption, orientation } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './EnumProperty.module.css';

interface EnumPropertyProps {
  property: IEnumProperty;
  changeProperty: (value: number | string) => void;
}
function isOrientation(prop: IEnumProperty) {
  return prop.enumType === EnumType.ORIENTATION;
}
const EnumProperty: FC<EnumPropertyProps> = ({ property, changeProperty }) => {
  let options: IEnumOption[];
  if (isOrientation(property)) options = orientation;
  else options = orientation;
  const changeValue = (name: string) => {
    const value = options.find((option) => option.name === name)?.value;
    if (value) changeProperty(value);
  };
  return (
    <div className={styles.container}>
      <select
        value={options.find((option) => option.value === property.value)?.name}
        onChange={(e) => changeValue(e.target.value)}
        className={styles.select}
      >
        {options.map((v, i) => {
          return (
            <option value={v.name} key={i}>
              {v.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EnumProperty;
