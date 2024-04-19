import { DragEvent, FC } from 'react';
import styles from '@components/business/FilesTree/FilesTree.module.css';
import { IFile } from '@components/business/FilesTree/Directory.tsx';
import classNames from 'classnames';
interface CurveProps {
  file: IFile;
  prefix: string;
}
const Curve: FC<CurveProps> = ({ file, prefix }) => {
  const dragStart = (event: DragEvent, curveName: string) => {
    event.dataTransfer.setData('text/plain', curveName);
  };
  return (
    <li key={prefix + file.name}>
      <div className={classNames(styles.centredBox, styles.margin)}>
        <div
          onDragStart={(e) => (prefix === '' ? dragStart(e, file.name) : dragStart(e, prefix + '/' + file.name))}
          draggable={true}
          className={styles.drag}
        >
          <span className={styles.dataset} />
          <span className={styles.text}>{file.name}</span>
        </div>
      </div>
    </li>
  );
};

export default Curve;
