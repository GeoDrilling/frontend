import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { IModelParameter, IModelParams } from '../models/IModel.ts';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import { ALPHA, KANISOTROPY_DOWN, KANISOTROPY_UP, RO_DOWN, RO_UP, TVD_START } from '../utils/CurveMappingConst.ts';

interface ModelContext {
  models: IModelParams[];
  buildModel: (projectId: number, start: number, end: number, model: IModelParams) => Promise<void>;
  getIsCurveMapped: (projectId: number) => Promise<void>;
  buildStartModel: (projectId: number, start: number, end: number) => Promise<IModelParams | null>;
  getModels: (projectId: number) => Promise<void>;
  saveModel: (projectId: number, start: number, end: number, model: IModelParams) => Promise<void>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  isMapped: boolean;
  modelToModelParams: (model: IModelParams) => IModelParameter[];
  modelParamToModel: (modelParams: IModelParameter[]) => IModelParams;
  newModel: IModelParams | undefined;
  setNewModel: Dispatch<SetStateAction<IModelParams | undefined>>;
  clearNewModel: () => void;
  isLoading: boolean;
  isLoadingImage: boolean;
  createAreaEq: (modelId: number, param1: string, param2: string, range: number) => Promise<string | undefined>;
}

export const ModelContext = createContext<ModelContext>({} as ModelContext);

export const ModelProvider: FCC = ({ children }) => {
  const [models, setModels] = useState<IModelParams[]>([]);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [isMapped, setIsMapped] = useState<boolean>(false);
  const [newModel, setNewModel] = useState<IModelParams>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  const buildModel = useCallback(async (projectId: number, start: number, end: number, model: IModelParams) => {
    try {
      setIsLoading(true);
      console.log('start building');
      const response = await ProjectService.buildModel(projectId, start, end, model);
      console.log(response);
      setNewModel(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getIsCurveMapped = useCallback(async (projectId: number): Promise<void> => {
    try {
      const response = await ProjectService.isCurveMapped(projectId);
      setIsMapped(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const buildStartModel = useCallback(
    async (projectId: number, start: number, end: number): Promise<IModelParams | null> => {
      try {
        setIsLoading(true);
        const response = await ProjectService.buildStartModel(projectId, start, end);
        return response.data;
      } catch (e) {
        console.log(e);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getModels = useCallback(async (projectId: number) => {
    try {
      const response = await ProjectService.getModels(projectId);
      setModels(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const saveModel = useCallback(async (projectId: number, start: number, end: number, model: IModelParams) => {
    try {
      await ProjectService.saveModel(projectId, start, end, model);
      setModels([model]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const modelToModelParams = useCallback((model: IModelParams): IModelParameter[] => {
    return [
      { name: RO_DOWN, value: model.roDown },
      { name: RO_UP, value: model.roUp },
      { name: KANISOTROPY_DOWN, value: model.kanisotropyDown },
      { name: KANISOTROPY_UP, value: model.kanisotropyUp },
      { name: ALPHA, value: model.alpha },
      { name: TVD_START, value: model.tvdStart },
    ];
  }, []);
  const modelParamToModel = useCallback(
    (modelParams: IModelParameter[]): IModelParams => {
      const roUp = modelParams.find((p) => p.name === RO_UP)!.value;
      const roDown = modelParams.find((p) => p.name === RO_DOWN)!.value;
      const kanisotropyUp = modelParams.find((p) => p.name === KANISOTROPY_UP)!.value;
      const kanisotropyDown = modelParams.find((p) => p.name === KANISOTROPY_DOWN)!.value;
      const alpha = modelParams.find((p) => p.name === ALPHA)!.value;
      const tvdStart = modelParams.find((p) => p.name === TVD_START)!.value;
      return {
        roUp,
        roDown,
        tvdStart,
        alpha,
        kanisotropyUp,
        kanisotropyDown,
        idModel: currentId,
        start: models[currentId].start,
        end: models[currentId].end,
      };
    },
    [currentId, models],
  );
  const clearNewModel = useCallback(() => {
    setNewModel(undefined);
  }, []);
  const createAreaEq = useCallback(async (modelId: number, param1: string, param2: string, range: number) => {
    try {
      setIsLoadingImage(true);
      const response = await ProjectService.createAreaEquivalence(modelId, param1, param2, range);
      return URL.createObjectURL(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingImage(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      models,
      buildModel,
      getIsCurveMapped,
      buildStartModel,
      getModels,
      saveModel,
      currentId,
      setCurrentId,
      isMapped,
      modelToModelParams,
      modelParamToModel,
      newModel,
      setNewModel,
      clearNewModel,
      isLoading,
      createAreaEq,
      isLoadingImage,
    }),
    [
      models,
      currentId,
      buildModel,
      buildStartModel,
      getModels,
      getIsCurveMapped,
      saveModel,
      isMapped,
      modelToModelParams,
      modelParamToModel,
      newModel,
      clearNewModel,
      isLoading,
      createAreaEq,
      isLoadingImage,
    ],
  );
  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
};
