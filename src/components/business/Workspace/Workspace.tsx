import { FC } from 'react';
import styles from './Workspace.module.css';
import Explorer from '@components/business/Explorer/Explorer.tsx';
import AreaEquivalence from '@components/business/AreaEquivalence/AreaEquivalence.tsx';
import Tablet from '@components/business/Tablet/Tablet.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';

const Workspace: FC = () => {
  const { isExplorer, isTablet, isAreaEquivalence } = useWindows();
  return (
    <div className={styles.container}>
      <div className={isExplorer || isAreaEquivalence ? styles.sidebar : styles.none}>
        <Explorer className={!isExplorer ? styles.none : undefined} />
        <AreaEquivalence className={!isAreaEquivalence ? styles.none : undefined} />
      </div>
      <Tablet className={!isTablet ? styles.none : undefined} />
    </div>
  );
};

export default Workspace;
