import { FC } from 'react';
import styles from './ModelParameters.module.css';

interface ModelParametersProps {
  name: string;
  value: number;
}
const ModelParameters: FC<ModelParametersProps> = ({ name, value }) => {
  return (
    <tr className={styles.container}>
      <td className={styles.name}>{name}</td>
      <td className={styles.value}>{value}</td>
    </tr>
  );
};

export default ModelParameters;
