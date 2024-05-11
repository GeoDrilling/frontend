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
import { IHistoryAreaEq } from '../../../../models/IModel.ts';
import ProjectService from '../../../../services/ProjectService.ts';
import {
  ALPHA,
  KANISOTROPY_DOWN,
  KANISOTROPY_UP,
  RO_DOWN,
  RO_UP,
  TVD_START,
} from '../../../../utils/CurveMappingConst.ts';

interface ListModelsAreaEqProps {
  className?: string;
  toSettings: (first: string, second: string) => void;
  toImage: (url: string) => void;
}

const ListModelsAreaEq: FC<ListModelsAreaEqProps> = ({ className, toSettings, toImage }) => {
  const { currentId, setCurrentId, models } = useModel();
  const [selected, setSelected] = useState<string[]>([]);
  const modelParams = useModelParams();
  const [history, setHistory] = useState<IHistoryAreaEq[]>([]);
  useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId]);
  const getHistory = async () => {
    const response = await ProjectService.getHistoryAreas(models[currentId].idModel);
    setHistory(response.data);
  };
  const mapName = (name: string): string => {
    switch (name) {
      case 'ro_up':
        return RO_UP;
      case 'ro_down':
        return RO_DOWN;
      case 'kanisotropy_up':
        return KANISOTROPY_UP;
      case 'kanisotropy_down':
        return KANISOTROPY_DOWN;
      case 'alpha':
        return ALPHA;
      case 'tvd_start':
        return TVD_START;
      default:
        return RO_UP;
    }
  };
  const back = () => {
    if (currentId - 1 >= 0) setCurrentId(currentId - 1);
    else setCurrentId(models.length - 1);
  };
  const next = () => {
    if (currentId + 1 < models.length) setCurrentId(currentId + 1);
    else setCurrentId(0);
  };
  const onItemClick = async (historyId: number) => {
    const response = await ProjectService.getAreas(models[currentId].idModel, historyId);
    const url = URL.createObjectURL(response.data);

    if (url) toImage(url);
  };

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
        onLeftClick={back}
        onRightClick={next}
        rightImage='/src/assets/images/icon_arrow_right.svg'
      />
      <p className={styles.tip}>
        Диапазон модели {models[currentId].start}-{models[currentId].end}
      </p>
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
          <div className={styles.flex}>
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
          <div>
            {selected.length != 2 && history.length > 0 && (
              <div className={styles.history}>
                <h2 className={styles.title}>История областей эквивалентности</h2>
                {history.map((h) => (
                  <div className={styles.itemBox} onClick={() => onItemClick(h.number)}>
                    <div>
                      <p className={styles.item}>{mapName(h.param1)}</p>
                      <p className={styles.item}>{mapName(h.param2)}</p>
                    </div>
                    <p className={styles.grid}>Сетка: {h.gridFrequency}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListModelsAreaEq;
