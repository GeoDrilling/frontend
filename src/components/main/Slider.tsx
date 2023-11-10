import React, { useState } from 'react';
import DotNavigation from "@components/main/DotNavigation.tsx";

type BackgroundData = {
    imageUrl: string;
    text: string;
};

const backgrounds: BackgroundData[] = [
    {
        imageUrl: 'src/images/background1.png',
        text: 'Текст для первого изображения',
    },
    {
        imageUrl: 'src/images/background2.png',
        text: 'Текст для второго изображения',
    },
    {
        imageUrl: 'src/images/background3.png',
        text: 'Текст для 3 изображения',
    },
];

const Slider: React.FC = () => {
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    const changeBackground = (a : number) => {
        setCurrentBackgroundIndex(a % backgrounds.length);
    };

    const currentBackground = backgrounds[currentBackgroundIndex];

    return (
        <div
            style={{
                margin: 0,
                width: '100vw', // Замените '100vh' на '100vw' для ширины
                height: '100vh', // Замените '100vh' на '100vh' для высоты
                backgroundImage: `url(${currentBackground.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center', // Чтобы изображение было выровнено по центру
                display: 'flex', // Замените 'inline-flex' на 'flex' для блочного элемента
                alignItems: 'center', // Чтобы текст и кнопки были по вертикали по центру
                justifyContent: 'center', // Чтобы текст и кнопки были по горизонтали по центру
                flexDirection: 'column', // Чтобы элементы располагались вертикально
                color: '#fff', // Установите цвет текста на белый
            }}
        >
            <h1 className="slider-text">{currentBackground.text}</h1>
            <DotNavigation count={3} onDotClick={changeBackground} />
        </div>
    );
};

export default Slider;
