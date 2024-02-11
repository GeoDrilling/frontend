export interface IProject {
  id: number;
  curves: ICurve[];
}
export interface Project {
  name: string;
  id: number;
}

export interface ICurve {
  name: string;
  data?: number[];
}
export interface ICurves {
  curvesNames: string[];
}

export interface CurveDataDownload {
  curveDataInJson: string;
}
