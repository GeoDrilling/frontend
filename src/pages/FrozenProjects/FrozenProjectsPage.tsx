import { FC, useEffect, useState } from 'react';
import styles from './FrozenProjectsPage.module.css';
import Header from '@components/business/Header/Header.tsx';
import Input from '@components/UI/Input/Input.tsx';
import { useInput } from '../../hooks/useInput.tsx';
import { useFiltered, useSorted } from '../../hooks/useFiltered.tsx';
import { FrozenProject } from '../../models/IProject.ts';
import FrozenProjects from '@components/business/FrozenProjects/FrozenProjects.tsx';
import classNames from 'classnames';
import SortSettings from '@components/business/SortSettings/SortSettings.tsx';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';
import ProjectService from '../../services/ProjectService.ts';
const FrozenProjectsPage: FC = () => {
  const [projects, setProjects] = useState<FrozenProject[]>([]);
  const { id } = useProjectContext();

  useEffect(() => {
    const initFrozenProjects = async () => {
      try {
        const response = await ProjectService.getFrozenProjects(id);
        setProjects(
          response.data.map(
            (p) =>
              ({
                name: p.name,
                maxDepth: p.maxDepth,
                id: p.id,
              }) as FrozenProject,
          ),
        );
      } catch (e) {
        console.log(e);
      }
    }
    initFrozenProjects();
  }, [id]);
  const projectName = useInput('');
  projectName.input.placeholder = 'Название проекта';
  const filteredProjects = useFiltered(projects, projectName.input.value, (p, query) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  const [filteredAndSorted, byName, setByName, isAscending, setIsAscending] = useSorted(filteredProjects, true, true);
  return (
    <div className={styles.container}>
      <Header isFrozenProjects={true} />
      <div className={styles.contentContainer}>
        <SortSettings byName={byName} setByName={setByName} setIsAscending={setIsAscending} isAscending={isAscending} />
        <div className={styles.projectsContent}>
          <h1 className={styles.title}>История проекта</h1>
          <Input inputOutput={projectName} inputClassName={styles.input} className={styles.inputContainer} />
          <div className={classNames(styles.projectsContent, styles.list)}>
            <FrozenProjects projects={filteredAndSorted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrozenProjectsPage;
