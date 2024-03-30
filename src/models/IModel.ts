export interface IModel {
  idModel: number;
  name: string;
  outputModel: IOutModel;
}

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
export interface ParameterRange {
  name: string;
  max: number | undefined;
  min: number | undefined;
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

export interface RangeParameters {
  min_tvd_start?: number;
  max_tvd_start?: number;
  min_alpha?: number;
  max_alpha?: number;
  min_ro_up?: number;
  max_ro_up?: number;
  min_ro_down?: number;
  max_ro_down?: number;
  min_kanisotropy_up?: number;
  max_kanisotropy_up?: number;
  min_kanisotropy_down?: number;
  max_kanisotropy_dow?: number;
}
