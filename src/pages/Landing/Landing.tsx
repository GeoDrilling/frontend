import { FC } from 'react';



import styles from './Landing.module.css';
import Slider from "@components/main/Slider.tsx";
import Header from "@components/main/Header.tsx";


const Landing: FC = () => {
  return (
    <div className={styles.page}>
      <main>
          <Header/>
          <Slider/>
      </main>
    </div>
  );
};

export default Landing;
