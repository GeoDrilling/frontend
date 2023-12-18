import { FC } from 'react';
import Link from '@components/business/Link/Link.tsx';
import styles from './RegisterForm.module.css';
import { useInput } from '../../../hooks/useInput.tsx';
import Fieldset from '@components/UI/Fieldset/Fieldset.tsx';
import { validateEmail } from '../../../utils/utils.tsx';
import { useValidation } from '../../../hooks/useValidation.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useAuthContext } from '../../../hooks/context/useAuth.ts';
import Cleaner from '../../../utils/Cleaner.tsx';

const RegisterForm: FC = () => {
  const name = useInput('');
  name.validations.push(
    useValidation(name.input.value, {
      predicate: (value) => value.trim().length < 2,
      message: 'Имя должно быть длинее 2 символов',
    }),
  );
  const password = useInput('');
  password.validations.push(
    useValidation(password.input.value, {
      predicate: (value) => value.trim().length < 4,
      message: 'Пароль должен быть длинее 5 символов',
    }),
  );

  const email = useInput('');
  email.validations.push(useValidation(email.input.value, { predicate: validateEmail, message: 'Некорректный email' }));

  name.input.label = 'Имя';
  name.input.placeholder = 'username';
  password.input.label = 'Пароль';
  password.input.type = 'password';
  password.input.placeholder = 'password';
  email.input.label = 'Почта';
  email.input.placeholder = 'test@mail.com';

  const { registration, regError, setRegError } = useAuthContext();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registration(name.input.value, email.input.value, password.input.value);
        }}
      >
        <Fieldset inputs={[name, email, password]} />
        <p className={styles.tip}>{regError}</p>
        <Cleaner clean={[setRegError]}>
          <Button className={styles.submit}>Зарегистрироваться</Button>
        </Cleaner>
      </form>
      <footer className={styles.footer}>
        <div className={styles.text}>Уже зарегистрированы?</div>
        <Cleaner clean={[setRegError]}>
          <Link to={'/login'} className={styles.link}>
            Войти
          </Link>
        </Cleaner>
      </footer>
    </div>
  );
};
export default RegisterForm;
