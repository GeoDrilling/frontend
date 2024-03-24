import { useContext } from 'react';
import { ModelContext } from '../../contexts/ModelContext.tsx';

export const useModel = () => useContext(ModelContext);
