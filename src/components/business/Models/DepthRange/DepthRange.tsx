import { FC, useEffect } from 'react';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import styles from './DepthRange.module.css';
import classNames from 'classnames';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useModel } from '../../../../hooks/context/useModel.ts';

interface DepthRangeProps {
  toChoosingStart: () => void;
  toBack: () => void;
}
const DepthRange: FC<DepthRangeProps> = ({ toBack, toChoosingStart }) => {
  const { models, currentId, setNewModel, newModel, clearNewModel } = useModel();

  useEffect(() => {
    if (!newModel) setNewModel(models[currentId]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models, currentId, setNewModel]);

  if (currentId === -1) {
    toBack();
    return <div></div>;
  }
  const onChangeEndValue = (value: number) => {
    if (newModel) setNewModel({ ...newModel, end: value });
  };
  const onChangeStartValue = (value: number) => {
    if (newModel) setNewModel({ ...newModel, start: value });
  };
  const onBack = () => {
    clearNewModel();
    toBack();
  };
  if (!newModel) return <div></div>;
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' leftImage='/src/assets/images/icon_arrow_left.svg' onLeftClick={onBack} />
      <p className={classNames(styles.tip, styles.text)}>Укажите диапазон отхода модели</p>
      <div className={styles.parametersContainer}>
        <div className={styles.row}>
          <p className={classNames(styles.text, styles.name)}>Начальное значение</p>
          <div className={styles.value}>
            <InputNumber
              changeValue={onChangeStartValue}
              parameterValue={newModel.start ? newModel.start : 0}
              suffix='м'
            />
          </div>
        </div>
        <div className={styles.row}>
          <p className={classNames(styles.text, styles.name)}>Конечное значение</p>
          <div className={styles.value}>
            <InputNumber changeValue={onChangeEndValue} parameterValue={newModel.end ? newModel.end : 0} suffix='м' />
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <Button onClick={toChoosingStart} className={styles.button}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default DepthRange;
