import React, { useEffect, useRef, useState } from 'react';
import DotNavigation from '@components/business/Slider/DotNavigation.tsx';
import styles from './Slider.module.css';
type BackgroundData = {
  imageUrl: string;
  text: string;
  text2: string;
};

const backgrounds: BackgroundData[] = [
  {
    imageUrl: 'src/assets/images/background1.png',
    text: 'Обучайтесь.',
    text2: 'Вместе с нами вы станете экспертами в области геонавигации.',
  },
  {
    imageUrl: 'src/assets/images/background2.png',
    text: 'Исследуйте.',
    text2: 'Стройте и анализируйте графики, чтобы лучше понимать процесс бурения.',
  },
  {
    imageUrl: 'src/assets/images/background3.png',
    text: 'Моделируйте.',
    text2: 'Наша библиотека поможет вам рассчитать целевые функции на любой указанной сетке. ',
  },
];

const Slider: React.FC = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Использование useRef для хранения таймера

  const resetAndStartTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000);
  };

  useEffect(() => {
    resetAndStartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const changeBackground = (index: number) => {
    setCurrentBackgroundIndex(index);
    resetAndStartTimer();
  };

  const currentBackground = backgrounds[currentBackgroundIndex];

  return (
    <div className={styles.sliderContainer} style={{ backgroundImage: `url(${currentBackground.imageUrl})` }}>
      <h1 className={styles.sliderText}>{currentBackground.text}</h1>
      <h1 className={styles.sliderText2}>{currentBackground.text2}</h1>
      <DotNavigation count={backgrounds.length} activeIndex={currentBackgroundIndex} onDotClick={changeBackground} />
    </div>
  );
};

export default Slider;
