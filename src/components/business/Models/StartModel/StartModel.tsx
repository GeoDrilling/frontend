import { FC, useState } from 'react';
import { IModelParameter } from '../../../../models/IModel.ts';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import styles from './StartModel.module.css';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import { suffixes } from '@components/business/Models/ModelConstants.ts';
import Button from '@components/UI/Button/Button.tsx';

interface StartModelProps {
  model: IModelParameter[];
  toList: () => void;
  toParametersRange: () => void;
  getStartModel: () => IModelParameter[];
}
const StartModel: FC<StartModelProps> = ({ model, getStartModel, toParametersRange, toList }) => {
  const [newModel, setNewModel] = useState<IModelParameter[]>([...model]);
  const scrollRef = useScroll();
  const onValueChange = (value: number, id: number) => {
    setNewModel(
      newModel.map((m, idx) => {
        if (idx == id) return { ...m, value: value } as IModelParameter;
        return m;
      }),
    );
  };
  return (
    <div className={styles.container}>
      <ModelHeader
        title='Test name'
        rightImage='/src/assets/images/icon_done.svg'
        onRightClick={toList}
        rightImageClassName={styles.done}
      />
      <p className={styles.tip}>Диапазон модели 3200-3500</p>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <tbody>
            {newModel.map(({ name, value }, id) => (
              <ModelParameters
                key={id}
                name={name}
                value={value}
                isEditing={true}
                suffix={suffixes[id] ? suffixes[id] : undefined}
                onValueChange={(value) => onValueChange(value, id)}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.btnContainer}>
          <Button className={styles.button} onClick={toParametersRange}>
            Подбор параметров
          </Button>
          <Button className={styles.button} onClick={() => setNewModel(getStartModel())}>
            Вернуться к стартовым параметрам
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartModel;
