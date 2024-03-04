import { FC, useState } from 'react';
import styles from './EditingModel.module.css';
import { IModelParameter } from '../../../../models/IModel.ts';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import Button from '@components/UI/Button/Button.tsx';

interface EditingModelProps {
  startId: number;
  model: IModelParameter[];
  onComplete: () => void;
}
const EditingModel: FC<EditingModelProps> = ({ startId, model, onComplete }) => {
  const [edited, setEdited] = useState<number[]>([]);
  const [newModel, setNewModel] = useState<IModelParameter[]>([...model]);
  const scrollRef = useScroll();
  const onValueChange = (value: number, id: number) => {
    if (model[id].value !== value) setEdited([...edited, id]);
    setNewModel(
      newModel.map((m, idx) => {
        if (idx == id) return { ...m, value: value } as IModelParameter;
        return m;
      }),
    );
  };
  const onDone = () => {
    //here save new model
    onComplete();
  };
  const onCancel = () => {
    //here save new model
    onComplete();
  };
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' />
      <p className={styles.tip}>Диапазон модели 3200-3500</p>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <tbody>
            {model.map(({ name, value }, i) => (
              <ModelParameters
                key={i}
                name={name}
                value={value}
                isEditing={true}
                isEdited={edited.includes(i)}
                startFocus={startId === i}
                onValueChange={(value) => onValueChange(value, i)}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.btnContainer}>
          <Button className={styles.button} onClick={onCancel}>
            Отменить
          </Button>
          <Button className={styles.button} onClick={onDone}>
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditingModel;
