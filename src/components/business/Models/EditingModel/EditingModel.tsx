import { FC, useEffect, useState } from 'react';
import styles from './EditingModel.module.css';
import { IModelParameter } from '../../../../models/IModel.ts';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { suffixes } from '@components/business/Models/ModelConstants.ts';
import { useModel } from '../../../../hooks/context/useModel.ts';
import { useProjectContext } from '../../../../hooks/context/useProjectContext.ts';

interface EditingModelProps {
  startId: number;
  onComplete: () => void;
}
const EditingModel: FC<EditingModelProps> = ({ startId, onComplete }) => {
  const { models, currentId } = useModel();
  const [edited, setEdited] = useState<number[]>([]);
  const [oldModel, setOldModel] = useState<IModelParameter[]>([]);
  const [newModel, setNewModel] = useState<IModelParameter[]>([]);
  const { id } = useProjectContext();
  const scrollRef = useScroll();
  const { saveModel, modelToModelParams, modelParamToModel } = useModel();
  useEffect(() => {
    const model = models[currentId];
    console.log(model);
    const modelParams = modelToModelParams(model);
    console.log(modelParams);
    setNewModel(modelParams);
    setOldModel(modelParams);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models, currentId]);
  const onValueChange = (id: number, value?: number) => {
    if (value || value === 0) {
      let formattedValue;
      try {
        formattedValue = oldModel[id].value.toPrecision(4) ? Number(oldModel[id].value.toPrecision(4)) : 0;
      } catch (e) {
        formattedValue = 0;
      }
      console.log(formattedValue, value);
      if (formattedValue !== value) setEdited([...edited, id]);
      setNewModel(
        newModel.map((m, idx) => {
          if (idx == id) return { ...m, value: value } as IModelParameter;
          return m;
        }),
      );
    }
  };
  const onDone = async () => {
    if (edited.length > 0) {
      const model = modelParamToModel(newModel);
      const start = models[currentId].start;
      const end = models[currentId].end;
      await saveModel(id, { ...model, start, end });
    }
    onComplete();
  };

  const onCancel = () => {
    onComplete();
  };
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' />
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
                isEdited={edited.includes(id)}
                startFocus={startId === id}
                suffix={suffixes[id] ? suffixes[id] : undefined}
                onValueChange={(value) => onValueChange(id, value)}
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
