import { FC } from 'react';
import {
  EnumType,
  IEnumProperty,
  IEnumOption,
  orientation,
  scale,
  boolValue,
} from '../../../../models/ContextualSettingsTypes.ts';
import styles from './EnumProperty.module.css';

interface EnumPropertyProps {
  property: IEnumProperty;
  changeProperty: (value: number | string) => void;
}
function isOrientation(prop: IEnumProperty) {
  return prop.enumType === EnumType.ORIENTATION;
}
function isScale(prop: IEnumProperty) {
  return prop.enumType === EnumType.SCALE;
}
function isBool(prop: IEnumProperty) {
  return prop.enumType === EnumType.BOOLEAN;
}
const EnumProperty: FC<EnumPropertyProps> = ({ property, changeProperty }) => {
  let options: IEnumOption[];
  if (isOrientation(property)) options = orientation;
  else if (isScale(property)) options = scale;
  else if (isBool(property)) options = boolValue;
  else options = orientation;
  const changeValue = (name: string) => {
    const value = options.find((option) => option.name === name)?.value;
    if (value !== undefined) changeProperty(value);
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
