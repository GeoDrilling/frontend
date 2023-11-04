import Button from "@components/UI/button/Button.tsx";
import {FC} from "react";
import Link from "@components/Link/Link.tsx";
import styles from './RegisterForm.module.css'
import classNames from "classnames";
import {useInput} from "../hooks/useInput.tsx";
import Fieldset from "@components/UI/fieldset/Fieldset.tsx";
import {validateEmail} from "@components/utils/utils.tsx";


const RegisterForm: FC = () => {
    const name = useInput('',
        [
            {predicate: value => value.trim() === '', message: 'Имя не должно быть пустым'},
            {predicate: value => value.trim().length < 2, message: 'Имя должно быть длинее 2 символов'}
        ])
    const password = useInput('',
        [
            {predicate: value => value.trim() === '', message: 'Пароль не должен быть пустым'},
            {predicate: value => value.trim().length < 5, message: 'Пароль должен быть длинее 5 символов'}
        ])
    const email = useInput('',
        [
            {predicate: validateEmail, message: 'Некорректный email'}
        ])
    name.input.label = 'Имя'
    password.input.label = 'Пароль'
    password.input.type = 'password'
    email.input.label = 'Почта'
    return (
        <form>
            <Fieldset inputs={[name, password, email]}/>
            <Button onClick={(e) => e.preventDefault()}>
                Зарегистрироваться</Button>
            <footer className={styles.bottom__text__container}>
                <div className={styles.text}>Уже зарегестрированы?</div>
                <Link to={'/login'} className={classNames(styles.text, styles.link)}>Войти</Link>
            </footer>
        </form>
    );
};

export default RegisterForm;