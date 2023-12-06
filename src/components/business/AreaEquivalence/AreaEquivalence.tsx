import { FC, useEffect, useRef } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useOverlayScrollbars } from 'overlayscrollbars-react';

interface AreaEquivalenceProps {
  className?: string;
}

const AreaEquivalence: FC<AreaEquivalenceProps> = ({ className }) => {
  const { toggleAreaEquivalence } = useWindows();
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize]);
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
