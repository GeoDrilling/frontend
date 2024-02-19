import styles from './Input.module.css';
import { FCC, IInputOutput } from '../../../types/types.tsx';
import classNames from 'classnames';
interface InputProps {
  inputOutput: IInputOutput;
  className?: string;
  inputClassName?: string;
}
const Input: FCC<InputProps> = ({ inputOutput, className, inputClassName }) => {
  return (
    <div className={className}>
      <label className={styles.title}>{inputOutput.input.label}</label>
      <input
        className={classNames(styles.input, inputClassName)}
        placeholder={inputOutput.input.placeholder}
        type={inputOutput.input.type}
        value={inputOutput.input.value}
        onChange={inputOutput.input.onChange}
        onBlur={inputOutput.input.onBlur}
      />
      {inputOutput.validations?.map(
        (validation) =>
          validation.isError &&
          inputOutput.isDirty && (
            <p className={styles.error} key={validation.message}>
              {validation.message}
            </p>
          ),
      )}
    </div>
  );
};

export default Input;
