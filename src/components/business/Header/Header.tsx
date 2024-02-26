import { FC } from 'react';
import styles from './Header.module.css';
import MultipleSelect from '@components/business/MultipleSelect/MultipleSelect.tsx';
import Link from '@components/business/Link/Link.tsx';
import classNames from 'classnames';
import Button from '@components/UI/Button/Button.tsx';
import { useAuthContext } from '../../../hooks/context/useAuth.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useParams } from 'react-router-dom';
const Header: FC = () => {
  const { logout } = useAuthContext();
  const { clearProjectContext } = useProjectContext();
  const params = useParams();
  return (
    <header className={styles.container}>
      <div className={styles.box}>
        <div onClick={clearProjectContext}>
          <Link to={'/projects'} className={styles.link}>
            Список проектов
          </Link>
        </div>
        <MultipleSelect className={styles.item} />
        <Link to={`/projects/${params.id}/frozen`} className={classNames(styles.link, styles.item)}>
          История
        </Link>
        <Link to={'/'} className={classNames(styles.link, styles.item)}>
          Справка
        </Link>
        <div className={styles.item} />
        <div className={classNames(styles.item, styles.profile)}>
          <span className={styles.img} />
          Efim
        </div>
        <Button className={styles.logout} onClick={logout}>
          Выйти
        </Button>
      </div>
    </header>
  );
};

export default Header;
