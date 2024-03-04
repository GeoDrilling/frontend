import { FC, useState } from 'react';
import styles from './Models.module.css';
import ListModels from '@components/business/Models/ListModels/ListModels.tsx';
import { IModelParameter } from '../../../models/IModel.ts';
import EditingModel from '@components/business/Models/EditingModel/EditingModel.tsx';

interface IWindows {
  isList: boolean;
  isEditing: boolean;
  isDepthRange: boolean;
  isStart: boolean;
  isParametersRange: boolean;
  isLoading: boolean;
}

const Models: FC = () => {
  const defaultWindows = (): IWindows => {
    return {
      isList: false,
      isEditing: false,
      isDepthRange: false,
      isStart: false,
      isParametersRange: false,
      isLoading: false,
    };
  };

  const [windows, setWindows] = useState<IWindows>({ ...defaultWindows(), isList: true });
  const [editId, setEditId] = useState(-1);
  const model: IModelParameter[] = [
    { name: 'УЭС пласта', value: 123 },
    { name: 'УЭС вмещающего пласта', value: 123 },
    { name: 'Анизотропия пласта', value: 123 },
    { name: 'Анизотропия вмещающего пласта', value: 123 },
    { name: 'Угол наклона границы', value: 123 },
    { name: 'Граница', value: 123 },
  ];
  const toEditing = (id: number) => {
    setWindows({ ...defaultWindows(), isEditing: true });
    setEditId(id);
  };
  const toListModels = () => {
    setWindows({ ...defaultWindows(), isList: true });
  };
  return (
    <div className={styles.container}>
      {windows.isList ? <ListModels model={model} onValueClick={toEditing} /> : undefined}
      {windows.isEditing ? <EditingModel model={model} startId={editId} onComplete={toListModels} /> : undefined}
    </div>
  );
};

export default Models;
