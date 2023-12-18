import styles from './WindowHeader.module.css';
import { FC } from 'react';

interface WindowHeaderProps {
  image: string;
  title: string;
  closeWindow: () => void;
}
const WindowHeader: FC<WindowHeaderProps> = ({ image, title, closeWindow }) => {
  return (
    <div className={styles.container}>
      <img src={image} alt='' className={styles.icon} />
      <div className={styles.box}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.exit} onClick={closeWindow} />
    </div>
  );
};

export default WindowHeader;
