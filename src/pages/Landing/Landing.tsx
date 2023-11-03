import { FC } from 'react';

import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing: FC = () => {
  return (
    <div className={styles.page}>
      <main>
        <h1 className={styles.title}>Главная страница</h1>
        <Link className={styles.link} to="/login">
          Регистрация &#8594;
        </Link>
      </main>
    </div>
  );
};

export default Landing;
