import { FC, useEffect } from 'react';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import styles from './ListModels.module.css';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import { suffixes } from '@components/business/Models/ModelConstants.ts';
import { useModel } from '../../../../hooks/context/useModel.ts';
import { useModelParams } from '../../../../hooks/useModelParams.tsx';

interface ListModelsProps {
  onValueClick?: (id: number) => void;
  toNewModel: () => void;
  toChoosingParameters: () => void;
}

const ListModels: FC<ListModelsProps> = ({ onValueClick, toNewModel, toChoosingParameters }) => {
  const { currentId, setCurrentId, models } = useModel();
  const modelParams = useModelParams();
  useEffect(() => {
    if (currentId == -1) {
      setCurrentId(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const scrollRef = useScroll();
  const back = () => {
    if (currentId - 1 >= 0) setCurrentId(currentId - 1);
    else setCurrentId(models.length - 1);
  };
  const next = () => {
    if (currentId + 1 < models.length) setCurrentId(currentId + 1);
    else setCurrentId(0);
  };
  return (
    <div className={styles.container}>
      <ModelHeader
        title='Test name'
        leftImage='/src/assets/images/icon_arrow_left.svg'
        onLeftClick={back}
        onRightClick={next}
        rightImage='/src/assets/images/icon_arrow_right.svg'
        titleImage='/src/assets/images/icon_edit_model_name.svg'
      />
      <p className={styles.tip}>
        Диапазон модели {models[currentId].start}-{models[currentId].end}
      </p>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <tbody>
            {modelParams.map(({ name, value }, id) => (
              <ModelParameters
                name={name}
                value={value}
                key={name}
                suffix={suffixes[id] ? suffixes[id] : undefined}
                onValueClick={() => (onValueClick ? onValueClick(id) : undefined)}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.btnContainer}>
          <Button className={styles.button} onClick={toChoosingParameters}>
            Режим подбора параметров
          </Button>
          <Button className={styles.button} onClick={toNewModel}>
            Добавить новую модель
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListModels;
