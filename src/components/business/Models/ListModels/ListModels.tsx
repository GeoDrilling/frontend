import { FC } from 'react';
import { IModelParameter } from '../../../../models/IModel.ts';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import styles from './ListModels.module.css';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useScroll } from '../../../../hooks/useScroll.tsx';

interface ListModelsProps {
  model: IModelParameter[];
  onValueClick?: (id: number) => void;
}

const ListModels: FC<ListModelsProps> = ({ model, onValueClick }) => {
  const scrollRef = useScroll();
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
            {model.map(({ name, value }, id) => (
              <ModelParameters
                name={name}
                value={value}
                key={name}
                onValueClick={() => (onValueClick ? onValueClick(id) : undefined)}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.btnContainer}>
          <Button className={styles.button}>Режим подбора параметров</Button>
          <Button className={styles.button}>Добавить новую модель</Button>
        </div>
      </div>
    </div>
  );
};

export default ListModels;
