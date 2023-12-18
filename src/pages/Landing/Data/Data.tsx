import React from 'react';
import styles from '@pages/Landing/Data/Data.module.css';

interface MyComponentProps {
  title: string;
  imageUrl: string;
  text: string;
  reverse?: boolean;
}

const Data: React.FC<MyComponentProps> = ({ title, imageUrl, text, reverse }) => {
  return (
    <article>
      <h2 className={styles.title}>{title}</h2>
      <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
        <img src={imageUrl} alt='Display' className={styles.image} />
        <div className={styles.textBox}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </article>
  );
};

export default Data;
