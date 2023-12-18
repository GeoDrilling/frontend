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
  if (curves.length <= 0) return <div className={styles.container} />;

  const dragStart = (event: React.DragEvent, curveName: string) => {
    event.dataTransfer.setData("text/plain", curveName);
  };

  const dragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.target);

  };

  return (
    <div className={styles.container} ref={scrollRef}>
      <ul className={styles.filesTree}>
        <li>
          <div className={styles.centredBox}>
            <span className={styles.rig} />
            <span className={styles.text}>Rig</span>
          </div>
          <ul className={styles.nested}>
            {curves.map((curveName) => (
              <li key={curveName}>
                <div className={styles.centredBox}>
                  <div
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onDragStart={(e) => dragStart(e, curveName)}
                    onDragOver={(e) => dragOver(e)}
                    draggable={true}
                    className={styles.drag}
                  >
                    <span className={styles.dataset} />
                    <span className={styles.text}>{curveName}</span>
                  </div>
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
