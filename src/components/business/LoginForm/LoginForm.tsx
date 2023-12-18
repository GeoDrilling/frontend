import { FC } from 'react';
import Fieldset from '@components/UI/Fieldset/Fieldset.tsx';
import { useInput } from '../../../hooks/useInput.tsx';
import Checkbox from '@components/UI/Checkbox/Checkbox.tsx';
import Link from '@components/business/Link/Link.tsx';
import styles from './LoginForm.module.css';
import Button from '@components/UI/Button/Button.tsx';
import { useCheckbox } from '../../../hooks/useCheckbox.tsx';
import { useAuthContext } from '../../../hooks/context/useAuth.ts';
import Cleaner from '../../../utils/Cleaner.tsx';

const LoginForm: FC = () => {
  const [isRemember, onChange] = useCheckbox(false);
  const email = useInput('');
  const password = useInput('');
  const { login, authError, setAuthError } = useAuthContext();

  email.input.label = 'Почта';
  email.input.placeholder = 'test@mail.com';
  password.input.label = 'Пароль';
  password.input.type = 'password';
  password.input.placeholder = 'password';

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(email.input.value, password.input.value, isRemember);
        }}
      >
        <Fieldset inputs={[email, password]} />
        <div className={styles.container}>
          <Checkbox checked={isRemember} onChange={onChange} label='Запомнить' className={styles.checkbox} />
          <Link to={'/reset'} className={styles.link}>
            Забыли пароль?
          </Link>
        </div>
        <p className={styles.tip}>{authError}</p>
        <Cleaner clean={[setAuthError]}>
          <Button className={styles.submit}>Войти</Button>
        </Cleaner>
      </form>
      <footer className={styles.footer}>
        <p className={styles.question}>Ещё не зарегистрированы?</p>
        <Cleaner clean={[setAuthError]}>
          <Link to={'/register'} className={styles.link}>
            Регистрация
          </Link>
        </Cleaner>
      </footer>
    </div>
  );
};

export default LoginForm;
