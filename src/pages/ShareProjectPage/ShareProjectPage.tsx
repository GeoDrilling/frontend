import { FC } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectContext } from '../../hooks/context/useProjectContext.ts';
import { useMount } from '../../hooks/useMount.tsx';
import ProjectService from '../../services/ProjectService.ts';

const ShareProjectPage: FC = () => {
  const pathParams = useParams();
  const navigate = useNavigate();
  const { getProject } = useProjectContext();
  useMount(() => {
    copyProject();
  });
  const copyProject = async () => {
    try {
      const response = await ProjectService.getCopyProject(pathParams.token!);
      if (response.data != null) {
        const id = await getProject(response.data);
        navigate(`/projects/${id}`);
      } else navigate('/projects');
    } catch {
      navigate('/projects');
    }
  };
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default ShareProjectPage;
