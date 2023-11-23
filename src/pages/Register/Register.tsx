import { FC } from 'react';

import styles from './Register.module.css';
import RegisterForm from '@components/business/RegisterForm/RegisterForm.tsx';

const Register: FC = () => {
  return (
    <main className={styles.page}>
      <section>
        <div className={styles.content}>
          <h1 className={styles.title}>Добро пожаловать!</h1>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
};

export default Register;
