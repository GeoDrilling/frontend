import { useContext } from 'react';
import { UploadContext } from '../../contexts/UploadContext.tsx';

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('err');
  }
  return context;
};
