import { FC, useEffect, useState } from 'react';
import styles from './UploadWindow.module.css';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import { useUploadContext } from '../../../contexts/UploadContext.tsx';
import ProjectService from '../../../services/ProjectService.ts';
import { Selections } from '../../../models/Selection.ts';

const UploadWindow: FC = () => {
  const { id, curves } = useProjectContext();
  const curveNames = ['--', ...curves.map((curve) => curve.name)];
  const { isVisible, setVisible } = useUploadContext();
  const [selections, setSelections] = useState<{
    [name: string]: { selection1: string; state1: number; selection2: string; state2: number };
  }>({
    L: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    LD: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    LE: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    H: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    HD: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    HE: {
      selection1: '--',
      state1: 0,
      selection2: '--',
      state2: 0,
    },
    Отход: {
      selection1: '--',
      state1: 0,
      selection2: '-',
      state2: 0,
    },
    Глубина: {
      selection1: '--',
      state1: 0,
      selection2: '-',
      state2: 0,
    },
    'Зенитный угол': {
      selection1: '--',
      state1: 0,
      selection2: '-',
      state2: 0,
    },
  });
  function checkAndReplaceNulls(data: SootOutResponse): SootOutResponse {
    const updatedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (value === null) {
          return [key, '--']; // Замена null на "--"
        }
        return [key, value];
      }),
    );
    return updatedData as SootOutResponse;
  }
  const loadSelections = async () => {
    console.log('Ошибка при загрузке данных:');
    try {
      const response = await ProjectService.sootOut(id);
      const newSelections = transformDataToSelections(checkAndReplaceNulls(response.data));
      setSelections(newSelections);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      // Здесь можете обработать ошибку, например, показать уведомление пользователю
    }
  };
  useEffect(() => {
    if (isVisible) loadSelections();
  }, [isVisible]);
  const transformDataToSelections = (data: SootOutResponse): Selections => {
    console.log(data);
    console.log(data.roal);
    const selections: Selections = {
      L: {
        selection1: data.roal,
        state1: data.roalp, // Исправлено с ROALp на roalp
        selection2: data.roal, // Повторение roal, возможно, нужно использовать другое поле
        state2: data.roplp, // Исправлено с ROPLp на roplp
      },
      LD: {
        selection1: data.roald,
        state1: data.roaldp,
        selection2: data.ropld,
        state2: data.ropldp,
      },
      LE: {
        selection1: data.roale,
        state1: data.roalep,
        selection2: data.rople,
        state2: data.roplep,
      },
      H: {
        selection1: data.roah,
        state1: data.roahp,
        selection2: data.roph,
        state2: data.rophp,
      },
      HD: {
        selection1: data.roahd,
        state1: data.roahdp,
        selection2: data.rophd,
        state2: data.rophdp,
      },
      HE: {
        selection1: data.roahe,
        state1: data.roahep,
        selection2: data.rophe,
        state2: data.rophep,
      },
      Отход: {
        selection1: data.x,
        state1: data.xp,
        selection2: '-',
        state2: 0,
      },
      Глубина: {
        selection1: data.tvd,
        state1: data.tvdp,
        selection2: '-',
        state2: 0,
      },
      'Зенитный угол': {
        selection1: data.zeni,
        state1: data.zenip,
        selection2: '-',
        state2: 0,
      },
    };

    return selections;
  };
  const [cellClicked, setCellClicked] = useState(false);
  const [clickedZone, setClickedZone] = useState('--');
  const [clickedColumn, setClickedColumn] = useState(0);
  const names1 = ['L', 'LD', 'LE', 'H', 'HD', 'HE'];
  const names2 = ['Отход', 'Глубина', 'Зенитный угол'];
  const handleCellClick = (zoneName: string, columnNumber: number) => {
    if (columnNumber == 1) {
      if (selections[zoneName].state1 == 7) {
        return;
      }
    } else {
      if (selections[zoneName].state2 == 7) {
        return;
      }
    }
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
                  {selections[name]?.state1 === 7 ? (
                    <div className={styles['locked']}>
                      <img src='/src/assets/images/icon/Vector.png' alt='' className={styles['icon']} />
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
                  {selections[name]?.state2 === 7 ? (
                    <div>
                      <img src='/src/assets/images/icon/Vector.png' alt='' className={styles['icon']} />
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
                  {selections[name]?.state1 === 7 ? (
                    <div className={styles['locked']}>
                      <img src='/src/assets/images/icon/Vector.png' alt='' className={styles['icon']} />
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
            <div>
              <div className={styles['header']}>Список кривых</div>
              <ul className={styles['curves-list']}>
                {curveNames.map((curve, index) => (
                  <li key={index} onClick={() => handleCurveClick(curve)} className={styles['curve-item']}>
                    {curve}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles['text']}>
              <div className={styles['text']}>
                Выберите ячейку, которой хотели бы сопоставить кривую из вашего файла
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadWindow;
