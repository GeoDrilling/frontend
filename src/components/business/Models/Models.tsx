import { FC, useEffect, useState } from 'react';
import styles from './Models.module.css';
import ListModels from '@components/business/Models/ListModels/ListModels.tsx';
import EditingModel from '@components/business/Models/EditingModel/EditingModel.tsx';
import DepthRange from '@components/business/Models/DepthRange/DepthRange.tsx';
import StartModel from '@components/business/Models/StartModel/StartModel.tsx';
import ParametersRange from '@components/business/Models/ParametersRange/ParametersRange.tsx';
import LoadingModel from '@components/business/Models/LoadingModel/LoadingModel.tsx';
import { useModel } from '../../../hooks/context/useModel.ts';

interface IWindows {
  isList: boolean;
  isEditing: boolean;
  isDepthRange: boolean;
  isStartParameters: boolean;
  isParametersRange: boolean;
  isLoading: boolean;
}
enum WindowsConstant {
  LIST,
  START_PARAMS,
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
  const [beforeLoading, setBeforeLoading] = useState<WindowsConstant>(WindowsConstant.LIST);
  const { isLoading } = useModel();

  useEffect(() => {
    if (isLoading) toLoading();
    else
      switch (beforeLoading) {
        case WindowsConstant.LIST: {
          toListModels();
          break;
        }
        case WindowsConstant.START_PARAMS: {
          toChoosingParameters();
          break;
        }
      }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  const toEditing = (id: number) => {
    setWindows({ ...defaultWindows(), isEditing: true });
    setEditId(id);
  };
  const toListModels = () => {
    setBeforeLoading(WindowsConstant.LIST);
    setWindows({ ...defaultWindows(), isList: true });
  };
  const toDepthRange = () => {
    setWindows({ ...defaultWindows(), isDepthRange: true });
  };
  const toChoosingParameters = () => {
    setBeforeLoading(WindowsConstant.START_PARAMS);
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
        <ListModels onValueClick={toEditing} toNewModel={toDepthRange} toChoosingParameters={toChoosingParameters} />
      ) : undefined}
      {windows.isEditing ? <EditingModel startId={editId} onComplete={toListModels} /> : undefined}
      {windows.isDepthRange ? <DepthRange toBack={toListModels} toChoosingStart={toChoosingParameters} /> : undefined}
      {windows.isStartParameters ? (
        <StartModel toList={toListModels} toParametersRange={toParametersRange} />
      ) : undefined}
      {windows.isParametersRange ? <ParametersRange toBack={toChoosingParameters} toLoading={toLoading} /> : undefined}
      {windows.isLoading ? <LoadingModel /> : undefined}
    </div>
  );
};

export default Models;
