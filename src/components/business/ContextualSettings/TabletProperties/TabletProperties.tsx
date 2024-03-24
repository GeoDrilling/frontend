import { FC } from 'react';
import styles from './TabletProperties.module.css';
import Properties from '@components/business/ContextualSettings/Properties/Properties.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import { ITabletProperties } from '../../../../models/ContextualSettingsTypes.ts';
import { useContextualSettings } from '../../../../hooks/context/useContextualSettings.ts';
interface TabletProps {
  tabletProp: ITabletProperties;
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
}
const TabletProperties: FC<TabletProps> = ({ tabletProp, changeProperty }) => {
  const scrollRef = useScroll();
  const { clearSettings } = useContextualSettings();
  return (
    <div ref={scrollRef} className={styles.scroll}>
      <div className={styles.tabletContainer}>
        <Properties groups={tabletProp.properties} changeProperty={changeProperty} />
        <Button onClick={clearSettings} className={styles.button}>
          Очистить планшет
        </Button>
      </div>
    </div>
  );
};

export default TabletProperties;
