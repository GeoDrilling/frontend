import { FC } from 'react';
import styles from '@components/business/UploadWindow/UploadWindow.module.css';
import Input from '@components/UI/Input/Input.tsx';
import { useInput } from '../../../hooks/useInput.tsx';
import { useFiltered } from '../../../hooks/useFiltered.tsx';
import { useScroll } from '../../../hooks/useScroll.tsx';

interface RightSideUploadProps {
  cellClicked: boolean;
  handleCurveClick: (curveName: string) => void;
  curveNames: string[];
}

const RightSideUpload: FC<RightSideUploadProps> = ({ cellClicked, handleCurveClick, curveNames }) => {
  const curveName = useInput('');
  curveName.input.placeholder = 'Название кривой';
  const filteredCurves = useFiltered(curveNames, curveName.input.value, (curve, query) =>
    curve.toLowerCase().includes(query.toLowerCase()),
  );
  const scrollRef = useScroll();
  return (
    <div className={styles['container']}>
      {cellClicked ? (
        <div className={styles.rightWrapper}>
          <div className={styles.title}>Список кривых</div>
          <div className={styles['curves-container']}>
            <Input inputOutput={curveName} inputClassName={styles.input} className={styles.inputContainer} />
            <div ref={scrollRef} className={styles.scrollRef}>
              <ul className={styles['curves-list']}>
                {filteredCurves.map((curve) => (
                  <li key={curve} onClick={() => handleCurveClick(curve)} className={styles['curve-item']}>
                    {curve}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.tip}>Выберите ячейку, которой хотели бы сопоставить кривую из вашего файла</div>
      )}
    </div>
  );
};

export default RightSideUpload;
