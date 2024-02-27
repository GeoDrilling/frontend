import styles from './OutlinedButton.module.css';
import { FCC } from '../../../types/types.tsx';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';

interface OutlinedButtonProps {
  className?: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}
const OutlinedButton: FCC<OutlinedButtonProps> = ({ children, className, isSelected, onClick }) => {
  if (isSelected)
    return (
      <div className={classNames(styles.selectedContainer, className)} onClick={onClick}>
        {children}
      </div>
    );
  return (
    <div className={classNames(styles.container, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default OutlinedButton;
