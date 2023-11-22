import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className='containerAbout'>
      <div className='titleBoxAbout'>
        <h2 className='titleAbout'>О НАС</h2>
      </div>
      <div className='textBoxAbout'>
        <p className='textAbout'>
          GEODRILLING - это уникальная образовательная платформа для повышения квалификации студентов и сотрудников в
          области геонавигации.
        </p>
        <p className='textAbout'>
          Мы разработали красивый и понятный интерфейс, чтобы вы с интересом изучали основы интерпретации данных при
          бурении скважин.
        </p>
        <p className='textAbout'>
          Загружайте файлы, стройте графики, корректируйте траекторию бурения, подбирайте двухслойные модели - решайте
          любые геонавигационные задачи и развивайтесь вместе с нами!
        </p>
      </div>
    </div>
  );
};

export default About;
