import { useContext } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext.tsx';

export const useProjectContext = () => useContext(ProjectContext);
