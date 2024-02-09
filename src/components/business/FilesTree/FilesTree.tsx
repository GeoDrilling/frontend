import { DragEvent, FC, useEffect, useRef } from 'react';
import styles from './FilesTree.module.css';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';

const FilesTree: FC = () => {
  const { curves } = useProjectContext();
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize, curves]);
  //if (curves.length <= 0) return <div className={styles.container} />;
  const dragStart = (event: DragEvent, curveName: string) => {
    event.dataTransfer.setData('text/plain', curveName);
  };
  return (
    <div className={styles.container} ref={scrollRef}>
      <ul className={styles.filesTree}>
        <li>
          <div className={styles.centredBox}>
            <span className={styles.rig} />
            <span className={styles.text}>Rig</span>
          </div>
          {
            <ul className={styles.nested}>
              {curves.map((curve) => (
                <li key={curve.name}>
                  <div className={styles.centredBox}>
                    <div onDragStart={(e) => dragStart(e, curve.name)} draggable={true} className={styles.drag}>
                      <span className={styles.dataset} />
                      <span className={styles.text}>{curve.name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          }
        </li>
      </ul>
    </div>
  );
};

export default FilesTree;
