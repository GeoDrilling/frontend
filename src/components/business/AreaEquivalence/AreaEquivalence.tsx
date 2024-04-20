import { FC, useMemo, useState } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import ListModelsAreaEq from '@components/business/AreaEquivalence/ListModelsAreaEq/ListModelsAreaEq.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import { ALPHA, KANISOTROPY_DOWN, KANISOTROPY_UP, RO_DOWN, RO_UP } from '../../../utils/CurveMappingConst.ts';
import { useModel } from '../../../hooks/context/useModel.ts';
import { useScroll } from '../../../hooks/useScroll.tsx';
import { IAreaEq } from '../../../models/IModel.ts';
import SettingsAreaEquivalence from '@components/business/AreaEquivalence/SettingsAreaEquivalence/SettingsAreaEquivalence.tsx';

interface AreaEquivalenceProps {
  className?: string;
}
interface IWindow {
  isLoading: boolean;
  isList: boolean;
  isImage: boolean;
  isSettings: boolean;
}

const AreaEquivalence: FC<AreaEquivalenceProps> = ({ className }) => {
  const defaultWindows: IWindow = useMemo(() => {
    return {
      isList: false,
      isImage: false,
      isLoading: false,
      isSettings: false,
    };
  }, []);

  const { toggleAreaEquivalence } = useWindows();
  const { isLoadingImage, createAreaEq, currentId, models } = useModel();
  const [image, setImage] = useState<string>('');
  const [buildArea, setBuildArea] = useState<IAreaEq>({
    param1: 'ro_up',
    param2: 'ro_down',
    range: 5,
    level: [],
  });
  const [windows, setWindows] = useState<IWindow>({ ...defaultWindows, isList: true });

  const buildAreaEq = async () => {
    const lastScreen = windows;
    setWindows({ ...defaultWindows, isLoading: true });
    const url = await createAreaEq(models[currentId].idModel, buildArea);
    if (url) toImage(url);
    else setWindows(lastScreen);
  };
  const toImage = (url: string) => {
    setImage(url);
    setWindows({ ...defaultWindows, isImage: true });
  };
  const toSettings = (first: string, second: string) => {
    setBuildArea({ ...buildArea, param1: fullNameToShort(first), param2: fullNameToShort(second) });
    setWindows({ ...defaultWindows, isSettings: true });
  };
  const toList = () => {
    setWindows({ ...defaultWindows, isList: true });
  };
  const fullNameToShort = (name: string): string => {
    let short;
    switch (name) {
      case RO_UP: {
        short = 'ro_up';
        break;
      }
      case RO_DOWN: {
        short = 'ro_down';
        break;
      }
      case KANISOTROPY_DOWN: {
        short = 'kanisotropy_down';
        break;
      }
      case KANISOTROPY_UP: {
        short = 'kanisotropy_up';
        break;
      }
      case ALPHA: {
        short = 'alpha';
        break;
      }
      default: {
        short = 'tvd_start';
      }
    }
    return short;
  };
  const scrollRef = useScroll();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader
        image={'/src/assets/images/icon_area_eq.svg'}
        title={'Области эквивалентности'}
        closeWindow={toggleAreaEquivalence}
      />
      {windows.isLoading && <div className={styles.textContainer}>Идёт построение...</div>}
      {windows.isImage && !isLoadingImage && (
        <div className={styles.test}>
          <ModelHeader
            title='Test name'
            rightImage='/src/assets/images/icon_done.svg'
            rightImageClassName={styles.done}
            onLeftClick={toList}
            onRightClick={toList}
          />
          <div ref={scrollRef}>
            <div className={styles.imagBox}>
              <img src={image} alt={'img'} className={styles.image} />
            </div>
          </div>
        </div>
      )}
      {windows.isList && <ListModelsAreaEq toSettings={toSettings} toImage={toImage} />}
      {windows.isSettings && (
        <SettingsAreaEquivalence
          buildArea={buildArea}
          setBuildArea={setBuildArea}
          createArea={buildAreaEq}
          onBack={toList}
        />
      )}
    </div>
  );
};

export default AreaEquivalence;
