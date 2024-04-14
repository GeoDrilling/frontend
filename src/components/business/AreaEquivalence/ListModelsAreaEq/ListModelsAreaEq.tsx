import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './ListModelsAreaEq.module.css';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import { useModel } from '../../../../hooks/context/useModel.ts';
import { useModelParams } from '../../../../hooks/useModelParams.tsx';
import ModelParameters from '@components/business/Models/ModelParameters/ModelParameters.tsx';
import { suffixes } from '@components/business/Models/ModelConstants.ts';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import Button from '@components/UI/Button/Button.tsx';
interface ListModelsAreaEqProps {
  className?: string;
  toSettings: (first: string, second: string) => void;
}
const ListModelsAreaEq: FC<ListModelsAreaEqProps> = ({ className, toSettings }) => {
  const { currentId, setCurrentId, models } = useModel();

  const [selected, setSelected] = useState<string[]>([]);
  const modelParams = useModelParams();
  useEffect(() => {
    if (currentId == -1) {
      setCurrentId(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onValueClick = (name: string) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((e) => e !== name));
    } else if (selected.length === 2) {
      setSelected([selected[0], name]);
    } else {
      setSelected([...selected, name]);
    }
  };
  const scrollRef = useScroll();
  if (models.length <= 0) return <div className={styles.emptyModelsText}>У вас нет ни одной модели</div>;
  return (
    <div className={classNames(className, styles.container)}>
      <ModelHeader
        title='Test name'
        leftImage='/src/assets/images/icon_arrow_left.svg'
        rightImage='/src/assets/images/icon_arrow_right.svg'
      />
      <div className={styles.contentBox}>
        <div className={styles.scroll} ref={scrollRef}>
          <table className={styles.table}>
            <tbody>
              {modelParams.map(({ name, value }, id) => (
                <ModelParameters
                  name={name}
                  value={value}
                  key={name}
                  valueClassName={selected.includes(name) ? styles.selected : undefined}
                  suffix={suffixes[id] ? suffixes[id] : undefined}
                  onValueClick={() => onValueClick(name)}
                />
              ))}
            </tbody>
          </table>
          <div>
            {selected.length == 0 && <p className={styles.tip}>*Укажите два параметра для построения тепловой карты</p>}
            {selected.length == 1 && (
              <p className={styles.tip}>*Укажите второй параметр для построения тепловой карты</p>
            )}
            {selected.length == 2 && (
              <div className={styles.btnContainer}>
                <Button className={styles.button} onClick={() => toSettings(selected[0], selected[1])}>
                  Далее
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListModelsAreaEq;
