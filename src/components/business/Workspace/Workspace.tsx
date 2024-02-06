import { FC } from 'react';
import styles from './Workspace.module.css';
import Explorer from '@components/business/Explorer/Explorer.tsx';
import AreaEquivalence from '@components/business/AreaEquivalence/AreaEquivalence.tsx';
import Tablet from '@components/business/Tablet/Tablet.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import ContextualSettings from '@components/business/ContextualSettings/ContextualSettings.tsx';

const Workspace: FC = () => {
  const { isExplorer, isTablet, isAreaEquivalence, isSettings } = useWindows();
  return (
    <div className={styles.container}>
      <div className={isExplorer || isAreaEquivalence || isSettings ? styles.sidebar : styles.none}>
        <Explorer className={!isExplorer ? styles.none : undefined} />
        <ContextualSettings className={!isSettings ? styles.none : undefined} />
        <AreaEquivalence className={!isAreaEquivalence ? styles.none : undefined} />
      </div>
      <Tablet className={!isTablet ? styles.none : undefined} />
    </div>
  );
};

export default Workspace;
