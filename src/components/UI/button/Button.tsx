import {FCC} from "@components/types/types.tsx";
import styles from './Button.module.css'
import React from "react";
import classNames from "classnames";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className: string;
}

const Button: FCC<ButtonProps> = ({children, onClick, className}) => {
    return (
        <button onClick={onClick}
            className={classNames(styles.button, className)}>
            {children}
        </button>
    );
};

export default Button;