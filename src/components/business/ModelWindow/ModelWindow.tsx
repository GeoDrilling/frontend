import styles from './ModelWindow.module.css';
import { FCC } from '../../../types/types.tsx';
import classNames from 'classnames';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import Models from '@components/business/Models/Models.tsx';
import { useModel } from '../../../hooks/context/useModel.ts';
import { useEffect } from 'react';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import { OrderTabletMain } from '../../../utils/ContextualSettingsConstatns.ts';
import { INumberProperty } from '../../../models/ContextualSettingsTypes.ts';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';

interface ModelWindowProps {
  className?: string;
}

const ModelWindow: FCC<ModelWindowProps> = ({ className }) => {
  const { toggleModel } = useWindows();
  const { id } = useProjectContext();
  const { tabletProperties } = useContextualSettings();
  const { isVisible } = useUploadContext();
  const { getIsCurveMapped, isMapped, models, buildStartModel, saveModel } = useModel();
  useEffect(() => {
    getIsCurveMapped(id);
  }, [id, getIsCurveMapped, isVisible]);
  useEffect(() => {
    if (isMapped && models.length == 0) {
      setStartModel();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapped]);
  const setStartModel = async () => {
    const start = (tabletProperties.properties[0].properties[OrderTabletMain.START_DEPTH] as INumberProperty).value;
    const end = (tabletProperties.properties[0].properties[OrderTabletMain.END_DEPTH] as INumberProperty).value;
    const startModel = await buildStartModel(id, start, end);
    if (startModel) saveModel(id, startModel);
  };
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader image={'/src/assets/images/icon_model.svg'} title={'Модели'} closeWindow={toggleModel} />
      <div className={styles.boxContent}>
        {isMapped && models.length > 0 ? (
          <Models />
        ) : (
          <div className={styles.textContainer}>
            <p className={styles.text}>У вас пока нет ни одной модели.</p>
            <p className={styles.text}>
              Для автоматического подбора параметров модели недостаточно данных. Загрузите сигналы ВИКПБ и
              инклинометрию.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelWindow;
