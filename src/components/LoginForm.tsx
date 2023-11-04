import {FC} from 'react';
import Fieldset from "@components/UI/fieldset/Fieldset.tsx";
import {useInput} from "../hooks/useInput.tsx";
import Checkbox from "@components/UI/input/Checkbox.tsx";
import Link from "@components/Link/Link.tsx";
import styles from './LoginForm.module.css'
import Button from "@components/UI/button/Button.tsx";
import {useCheckbox} from "../hooks/useCheckbox.tsx";

const LoginForm: FC = () => {
    const [isRemember, onChange] = useCheckbox(false)
    const name = useInput('')
    const password = useInput('')
    name.input.label = 'Имя'
    password.input.label = 'Пароль'
    password.input.type = 'password'
    return (
        <form>
            <Fieldset inputs={[name, password]} />
            <div className={styles.container__bottom__text}>
                <Checkbox
                    checked={isRemember}
                    onChange={onChange}
                    label='Запомнить'
                    className={styles.checkbox}/>
                <Link to={'/reset'}>Забыли пароль?</Link>
            </div>
            <Button onClick={(e) => e.preventDefault()}>
                Войти</Button>
            <footer className={styles.footer}>
                <div >Ещё не зарегистрированы?</div>
                <Link to={'/register'} >Регистрация</Link>
            </footer>
        </form>
    );
};

export default LoginForm;