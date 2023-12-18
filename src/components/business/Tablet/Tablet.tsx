import { FC } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
interface TabletProps {
  className?: string;
}
const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindows();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
      <div className={styles.tablet}></div>
    </div>
  );
};

export default Tablet;
