import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import { ICurve, IProjectState } from '../models/IProject.ts';
import { useContextualSettings } from '../hooks/context/useContextualSettings.ts';
import { groupsCurveProperties, trackProperties } from '../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../utils/utils.tsx';
import { useUploadContext } from '../hooks/context/useUploadContext.ts';
import { useModel } from '../hooks/context/useModel.ts';

interface ProjectContext {
  id: number;
  curves: ICurve[];
  depth: number[];
  isCreating: boolean;
  createProject: (name: string) => Promise<number>;
  uploadLasFile: (formData: FormData) => void;
  getProject: (projectId: number) => Promise<number>;
  getCurvesNames: (projectId: number) => Promise<void>;
  getCurveData: (projectId: number, curveName: string, isCreateTrackProperties?: boolean) => Promise<void>;
  clearProjectContext: () => void;
  setDepth: Dispatch<SetStateAction<number[]>>;
  saveProjectState: () => void;
}

export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const { tracksProperties, tabletProperties, setTracksProperties, setTableProperties, clearSettings } =
    useContextualSettings();
  const { setVisible } = useUploadContext();
  const { getModels } = useModel();
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<ICurve[]>([]);
  const [depth, setDepth] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const getCurveData = useCallback(
    async (projectId: number, curveName: string, isCreateNewTrackProperties?: boolean) => {
      const data = curves.find((curve) => curve.name === curveName)?.data;
      if (data && data.length > 0) {
        if (curveName !== DEPTH && isCreateNewTrackProperties)
          setTracksProperties([
            ...tracksProperties,
            { ...trackProperties, curves: [{ name: curveName, properties: groupsCurveProperties }] },
          ]);
        return;
      }
      try {
        const response = await ProjectService.getCurve(projectId, curveName);
        const updatedCurves = curves.map((curve) => {
          if (curve.name === curveName) return { name: curveName, data: response.data.curveData } as ICurve;
          return curve;
        });
        setCurves(updatedCurves);
        if (curveName !== DEPTH) {
          if (isCreateNewTrackProperties)
            setTracksProperties([
              ...tracksProperties,
              { ...trackProperties, curves: [{ name: curveName, properties: groupsCurveProperties }] },
            ]);
        } else setDepth(response.data.curveData);
      } catch (e) {
        console.log(e);
      }
    },
    [curves, tracksProperties, setTracksProperties],
  );

  const parseState = useCallback(
    (state: IProjectState) => {
      setId(state.id);
      if (state.curvesNames) {
        setCurves(
          state.curvesNames.map((name) => {
            return { name: name, data: [] } as ICurve;
          }),
        );
      }
      if (state.trackProperties) setTracksProperties(state.trackProperties);
      if (state.tabletProperties) setTableProperties(state.tabletProperties);
    },
    [setId, setCurves, setTracksProperties, setTableProperties],
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
  const uploadLasFile = useCallback(
    async (formData: FormData) => {
      try {
        const response = await ProjectService.uploadFile(formData);
        const currentCurvesNames = curves.map((curve) => curve.name);
        const responseCurves = response.data.curvesNames
          .filter((name) => !currentCurvesNames.includes(name))
          .map((name) => ({ name })) as ICurve[];
        setCurves(curves.concat(responseCurves));
      } catch (e) {
        console.log(e);
      }
    },
    [curves],
  );
  const clearProjectContext = useCallback(() => {
    setId(-1);
    setCurves([]);
    setDepth([]);
    setVisible(false);
    clearSettings();
  }, [clearSettings, setVisible]);
  const getCurvesNames = useCallback(async (projectId: number) => {
    try {
      const response = await ProjectService.getCurves(projectId);
      const responseCurves = response.data.curvesNames.map((name) => ({ name })) as ICurve[];
      setCurves(responseCurves);
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getProject = useCallback(
    async (projectId: number): Promise<number> => {
      try {
        getModels(projectId);
        const response = await ProjectService.getProjectState(projectId);
        parseState(response.data);
        return response.data.id;
      } catch (e) {
        console.log(e);
      }
      return -1;
    },
    [parseState, getModels],
  );

  const saveProjectState = useCallback(async () => {
    try {
      const state: IProjectState = {
        id,
        tabletProperties,
        trackProperties: tracksProperties,
        curvesNames: curves.map((c) => c.name),
      };
      await ProjectService.saveProjectState(state);
    } catch (e) {
      console.log(e);
    }
  }, [id, tabletProperties, tracksProperties, curves]);

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
    ],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
