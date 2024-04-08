import {
  boolValue,
  EnumType,
  IBaseProperty,
  IGroupProperties,
  IContainerGroupProperties,
  ITrackProperties,
  orientation,
  PropertyType,
  scale,
} from '../models/ContextualSettingsTypes.ts';

enum nullablePropertiesEnum {
  MAX_VALUE = 'Макс значение',
  MIN_VALUE = 'Мин значение',
}
export const nullableProperties: string[] = Object.values(nullablePropertiesEnum);
export const curveProperties: IBaseProperty[] = [
  { name: 'Цвет', type: PropertyType.COLOR, value: '#156fa3' } as IBaseProperty,
  { name: 'Толщина', type: PropertyType.NUMBER, value: 1 } as IBaseProperty,
  { name: nullablePropertiesEnum.MAX_VALUE, type: PropertyType.NUMBER, value: undefined } as IBaseProperty,
  { name: nullablePropertiesEnum.MIN_VALUE, type: PropertyType.NUMBER, value: undefined } as IBaseProperty,
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
const mainGridGroupTrackProps: IGroupProperties = {
  name: 'Основная горизонтальная сетка',
  properties: [
    {
      name: 'Отображать сетку',
      type: PropertyType.ENUM,
      enumType: EnumType.BOOLEAN,
      value: boolValue[0].value,
    } as IBaseProperty,
    {
      name: 'Число линий',
      type: PropertyType.NUMBER,
      value: 1,
    } as IBaseProperty,
  ],
};
const secondaryGridGroupTrackProps: IGroupProperties = {
  name: 'Вторичная горизонтальная сетка',
  properties: [
    {
      name: 'Отображать сетку',
      type: PropertyType.ENUM,
      enumType: EnumType.BOOLEAN,
      value: boolValue[0].value,
    } as IBaseProperty,
    {
      name: 'Число линий',
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
export const trackProperties: ITrackProperties = {
  curves: [],
  properties: [mainGroupTrackProps, mainGridGroupTrackProps, secondaryGridGroupTrackProps],
};

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
      name: 'Масштаб',
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
export const _tabletProperties: IContainerGroupProperties = { properties: groupsTabletProperties };
export enum OrderTrackMain {
  HEIGHT,
  SCALE,
}
export enum OrderTrackMainGrid {
  DISPLAY,
  COUNT,
}
export enum OrderTrackSecondaryGrid {
  DISPLAY,
  COUNT,
  LEFT_OFF,
  RIGHT_OFF,
}
export enum OrderCurveProperties {
  COLOR,
  THICKNESS,
  MAX,
  MIN,
}
export enum OrderTrackGroups {
  MAIN,
  MAIN_GRID,
  SECONDARY_GRID,
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
  COLOR_MAIN,
  LINES,
  THICKNESS_LINES,
  COLOR_SECONDARY,
}
export enum OrderDepthTrackMain {
  HEIGHT,
  COLOR,
  FLOATING_POINT,
}
export enum OrderModelCurveMain {
  HEIGHT,
  MAX,
  MIN,
  THICKNESS_BORDER_LAYERS,
  COLOR_BORDER_LAYERS,
  THICKNESS_BORDER_MODEL,
  COLOR_BORDER_MODEL,
}
