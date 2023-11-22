import React, { ReactElement, useEffect, useState } from 'react';
import './Header.css';

interface ChildComponentProps {
  onButtonClick: (refName: string) => void;
}
const Header: React.FC<ChildComponentProps> = ({ onButtonClick }): ReactElement => {
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

  const headerClass = isScrolled ? 'header headerScrolled' : 'header headerNormal';
  const buttonClass = isScrolled ? 'button buttonScrolled' : 'button';
  const logoClass = isScrolled ? 'logo logoScrolled' : 'logo';
  const loginClass = isScrolled ? 'login-button login-buttonScrolled' : 'login-button';

  return (
    <header className={headerClass}>
      <div className={logoClass}>GEODRILLING</div>
      <nav className='navigation'>
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

export default Header;
