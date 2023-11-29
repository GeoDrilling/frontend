import { FC } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindowsContext } from '../../../hooks/context/useWindowsContext.ts';

interface AreaEquivalenceProps {
  className?: string;
}

const AreaEquivalence: FC<AreaEquivalenceProps> = ({ className }) => {
  const { toggleAreaEquivalence } = useWindowsContext();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'src/assets/images/icon_area_eq.svg'} title={'Модели'} closeWindow={toggleAreaEquivalence} />
    </div>
  );
};

export default AreaEquivalence;
