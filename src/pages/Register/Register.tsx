import { FC } from 'react';

import styles from './Register.module.css';
import RegisterForm from "@components/RegisterForm.tsx";

const Register: FC = () => {
  return (
    <main className={styles.page}>
      <section>
        <h1 className={styles.title}>Добро пожаловать!</h1>
          <RegisterForm />
      </section>
    </main>
  );
};

export default Register;
