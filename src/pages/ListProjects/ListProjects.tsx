import { FC, useEffect, useState } from 'react';
import styles from './ListProjects.module.css';
import { IProject } from '../../models/IProject.ts';
import ProjectService from '../../services/ProjectService.ts';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';
import { Navigate } from 'react-router-dom';

const ListProjects: FC = () => {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const { id, getProject, createProject, isCreating } = useProjectContext();
  useEffect(() => {
    getAllUserProjects();
  });
  const getAllUserProjects = async () => {
    const response = await ProjectService.getProjects();
    setProjects(response.data);
  };
  if (id != -1) {
    return <Navigate to={`/projects/${id}`} replace />;
  }
  if (projects && !isCreating) {
    if (projects.length > 0) {
      getProject(projects[0].id);
    } else {
      createProject();
    }
  }

  return <div className={styles.container}></div>;
};

export default ListProjects;
