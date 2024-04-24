import $api from '../http';
import { CurveDataDownload, ICurves, IProject, IProjectState } from '../models/IProject.ts';
import { IAreaEq, IHistoryAreaEq, IModelParams, RangeParameters } from '../models/IModel.ts';
import { Selections } from '../models/Selection.ts';
import { SootOutResponse } from '../models/SootOutResponse.ts';

export default class ProjectService {
  static async createProject(projectName: string) {
    return $api.post<IProjectState>(`/project/${projectName}`);
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
  static async getProjectState(projectId: number) {
    return $api.get<IProjectState>(`/project/state/${projectId}`);
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

  static async sootOut(projectId: number) {
    return $api.post<SootOutResponse>(`/soot/out`, {}, { params: { project_id: projectId } });
  }
  static async saveProjectState(state: IProjectState) {
    return $api.put(`/project/state/${state.id}`, state);
  }
  static async isCurveMapped(projectId: number) {
    return $api.get<boolean>('/soot/checkCurves', { params: { project_id: projectId } });
  }
  static async buildStartModel(projectId: number, start: number, end: number) {
    return $api.get<IModelParams>('/model/createStartModel', {
      params: {
        project_id: projectId,
        start: start,
        end: end,
      },
    });
  }
  static async getModels(projectId: number) {
    return $api.get<IModelParams[]>('/model/getModel', { params: { project_id: projectId } });
  }
  static async buildModel(projectId: number, start: number, end: number, model: IModelParams, range: RangeParameters) {
    return $api.post<IModelParams>(
      `/model/create`,
      { modelDTO: model, rangeParameters: range },
      {
        params: {
          project_id: projectId,
          start: start,
          end: end,
        },
      },
    );
  }
  static async saveModel(projectId: number, modelParams: IModelParams) {
    return $api.post<{ modelDTO: IModelParams[] }>(`/model/saveModel`, modelParams, {
      params: {
        project_id: projectId,
      },
    });
  }
  static async createAreaEquivalence(modelId: number, data: IAreaEq) {
    return $api.post<Blob>(`/areas/create/${modelId}`, data, { responseType: 'blob' });
  }
  static async getDepthMin(projectId: number) {
    return $api.get<number>('lasfile/dept/min', { params: { project_id: projectId } });
  }
  static async getDepthMax(projectId: number) {
    return $api.get<number>('lasfile/dept/max', { params: { project_id: projectId } });
  }
  static async getHistoryAreas(modelId: number) {
    return $api.get<IHistoryAreaEq[]>('areas/getAllAreas', { params: { model_id: modelId } });
  }
  static async getAreas(modelId: number, historyId: number) {
    return $api.get<Blob>('areas/getAreas', { params: { model_id: modelId, number: historyId }, responseType: 'blob' });
  }
}
