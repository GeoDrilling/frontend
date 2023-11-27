import { FC } from 'react';
import styles from './Workspace.module.css';
import Explorer from '@components/business/Explorer/Explorer.tsx';
import AreaEquivalence from '@components/business/AreaEquivalence/AreaEquivalence.tsx';
import Tablet from '@components/business/Tablet/Tablet.tsx';

const Workspace: FC = () => {
  return (
    <div className={styles.container}>
      <Explorer />
      <Tablet />
      <AreaEquivalence />
    </div>
  );
};

export default Workspace;
