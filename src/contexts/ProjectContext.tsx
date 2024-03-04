import { createContext, Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import { IModel } from '../models/IModel.ts';
import { ICurve } from '../models/IProject.ts';
import { useContextualSettings } from '../hooks/context/useContextualSettings.ts';
import { trackProperties } from '../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../utils/utils.tsx';

interface ProjectContext {
  id: number;
  curves: ICurve[];
  depth: number[];
  model: IModel;
  isCreating: boolean;
  createProject: (name: string) => Promise<number>;
  uploadLasFile: (formData: FormData) => void;
  getProject: (projectId: number) => Promise<number>;
  getCurvesNames: (projectId: number) => Promise<void>;
  buildModel: (projectId: number) => Promise<void>;
  getCurveData: (projectId: number, curveName: string, isCreateTrackProperties?: boolean) => Promise<void>;
  clearProjectContext: () => void;
  setDepth: Dispatch<SetStateAction<number[]>>;
}

export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const { tracksProperties, setTracksProperties, clearSettings } = useContextualSettings();
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<ICurve[]>([]);
  const [model, setModel] = useState<IModel>({} as IModel);
  const [depth, setDepth] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const createProject = async (name: string): Promise<number> => {
    try {
      setIsCreating(true);
      const response = await ProjectService.createProject(name);
      setId(response.data.id);
      if (response.data.curves) {
        setCurves(response.data.curves);
      }
      return response.data.id;
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
    return -1;
  };
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
  const getCurveData = useCallback(
    async (projectId: number, curveName: string, isCreateNewTrackProperties?: boolean) => {
      if (curves.find((curve) => curve.name === curveName)?.data) {
        if (curveName !== DEPTH && isCreateNewTrackProperties)
          setTracksProperties([...tracksProperties, trackProperties]);
        return;
      }
      try {
        const response = await ProjectService.getCurve(projectId, curveName);
        const updatedCurves = curves.map((curve) => {
          if (curve.name === curveName) return { name: curveName, data: response.data.curveData } as ICurve;
          return curve;
        });
        setCurves(updatedCurves);
        if (curveName !== DEPTH && isCreateNewTrackProperties)
          setTracksProperties([...tracksProperties, trackProperties]);
        else setDepth(response.data.curveData);
      } catch (e) {
        console.log(e);
      }
    },
    [curves, tracksProperties, setTracksProperties],
  );
  const clearProjectContext = useCallback(() => {
    setId(-1);
    setCurves([]);
    setDepth([]);
    setModel({} as IModel);
    clearSettings();
  }, [clearSettings]);
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
        getCurvesNames(projectId);
        const response = await ProjectService.getProject(projectId);
        setId(response.data.id);
        if (response.data.curves) {
          setCurves(response.data.curves);
        }
        return response.data.id;
      } catch (e) {
        console.log(e);
      }
      return -1;
    },
    [getCurvesNames],
  );

  const buildModel = useCallback(async (projectId: number) => {
    try {
      const response = await ProjectService.buildModel(projectId);
      setModel(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const value = useMemo(
    () => ({
      id,
      curves,
      model,
      depth,
      isCreating,
      createProject,
      uploadLasFile,
      getCurvesNames,
      getProject,
      buildModel,
      clearProjectContext,
      setDepth,
      getCurveData,
    }),
    [
      id,
      curves,
      model,
      depth,
      isCreating,
      buildModel,
      getCurvesNames,
      getProject,
      getCurveData,
      uploadLasFile,
      clearProjectContext,
    ],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
