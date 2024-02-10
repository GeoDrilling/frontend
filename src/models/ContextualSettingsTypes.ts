export enum ContextType {
  TABLET = 'Свойства планшета',
  TRACK = 'Свойства трека',
  //CURVE = "Свойства кривой"
}
export enum PropertyType {
  ENUM,
  STRING,
  NUMBER,
  COLOR,
}
export enum EnumType {
  ORIENTATION,
}
export enum ValueOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
interface IOrientation {
  name: string;
  value: ValueOrientation;
}
export const orientation: IOrientation[] = [
  { name: 'Горизонтальная', value: ValueOrientation.HORIZONTAL },
  { name: 'Вертикальная', value: ValueOrientation.VERTICAL },
];

export interface ITabletProperties {
  properties: IGroupProperties[];
}
export interface ITrackProperties {
  curves: ICurveProperties[];
  properties: IGroupProperties[];
}
export interface ICurveProperties {
  properties: IGroupProperties[];
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
export interface IGroupProperties {
  name: string;
  properties: IBaseProperty[];
}
