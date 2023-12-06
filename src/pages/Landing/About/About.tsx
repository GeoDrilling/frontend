import React from 'react';
import styles from '@pages/Landing/About/About.module.css';

const About: React.FC = () => {
  return (
    <article className={styles.containerAbout}>
      <div className={styles.titleBoxAbout}>
        <h2 className={styles.titleAbout}>о нас</h2>
      </div>
      <div className={styles.textBoxAbout}>
        <p className={styles.textAbout}>
          GEODRILLING - это уникальная образовательная платформа для повышения квалификации студентов и сотрудников в
          области геонавигации.
        </p>
        <p className={styles.textAbout}>
          Мы разработали красивый и понятный интерфейс, чтобы вы с интересом изучали основы интерпретации данных при
          бурении скважин.
        </p>
        <p className={styles.textAbout}>
          Загружайте файлы, стройте графики, корректируйте траекторию бурения, подбирайте двухслойные модели - решайте
          любые геонавигационные задачи и развивайтесь вместе с нами!
        </p>
      </div>
    </article>
  );
};

export default About;
