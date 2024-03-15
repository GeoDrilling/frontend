import { FC } from 'react';
import styles from './Header.module.css';
import MultipleSelect from '@components/business/MultipleSelect/MultipleSelect.tsx';
import Link from '@components/business/Link/Link.tsx';
import classNames from 'classnames';
import Button from '@components/UI/Button/Button.tsx';
import { useAuthContext } from '../../../hooks/context/useAuth.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useParams } from 'react-router-dom';

interface HeaderProps {
  isFrozenProjects?: boolean;
}
const Header: FC<HeaderProps> = ({ isFrozenProjects }) => {
  const { logout } = useAuthContext();
  const { clearProjectContext } = useProjectContext();
  const params = useParams();
  let projectId = '';
  if (isFrozenProjects && params.id) projectId = '/' + params.id;
  return (
    <header className={styles.container}>
      <div className={styles.box}>
        <div onClick={clearProjectContext}>
          <Link to={'/projects' + projectId} className={styles.link}>
            {isFrozenProjects ? 'Проект' : 'Список проектов'}
          </Link>
        </div>
        {!isFrozenProjects && <MultipleSelect className={styles.item} />}
        {!isFrozenProjects && (
          <Link to={`/projects/${params.id}/frozen`} className={classNames(styles.link, styles.item)}>
            История
          </Link>
        )}
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
