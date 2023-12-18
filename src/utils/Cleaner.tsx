import { Dispatch, SetStateAction } from 'react';
import { FCC } from '../types/types.tsx';
interface CleanerProps {
  clean: Dispatch<SetStateAction<string>>[];
}
const Cleaner: FCC<CleanerProps> = ({ children, clean }) => {
  const cleanContext = () => {
    clean.forEach((setter) => setter(''));
  };
  return <div onClick={cleanContext}>{children}</div>;
};

export default Cleaner;
