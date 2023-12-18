import { useContext } from 'react';
import { WindowsContext } from '../../contexts/WindowsContext.tsx';

export const useWindows = () => useContext(WindowsContext);
