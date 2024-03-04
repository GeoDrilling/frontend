import { FC, useState } from 'react';
import styles from './Models.module.css';
import ListModels from '@components/business/Models/ListModels/ListModels.tsx';
import EditingModel from '@components/business/Models/EditingModel/EditingModel.tsx';
import DepthRange from '@components/business/Models/DepthRange/DepthRange.tsx';
import { model, suffixes } from '@components/business/Models/ModelConstants.ts';
import StartModel from '@components/business/Models/StartModel/StartModel.tsx';
import ParametersRange from '@components/business/Models/ParametersRange/ParametersRange.tsx';
import LoadingModel from '@components/business/Models/LoadingModel/LoadingModel.tsx';

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
  const toParametersRange = () => {
    setWindows({ ...defaultWindows(), isParametersRange: true });
  };
  const toLoading = () => {
    setWindows({ ...defaultWindows(), isLoading: true });
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
      {windows.isStartParameters ? (
        <StartModel
          model={model}
          getStartModel={() => model}
          toList={toListModels}
          toParametersRange={toParametersRange}
        />
      ) : undefined}
      {windows.isParametersRange ? (
        <ParametersRange
          toBack={toChoosingParameters}
          parameters={model.map((m, idx) => {
            return { name: suffixes[idx] ? m.name + ', ' + suffixes[idx] : m.name, max: 2000, min: 0 };
          })}
          onChange={() => {}}
          toLoading={toLoading}
        />
      ) : undefined}
      {windows.isLoading ? <LoadingModel toStartParameters={toChoosingParameters} /> : undefined}
    </div>
  );
};

export default Models;
