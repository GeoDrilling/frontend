import { FC } from 'react';
import styles from './LoadingModel.module.css';
interface LoadingModelProps {
  toStartParameters: () => void;
}
const LoadingModel: FC<LoadingModelProps> = ({ toStartParameters }) => {
  return (
    <div className={styles.container} onClick={toStartParameters}>
      <p className={styles.text}>Подбор параметров модели...</p>
    </div>
  );
};

export default LoadingModel;
