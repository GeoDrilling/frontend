import { FC, useRef, useState } from 'react';
import styles from './MultipleSelect.module.css';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
interface MultipleSelectProps {
  className?: string;
}
const MultipleSelect: FC<MultipleSelectProps> = ({ className }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const {
    isExplorer,
    isAreaEquivalence,
    isTablet,
    isSettings,
    isModel,
    toggleExplorer,
    toggleAreaEquivalence,
    toggleTablet,
    toggleSettings,
    toggleModel,
  } = useWindows();

  const showSelect = () => {
    if (listRef.current) {
      listRef.current.focus();
    }
    setIsShow(true);
  };
  const hideSelect = () => {
    setIsShow(false);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.selectBtn} onClick={showSelect} tabIndex={0}>
        Окна
      </div>
      <ul className={isShow ? styles.listItems : styles.none} tabIndex={0} onBlur={hideSelect} ref={listRef}>
        <li className={styles.item} onClick={toggleExplorer}>
          <span className={styles.itemText}>Браузер проекта</span>
          <span className={isExplorer ? styles.checkbox : styles.empty} />
        </li>
        <li className={styles.item} onClick={toggleTablet}>
          <span className={styles.itemText}>Рабочая область</span>
          <span className={isTablet ? styles.checkbox : styles.empty} />
        </li>
        <li className={styles.item} onClick={toggleModel}>
          <span className={styles.itemText}>Модели</span>
          <span className={isModel ? styles.checkbox : styles.empty} />
        </li>
        <li className={styles.item} onClick={toggleSettings}>
          <span className={styles.itemText}>Свойства</span>
          <span className={isSettings ? styles.checkbox : styles.empty} />
        </li>
        <li className={styles.item} onClick={toggleAreaEquivalence}>
          <span className={styles.itemText}>Области эквивалентности</span>
          <span className={isAreaEquivalence ? styles.checkbox : styles.empty} />
        </li>
      </ul>
    </div>
  );
};

export default MultipleSelect;
