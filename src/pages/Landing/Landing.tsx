import { FC } from 'react';

import Link from '@components/business/Link/Link';

import styles from './Landing.module.css';

const Landing: FC = () => {
  return (
    <div className={styles.page}>
      <main>
        <h1 className={styles.title}>Главная страница</h1>
        <Link className={styles.link} to='/register'>
          Регистрация &#8594;
        </Link>
      </main>
    </div>
  );
};

export default Landing;
