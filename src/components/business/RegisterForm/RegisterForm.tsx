import {FC, useContext} from "react";
import Link from "@components/business/Link/Link.tsx";
import styles from './RegisterForm.module.css'
import classNames from "classnames";
import {useInput} from "../../../hooks/useInput.tsx";
import Fieldset from "@components/UI/fieldset/Fieldset.tsx";
import {validateEmail} from "../../../utils/utils.tsx";
import {useValidation} from "../../../hooks/useValidation.tsx";
import Button from "@components/UI/button/Button.tsx";
import {Context} from "../../../main.tsx";


const RegisterForm: FC = () => {
    const name = useInput('');
    name.validations.push(useValidation(name.input.value,
        {predicate: value => value.trim().length < 2, message: 'Имя должно быть длинее 2 символов'}));
    const password = useInput('');
    password.validations.push(useValidation(password.input.value,
        {predicate: (value) => value.trim().length < 4, message: 'Пароль должен быть длинее 5 символов'}))

    const email = useInput('');
    email.validations.push(useValidation(email.input.value,
        {predicate: validateEmail, message: 'Некорректный email'}))

    name.input.label = 'Имя'
    password.input.label = 'Пароль'
    password.input.type = 'password'
    email.input.label = 'Почта'

    const {store} = useContext(Context)
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            store.registration(name.input.value,
                email.input.value, password.input.value)
        }}>
            <Fieldset inputs={[name, email, password]}/>
            <Button className={styles.submit}>
                Зарегистрироваться</Button>
            <footer className={styles.footer}>
                <div className={styles.text}>Уже зарегистрированы?</div>
                <Link to={'/login'} className={classNames(styles.text, styles.link)}>Войти</Link>
            </footer>
        </form>
    );
};
export default RegisterForm;