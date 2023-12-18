import $api from '../http';
import {CurveDataDownload, ICurves, IProject} from '../models/IProject.ts';
import {IModel} from "../models/IModel.ts";

export default class ProjectService {
  static async createProject() {
    return $api.post<IProject>('/project/test');
  }
  static async uploadFile(formData: FormData) {
    return $api.post<ICurves>('/lasfile/upload', formData);
  }
  static async getCurves(projectId: number) {
    return $api.get<ICurves>('/lasfile/curves', { params: { project_id: projectId } });
  }

  static async getCurve(projectId: string, CurveName: string) {
    return $api.get<CurveDataDownload>('/lasfile/download/curve', { params: { project_id: projectId, curve_name: CurveName} });
  }
  static async getProjects() {
    return $api.get<IProject[]>('/project/userAll');
  }
  static async getProject(projectId: number) {
    return $api.get<IProject>(`/project/${projectId}`);
  }

  static async buildModel(projectId: number) {
    return $api.post<IModel>(`/model/create`, {}, {params: { project_id: projectId, name: "Test Model"}});
  }
}
