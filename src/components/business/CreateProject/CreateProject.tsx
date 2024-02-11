import { FC, FormEvent } from 'react';
import styles from './CreateProject.module.css';
import Input from '@components/UI/Input/Input.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../../hooks/useInput.tsx';

interface CreateProjectProps {
  className?: string;
}
const CreateProject: FC<CreateProjectProps> = ({ className }) => {
  const { createProject } = useProjectContext();
  const navigate = useNavigate();
  const createProjectName = useInput('');
  createProjectName.input.placeholder = 'Название проекта';
  const onCreateProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = await createProject();
    navigate(`/projects/${id}`);
  };
  return (
    <div className={className}>
      <h1 className={styles.title}>Создать проект</h1>
      <form onSubmit={onCreateProject}>
        <Input inputOutput={createProjectName} className={styles.inputContainer} />
        <Button className={styles.button}>Создать</Button>
      </form>
    </div>
  );
};

export default CreateProject;
