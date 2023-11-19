import {FC, useContext} from 'react';

import styles from './Register.module.css';
import RegisterForm from "@components/business/RegisterForm/RegisterForm.tsx";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";

const Register: FC = () => {
    const {store} = useContext(Context);
    const navigation = useNavigate();
    if (store.isAuth) {
        navigation('/geonavigation')
    }
    return (
        <main className={styles.page}>
            <section>
                <div className={styles.content}>
                    <h1 className={styles.title}>Добро пожаловать!</h1>
                    <RegisterForm/>
                </div>
            </section>
        </main>
    );
};

export default Register;
