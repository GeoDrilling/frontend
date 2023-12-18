import { createContext, useState } from 'react';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';
import {IModel} from "../models/IModel.ts";

interface ProjectContext {
  id: number;
  curves: string[];
  model: IModel;
  createProject: () => void;
  uploadLasFile: (formData: FormData) => void;
  getProject: (projectId: number) => Promise<number>;
  getCurves: (projectId: number) => Promise<void>;
  buildModel: () => Promise<void>;
}
export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<string[]>([]);
  const [model, setModel] = useState<IModel>({} as IModel)
  const createProject = async () => {
    try {
      const response = await ProjectService.createProject();
      setId(response.data.id);
      if (response.data.curves)
        setCurves(response.data.curves.map((curve) => curve.name));
    } catch (e) {
      console.log(e);
    }
  };
  const uploadLasFile = async (formData: FormData) => {
    try {
      const response = await ProjectService.uploadFile(formData);
      setCurves(response.data.curvesNames);
    } catch (e) {
      console.log(e);
    }
  };

  const getProject = async (projectId: number): Promise<number> => {
    try {
      getCurves(projectId);
      const response = await ProjectService.getProject(projectId);
      setId(response.data.id);
      if (response.data.curves)
        setCurves(response.data.curves.map((curve) => curve.name));
      return response.data.id;
    } catch (e) {
      console.log(e);
    }
    return -1;
  };
  const getCurves = async (projectId: number) => {
    try {
      const response = await ProjectService.getCurves(projectId);
      setCurves(response.data.curvesNames);
    } catch (e) {
      console.log(e);
    }
  }
  const buildModel = async () => {
    try {
      const response = await ProjectService.buildModel(id);
      setModel(response.data)
    } catch (e) {
      console.log(e);
    }

  }
  const value = {
    id,
    curves,
    model,
    createProject,
    uploadLasFile,
    getCurves,
    getProject,
    buildModel
  };
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
