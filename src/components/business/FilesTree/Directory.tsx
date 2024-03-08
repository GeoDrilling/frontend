import { FC } from 'react';
import styles from '@components/business/FilesTree/FilesTree.module.css';
import Curve from '@components/business/FilesTree/Curve.tsx';
import classNames from 'classnames';

interface ElementInExplorer {
  isFile: boolean;
}
export interface IDirectory extends ElementInExplorer {
  name: string;
  files: ElementInExplorer[];
  isFile: false;
}

export interface IFile extends ElementInExplorer {
  name: string;
  isFile: true;
}

function isFile(file: ElementInExplorer): file is IFile {
  return file.isFile;
}
interface DirectoryProps {
  dir: IDirectory;
  prefix: string;
}

const Directory: FC<DirectoryProps> = ({ dir, prefix }) => {
  if (dir.name === '')
    return (
      <ul className={styles.filesTree}>
        <li>
          <details className={classNames(styles.details, styles.root)}>
            <summary className={styles.summary}>
              <div className={styles.centredBox}>
                <span className={styles.rig} />
                <span className={styles.text}>Rig</span>
              </div>
            </summary>
            <ul className={styles.nested}>
              {dir.files.map((file) => {
                if (isFile(file)) return <Curve key={file.name} file={file} prefix={prefix} />;
                return <Directory key={(file as IDirectory).name} dir={file as IDirectory} prefix={prefix} />;
              })}
            </ul>
          </details>
        </li>
      </ul>
    );

  return (
    <li>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <div className={styles.centredBox}>
            <span className={styles.dir} />
            <span className={styles.text}>{dir.name}</span>
          </div>
        </summary>
        <ul className={styles.nested}>
          {dir.files.map((file) => {
            if (isFile(file)) return <Curve key={file.name} file={file} prefix={prefix + '/' + dir.name} />;
            return (
              <Directory key={(file as IDirectory).name} dir={file as IDirectory} prefix={prefix + '/' + dir.name} />
            );
          })}
        </ul>
      </details>
    </li>
  );
};

export default Directory;
