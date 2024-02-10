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
const groupsTrackProperties: IGroupProperties[] = [{ name: 'Первая кривая', properties: curveProperties }];
export const trackProperties: ITrackProperties = { curves: [], properties: groupsTrackProperties };

const mainGroupTabletProperties: IGroupProperties = {
  name: 'Основные свойства',
  properties: [
    {
      name: 'Ориентация',
      type: PropertyType.ENUM,
      enumType: EnumType.ORIENTATION,
      value: orientation[0].value,
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
}
