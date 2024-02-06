import { FC } from 'react';
import {
  IBaseProperty,
  IColorProperty,
  IEnumProperty,
  INumberProperty,
  IStringProperty,
  PropertyType,
} from '../../../models/ContextualSettingsTypes.ts';

import NumberProperty from '@components/business/PropertySettings/NumberProperty/NumberProperty.tsx';
import StringProperty from '@components/business/PropertySettings/StringProperty/StringProperty.tsx';
import ColorProperty from '@components/business/PropertySettings/ColorProperty/ColorProperty.tsx';
import EnumProperty from '@components/business/PropertySettings/EnumProperty/EnumProperty.tsx';

interface PropertySettingsProps {
  property: IBaseProperty;
  changeProperty: (value: number | string) => void;
}
function isNumberProperty(prop: IBaseProperty): prop is INumberProperty {
  return prop.type === PropertyType.NUMBER;
}
function isStringProperty(prop: IBaseProperty): prop is IStringProperty {
  return prop.type === PropertyType.STRING;
}
function isEnumProperty(prop: IBaseProperty): prop is IEnumProperty {
  return prop.type === PropertyType.ENUM;
}
function isColorProperty(prop: IBaseProperty): prop is IColorProperty {
  return prop.type === PropertyType.COLOR;
}

const PropertySettings: FC<PropertySettingsProps> = ({ property, changeProperty }) => {
  if (isNumberProperty(property)) return <NumberProperty property={property} changeProperty={changeProperty} />;
  if (isStringProperty(property)) return <StringProperty property={property} changeProperty={changeProperty} />;
  if (isColorProperty(property)) return <ColorProperty property={property} changeProperty={changeProperty} />;
  if (isEnumProperty(property)) return <EnumProperty property={property} changeProperty={changeProperty} />;
};

export default PropertySettings;
