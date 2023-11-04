import {FC} from "react";
import styles from './Login.module.css'

const Login: FC = () => {
    return (
        <main className={styles.page}>
            <div style={{border: '1px solid red'}}>
                <h1>Login</h1>
            </div>
            <div>
                <h1>Image</h1>
            </div>
        </main>
    );
};

export default Login;