import { FC, useEffect, useRef } from 'react';
import styles from './Properties.module.css';
import { IGroupProperties } from '../../../../models/ContextualSettingsTypes.ts';
import PropertySettings from '@components/business/PropertySettings/PropertySettings.tsx';
import { useOverlayScrollbars } from 'overlayscrollbars-react';

interface PropertiesProps {
  groups: IGroupProperties[];
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
}
const Properties: FC<PropertiesProps> = ({ groups, changeProperty }) => {
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize]);
  return (
    <div ref={scrollRef}>
      {groups.map((group, groupIndex) => {
        return (
          <details key={groupIndex}>
            <summary className={styles.groupTitle}>{group.name}</summary>
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
