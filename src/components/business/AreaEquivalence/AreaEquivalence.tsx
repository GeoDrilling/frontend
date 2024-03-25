import { FC, useState } from 'react';
import styles from './AreaEquivalence.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import ListModelsAreaEq from '@components/business/AreaEquivalence/ListModelsAreaEq/ListModelsAreaEq.tsx';
import ModelHeader from '@components/business/Models/ModelHeader/ModelHeader.tsx';
import { ALPHA, KANISOTROPY_DOWN, KANISOTROPY_UP, RO_DOWN, RO_UP } from '../../../utils/CurveMappingConst.ts';
import { useModel } from '../../../hooks/context/useModel.ts';
import { useScroll } from '../../../hooks/useScroll.tsx';

interface AreaEquivalenceProps {
  className?: string;
}

const AreaEquivalence: FC<AreaEquivalenceProps> = ({ className }) => {
  const { toggleAreaEquivalence } = useWindows();
  const { isLoadingImage, createAreaEq, currentId, models } = useModel();
  const [image, setImage] = useState<string>('');
  const [step, setStep] = useState<number>(5);
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const buildAreaEq = async (first: string, second: string) => {
    setIsShowImage(true);
    const url = await createAreaEq(models[currentId].idModel, fullNameToShort(first), fullNameToShort(second), step);
    if (url) setImage(url);
    else setIsShowImage(false);
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
      {isLoadingImage && <div className={styles.textContainer}>Идёт построение...</div>}
      {isShowImage && !isLoadingImage && (
        <div className={styles.test}>
          <ModelHeader
            title='Test name'
            leftImage='/src/assets/images/icon_cancel.svg'
            rightImage='/src/assets/images/icon_done.svg'
            leftImageClassName={styles.cancel}
            rightImageClassName={styles.done}
            onLeftClick={() => setIsShowImage(false)}
            onRightClick={() => setIsShowImage(false)}
          />
          <div ref={scrollRef}>
            <div className={styles.imagBox}>
              <img src={image} alt={'img'} className={styles.image} />
            </div>
          </div>
        </div>
      )}
      {!isShowImage && <ListModelsAreaEq step={step} setStep={setStep} buildAreaEq={buildAreaEq} />}
    </div>
  );
};

export default AreaEquivalence;
