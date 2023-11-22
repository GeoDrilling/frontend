import React, { useState } from 'react';
import './DotNavigation.css';

interface DotNavigationProps {
  count: number;
  onDotClick: (index: number) => void;
}

const DotNavigation: React.FC<DotNavigationProps> = ({ count, onDotClick }) => {
  const [activeDot, setActiveDot] = useState<number>(0);

  const handleDotClick = (index: number) => {
    setActiveDot(index);
    onDotClick(index);
  };

  return (
    <div className='dot-navigation'>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`dot-button ${activeDot === index ? 'active' : ''}`}
          onClick={() => handleDotClick(index)}
        />
      ))}
    </div>
  );
};

export default DotNavigation;
