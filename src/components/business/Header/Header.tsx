import { FC } from 'react';
import styles from './Header.module.css';
import MultipleSelect from '@components/business/MultipleSelect/MultipleSelect.tsx';
import Link from '@components/business/Link/Link.tsx';
import classNames from 'classnames';
const Header: FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.box}>
        <Link to={'/'} className={styles.link}>
          Проект
        </Link>
        <MultipleSelect className={styles.item} />
        <Link to={'/'} className={classNames(styles.link, styles.item)}>
          История
        </Link>
        <Link to={'/'} className={classNames(styles.link, styles.item)}>
          Справка
        </Link>
        <div className={classNames(styles.item, styles.profile)}>
          <span className={styles.img} />
          Анна Воронова
        </div>
      </div>
    </header>
  );
};

export default Header;
