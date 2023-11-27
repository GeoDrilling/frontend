import { FC } from 'react';
import styles from './Tablet.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';

const Tablet: FC = () => {
  return (
    <div className={styles.container}>
      <WindowHeader image={'src/assets/images/icon_tablet.svg'} title={'Рабочая область'} />
    </div>
  );
};

export default Tablet;
