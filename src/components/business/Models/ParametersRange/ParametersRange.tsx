import { FC } from 'react';
import styles from './ParametersRange.module.css';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import RangeRow from '@components/business/Models/RangeRow/RangeRow.tsx';
import classNames from 'classnames';
import Button from '@components/UI/Button/Button.tsx';

interface ParametersRangeProps {
  toBack: () => void;
  toLoading: () => void;
  parameters: ParameterRange[];
  onChange: (value: ParameterRange[]) => void;
}
interface ParameterRange {
  name: string;
  max: number;
  min: number;
}
const ParametersRange: FC<ParametersRangeProps> = ({ toBack, parameters, toLoading }) => {
  const scrollRef = useScroll();
  return (
    <div className={styles.container}>
      <ModelHeader title='Test name' onLeftClick={toBack} leftImage='/src/assets/images/icon_arrow_left.svg' />
      <div className={styles.scroll} ref={scrollRef}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headers}>
              <th className={classNames(styles.text, styles.h1)}>Параметр</th>
              <th className={classNames(styles.text, styles.h2)}>Макс</th>
              <th className={classNames(styles.text, styles.h3)}>Мин</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((p) => (
              <RangeRow key={p.name} name={p.name} max={p.max} min={p.min} />
            ))}
          </tbody>
        </table>
        <p className={styles.tip}>*Укажите пределы параметров при построении модели</p>
        <div className={styles.btnContainer}>
          <Button onClick={toLoading} className={styles.button}>
            Подобрать модель
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ParametersRange;
