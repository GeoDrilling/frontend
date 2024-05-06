import { IContainerGroupProperties, IGradient } from '../../../../models/ContextualSettingsTypes.ts';
import { FC } from 'react';
import { useScroll } from '../../../../hooks/useScroll.tsx';
import styles from './ModelCurveProperties.module.css';
import Properties from '@components/business/ContextualSettings/Properties/Properties.tsx';
import GradientPicker from '@components/business/GradientPicker/GradientPicker.tsx';
import { useGradientContext } from '../../../../hooks/context/useGradientContext.ts';

interface ModelCurveProperties {
  modelCurveProps: IContainerGroupProperties;
  changeProperty: (value: number | string, indexGroup: number, indexProp: number) => void;
  changeGradient: (value: IGradient[]) => void;
}
const ModelCurveProperties: FC<ModelCurveProperties> = ({ modelCurveProps, changeProperty, changeGradient }) => {
  const { gradient } = useGradientContext();
  const scrollRef = useScroll();
  return (
    <div ref={scrollRef} className={styles.scroll}>
      <div className={styles.container}>
        <Properties groups={modelCurveProps.properties} changeProperty={(v, id, ip) => changeProperty(v!, id, ip)} />
        <GradientPicker onChangeGradient={changeGradient} state={gradient} />
      </div>
    </div>
  );
};
export default ModelCurveProperties;
