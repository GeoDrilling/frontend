import { FC, useEffect, useRef } from 'react';
import { IModelParams } from '../../../../models/IModel.ts';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import styles from './ListModels.module.css';
import { useOverlayScrollbars } from 'overlayscrollbars-react';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';

interface ListModelsProps {
  model: IModelParams;
}

const ListModels: FC<ListModelsProps> = () => {
  const scrollRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialize, _] = useOverlayScrollbars({ defer: true });
  useEffect(() => {
    if (scrollRef.current) {
      initialize(scrollRef.current);
    }
  }, [initialize]);
  return (
    <div className={styles.container}>
      <ModelHeader
        title='Test name'
        leftImage='/src/assets/images/icon_arrow_left.svg'
        rightImage='/src/assets/images/icon_arrow_right.svg'
        titleImage='/src/assets/images/icon_edit_model_name.svg'
      />
      <p className={styles.tip}>Диапазон модели 3200-3500</p>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <tbody>
            <ModelParameters name='УЭС пласта' value={123} />
            <ModelParameters name='УЭС вмещающего пласта' value={123} />
            <ModelParameters name='Анизотропия пласта' value={123} />
            <ModelParameters name='Анизотропия вмещающего пласта' value={123} />
            <ModelParameters name='Угол наклона границы' value={123} />
            <ModelParameters name='Граница' value={123} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListModels;
