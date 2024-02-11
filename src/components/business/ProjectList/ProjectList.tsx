import { FC, useEffect, useRef } from 'react';
import styles from './ProjectList.module.css';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import ProjectService from '../../../services/ProjectService.ts';
import { Project } from '../../../models/IProject.ts';
import { useNavigate } from 'react-router-dom';

interface ProjectListProps {
  projects: Project[];
  updateProjects: () => void;
}

const ProjectList: FC<ProjectListProps> = ({ projects, updateProjects }) => {
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
  const delProject = async (projectId: number) => {
    try {
      await ProjectService.deleteProject(projectId);
      updateProjects();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container} ref={scrollRef}>
      <div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={styles.item}
            onClick={async () => {
              const id = await getProject(project.id);
              navigate(`/projects/${id}`);
            }}
          >
            <p className={styles.name}>
              {index + 1}. {project.name}
            </p>
            <div className={styles.imagesContainer}>
              <img src='/src/assets/images/icon_edit.svg' alt='edit' className={styles.image} />
              <img src='/src/assets/images/icon_share.svg' alt='share' className={styles.image} />
              <img
                src='/src/assets/images/icon_delete.svg'
                alt='delete'
                className={styles.image}
                onClick={(event) => {
                  event.stopPropagation();
                  delProject(project.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
