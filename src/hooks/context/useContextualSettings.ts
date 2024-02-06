import { useContext } from 'react';
import { ContextualSettingsContext } from '../../contexts/ContextualSettingsContext.tsx';

export const useContextualSettings = () => useContext(ContextualSettingsContext);
