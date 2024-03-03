import styles from './ModelWindow.module.css';
import { FCC } from '../../../types/types.tsx';
import classNames from 'classnames';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';

interface ModelWindowProps {
  className?: string;
}
const ModelWindow: FCC<ModelWindowProps> = ({ className }) => {
  const { toggleModel } = useWindows();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_model.svg'} title={'Модели'} closeWindow={toggleModel} />
      <div className={styles.boxContent}></div>
    </div>
  );
};

export default ModelWindow;
