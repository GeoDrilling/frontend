import React from 'react';
import './Header.css'; // This is where you would style your component.

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                GEODRILLING
            </div>
            <nav className="navigation">
                <a href="/about">О нас</a>
                <a href="/data">Данные</a>
                <a href="/charts">Графики</a>
                <a href="/models">Модели</a>
            </nav>
            <a className="login-button" href="/login">Войти</a>
        </header>
    );
};

export default Header;
