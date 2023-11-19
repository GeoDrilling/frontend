import {FC} from 'react';
import Fieldset from "@components/UI/fieldset/Fieldset.tsx";
import {useInput} from "../../../hooks/useInput.tsx";
import Checkbox from "@components/UI/input/Checkbox.tsx";
import Link from "@components/business/Link/Link.tsx";
import styles from './LoginForm.module.css'
import Button from "@components/UI/button/Button.tsx";
import {useCheckbox} from "../../../hooks/useCheckbox.tsx";
import {useAuthContext} from "../../../hooks/context/useAuth.ts";

const LoginForm: FC = () => {
    const [isRemember, onChange] = useCheckbox(false)
    const email = useInput('')
    const password = useInput('')
    const authContext = useAuthContext()
    email.input.label = 'Почта'
    email.input.placeholder = 'test@mail.com'
    password.input.label = 'Пароль'
    password.input.type = 'password'
    password.input.placeholder = 'password'
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            authContext.login(email.input.value, password.input.value, isRemember)
        }}>
            <Fieldset inputs={[email, password]} />
            <div className={styles.container}>
                <Checkbox
                    checked={isRemember}
                    onChange={onChange}
                    label='Запомнить'
                    className={styles.checkbox}/>
                <Link to={'/reset'} className={styles.link}>Забыли пароль?</Link>
            </div>
            <Button className={styles.submit}>Войти</Button>
            <footer className={styles.footer}>
                <p className={styles.question}>Ещё не зарегистрированы?</p>
                <Link to={'/register'} className={styles.link} >Регистрация</Link>
            </footer>
        </form>
    );
};

export default LoginForm;