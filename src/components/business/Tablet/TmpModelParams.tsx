import {FC} from 'react';
import {IModel} from "../../../models/IModel.ts";
interface TmpModelProps {
  model: IModel
}
const TmpModelParams: FC<TmpModelProps> = ({model}) => {
  return (
    <div style={{
      textAlign: 'center',
      paddingTop: '20px'
    }}>
      <p>misfit: {model.outputModel.misfit}</p>
      <p>kanisotropyDown: {model.outputModel.kanisotropyDown}</p>
      <p>roDown: {model.outputModel.roDown}</p>
      <p>kanisotropyUp: {model.outputModel.kanisotropyUp}</p>
      <p>roUp: {model.outputModel.roUp}</p>
      <p>alpha: {model.outputModel.alpha}</p>
      <p>tvdStart: {model.outputModel.tvdStart}</p>
    </div>
  );
};


export default TmpModelParams;