import { createContext, useState } from 'react';
import { FCC } from '../types/types.tsx';
import ProjectService from '../services/ProjectService.ts';

interface ProjectContext {
  id: number;
  curves: string[];
  createProject: () => void;
  uploadLasFile: (formData: FormData) => void;
  getProject: (projectId: number) => Promise<number>;
}
export const ProjectContext = createContext<ProjectContext>({} as ProjectContext);

export const ProjectProvider: FCC = ({ children }) => {
  const [id, setId] = useState<number>(-1);
  const [curves, setCurves] = useState<string[]>([]);
  const createProject = async () => {
    try {
      const response = await ProjectService.createProject();
      setId(response.data.id);
      setCurves(response.data.curves.map((curve) => curve.name));
    } catch (e) {
      console.log(e);
    }
  };
  const uploadLasFile = async (formData: FormData) => {
    try {
      const response = await ProjectService.uploadFile(formData);
      console.log(response.data);
      setCurves(curves.concat(response.data.curvesNames));
    } catch (e) {
      console.log(e);
    }
  };
  const getProject = async (projectId: number): Promise<number> => {
    try {
      const response = await ProjectService.getProject(projectId);
      setId(response.data.id);
      setCurves(response.data.curves.map((curve) => curve.name));
      return response.data.id;
    } catch (e) {
      console.log(e);
    }
    return -1;
  };
  const value = {
    id,
    curves,
    createProject,
    uploadLasFile,
    getProject,
  };
  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
