import { FC, useState } from 'react';
import styles from './UploadWindow.module.css';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useUploadContext } from '../../../contexts/UploadContext.tsx';
import ProjectService from '../../../services/ProjectService.ts';
const UploadWindow: FC = () => {
  const { id, curves } = useProjectContext();
  const curveNames = ['--', ...curves.map((curve) => curve.name)];
  const { setVisible } = useUploadContext();
  const [selections, setSelections] = useState<{
    [name: string]: { selection1: string; state1: number; selection2: string; state2: number };
  }>({
    L: {
      selection1: 'DEPT',
      state1: 2,
      selection2: 'Нача',
      state2: 0,
    },
    LD: {
      selection1: 'SPEE',
      state1: 0,
      selection2: 'Нач',
      state2: 0,
    },
    LE: {
      selection1: 'IPRS',
      state1: 0,
      selection2: 'Начал',
      state2: 0,
    },
    H: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
  });
  const [cellClicked, setCellClicked] = useState(false);
  const [clickedZone, setClickedZone] = useState('--');
  const [clickedColumn, setClickedColumn] = useState(0);
  const names1 = ['L', 'LD', 'LE', 'H', 'HD', 'HE'];
  const names2 = ['Отход', 'Глубина', 'Зенитный угол'];
  const handleCellClick = (zoneName: string, columnNumber: number) => {
    setCellClicked(true);
    setClickedZone(zoneName);
    setClickedColumn(columnNumber);
  };
  const handleSelection1Change = (name: string, newValue: string) => {
    if (newValue === '--') {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [name]: {
          ...prevSelections[name],
          selection1: newValue,
          state1: 3,
        },
      }));
    } else {
      checkAndModifySelection1(newValue, name);
    }
  };
  const checkAndModifySelection1 = (checkValue: string, name2: string) => {
    const newValue = '--';
    let log = true;
    // Проходим по всем элементам
    for (const name in selections) {
      // eslint-disable-next-line no-prototype-builtins
      if (selections.hasOwnProperty(name)) {
        const currentSelection = selections[name].selection1;
        // Проверяем на совпадение
        if (currentSelection === checkValue) {
          log = false;
          const state = selections[name].state1;
          if (state !== 2) {
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name]: {
                ...prevSelections[name],
                selection1: newValue,
              },
            }));
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name2]: {
                ...prevSelections[name2],
                selection1: checkValue,
                state1: 3,
              },
            }));
          }
          break;
        }
        const currentSelection2 = selections[name].selection2;
        if (currentSelection2 === checkValue) {
          log = false;
          const state2 = selections[name].state2;
          if (state2 !== 2) {
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name]: {
                ...prevSelections[name],
                selection2: newValue,
              },
            }));
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name2]: {
                ...prevSelections[name2],
                selection1: checkValue,
                state1: 3,
              },
            }));
          }
          break;
        }
      }
    }
    if (log) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [name2]: {
          ...prevSelections[name2],
          selection1: checkValue,
          state1: 3,
        },
      }));
    }
  };

  const checkAndModifySelection2 = (checkValue: string, name2: string) => {
    const newValue = '--';
    let log = true;
    // Проходим по всем элементам
    for (const name in selections) {
      // eslint-disable-next-line no-prototype-builtins
      if (selections.hasOwnProperty(name)) {
        const currentSelection = selections[name].selection1;
        // Проверяем на совпадение
        if (currentSelection === checkValue) {
          log = false;
          const state = selections[name].state1;
          if (state !== 2) {
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name]: {
                ...prevSelections[name],
                selection1: newValue,
              },
            }));
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name2]: {
                ...prevSelections[name2],
                selection2: checkValue,
                state1: 3,
              },
            }));
          }
          break;
        }
        const currentSelection2 = selections[name].selection2;
        if (currentSelection2 === checkValue) {
          log = false;
          const state2 = selections[name].state2;
          if (state2 !== 2) {
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name]: {
                ...prevSelections[name],
                selection2: newValue,
              },
            }));
            setSelections((prevSelections) => ({
              ...prevSelections,
              [name2]: {
                ...prevSelections[name2],
                selection2: checkValue,
                state2: 3,
              },
            }));
          }
          break;
        }
      }
    }
    if (log) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [name2]: {
          ...prevSelections[name2],
          selection2: checkValue,
          state2: 3,
        },
      }));
    }
  };
  const handleSecondSelectionChange = (name: string, newValue: string) => {
    if (newValue === '--') {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [name]: {
          ...prevSelections[name],
          selection2: newValue,
          state1: 3,
        },
      }));
    } else {
      checkAndModifySelection2(newValue, name);
    }
  };

  const handleSelectionComplete = () => {
    // Здесь вы можете отправить выборы на сервер
    console.log('Selection s:', selections);
    ProjectService.sootRename(id, selections);
    setSelections({});
    setVisible(false);
  };

  const handleCurveClick = (curveName: string) => {
    if (clickedColumn == 1) {
      handleSelection1Change(clickedZone, curveName);
    } else {
      handleSecondSelectionChange(clickedZone, curveName);
    }
  };
  return (
    <div className={styles['content-container']}>
      <div className={styles['table-container']}>
        <table className={styles['custom-table']}>
          <caption>Данные ВИКПБ</caption>
          <thead>
            <tr>
              <th>Название зонда</th>
              <th>Амплитуда</th>
              <th>Фаза</th>
            </tr>
          </thead>
          <tbody>
            {names1.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td
                  onClick={() => handleCellClick(name, 1)}
                  className={clickedZone === `${name}` && clickedColumn == 1 ? styles.selectedCell : ''}
                >
                  {selections[name]?.state1 === 0 ? (
                    <div className={styles['locked']}>
                      <img src={'src/assets/images/earth.png'} alt='Locked' />
                      {selections[name]?.selection1 || ''}
                    </div>
                  ) : (
                    <div>{selections[name]?.selection1 || ''}</div>
                  )}
                </td>
                <td
                  onClick={() => handleCellClick(name, 2)}
                  className={clickedZone === `${name}` && clickedColumn == 2 ? styles.selectedCell : ''}
                >
                  {selections[name]?.state2 === 0 ? (
                    <div className={styles['locked']}>
                      <img src={'src/assets/images/earth.png'} alt='Locked' />
                      {selections[name]?.selection2 || ''}
                    </div>
                  ) : (
                    <div>{selections[name]?.selection2 || ''}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className={styles['custom-table']}>
          <caption>Траектория</caption>
          <thead>
            <tr>
              <th>Целевое название</th>
              <th>Амплитуда</th>
            </tr>
          </thead>
          <tbody>
            {names2.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td
                  onClick={() => handleCellClick(name, 1)}
                  className={clickedZone === `${name}` && clickedColumn == 1 ? styles.selectedCell : ''}
                >
                  {selections[name]?.state1 === 0 ? (
                    <div className={styles['locked']}>
                      <img src={'src/assets/images/earth.png'} alt='Locked' />
                      {selections[name]?.selection1 || ''}
                    </div>
                  ) : (
                    <div>{selections[name]?.selection1 || ''}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles['button']} onClick={handleSelectionComplete}>
          Завершить
        </button>
      </div>
      <div className={styles['container']}>
        <div className={styles['curves-container']}>
          {cellClicked ? (
            <ul className={styles['curves-list']}>
              {curveNames.map((curve, index) => (
                <li key={index} onClick={() => handleCurveClick(curve)} className={styles['curve-item']}>
                  {curve}
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles['text']}>Выберите ячейку, которой хотели бы сопоставить кривую из вашего файла</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadWindow;
