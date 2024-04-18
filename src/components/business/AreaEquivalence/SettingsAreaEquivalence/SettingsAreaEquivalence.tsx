import { FC } from 'react';
import styles from './SettingsAreaEquivalence.module.css';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import { IAreaEq } from '../../../../models/IModel.ts';
import Button from '@components/UI/Button/Button.tsx';

interface SettingsAreaEqProps {
  buildArea: IAreaEq;
  setBuildArea: (buildArea: IAreaEq) => void;
  createArea: () => void;
}
const SettingsAreaEquivalence: FC<SettingsAreaEqProps> = ({ buildArea, setBuildArea, createArea }) => {
  const scrollRef = useScroll();
  const changeColorMax = (e?: number) => {
    setBuildArea({ ...buildArea, colorMax: e });
  };
  const changeColorMin = (e?: number) => {
    setBuildArea({ ...buildArea, colorMin: e });
  };
  const removeLevel = (idx: number) => {
    setBuildArea({ ...buildArea, level: buildArea.level.filter((_, i) => i !== idx) });
  };
  const updateLevel = (idx: number, value?: number) => {
    if (value !== undefined) {
      setBuildArea({
        ...buildArea,
        level: buildArea.level.map((v, i) => {
          if (idx === i) return value;
          return v;
        }),
      });
    }
  };
  const addLevel = () => {
    setBuildArea({ ...buildArea, level: [...buildArea.level, 10] });
  };
  return (
    <div className={styles.container}>
      <div className={styles.scroll} ref={scrollRef}>
        <h1 className={styles.title}>Диапазон цветовой карты</h1>
        <table className={styles.table}>
          <tbody>
            <ModelParameters
              name={'Максимум'}
              value={buildArea.colorMax}
              isEditing={true}
              onValueChange={changeColorMax}
              isPlaceholder={true}
            />
            <ModelParameters
              name={'Минимум'}
              value={buildArea.colorMin}
              isEditing={true}
              onValueChange={changeColorMin}
              isPlaceholder={true}
            />
          </tbody>
        </table>
        <h1 className={styles.title}>Частота сетки для расчёта</h1>
        <div className={styles.sliderContainer}>
          <input
            value={buildArea.range}
            onChange={(e) => setBuildArea({ ...buildArea, range: Number(e.target.value) })}
            type='range'
            max='50'
            min='5'
            step='1'
            className={styles.slider}
          />
          <p className={styles.stepValue}>{buildArea.range}</p>
        </div>
        <h1 className={styles.title}>Уровни изолиний</h1>
        <div>
          {buildArea.level.length === 0 && (
            <p className={styles.text}>Вы не добавили уровни изолиний. Будут взяты значения по умолчанию.</p>
          )}
          {buildArea.level.length !== 0 && (
            <table className={styles.table}>
              <tbody>
                {buildArea.level.map((level, idx) => (
                  <ModelParameters
                    name={'Уровень'}
                    key={idx}
                    value={level}
                    isEditing={true}
                    onValueChange={(v) => updateLevel(idx, v)}
                    isRemovable={true}
                    onRemove={() => removeLevel(idx)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className={styles.btnContainer}>
          <Button className={styles.button} onClick={addLevel}>
            Добавить изолинию
          </Button>
          <Button onClick={createArea} className={styles.button}>
            Построить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAreaEquivalence;
