import $api from '../http';
import { CurveDataDownload, ICurves, IProject } from '../models/IProject.ts';
import { IModel } from '../models/IModel.ts';
import { Selections } from '../models/Selection.ts';

export default class ProjectService {
  static async createProject(projectName: string) {
    return $api.post<IProject>(`/project/${projectName}`);
  }
  static async deleteProject(projectId: number) {
    return $api.delete<IProject>(`/project/${projectId}`);
  }
  static async uploadFile(formData: FormData) {
    return $api.post<ICurves>('/lasfile/upload', formData);
  }
  static async getCurves(projectId: number) {
    return $api.get<ICurves>('/lasfile/curves', { params: { project_id: projectId } });
  }

  static async getCurve(projectId: number, CurveName: string) {
    return $api.get<CurveDataDownload>('/lasfile/download/curve', {
      params: { project_id: projectId, curve_name: CurveName },
    });
  }
  static async getProjects() {
    return $api.get<IProject[]>('/project/userAll');
  }
  static async getProject(projectId: number) {
    return $api.get<IProject>(`/project/${projectId}`);
  }

  static async buildModel(projectId: number) {
    return $api.post<IModel>(`/model/create`, {}, { params: { project_id: projectId, name: 'Test Model' } });
  }

  static async sootRename(projectId: number, selections: Selections) {
    const payload = {
      ropl: selections['L'].selection2,
      ropld: selections['LD'].selection2,
      rople: selections['LE'].selection2,
      roph: selections['H'].selection2,
      rophd: selections['HD'].selection2,
      rophe: selections['HE'].selection2,
      roal: selections['L'].selection1,
      roald: selections['LD'].selection1,
      roale: selections['LE'].selection1,
      roah: selections['H'].selection1,
      roahd: selections['HD'].selection1,
      roahe: selections['HE'].selection1,
      //"md": selections['L'].selection1,
      tvd: selections['Глубина'].selection1,
      x: selections['Отход'].selection1,
      zeni: selections['Зенитный угол'].selection1,
    };
    return $api.post<string>(`/soot/rename/${projectId}`, payload);
  }
}
