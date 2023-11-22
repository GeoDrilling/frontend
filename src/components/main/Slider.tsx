import React, { useState } from 'react';
import DotNavigation from '@components/main/DotNavigation.tsx';
import './Slider.css';
type BackgroundData = {
  imageUrl: string;
  text: string;
  text2: string;
};

const backgrounds: BackgroundData[] = [
  {
    imageUrl: 'src/images/background1.png',
    text: 'Обучайтесь.',
    text2: 'Вместе с нами вы станете экспертами в области геонавигации.',
  },
  {
    imageUrl: 'src/images/background2.png',
    text: 'Исследуйте.',
    text2: 'Стройте и анализируйте графики, чтобы лучше понимать процесс бурения.',
  },
  {
    imageUrl: 'src/images/background3.png',
    text: 'Моделируйте.',
    text2: 'Наша библиотека поможет вам рассчитать целевые функции на любой указанной сетке. ',
  },
];

const Slider: React.FC = () => {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const changeBackground = (a: number) => {
    setCurrentBackgroundIndex(a % backgrounds.length);
  };

  const currentBackground = backgrounds[currentBackgroundIndex];

  return (
    <div
      style={{
        position: 'relative',
        marginTop: '-60px',
        height: '100vh',
        backgroundImage: `url(${currentBackground.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 className='slider-text'>{currentBackground.text}</h1>
      <h1 className='slider-text2'>{currentBackground.text2}</h1>
      <DotNavigation count={3} onDotClick={changeBackground} />
    </div>
  );
};

export default Slider;
