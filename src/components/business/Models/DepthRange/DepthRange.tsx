import { FC } from 'react';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import styles from './DepthRange.module.css';
import classNames from 'classnames';
import InputNumber from '@components/business/Models/InputNumber/InputNumber.tsx';
import Button from '@components/UI/Button/Button.tsx';

interface DepthRangeProps {
  toChoosingStart: () => void;
  toBack: () => void;
  startValue: number;
  endValue: number;
  onChangeStartValue: (value: number) => void;
  onChangeEndValue: (value: number) => void;
}
const DepthRange: FC<DepthRangeProps> = ({
  toBack,
  toChoosingStart,
  startValue,
  endValue,
  onChangeStartValue,
  onChangeEndValue,
}) => {
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' leftImage='/src/assets/images/icon_arrow_left.svg' onLeftClick={toBack} />
      <p className={classNames(styles.tip, styles.text)}>Укажите диапазон отхода модели</p>
      <div className={styles.parametersContainer}>
        <div className={styles.row}>
          <p className={classNames(styles.text, styles.name)}>Начальное значение</p>
          <div className={styles.value}>
            <InputNumber changeValue={onChangeStartValue} parameterValue={startValue} suffix='м' />
          </div>
        </div>
        <div className={styles.row}>
          <p className={classNames(styles.text, styles.name)}>Конечное значение</p>
          <div className={styles.value}>
            <InputNumber changeValue={onChangeEndValue} parameterValue={endValue} suffix='м' />
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
