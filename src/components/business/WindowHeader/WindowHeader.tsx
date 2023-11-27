import styles from './WindowHeader.module.css';
import { FCC } from '../../../types/types.tsx';

interface WindowHeaderProps {
  image: string;
  title: string;
}
const WindowHeader: FCC<WindowHeaderProps> = ({ image, title }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt='' className={styles.icon} />
      <div className={styles.box}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.exit} />
    </div>
  );
};

export default WindowHeader;
