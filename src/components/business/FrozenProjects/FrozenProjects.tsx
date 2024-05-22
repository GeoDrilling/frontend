import { FC, useEffect, useRef } from 'react';
import { FrozenProject } from '../../../models/IProject.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import styles from './FrozenProjects.module.css';
import { useNavigate } from 'react-router-dom';
interface FrozenProjectsProps {
  projects: FrozenProject[];
}
const FrozenProjects: FC<FrozenProjectsProps> = ({ projects }) => {
  const { getProject } = useProjectContext();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize, projects.length]);
  return (
    <div className={styles.container} ref={scrollRef}>
      <div className={styles.items}>
        {projects.map((project) => {
          return (
            <div
              key={project.id}
              className={styles.item}
              onClick={async () => {
                const id = await getProject(project.id);
                navigate(`/projects/${id}`);
              }}
            >
              <div className={styles.infoContainer}>
                <p className={styles.title}>{project.name}</p>
                <p className={styles.text}>Максимальная глубина {project.maxDepth}</p>
              </div>
              <img src='/src/assets/images/icon_edit.svg' alt='edit' className={styles.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrozenProjects;
