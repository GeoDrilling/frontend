export enum ContextType {
  TABLET = 'Свойства планшета',
  TRACK = 'Свойства трека',
  //CURVE = "Свойства кривой"
}
export enum PropertyType {
  ENUM = '0',
  STRING = '1',
  NUMBER = '2',
  COLOR = '3',
}
export enum EnumType {
  ORIENTATION,
  SCALE,
  BOOLEAN,
}
export enum ValueOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
export enum ValueScale {
  LOG = 'logarithmic',
  LINEAR = 'linear',
}
export enum ValueBoolean {
  ENABLE = 'true',
  DISABLE = '',
}
export interface IEnumOption {
  name: string;
  value: string;
}
export const orientation: IEnumOption[] = [
  { name: 'Горизонтальная', value: ValueOrientation.HORIZONTAL },
  { name: 'Вертикальная', value: ValueOrientation.VERTICAL },
];
export const scale: IEnumOption[] = [
  { name: 'Линейная', value: ValueScale.LINEAR },
  { name: 'Логарифмическая', value: ValueScale.LOG },
];
export const boolValue: IEnumOption[] = [
  { name: 'Да', value: ValueBoolean.ENABLE },
  { name: 'Нет', value: ValueBoolean.DISABLE },
];

export interface IGroupProperties {
  name: string;
  properties: IBaseProperty[];
}

export interface ITabletProperties {
  properties: IGroupProperties[];
}
export interface ITrackProperties {
  curves: ICurveProperties[];
  properties: IGroupProperties[];
}
export interface ICurveProperties {
  name: string;
  properties: IGroupProperties[];
  retries?: number;
}
export interface IBaseProperty {
  name: string;
  type: PropertyType;
}
export interface INumberProperty extends IBaseProperty {
  value: number;
}
export interface IStringProperty extends IBaseProperty {
  value: string;
}
export interface IEnumProperty extends IBaseProperty {
  enumType: EnumType;
  value: string;
}

export interface IColorProperty extends IBaseProperty {
  value: string;
}
