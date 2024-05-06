import { useContext } from 'react';
import { GradientContext } from '../../contexts/GradientContext.tsx';

export const useGradientContext = () => useContext(GradientContext);
