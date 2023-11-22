import React from 'react';
import './Slide.css';
type MyComponentProps = {
  title: string;
  text: string;
  imageUrl: string;
};

const Slide: React.FC<MyComponentProps> = ({ title, text, imageUrl }) => {
  return (
    <div className='container'>
      <h1 className='title'>{title}</h1>
      <p className='text'>{text}</p>
      <img src={imageUrl} alt='' />
    </div>
  );
};

export default Slide;
