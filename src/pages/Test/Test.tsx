import { FC } from 'react';
import styles from './Test.module.css';

const Test: FC = () => {
  return (
    <div className={styles.container} onClick={() => console.log('outer')}>
      <div
        className={styles.inside}
        onClick={(e) => {
          e.stopPropagation();
          console.log('inside');
        }}
      ></div>
      <svg height='210' width='400' xmlns='http://www.w3.org/2000/svg' style={{ margin: 2 }}>
        <path
          d='M0 0 L0 200 L200 200 L200 0 Z'
          style={{ fill: 'none', stroke: 'green', strokeWidth: 10 }}
          onClick={(e) => {
            e.stopPropagation();
            console.log('path');
          }}
        />
      </svg>
    </div>
  );
};

export default Test;
