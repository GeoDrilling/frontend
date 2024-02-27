import { FC, useMemo } from 'react';
import styles from './FrozenProjectsPage.module.css';
import Header from '@components/business/Header/Header.tsx';
import Input from '@components/UI/Input/Input.tsx';
import { useInput } from '../../hooks/useInput.tsx';
import { useFiltered, useSorted } from '../../hooks/useFiltered.tsx';
import { FrozenProject } from '../../models/IProject.ts';
import FrozenProjects from '@components/business/FrozenProjects/FrozenProjects.tsx';
import classNames from 'classnames';
import SortSettings from '@components/business/SortSettings/SortSettings.tsx';
const FrozenProjectsPage: FC = () => {
  const projects: FrozenProject[] = useMemo(
    () => [
      { id: 1, name: 'Test 1', maxDepth: 3500, timestamp: '2023.12.30 12:59' },
      { id: 2, name: 'Test 8', maxDepth: 3600, timestamp: '2024.1.1 12:59' },
      { id: 3, name: 'Test 3', maxDepth: 3700, timestamp: '2023.1.2 12:59' },
      { id: 4, name: 'Test 4', maxDepth: 3800, timestamp: '2023.12.3 12:59' },
      { id: 5, name: 'Test 5', maxDepth: 3900, timestamp: '2023.12.4 12:59' },
      { id: 6, name: 'Test 6', maxDepth: 4100, timestamp: '2023.12.6 10:10' },
      { id: 7, name: 'Test 7', maxDepth: 4000, timestamp: '2023.12.4 12:59' },
      { id: 8, name: 'Test 2', maxDepth: 4200, timestamp: '2023.12.7 12:59' },
      { id: 9, name: 'Test 9', maxDepth: 4300, timestamp: '2023.12.7 14:59' },
    ],
    [],
  );
  const projectName = useInput('');
  projectName.input.placeholder = 'Название проекта';
  const filteredProjects = useFiltered(projects, projectName.input.value, (p, query) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  const [filteredAndSorted, byName, setByName, isAscending, setIsAscending] = useSorted(filteredProjects, true, true);
  return (
    <div className={styles.container}>
      <Header isToProject={true} />
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
