import { FC } from 'react';
import styles from './Login.module.css';
import LoginForm from '@components/LoginForm.tsx';

const Login: FC = () => {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <div>
          <h1 className={styles.title}>Рады видеть!</h1>
          <LoginForm />
        </div>
      </section>
      <div className={styles.image} />
    </main>
  );
};

export default Login;
