import { FC, useEffect } from 'react';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import styles from './StartModel.module.css';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import { suffixes } from '@components/business/Models/ModelConstants.ts';
import Button from '@components/UI/Button/Button.tsx';
import { useNewModelParams } from '../../../../hooks/useModelParams.tsx';
import { useModel } from '../../../../hooks/context/useModel.ts';
import { useProjectContext } from '../../../../hooks/context/useProjectContext.ts';

interface StartModelProps {
  toParametersRange: () => void;
  toList: () => void;
}

const StartModel: FC<StartModelProps> = ({ toList, toParametersRange }) => {
  const newModelParams = useNewModelParams();
  const { id, updateCurves } = useProjectContext();
  const { setNewModel, newModel, buildStartModel, modelParamToModel, saveModel, models, currentId, clearNewModel } =
    useModel();
  const scrollRef = useScroll();

  useEffect(() => {
    if (!newModel) setNewModel(models[currentId]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models, currentId]);
  const onValueChange = (name: string, value?: number) => {
    if (!value) return;
    setNewModel({
      ...modelParamToModel(
        [...newModelParams].map((p) => {
          if (p.name === name) return { value, name };
          return p;
        }),
      ),
      start: newModel?.start == null ? 0 : newModel?.start,
      end: newModel?.end == null ? 0 : newModel?.end,
    });
  };
  const backToStartParams = async () => {
    const model = await buildStartModel(
      id,
      newModel?.start ? newModel?.start : 0,
      newModel?.end ? newModel?.end : 4000,
    );
    if (model) setNewModel(model);
  };

  const onDone = async () => {
    const synthetic = await saveModel(id, newModel!);
    if (synthetic) {
      console.log('synthetic exists');
      updateCurves(synthetic);
    }
    clearNewModel();
    toList();
  };
  const onCancel = () => {
    clearNewModel();
    toList();
  };
  return (
    <div className={styles.container}>
      <ModelHeader
        title='Test name'
        rightImage='/src/assets/images/icon_done.svg'
        leftImage='/src/assets/images/icon_cancel.svg'
        onRightClick={onDone}
        onLeftClick={onCancel}
        rightImageClassName={styles.done}
        leftImageClassName={styles.cancel}
      />
      <p className={styles.tip}>
        Диапазон модели {newModel ? newModel.start : 0}-{newModel ? newModel.end : 0}
      </p>
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <tbody>
            {newModelParams.map(({ name, value }, id) => (
              <ModelParameters
                key={name}
                name={name}
                value={value}
                isEditing={true}
                suffix={suffixes[id] ? suffixes[id] : undefined}
                onValueChange={(value) => onValueChange(name, value)}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.btnContainer}>
          <Button className={styles.button} onClick={toParametersRange}>
            Подбор параметров
          </Button>
          <Button className={styles.button} onClick={backToStartParams}>
            Сброс параметров
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartModel;
