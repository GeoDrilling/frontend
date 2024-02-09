export interface IProject {
  id: number;
  curves: ICurve[];
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
