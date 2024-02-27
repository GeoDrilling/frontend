import { Dispatch, FC, SetStateAction } from 'react';
import styles from './SortSettings.module.css';
import OutlinedButton from '@components/UI/OutlinedButton/OutlinedButton.tsx';

interface SortSettingsProps {
  byName: boolean;
  setByName: Dispatch<SetStateAction<boolean>>;
  isAscending: boolean;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
}
const SortSettings: FC<SortSettingsProps> = ({ byName, setByName, isAscending, setIsAscending }) => {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.text}>Упорядочить по</p>
        <div className={styles.buttonContainer}>
          <OutlinedButton className={styles.button} isSelected={byName} onClick={() => setByName(true)}>
            Названию
          </OutlinedButton>
          <OutlinedButton isSelected={!byName} onClick={() => setByName(false)}>
            Глубине
          </OutlinedButton>
        </div>
      </div>
      <div className={styles.secondBlock}>
        <p className={styles.text}>Расположить в порядке</p>
        <div className={styles.buttonContainer}>
          <OutlinedButton className={styles.button} isSelected={isAscending} onClick={() => setIsAscending(true)}>
            Возрастания
          </OutlinedButton>
          <OutlinedButton isSelected={!isAscending} onClick={() => setIsAscending(false)}>
            Убывания
          </OutlinedButton>
        </div>
      </div>
    </div>
  );
};

export default SortSettings;
