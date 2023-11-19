import {FC, useContext} from "react";
import styles from './Login.module.css'
import LoginForm from "@components/business/LoginForm/LoginForm.tsx";
import {Context} from "../../main.tsx";
import {useNavigate} from "react-router-dom";

const Login: FC = () => {
    const {store} = useContext(Context);
    const navigation = useNavigate();
    if (store.isAuth) {
        navigation('/geonavigation')
    }
    return (
        <main className={styles.page}>
            <section className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Рады видеть!</h1>
                    <LoginForm />
                </div>
            </section>
            <div className={styles.image} />
        </main>
    );
};

export default Login;