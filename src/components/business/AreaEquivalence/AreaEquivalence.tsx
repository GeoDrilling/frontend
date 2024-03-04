import { FC } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useScroll } from '../../../hooks/useScroll.tsx';

interface AreaEquivalenceProps {
  className?: string;
}

const AreaEquivalence: FC<AreaEquivalenceProps> = ({ className }) => {
  const { toggleAreaEquivalence } = useWindows();
  const scrollRef = useScroll();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader
        image={'/src/assets/images/icon_area_eq.svg'}
        title={'Модели'}
        closeWindow={toggleAreaEquivalence}
      />
      <div ref={scrollRef}>
        <div className={styles.test}>
          <div className={styles.imagBox}>
            <span className={styles.area_eq} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaEquivalence;
