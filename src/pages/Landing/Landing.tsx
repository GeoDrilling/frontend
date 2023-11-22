import { FC, useRef } from 'react';

import styles from './Landing.module.css';

import Slide from '@components/main/Slide.tsx';
import Slider from '@components/main/Slider.tsx';
import Header from '@components/main/Header.tsx';
import Data from '@components/main/Data.tsx';
import About from '@components/main/About.tsx';
import Footer from '@components/main/Footer.tsx';

const Landing: FC = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const scrollToRef = (refName: string) => {
    const refMap: { [key: string]: React.RefObject<HTMLDivElement> } = {
      ref1: ref1,
      ref2: ref2,
      ref3: ref3,
      ref4: ref4,
    };

    const ref = refMap[refName];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.page}>
      <main>
        <Header onButtonClick={scrollToRef} />
        <Slider />
        <div ref={ref1}>
          <About />
        </div>
        <div ref={ref2}>
          <Data
            imageUrl='src/images/hardhat.png'
            text='Наш сайт поддерживает файлы формата LAS и предлагает инструменты
для обработки различных каротажных данных.'
            title='ДАННЫЕ'
            reverse={false}
          />
        </div>
        <div ref={ref3}>
          <Slide
            title='ГРАФИКИ'
            text='Мы поможем построить, а вы сможете их настроить. И цвет, и шкалу, и сетку.'
            imageUrl='src/images/image1.png'
          />
        </div>
        <div ref={ref4}>
          <Slide
            title='МОДЕЛИ'
            text='C помощью библиотеки Picasso наш сайт поможет вам подобрать оптимальную двухслойную модель и стать ближе к пониманию строения скважины.'
            imageUrl='src/images/areas.png'
          />
        </div>
        <div>
          <Data
            imageUrl='src/images/earth.png'
            text='Тогда присоединяйтесь к нам! Это точно бесплатно.'
            title='ГОТОВЫ НАЧАТЬ ОБУЧЕНИЕ?'
            reverse={true}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
};
export default Landing;
