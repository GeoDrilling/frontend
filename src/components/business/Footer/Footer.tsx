import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Почта</p>

        <li>
          <a href='mailto:example@g.nsu.ru' className={styles.link}>
            example@g.nsu.ru
          </a>
        </li>
      </div>
      <nav>
        <p className={styles.new}>Новости</p>
        <ul className={styles.socialIcons}>
          <li>
            {' '}
            <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
              <img src='/src/images/icon/Y.png' alt='YouTube' className={styles.socialIcon} />
            </a>
          </li>
          <li>
            {' '}
            <a href='https://t.me' target='_blank' rel='noopener noreferrer'>
              <img src='/src/images/icon/T.png' alt='Telegram' className={styles.socialIcon} />
            </a>
          </li>
          <li>
            <a href='https://ru-ru.facebook.com/' target='_blank' rel='noopener noreferrer'>
              <img src='/src/images/icon/F.png' alt='Facebook' className={styles.socialIcon} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
