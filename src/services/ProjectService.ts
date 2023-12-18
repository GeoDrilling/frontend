import $api from '../http';
import { ICurves, IProject } from '../models/IProject.ts';

export default class ProjectService {
  static async createProject() {
    return $api.post<IProject>('/project');
  }
  static async uploadFile(formData: FormData) {
    return $api.post<ICurves>('/lasfile/upload', formData);
  }
  static async getCurves(projectId: string) {
    return $api.get<ICurves>('/lasfile/curves', { params: { project_id: projectId } });
  }
  static async getProjects() {
    return $api.get<IProject[]>('/project');
  }
  static async getProject(projectId: number) {
    return $api.get<IProject>(`/project/${projectId}`);
  }
}
