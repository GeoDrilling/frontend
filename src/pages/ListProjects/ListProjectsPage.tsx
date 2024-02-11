import { FC, useEffect, useState } from 'react';
import styles from './ListProjects.module.css';
import { IProject } from '../../models/IProject.ts';
import ProjectService from '../../services/ProjectService.ts';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';
import Input from '@components/UI/Input/Input.tsx';
import { useInput } from '../../hooks/useInput.tsx';
import ProjectList from '@components/business/ProjectList/ProjectList.tsx';
import { useFilteredProjects } from '../../hooks/useFilteredProjects.tsx';
import CreateProject from '@components/business/CreateProject/CreateProject.tsx';

const ListProjectsPage: FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const { clearProjectContext } = useProjectContext();
  const projectName = useInput('');
  projectName.input.placeholder = 'Название проекта';
  const filteredProjects = useFilteredProjects(
    projects.map((project) => ({ name: `Test name ${project.id}`, id: project.id })),
    projectName.input.value,
  );
  useEffect(() => {
    getAllUserProjects();
    clearProjectContext();
  }, [clearProjectContext]);
  const getAllUserProjects = async () => {
    const response = await ProjectService.getProjects();
    setProjects(response.data);
  };
  if (projects.length === 0)
    return (
      <div className={styles.container}>
        <CreateProject className={styles.createProjectContainer} />
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.projectListSide}>
        <h1 className={styles.title}>Список проектов</h1>
        <Input inputOutput={projectName} inputClassName={styles.input} className={styles.inputContainer} />
        <div className={styles.projectListContainer}>
          <ProjectList projects={filteredProjects} updateProjects={getAllUserProjects} />
        </div>
      </div>
      <div className={styles.createProjectSide}>
        <CreateProject className={styles.createProjectContainer} />
      </div>
    </div>
  );
};

export default ListProjectsPage;
