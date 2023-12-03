import { ChangeEvent, FC } from 'react';
import styles from './ToolsBar.module.css';
import classNames from 'classnames';

const ToolsBar: FC = () => {
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.centredBox}>
        <label className={classNames(styles.load, styles.item)}>
          <input type='file' onChange={onChangeFile} className={styles.input} accept='.las, .csv' />
        </label>
        <span className={classNames(styles.download, styles.item)} />
        <span className={styles.separator} />
        <span className={classNames(styles.createFolder, styles.item)} />
        <span className={classNames(styles.createDataset, styles.item)} />
        <span className={classNames(styles.createRig, styles.item)} />
        <span className={styles.separator} />
        <span className={classNames(styles.t1, styles.item)} />
        <span className={classNames(styles.t2, styles.item)} />
        <span className={classNames(styles.t3, styles.item)} />
        <span className={classNames(styles.t4, styles.item)} />
      </div>
    </div>
  );
};

export default ToolsBar;
