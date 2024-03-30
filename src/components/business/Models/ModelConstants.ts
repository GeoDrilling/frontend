import { IModelParameter } from '../../../models/IModel.ts';
import {
  ALPHA,
  KANISOTROPY_DOWN,
  KANISOTROPY_UP,
  RO_DOWN,
  RO_UP,
  TVD_START,
} from '../../../utils/CurveMappingConst.ts';

export const suffixes: string[] = ['Ом∙м³', 'Ом∙м³', '', '', '°', 'м'];
export const model: IModelParameter[] = [
  { name: RO_DOWN, value: 123 },
  { name: RO_UP, value: 123 },
  { name: KANISOTROPY_DOWN, value: 123 },
  { name: KANISOTROPY_UP, value: 123 },
  { name: ALPHA, value: 123 },
  { name: TVD_START, value: 123 },
];
