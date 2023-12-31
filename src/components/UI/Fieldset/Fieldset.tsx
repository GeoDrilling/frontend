import Input from '@components/UI/Input/Input.tsx';
import styles from './Fieldset.module.css';
import classNames from 'classnames';
import { IInputOutput } from '../../../types/types.tsx';
import { FC } from 'react';

interface FieldsetProps {
  inputs: IInputOutput[];
  className?: string;
}

const Fieldset: FC<FieldsetProps> = ({ inputs, className }) => {
  return (
    <fieldset className={classNames(styles.fieldset, className)}>
      {inputs.map((input, index) => (
        <Input key={index} className={styles.input} inputOutput={{ ...input }} />
      ))}
    </fieldset>
  );
};

export default Fieldset;
