import {FCC} from "@components/types/types.tsx";
import styles from './Button.module.css'
import React from "react";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FCC<ButtonProps> = ({children, onClick}) => {
    return (
        <button onClick={onClick}
            className={styles.button}>
            {children}
        </button>
    );
};

export default Button;