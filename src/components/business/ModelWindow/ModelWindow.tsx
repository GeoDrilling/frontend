import styles from './ModelWindow.module.css';
import { FCC } from '../../../types/types.tsx';
import classNames from 'classnames';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';

interface ModelWindowProps {
  className?: string;
}

const ModelWindow: FCC<ModelWindowProps> = ({ className }) => {
  const { toggleModel } = useWindows();
  const { depth } = useProjectContext();
  console.log(depth.length);
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_model.svg'} title={'Модели'} closeWindow={toggleModel} />
      <div className={styles.boxContent}>
        {depth.length > 0 ? (
          <div></div>
        ) : (
          <div className={styles.textContainer}>
            <p className={styles.text}>У вас пока нет ни одной модели.</p>
            <p className={styles.text}>
              Для автоматического подбора параметров модели недостаточно данных. Загрузите сигналы ВИКПБ и
              инклинометрию.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelWindow;
