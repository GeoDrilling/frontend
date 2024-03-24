export interface IModel {
  idModel: number;
  name: string;
  outputModel: IOutModel;
}

/*
{
  "idModel": 0,
  "start": 0,
  "end": 0,
  "kanisotropyDown": 0,
  "roDown": 0,
  "kanisotropyUp": 0,
  "roUp": 0,
  "alpha": 0,
  "tvdStart": 0
}
 */
export interface IModelParams {
  idModel: number;
  start: number;
  end: number;
  kanisotropyDown: number;
  roDown: number;
  kanisotropyUp: number;
  roUp: number;
  alpha: number;
  tvdStart: number;
}

export interface IModelParameter {
  name: string;
  value: number;
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
