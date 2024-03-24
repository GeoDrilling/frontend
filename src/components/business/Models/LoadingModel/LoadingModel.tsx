import { FC } from 'react';
import styles from './LoadingModel.module.css';

const LoadingModel: FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Подбор параметров модели...</p>
    </div>
  );
};

export default LoadingModel;
