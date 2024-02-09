import { FC } from 'react';
import { EnumType, IEnumProperty, orientation } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './EnumProperty.module.css';

interface EnumPropertyProps {
  property: IEnumProperty;
  changeProperty: (value: number | string) => void;
}
function isOrientation(prop: IEnumProperty) {
  return prop.enumType === EnumType.ORIENTATION;
}
const EnumProperty: FC<EnumPropertyProps> = ({ property, changeProperty }) => {
  let options: string[];
  if (isOrientation(property)) options = orientation.map((option) => option.name);
  else options = orientation.map((option) => option.name);
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
