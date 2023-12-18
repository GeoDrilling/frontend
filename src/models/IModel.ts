export interface IModel {
  idModel: number;
  name: string;
  outputModel: IOutModel;
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