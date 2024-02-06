import { IBaseProperty, IGroupProperties, ITrackProperties, PropertyType } from '../models/ContextualSettingsTypes.ts';

export const curveProperties: IBaseProperty[] = [
  { name: 'Цвет', type: PropertyType.COLOR, value: '#156fa3' } as IBaseProperty,
];
export const groupsTrackProperties: IGroupProperties[] = [{ name: 'Первая кривая', properties: curveProperties }];
export const trackProperties: ITrackProperties = { curves: [], properties: groupsTrackProperties };
export enum OrderCurveProperties {
  COLOR,
}
