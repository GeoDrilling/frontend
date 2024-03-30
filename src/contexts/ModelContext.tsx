import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { IModelParameter, IModelParams, ParameterRange, RangeParameters } from '../models/IModel.ts';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import { ALPHA, KANISOTROPY_DOWN, KANISOTROPY_UP, RO_DOWN, RO_UP, TVD_START } from '../utils/CurveMappingConst.ts';
import { model, suffixes } from '@components/business/Models/ModelConstants.ts';

interface ModelContext {
  models: IModelParams[];
  buildModel: (
    projectId: number,
    start: number,
    end: number,
    model: IModelParams,
    range: RangeParameters,
  ) => Promise<void>;
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
  parameters: ParameterRange[];
  setParameters: Dispatch<SetStateAction<ParameterRange[]>>;
  parametersToRange: (params: ParameterRange[]) => RangeParameters;
}

export const ModelContext = createContext<ModelContext>({} as ModelContext);

export const ModelProvider: FCC = ({ children }) => {
  const [models, setModels] = useState<IModelParams[]>([]);
  const [currentId, setCurrentId] = useState<number>(-1);
  const [isMapped, setIsMapped] = useState<boolean>(false);
  const [newModel, setNewModel] = useState<IModelParams>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  const [parameters, setParameters] = useState<ParameterRange[]>(
    model.map((m, idx) => {
      return { name: suffixes[idx] ? m.name + ', ' + suffixes[idx] : m.name, max: undefined, min: undefined };
    }),
  );

  const buildModel = useCallback(
    async (projectId: number, start: number, end: number, model: IModelParams, range: RangeParameters) => {
      try {
        setIsLoading(true);
        console.log('start building');
        const response = await ProjectService.buildModel(projectId, start, end, model, range);
        console.log(response);
        setNewModel(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );
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
  const parametersToRange = useCallback((params: ParameterRange[]): RangeParameters => {
    let result = {} as RangeParameters;
    params.forEach((p) => {
      if (p.name === RO_UP + ', ' + suffixes[0]) result = { ...result, min_ro_up: p.min, max_ro_up: p.max };
      if (p.name === RO_DOWN + ', ' + suffixes[1]) result = { ...result, min_ro_down: p.min, max_ro_down: p.max };
      if (p.name === KANISOTROPY_UP) result = { ...result, min_kanisotropy_up: p.min, max_kanisotropy_up: p.max };
      if (p.name === KANISOTROPY_DOWN) result = { ...result, min_kanisotropy_down: p.min, max_kanisotropy_dow: p.max };
      if (p.name === ALPHA + ', ' + suffixes[4]) result = { ...result, min_alpha: p.min, max_alpha: p.max };
      if (p.name === TVD_START + ', ' + suffixes[5]) result = { ...result, min_tvd_start: p.min, max_tvd_start: p.max };
    });
    return result;
  }, []);
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
      parameters,
      setParameters,
      parametersToRange,
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
      parameters,
      setParameters,
      parametersToRange,
    ],
  );
  return <ModelContext.Provider value={value}>{children}</ModelContext.Provider>;
};
