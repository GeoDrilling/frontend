import { FC, useState } from 'react';
import styles from './Models.module.css';
import ListModels from '@components/business/Models/ListModels/ListModels.tsx';
import EditingModel from '@components/business/Models/EditingModel/EditingModel.tsx';
import DepthRange from '@components/business/Models/DepthRange/DepthRange.tsx';
import { model } from '@components/business/Models/ModelConstants.ts';

interface IWindows {
  isList: boolean;
  isEditing: boolean;
  isDepthRange: boolean;
  isStartParameters: boolean;
  isParametersRange: boolean;
  isLoading: boolean;
}

const Models: FC = () => {
  const defaultWindows = (): IWindows => {
    return {
      isList: false,
      isEditing: false,
      isDepthRange: false,
      isStartParameters: false,
      isParametersRange: false,
      isLoading: false,
    };
  };

  const [windows, setWindows] = useState<IWindows>({ ...defaultWindows(), isList: true });
  const [editId, setEditId] = useState(-1);

  const toEditing = (id: number) => {
    setWindows({ ...defaultWindows(), isEditing: true });
    setEditId(id);
  };
  const toListModels = () => {
    setWindows({ ...defaultWindows(), isList: true });
  };
  const toDepthRange = () => {
    setWindows({ ...defaultWindows(), isDepthRange: true });
  };
  const toChoosingParameters = () => {
    setWindows({ ...defaultWindows(), isStartParameters: true });
  };
  return (
    <div className={styles.container}>
      {windows.isList ? (
        <ListModels
          model={model}
          onValueClick={toEditing}
          toNewModel={toDepthRange}
          toChoosingParameters={toChoosingParameters}
        />
      ) : undefined}
      {windows.isEditing ? <EditingModel model={model} startId={editId} onComplete={toListModels} /> : undefined}
      {windows.isDepthRange ? (
        <DepthRange
          startValue={3200}
          endValue={3500}
          onChangeEndValue={() => {}}
          onChangeStartValue={() => {}}
          toBack={toListModels}
          toChoosingStart={toChoosingParameters}
        />
      ) : undefined}
    </div>
  );
};

export default Models;
