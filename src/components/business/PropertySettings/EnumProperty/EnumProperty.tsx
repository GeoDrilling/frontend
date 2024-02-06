import { FC } from 'react';
import {
  EnumType,
  IEnumProperty,
  IOrientationProperty,
  OrientationEnum,
} from '../../../../models/ContextualSettingsTypes.ts';
import styles from './EnumProperty.module.css';

interface EnumPropertyProps {
  property: IEnumProperty;
  changeProperty: (value: number | string) => void;
}
function isOrientation(prop: IEnumProperty): prop is IOrientationProperty {
  return prop.enumType === EnumType.ORIENTATION;
}
const EnumProperty: FC<EnumPropertyProps> = ({ property, changeProperty }) => {
  let options: string[];
  if (isOrientation(property)) options = Object.values(OrientationEnum).filter((item) => isNaN(Number(item)));
  else options = Object.values(OrientationEnum).filter((item) => isNaN(Number(item)));
  return (
    <div className={styles.container}>
      <select value={property.value} onChange={(e) => changeProperty(e.target.value)} className={styles.select}>
        {options.map((v, i) => {
          return (
            <option value={v} key={i}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EnumProperty;
