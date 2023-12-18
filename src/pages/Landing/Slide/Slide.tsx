import React from 'react';
import styles from '@pages/Landing/Slide/Slide.module.css';
type MyComponentProps = {
  title: string;
  text: string;
  imageUrl: string;
};

const Slide: React.FC<MyComponentProps> = ({ title, text, imageUrl }) => {
  return (
    <article className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
      <img src={imageUrl} alt='' />
    </article>
  );
};

export default Slide;
