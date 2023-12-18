export interface IProject {
  id: number;
  curves: ICurve[];
}
export interface ICurve {
  name: string;
}
export interface ICurves {
  curvesNames: string[];
}

export interface CurveDataDownload{
  curveDataInJson: number[];
}
