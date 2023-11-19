import {FC} from "react";
import styles from './Login.module.css'
import LoginForm from "@components/business/LoginForm/LoginForm.tsx";

const Login: FC = () => {
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