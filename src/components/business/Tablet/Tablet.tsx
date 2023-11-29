import { FC } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindowsContext } from '../../../hooks/context/useWindowsContext.ts';
interface TabletProps {
  className?: string;
}
const Tablet: FC<TabletProps> = ({ className }) => {
  const { toggleTablet } = useWindowsContext();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'src/assets/images/icon_tablet.svg'} closeWindow={toggleTablet} title={'Рабочая область'} />
    </div>
  );
};

export default Tablet;
