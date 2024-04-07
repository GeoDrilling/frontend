import {
  boolValue,
  EnumType,
  IBaseProperty,
  IGroupProperties,
  ITabletProperties,
  ITrackProperties,
  orientation,
  PropertyType,
  scale,
} from '../models/ContextualSettingsTypes.ts';

export const curveProperties: IBaseProperty[] = [
  { name: 'Цвет', type: PropertyType.COLOR, value: '#156fa3' } as IBaseProperty,

];
export const groupsCurveProperties: IGroupProperties[] = [{ name: 'Кривая', properties: curveProperties }];
const mainGroupTrackProps: IGroupProperties = {
  name: 'Основные свойства трека',
  properties: [
    {
      name: 'Высота',
      type: PropertyType.NUMBER,
      value: 200,
    } as IBaseProperty,
    {
      name: 'Шкала',
      type: PropertyType.ENUM,
      enumType: EnumType.SCALE,
      value: scale[0].value,
    } as IBaseProperty,
  ],
};
const gridGroupTrackProps: IGroupProperties = {
  name: 'Свойства горизонтальной сетки',
  properties: [
    {
      name: 'Отображать сетку',
      type: PropertyType.ENUM,
      enumType: EnumType.BOOLEAN,
      value: boolValue[0].value,
    } as IBaseProperty,
    {
      name: 'Число главных линий',
      type: PropertyType.NUMBER,
      value: 5,
    } as IBaseProperty,
    {
      name: 'Число вторичных линий',
      type: PropertyType.NUMBER,
      value: 5,
    } as IBaseProperty,
    {
      name: 'Левый сдвиг',
      type: PropertyType.NUMBER,
      value: 0,
    } as IBaseProperty,
    {
      name: 'Правый сдвиг',
      type: PropertyType.NUMBER,
      value: 0,
    } as IBaseProperty,
  ],
};
export const trackProperties: ITrackProperties = { curves: [], properties: [mainGroupTrackProps, gridGroupTrackProps] };

const mainGroupTabletProperties: IGroupProperties = {
  name: 'Основные свойства',
  properties: [
    {
      name: 'Ориентация',
      type: PropertyType.ENUM,
      enumType: EnumType.ORIENTATION,
      value: orientation[0].value,
    } as IBaseProperty,
    {
      name: 'Шаг сетки',
      type: PropertyType.NUMBER,
      value: 500,
    } as IBaseProperty,
    {
      name: 'Начальная глубина',
      type: PropertyType.NUMBER,
      value: 3200,
    } as IBaseProperty,
    {
      name: 'Конечная глубина',
      type: PropertyType.NUMBER,
      value: 3700,
    } as IBaseProperty,
  ],
};
const groupsTabletProperties: IGroupProperties[] = [mainGroupTabletProperties];
export const _tabletProperties: ITabletProperties = { properties: groupsTabletProperties };
export enum OrderTrackMain {
  HEIGHT,
  SCALE,
}
export enum OrderTrackGrid {
  DISPLAY,
  COUNT_MAIN,
  COUNT_SECONDARY,
  LEFT_OFF,
  RIGHT_OFF,
}
export enum OrderCurveProperties {
  COLOR,
}
export enum OrderTrackGroups {
  MAIN,
  GRID,
}
export enum OrderTabletGroups {
  MAIN,
  GRID,
}
export enum OrderTabletMain {
  ORIENTATION,
  START_DEPTH,
  END_DEPTH,
  SCOPE,
}
export enum OrderTabletGrid {
  INTERVAL,
  THICKNESS_MAIN,
  LINES,
  THICKNESS_LINES,
}
