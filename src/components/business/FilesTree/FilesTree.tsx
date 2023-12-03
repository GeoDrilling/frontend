import { FC, useEffect, useRef } from 'react';
import styles from './FilesTree.module.css';
import { useOverlayScrollbars } from 'overlayscrollbars-react';

const FilesTree: FC = () => {
  const curves = {
    curvesNames: ['GR', 'ROP', 'RACHX', 'RPCHX', '1', '2', '3', '4', '5'],
  };
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize]);
  return (
    <div className={styles.container} ref={scrollRef}>
      <ul className={styles.filesTree}>
        <li>
          <div className={styles.centredBox}>
            <span className={styles.rig} />
            <span className={styles.text}>Rig</span>
          </div>
          <ul className={styles.nested}>
            {curves.curvesNames.map((curveName) => (
              <li key={curveName}>
                <div className={styles.centredBox}>
                  <span className={styles.dataset} />
                  <span className={styles.text}>{curveName}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default FilesTree;
