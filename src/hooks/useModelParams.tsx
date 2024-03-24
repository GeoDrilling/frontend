import { useEffect, useState } from 'react';
import { IModelParameter } from '../models/IModel.ts';
import { useModel } from './context/useModel.ts';

export const useModelParams = () => {
  const { models, currentId, modelToModelParams } = useModel();
  const [modelParams, setModelParams] = useState<IModelParameter[]>([]);
  useEffect(() => {
    if (currentId !== -1 && models.length > 0) {
      setModelParams(modelToModelParams(models[currentId]));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models, currentId]);
  return modelParams;
};
export const useNewModelParams = () => {
  const { newModel, modelToModelParams } = useModel();
  const [modelParams, setModelParams] = useState<IModelParameter[]>([]);
  useEffect(() => {
    if (newModel) setModelParams(modelToModelParams(newModel));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newModel]);
  return modelParams;
};
