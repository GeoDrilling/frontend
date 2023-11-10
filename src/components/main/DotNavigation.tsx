// DotNavigation.tsx
import React from 'react';
import './DotNavigation.css';

interface DotNavigationProps {
    count: number; // Количество точек
    onDotClick: (index: number) => void; // Функция для обработки клика по точке
}

const DotNavigation: React.FC<DotNavigationProps> = ({ count, onDotClick }) => {
    return (
        <div className="dot-navigation">
            {Array.from({ length: count }, (_, index) => (
                <button
                    key={index}
                    className="dot-button"
                    onClick={() => onDotClick(index)}
                />
            ))}
        </div>
    );
};

export default DotNavigation;
