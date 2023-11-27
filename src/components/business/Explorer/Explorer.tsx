import { FC } from 'react';
import styles from './Explorer.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';

const Explorer: FC = () => {
  return (
    <div className={styles.container}>
      <WindowHeader image={'src/assets/images/icon_explorer.svg'} title={'Браузер проекта'} />
    </div>
  );
};

export default Explorer;
