import React, {FC} from 'react';
import styles from './Checkbox.module.css'
interface CheckboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    className?: string
}
const Checkbox: FC<CheckboxProps> = ({label, className, checked, onChange}) => {
    return (
        <label className={className}>
            <input checked={checked}
                onChange={onChange}
                className={styles.checkbox}
                   type='checkbox'/>
            <span className={styles.custom_checkbox}/>
            {label}
        </label>
    );
};

export default Checkbox;