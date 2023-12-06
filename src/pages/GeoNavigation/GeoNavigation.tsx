import { FC, useEffect, useState } from 'react';
import styles from './GeoNavigation.module.css';
import Header from '@components/business/Header/Header.tsx';
import ToolsBar from '@components/business/ToolsBar/ToolsBar.tsx';
import Workspace from '@components/business/Workspace/Workspace.tsx';
import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';

const GeoNavigation: FC = () => {
  const [countAttempts, setCountAttempts] = useState<number>(0);
  const pathId = useParams();
  const { id, getProject } = useProjectContext();
  useEffect(() => {
    if (pathId.id !== id.toString()) synchronizeId();
  });
  const synchronizeId = async () => {
    console.log(pathId.id, id, 'in sync');
    if (pathId.id && countAttempts < 3) {
      const response = await getProject(parseInt(pathId.id));
      if (response === -1) setCountAttempts(countAttempts + 1);
    }
  };
  if (pathId.id !== id.toString()) return <div></div>;
  return (
    <div className={styles.container}>
      <Header />
      <ToolsBar />
      <Workspace />
    </div>
  );
};

export default GeoNavigation;
