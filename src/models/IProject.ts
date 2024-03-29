import { ITabletProperties, ITrackProperties } from './ContextualSettingsTypes.ts';

export interface IProject {
  id: number;
  name: string;
  curves: ICurve[];
}
export interface IProjectState {
  id: number;
  tabletProperties: ITabletProperties;
  trackProperties: ITrackProperties[];
  curvesNames: string[];
}
export interface Project {
  name: string;
  id: number;
}
export interface FrozenProject extends Project {
  maxDepth: number;
  timestamp: string;
}

export interface ICurve {
  name: string;
  data?: number[];
}
export interface ICurves {
  curvesNames: string[];
}

export interface CurveDataDownload {
  curveData: number[];
}
