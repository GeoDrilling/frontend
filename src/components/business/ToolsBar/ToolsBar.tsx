import { ChangeEvent, FC } from 'react';
import styles from './ToolsBar.module.css';
import classNames from 'classnames';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import { trackProperties } from '../../../utils/ContextualSettingsConstatns.ts';

const ToolsBar: FC = () => {
  const { id, uploadLasFile, saveProjectState } = useProjectContext();
  const { tracksProperties, setTracksProperties } = useContextualSettings();
  const { setVisible } = useUploadContext();
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      formData.append('project_id', id.toString());
      loadFile(formData);
    }
  };
  const loadFile = async (formData: FormData) => {
    await uploadLasFile(formData);
    setVisible(true);
  };
  const createTrackProps = () => {
    setTracksProperties([...tracksProperties, { ...trackProperties, curves: [] }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.centredBox}>
        <label className={classNames(styles.load, styles.item)}>
          <input type='file' onChange={onChangeFile} className={styles.input} accept='.las, .csv' />
        </label>
        <span className={classNames(styles.download, styles.item)} onClick={saveProjectState} />
        <span className={styles.separator} />
        <span className={classNames(styles.createFolder, styles.item)} />
        <span className={classNames(styles.createDataset, styles.item)} />
        <span className={classNames(styles.createRig, styles.item)} onClick={createTrackProps} />
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
