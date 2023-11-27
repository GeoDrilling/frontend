import { FC } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
const AreaEquivalence: FC = () => {
  return (
    <div className={styles.container}>
      <WindowHeader image={'src/assets/images/icon_area_eq.svg'} title={'Модели'} />
    </div>
  );
};

export default AreaEquivalence;
