import React, { ReactElement, useEffect, useState } from 'react';
import styles from './HeaderLanding.module.css';

interface ChildComponentProps {
  onButtonClick: (refName: string) => void;
}
const HeaderLanding: React.FC<ChildComponentProps> = ({ onButtonClick }): ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = isScrolled
    ? `${styles.header} ${styles.headerScrolled}`
    : `${styles.header} ${styles.headerNormal}`;
  const buttonClass = isScrolled ? `${styles.button} ${styles.buttonScrolled}` : styles.button;
  const logoClass = isScrolled ? `${styles.logo} ${styles.logoScrolled}` : styles.logo;
  const loginClass = isScrolled ? `${styles.loginButton} ${styles.loginButtonScrolled}` : styles.loginButton;

  return (
    <header className={headerClass}>
      <div className={logoClass}>GEODRILLING</div>
      <nav className={styles.navigation}>
        <button className={buttonClass} onClick={() => onButtonClick('ref1')}>
          О нас
        </button>
        <button className={buttonClass} onClick={() => onButtonClick('ref2')}>
          Данные
        </button>
        <button className={buttonClass} onClick={() => onButtonClick('ref3')}>
          Графики
        </button>
        <button className={buttonClass} onClick={() => onButtonClick('ref4')}>
          Модели
        </button>
      </nav>
      <a className={loginClass} href='/login'>
        Войти
      </a>
    </header>
  );
};

export default HeaderLanding;
