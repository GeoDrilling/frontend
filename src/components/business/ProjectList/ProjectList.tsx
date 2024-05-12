import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './ProjectList.module.css';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import ProjectService from '../../../services/ProjectService.ts';
import { Project } from '../../../models/IProject.ts';
import { useNavigate } from 'react-router-dom';
import ShareProjectDialog from '@components/business/ShareProjectDialog/ShareProjectDialog.tsx';

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
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState(-1);

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
  const callShareDialog = (projectId: number, event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();
    setProjectId(projectId);
    setOpen(true);
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
              <img
                src='/src/assets/images/icon_share.svg'
                alt='share'
                className={styles.image}
                onClick={(e) => callShareDialog(project.id, e)}
              />
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
      <ShareProjectDialog open={open} setOpen={setOpen} projectId={projectId} />
    </div>
  );
};

export default ProjectList;
