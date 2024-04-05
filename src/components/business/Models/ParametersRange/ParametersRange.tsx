import { FC } from 'react';
import styles from './ParametersRange.module.css';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import RangeRow from '@components/business/Models/RangeRow/RangeRow.tsx';
import classNames from 'classnames';
import Button from '@components/UI/Button/Button.tsx';
import { useModel } from '../../../../hooks/context/useModel.ts';
import { useProjectContext } from '../../../../hooks/context/useProjectContext.ts';

interface ParametersRangeProps {
  toBack: () => void;
  toLoading: () => void;
}

const ParametersRange: FC<ParametersRangeProps> = ({ toBack, toLoading }) => {
  const scrollRef = useScroll();
  const { id } = useProjectContext();
  const { buildModel, newModel, parameters, setParameters, parametersToRange } = useModel();
  const onDone = () => {
    buildModel(
      id,
      newModel?.start ? newModel?.start : 0,
      newModel?.start ? newModel?.start : 0,
      newModel!,
      parametersToRange(parameters),
    );
    toLoading();
  };
  const onChange = (idx: number, isMin: boolean, value?: number) => {
    setParameters(
      parameters.map((v, i) => {
        if (i === idx && isMin) return { ...v, min: value };
        if (i === idx && !isMin) return { ...v, max: value };
        return v;
      }),
    );
  };
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' onLeftClick={toBack} leftImage='/src/assets/images/icon_arrow_left.svg' />
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headers}>
              <th className={classNames(styles.text, styles.h1)}>Параметр</th>
              <th className={classNames(styles.text, styles.h2)}>Мин</th>
              <th className={classNames(styles.text, styles.h3)}>Макс</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((p, idx) => (
              <RangeRow
                key={p.name}
                name={p.name}
                max={p.max}
                min={p.min}
                onChange={(isMin, v) => onChange(idx, isMin, v)}
              />
            ))}
          </tbody>
        </table>
        <p className={styles.tip}>*Укажите пределы параметров при построении модели</p>
        <div className={styles.btnContainer}>
          <Button onClick={onDone} className={styles.button}>
            Подобрать модель
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParametersRange;
