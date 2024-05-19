import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import { ICurve, IMultiCurve, IProjectState } from '../models/IProject.ts';
import { useContextualSettings } from '../hooks/context/useContextualSettings.ts';
import { groupsCurveProperties, trackProperties } from '../utils/ContextualSettingsConstatns.ts';
import { DEPTH, TVD } from '../utils/utils.tsx';
import { useUploadContext } from '../hooks/context/useUploadContext.ts';
import { useModel } from '../hooks/context/useModel.ts';
import { useGradientContext } from '../hooks/context/useGradientContext.ts';

interface ProjectContext {
  id: number;
  curves: ICurve[];
  depth: number[];
  isCreating: boolean;
  createProject: (name: string) => Promise<number>;
  uploadLasFile: (formData: FormData) => void;
  uploadSupplementFile: (formData: FormData) => Promise<number | undefined>;
  getProject: (projectId: number) => Promise<number>;
  getCurvesNames: (projectId: number) => Promise<void>;
  getCurveData: (
    projectId: number,
    curveName: string,
    isCreateTrackProperties?: boolean,
  ) => Promise<number[] | undefined | void>;
  clearProjectContext: () => void;
  setDepth: Dispatch<SetStateAction<number[]>>;
  saveProjectState: () => void;
  updateCurves: (curves: ICurve[]) => void;
  tvdName: string;
  setTvdName: (name: string) => void;
  multiCurves: IMultiCurve[];
}

export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const {
    tracksProperties,
    tabletProperties,
    setTracksProperties,
    setTableProperties,
    clearSettings,
    depthTrackProperties,
    setDepthTrackProperties,
    modelCurveProperties,
    setModelCurveProperties,
  } = useContextualSettings();
  const { setGradient, gradient } = useGradientContext();
  const { setVisible } = useUploadContext();
  const { setModels, models, clearModelsState } = useModel();
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<ICurve[]>([]);
  const [depth, setDepth] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [tvdName, _setTvdName] = useState('');
  const [multiCurves, setMulticurves] = useState<IMultiCurve[]>([]);

  const updateCurves = useCallback(
    (curves: ICurve[]) => {
      setCurves((prev) => {
        const newCurves = [...prev];
        curves.forEach((curve) => {
          const tryFind = prev.find(
            (prevCurve) => curve.name === prevCurve.name || curve.name.substring(1) === prevCurve.name,
          );
          if (tryFind) {
            tryFind.data = curve.data;
          } else {
            if (curve.name[0] === '/') newCurves.push({ ...curve, name: curve.name.substring(1) });
            else newCurves.push(curve);
          }
        });
        return newCurves;
      });
    },
    [setCurves],
  );
  const getPlainCurve = useCallback(
    async (
      projectId: number,
      curveName: string,
      isCreateNewTrackProperties?: boolean,
    ): Promise<number[] | undefined> => {
      try {
        const response = await ProjectService.getCurve(projectId, curveName);
        setCurves((prev) => {
          return prev.map((curve) => {
            if (curve.name === curveName) return { name: curveName, data: response.data.curveData } as ICurve;
            if (curve.name === curveName.substring(1))
              return { name: curveName.substring(1), data: response.data.curveData } as ICurve;
            return curve;
          });
        });
        if (curveName !== DEPTH) {
          if (isCreateNewTrackProperties)
            setTracksProperties([
              ...tracksProperties,
              { ...trackProperties, curves: [{ name: curveName, properties: groupsCurveProperties }] },
            ]);
        } else {
          setDepth(response.data.curveData);
        }
        return response.data.curveData;
      } catch (e) {
        console.log(e);
      }
    },
    [tracksProperties, setTracksProperties],
  );
  const getMultiCurve = useCallback(
    async (projectId: number, curveName: string, isCreateNewTrackProperties?: boolean) => {
      try {
        const response = await ProjectService.getMultiCurve(projectId, curveName);
        console.log(response);
        setMulticurves((prev) => {
          if (prev.filter((mc) => mc.name === curveName).length > 0)
            return prev.map((mc) => {
              if (mc.name === curveName) return { ...mc, multiCurve: response.data };
              return mc;
            });
          console.log('no curve with the same name');
          console.log({ name: curveName, multiCurve: response.data });
          return [...prev, { name: curveName, multiCurve: response.data }];
        });
        if (isCreateNewTrackProperties)
          setTracksProperties([
            ...tracksProperties,
            { ...trackProperties, curves: [{ name: curveName, properties: groupsCurveProperties }] },
          ]);
      } catch (e) {
        console.log(e);
      }
    },
    [setMulticurves, setTracksProperties, tracksProperties],
  );

  const getCurveData = useCallback(
    async (
      projectId: number,
      curveName: string,
      isCreateNewTrackProperties?: boolean,
    ): Promise<number[] | undefined | void> => {
      /*const data = curves.find((curve) => curve.name === curveName)?.data;
      if (data && data.length > 0) {
        if (curveName !== DEPTH && isCreateNewTrackProperties)
          setTracksProperties([
            ...tracksProperties,
            { ...trackProperties, curves: [{ name: curveName, properties: groupsCurveProperties }] },
          ]);
        return data;
      }*/
      if (curveName.startsWith('/multicurve')) {
        return getMultiCurve(projectId, curveName, isCreateNewTrackProperties);
      } else {
        return getPlainCurve(projectId, curveName, isCreateNewTrackProperties);
      }
    },
    [getMultiCurve, getPlainCurve],
  );
  const setTvdName = useCallback(
    (name: string) => {
      _setTvdName(name);
      getCurveData(id, name, false);
    },
    [_setTvdName, getCurveData, id],
  );
  //находит кривые, которых ещё не было
  const filterOldCurves = useCallback((curvesNames: string[], curves: ICurve[]) => {
    return curvesNames
      .filter((name) => !curves.find((curveWithData) => curveWithData.name === name))
      .map((name) => {
        return { name: name, data: [] } as ICurve;
      });
  }, []);
  const parseState = useCallback(
    (state: IProjectState) => {
      setId(state.id);
      if (state.curvesNames) {
        setCurves((curves) => [...curves, ...filterOldCurves(state.curvesNames, curves)]);
      }

      if (state.trackProperties) setTracksProperties(state.trackProperties);
      if (state.depthTrackProperties) setDepthTrackProperties(state.depthTrackProperties);
      if (state.modelCurveProperties) {
        setModelCurveProperties(state.modelCurveProperties);

        if (state.modelCurveProperties.gradient && state.modelCurveProperties.gradient.length > 1) {
          setGradient(state.modelCurveProperties.gradient);
        } else {
          setGradient([
            { value: 'rgba(251,187,59,1)', position: 0 },
            { value: 'rgba(241,80,37,1)', position: 100 },
          ]);
        }
      }

      if (state.tabletProperties) setTableProperties(state.tabletProperties);
      if (state.modelDTOList) setModels(state.modelDTOList);
    },
    [
      setId,
      setCurves,
      setTracksProperties,
      setTableProperties,
      setModels,
      setDepthTrackProperties,
      setModelCurveProperties,
      filterOldCurves,
      setGradient,
    ],
  );
  const createProject = useCallback(
    async (name: string): Promise<number> => {
      try {
        setIsCreating(true);
        const response = await ProjectService.createProject(name);
        parseState(response.data);
        return response.data.id;
      } catch (e) {
        console.log(e);
      } finally {
        setIsCreating(false);
      }
      return -1;
    },
    [parseState, setIsCreating],
  );
  const uploadSupplementFile = useCallback(
    async (formData: FormData): Promise<number | undefined> => {
      try {
        const response = await ProjectService.uploadSupplementFile(formData);
        setCurves([]);
        parseState(response.data);
        return response.data.id;
      } catch (e) {
        console.log(e);
      }
    },
    [setCurves, parseState],
  );
  const uploadLasFile = useCallback(
    async (formData: FormData) => {
      try {
        const response = await ProjectService.uploadFile(formData);

        setCurves((curves) => {
          const responseCurves = filterOldCurves(response.data.curvesNames, curves);
          if (responseCurves.map((c) => c.name).includes(DEPTH)) getCurveData(id, DEPTH);
          if (responseCurves.map((c) => c.name).includes(TVD)) getCurveData(id, TVD);
          return curves.concat(responseCurves);
        });
      } catch (e) {
        console.log(e);
      }
    },
    [id, getCurveData, filterOldCurves],
  );
  const clearProjectContext = useCallback(() => {
    setId(-1);
    setCurves([]);
    setDepth([]);
    setVisible(false);
    clearSettings();
    clearModelsState();
  }, [clearSettings, setVisible, clearModelsState]);
  const getCurvesNames = useCallback(
    async (projectId: number) => {
      try {
        const response = await ProjectService.getCurves(projectId);
        setCurves((curves) => curves.concat(filterOldCurves(response.data.curvesNames, curves)));
      } catch (e) {
        console.log(e);
      }
    },
    [filterOldCurves],
  );
  const getProject = useCallback(
    async (projectId: number): Promise<number> => {
      try {
        const response = await ProjectService.getProjectState(projectId);
        parseState(response.data);
        return response.data.id;
      } catch (e) {
        console.log(e);
      }
      return -1;
    },
    [parseState],
  );

  const saveProjectState = useCallback(async () => {
    try {
      const state: IProjectState = {
        id,
        tabletProperties,
        trackProperties: tracksProperties,
        curvesNames: curves.map((c) => c.name),
        modelDTOList: models,
        depthTrackProperties,
        modelCurveProperties: {
          properties: modelCurveProperties.properties,
          gradient: gradient,
        },
      };
      await ProjectService.saveProjectState(state);
    } catch (e) {
      console.log(e);
    }
  }, [id, tabletProperties, tracksProperties, curves, models, depthTrackProperties, modelCurveProperties, gradient]);

  const value = useMemo(
    () => ({
      id,
      curves,
      depth,
      isCreating,
      createProject,
      uploadLasFile,
      getCurvesNames,
      getProject,
      clearProjectContext,
      setDepth,
      getCurveData,
      saveProjectState,
      updateCurves,
      tvdName,
      setTvdName,
      multiCurves,
      uploadSupplementFile,
    }),
    [
      id,
      curves,
      depth,
      isCreating,
      getCurvesNames,
      getProject,
      getCurveData,
      uploadLasFile,
      clearProjectContext,
      saveProjectState,
      createProject,
      updateCurves,
      tvdName,
      setTvdName,
      multiCurves,
      uploadSupplementFile,
    ],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
