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
  createProject: () => void;
  uploadLasFile: (formData: FormData) => void;
  getProject: (projectId: number) => Promise<number>;
  getCurvesNames: (projectId: number) => Promise<void>;
  buildModel: (projectId: number) => Promise<void>;
  getCurveData: (projectId: number, curveName: string) => Promise<void>;
  clearProjectContext: () => void;
  setDepth: Dispatch<SetStateAction<number[]>>;
  setCurves: Dispatch<SetStateAction<ICurve[]>>;
}

export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const { tracksProperties, setTracksProperties } = useContextualSettings();
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<ICurve[]>([]);
  const [model, setModel] = useState<IModel>({} as IModel);
  const [depth, setDepth] = useState<number[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const createProject = async () => {
    try {
      setIsCreating(true);
      const response = await ProjectService.createProject();
      setId(response.data.id);
      if (response.data.curves) setCurves(response.data.curves.map((curve) => ({ name: curve.name })));
    } catch (e) {
      console.log(e);
    } finally {
      setIsCreating(false);
    }
  };
  const uploadLasFile = async (formData: FormData) => {
    try {
      const response = await ProjectService.uploadFile(formData);
      const responseCurves = response.data.curvesNames.map((name) => ({ name })) as ICurve[];
      setCurves(responseCurves);
    } catch (e) {
      console.log(e);
    }
  };
  const getCurveData = useCallback(
    async (projectId: number, curveName: string) => {
      if (curves.find((curve) => curve.name === curveName)?.data) return;
      try {
        const response = await ProjectService.getCurve(projectId, curveName);
        const updatedCurves = curves.map((curve) => {
          if (curve.name === curveName)
            return { name: curveName, data: JSON.parse(response.data.curveDataInJson) } as ICurve;
          return curve;
        });
        setCurves(updatedCurves);
        if (curveName !== DEPTH) setTracksProperties([...tracksProperties, trackProperties]);
        else setDepth(JSON.parse(response.data.curveDataInJson));
      } catch (e) {
        console.log(e);
      }
    },
    [curves, tracksProperties, setTracksProperties],
  );
  const clearProjectContext = () => {
    setId(-1);
    setCurves([]);
    setModel({} as IModel);
  };
  const getCurvesNames = useCallback(
    async (projectId: number) => {
      try {
        const response = await ProjectService.getCurves(projectId);
        const responseCurves = response.data.curvesNames.map((name) => ({ name })) as ICurve[];
        setCurves(responseCurves);
        if (response.data.curvesNames.includes('DEPT')) getCurveData(projectId, DEPTH);
      } catch (e) {
        console.log(e);
      }
    },
    [getCurveData],
  );
  const getProject = useCallback(
    async (projectId: number): Promise<number> => {
      try {
        getCurvesNames(projectId);
        const response = await ProjectService.getProject(projectId);
        setId(response.data.id);
        if (response.data.curves) setCurves(response.data.curves);
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
      setCurves,
      getCurveData,
    }),
    [id, curves, model, depth, isCreating, buildModel, getCurvesNames, getProject, getCurveData],
  );
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
