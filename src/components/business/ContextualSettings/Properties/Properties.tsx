import { FC } from 'react';
import styles from './Properties.module.css';
import { IGroupProperties } from '../../../../models/ContextualSettingsTypes.ts';
import PropertySettings from '@components/business/PropertySettings/PropertySettings.tsx';

interface PropertiesProps {
  groups: IGroupProperties[];
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
  curveName?: string;
}
const Properties: FC<PropertiesProps> = ({ groups, changeProperty, curveName }) => {
  //const scrollRef = notScroll? undefined : useScroll();
  return (
    <div /*ref={scrollRef}*/ className={styles.container}>
      {groups.map((group, groupIndex) => {
        return (
          <details key={groupIndex}>
            <summary className={styles.groupTitle}>{curveName ? curveName : group.name}</summary>
            <table className={styles.table}>
              <tbody>
                {group.properties.map((property, propIndex) => {
                  return (
                    <tr key={propIndex}>
                      <td className={styles.propertyName}>{property.name}</td>
                      <td className={styles.propertyValue}>
                        <PropertySettings
                          property={property}
                          changeProperty={(v) => changeProperty(v, groupIndex, propIndex)}
                          key={propIndex}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </details>
        );
      })}
    </div>
  );
};

export default Properties;
