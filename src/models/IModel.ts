export interface IModel {
  idModel: number;
  name: string;
  outputModel: IOutModel;
}
export interface IModelParams {
  ro_f: number;
  ro_sf: number;
  k_f: number;
  k_sf: number;
  alpha: number;
  h_sf: number;
}
export interface IOutModel {
  minKanisotropyDown: number;
  maxKanisotropyDown: number;
  syntRoByPhases: number[];
  syntRoByAmpl: number[];
  misfit: number;
  kanisotropyDown: number;
  minRoDown: number;
  maxRoDown: number;
  roDown: number;
  kanisotropyUp: number;
  minKanisotropyUp: number;
  maxKanisotropyUp: number;
  roUp: number;
  minRoUp: number;
  maxRoUp: number;
  alpha: number;
  tvdStart: number;
}
