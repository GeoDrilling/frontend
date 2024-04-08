import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { INumberProperty } from '../../../../models/ContextualSettingsTypes.ts';
import styles from './NumberPropert.module.css';
import { nullableProperties } from '../../../../utils/ContextualSettingsConstatns.ts';
interface NumberPropertyProps {
  property: INumberProperty;
  changeProperty: (value?: number) => void;
}
const NumberProperty: FC<NumberPropertyProps> = ({ property, changeProperty }) => {
  const s: string = useMemo(() => {
    if (property.value !== undefined && property.value !== null) return property.value.toString();
    return '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property]);
  const [value, setValue] = useState<string>(s);
  useEffect(() => {
    setValue(s);
  }, [s]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    let result;
    try {
      result = parseFloat(value);
    } catch (e) {
      console.log(nullableProperties);
      result = undefined;
    } finally {
      changeProperty(result);
    }
  };
  if (property.name === 'Высота') console.log(property);
  return (
    <div className={styles.container}>
      <input
        type='number'
        value={value}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        placeholder={nullableProperties.includes(property.name) ? '-' : ''}
        className={styles.input}
      />
    </div>
  );
};

export default NumberProperty;
