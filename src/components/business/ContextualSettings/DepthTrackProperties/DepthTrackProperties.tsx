import { IContainerGroupProperties } from '../../../../models/ContextualSettingsTypes.ts';
import { FC } from 'react';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import styles from './DepthTrackProperties.module.css';
import Properties from '@components/business/ContextualSettings/Properties/Properties.tsx';

interface DepthTrackProps {
  depthTrackProps: IContainerGroupProperties;
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
}
const DepthTrackProperties: FC<DepthTrackProps> = ({ depthTrackProps, changeProperty }) => {
  const scrollRef = useScroll();
  return (
    <div ref={scrollRef} className={styles.scroll}>
      <div className={styles.container}>
        <Properties groups={depthTrackProps.properties} changeProperty={(v, id, ip) => changeProperty(v!, id, ip)} />
      </div>
    </div>
  );
};
export default DepthTrackProperties;
