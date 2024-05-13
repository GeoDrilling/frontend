import { FC, useEffect, useState } from 'react';
import styles from './GeoNavigation.module.css';
import Header from '@components/business/Header/Header.tsx';
import ToolsBar from '@components/business/ToolsBar/ToolsBar.tsx';
import Workspace from '@components/business/Workspace/Workspace.tsx';
import { useParams } from 'react-router-dom';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';
import ProjectService from '../../services/ProjectService.ts';

const GeoNavigation: FC = () => {
  const [countAttempts, setCountAttempts] = useState<number>(0);
  const pathId = useParams();
  const { id, getProject, setTvdName } = useProjectContext();

  const getCurveMatching = async () => {
    if (id === -1) return;
    const response = await ProjectService.sootOut(id);
    if (response.data.tvd && id !== -1) {
      setTvdName(response.data.tvd);
    }
  };
  const synchronizeId = async () => {
    if (pathId.id && countAttempts < 3) {
      const response = await getProject(parseInt(pathId.id));
      if (response === -1) {
        setCountAttempts((prev) => prev + 1);
        synchronizeId();
      }
    }
  };
  useEffect(() => {
    if (pathId.id !== id.toString()) synchronizeId();
    getCurveMatching();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getCurveMatching, synchronizeId]);
  if (pathId.id !== id.toString() || Number(pathId.id) === -1) return <div></div>;
  return (
    <div className={styles.container}>
      <Header />
      <ToolsBar />
      <Workspace />
    </div>
  );
};

export default GeoNavigation;
