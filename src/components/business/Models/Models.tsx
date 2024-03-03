import { FC } from 'react';
import styles from './Models.module.css';
import ListModels from '@components/business/Models/ListModels/ListModels.tsx';
import { IModelParams } from '../../../models/IModel.ts';

/*interface IWindows {
  isList: boolean;
  isEditing: boolean;
  isDepthRange: boolean;
  isStart: boolean;
  isParametersRange: boolean;
  isLoading: boolean
}*/

const Models: FC = () => {
  /*const [windows, setWindows] = useState<IWindows>({
    isList: true,
    isEditing: false,
    isDepthRange: false,
    isStart: false,
    isParametersRange: false,
    isLoading: false,
  })*/

  return (
    <div className={styles.container}>
      <ListModels model={{} as IModelParams} />
    </div>
  );
};

export default Models;
