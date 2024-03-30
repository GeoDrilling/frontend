import {
  EnumType,
  IBaseProperty,
  IGroupProperties,
  ITabletProperties,
  ITrackProperties,
  orientation,
  PropertyType,
} from '../models/ContextualSettingsTypes.ts';

export const curveProperties: IBaseProperty[] = [
  { name: 'Цвет', type: PropertyType.COLOR, value: '#156fa3' } as IBaseProperty,
];
export const groupsCurveProperties: IGroupProperties[] = [{ name: 'Кривая', properties: curveProperties }];
export const trackProperties: ITrackProperties = { curves: [], properties: [] };

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

export enum OrderCurveProperties {
  COLOR,
}
export enum OrderTabletProperties {
  ORIENTATION,

  START_DEPTH,
  END_DEPTH,
}
