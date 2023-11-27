import { FC } from 'react';
import styles from './GeoNavigation.module.css';
import Header from '@components/business/Header/Header.tsx';
import ToolsBar from '@components/business/ToolsBar/ToolsBar.tsx';
import Workspace from '@components/business/Workspace/Workspace.tsx';

const GeoNavigation: FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <ToolsBar />
      <Workspace />
    </div>
  );
};

export default GeoNavigation;
