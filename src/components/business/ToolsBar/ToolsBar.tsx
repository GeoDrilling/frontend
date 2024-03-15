import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './ToolsBar.module.css';
import classNames from 'classnames';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import DraggableModal from '@components/business/Tablet/DraggableModal.tsx';
import TmpModelParams from '@components/business/Tablet/TmpModelParams.tsx';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';

const ToolsBar: FC = () => {
  const { id, uploadLasFile, model, buildModel } = useProjectContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  useEffect(() => {
    if (model.outputModel) {
      setIsModalOpen(true);
    }
  }, [model]);

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
        <span className={classNames(styles.t4, styles.item)} onClick={() => buildModel(id)} />
        {isModalOpen && (
          <DraggableModal initialX={100} initialY={100} onClose={() => setIsModalOpen(false)}>
            <TmpModelParams model={model} />
          </DraggableModal>
        )}
      </div>
    </div>
  );
};

export default ToolsBar;
