import React from 'react';
import styles from './Footer.module.css'; // Импортируем CSS модуль

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Почта</p>
        <a href='mailto:example@g.nsu.ru' className={styles.link}>
          example@g.nsu.ru
        </a>
      </div>
      <div>
        <p>Новости</p>
        <div className={styles.socialIcons}>
          <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
            <img src='src/images/icon/Y.png' alt='YouTube' className={styles.socialIcon} />
          </a>
          <a href='https://t.me' target='_blank' rel='noopener noreferrer'>
            <img src='src/images/icon/T.png' alt='Telegram' className={styles.socialIcon} />
          </a>
          <a href='https://ru-ru.facebook.com/' target='_blank' rel='noopener noreferrer'>
            <img src='src/images/icon/F.png' alt='Facebook' className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
