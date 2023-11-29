import { useContext } from 'react';
import { WindowsContext } from '../../contexts/WindowsContext.tsx';

export const useWindowsContext = () => useContext(WindowsContext);
