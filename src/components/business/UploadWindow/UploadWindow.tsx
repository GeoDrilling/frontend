import { FC, useEffect, useState } from 'react';
import styles from './UploadWindow.module.css';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';
import ProjectService from '../../../services/ProjectService.ts';
import { initSelection, Selections } from '../../../models/Selection.ts';
import { useUploadContext } from '../../../hooks/context/useUploadContext.ts';
import RightSideUpload from '@components/business/UploadWindow/RightSideUpload.tsx';
import LogData from '@components/business/UploadWindow/LogData.tsx';
import TrajectoryData from '@components/business/UploadWindow/TrajectoryData.tsx';
import { SootOutResponse } from '../../../models/SootOutResponse.ts';
import { useScroll } from '../../../hooks/useScroll.tsx';
import Button from '@components/UI/Button/Button.tsx';
import { useContextualSettings } from '../../../hooks/context/useContextualSettings.ts';
import { OrderModelCurveMain, OrderTabletGroups, OrderTabletMain } from '../../../utils/ContextualSettingsConstatns.ts';
import { DEPTH } from '../../../utils/utils.tsx';
import { IProjectState } from '../../../models/IProject.ts';
import { useModel } from '../../../hooks/context/useModel.ts';
import { useGradientContext } from '../../../hooks/context/useGradientContext.ts';

const UploadWindow: FC = () => {
  const { id, curves, getCurveData, setTvdName } = useProjectContext();
  const { models } = useModel();
  const { gradient } = useGradientContext();
  const {
    updateProperty,
    setTableProperties,
    setModelCurveProperties,
    tracksProperties,
    depthTrackProperties,
    modelCurveProperties,
  } = useContextualSettings();
  const curveNames = ['--', ...curves.map((curve) => curve.name)];
  const { setVisible, transformDataToSelections } = useUploadContext();
  const [selections, setSelections] = useState<Selections>(initSelection);

  const [cellClicked, setCellClicked] = useState(false);
  const [clickedZone, setClickedZone] = useState('--');
  const [clickedColumn, setClickedColumn] = useState(0);

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
    try {
      const response = await ProjectService.sootOut(id);
      const newSelections = transformDataToSelections(checkAndReplaceNulls(response.data));
      setSelections(newSelections);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };
  useEffect(() => {
    console.log('new curves length');
    loadSelections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curves.length]);

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
  const handleSelectionChange = (newValue: string) => {
    const name = clickedZone;
    if (newValue === '--') {
      if (clickedColumn === 1) {
        setSelections((prevSelections) => ({
          ...prevSelections,
          [name]: {
            ...prevSelections[name],
            selection1: newValue,
            state1: 3,
          },
        }));
      } else {
        setSelections((prevSelections) => ({
          ...prevSelections,
          [name]: {
            ...prevSelections[name],
            selection2: newValue,
            state2: 3,
          },
        }));
      }
    } else {
      checkAndModifySelection(newValue, name);
    }
  };
  const checkAndModifySelection = (checkValue: string, name2: string) => {
    const newValue = '--';
    for (const name in selections) {
      const currentSelection = selections[name].selection1;
      if (currentSelection === checkValue) {
        setSelections((prevSelections) => ({
          ...prevSelections,
          [name]: {
            ...prevSelections[name],
            selection1: newValue,
          },
        }));
        break;
      }
      const currentSelection2 = selections[name].selection2;
      if (currentSelection2 === checkValue) {
        setSelections((prevSelections) => ({
          ...prevSelections,
          [name]: {
            ...prevSelections[name],
            selection2: newValue,
          },
        }));
        break;
      }
    }
    if (clickedColumn === 1) {
      setSelections((prevSelections) => ({
        ...prevSelections,
        [name2]: {
          ...prevSelections[name2],
          selection1: checkValue,
          state1: 3,
        },
      }));
    } else {
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
  const handleSelectionComplete = async () => {
    await ProjectService.sootRename(id, selections);
    setVisible(false);
    const tvdName = selections['Глубина'].selection1;
    if (tvdName !== '--') setTvdName(tvdName);
    const tvdData = tvdName !== '--' ? await getCurveData(id, tvdName, false) : undefined;
    setSelections({});
    const deptData = await getCurveData(id, DEPTH, false);
    if (tvdData) {
      setModelCurveProperties((prev) => {
        const updateProperties = updateProperty(
          Math.round(Math.max(...tvdData) * 10) / 10,
          0,
          OrderModelCurveMain.MAX,
          prev.properties,
        );
        return {
          properties: updateProperty(
            Math.round(Math.min(...tvdData) * 10) / 10,
            0,
            OrderModelCurveMain.MIN,
            updateProperties,
          ),
        };
      });
    }
    if (deptData) {
      const minDept = Math.round(Math.min(...deptData) * 10) / 10;
      const maxDept = Math.round(Math.max(...deptData) * 10) / 10;

      setTableProperties((prev) => {
        let updateProperties = updateProperty(
          minDept,
          OrderTabletGroups.MAIN,
          OrderTabletMain.START_DEPTH,
          prev.properties,
        );
        updateProperties = updateProperty(maxDept, OrderTabletGroups.MAIN, OrderTabletMain.END_DEPTH, updateProperties);
        updateProperties = updateProperty(
          Math.round((maxDept - minDept) * 3.74),
          OrderTabletGroups.MAIN,
          OrderTabletMain.SCOPE,
          updateProperties,
        );
        const state: IProjectState = {
          id,
          tabletProperties: { properties: updateProperties },
          trackProperties: tracksProperties,
          curvesNames: curves.map((c) => c.name),
          modelDTOList: models,
          depthTrackProperties,
          modelCurveProperties: {
            properties: modelCurveProperties.properties,
            gradient: gradient,
          },
        };
        ProjectService.saveProjectState(state);
        return {
          properties: updateProperties,
        };
      });
    }
    curves
      .filter((c) => c.name !== DEPTH && c.name !== tvdName && c.data && c.data.length > 0)
      .forEach((c) => {
        console.log('in mapping curves - ', c);
        getCurveData(id, c.name, false);
      });
  };
  const scrollRef = useScroll();
  return (
    <div className={styles['content-container']}>
      <div className={styles.leftSide} ref={scrollRef}>
        <div className={styles['table-container']}>
          <LogData
            handleCellClick={handleCellClick}
            clickedZone={clickedZone}
            clickedColumn={clickedColumn}
            selections={selections}
          />
          <TrajectoryData
            handleCellClick={handleCellClick}
            clickedZone={clickedZone}
            clickedColumn={clickedColumn}
            selections={selections}
          />
          <Button onClick={handleSelectionComplete} className={styles.button}>
            Завершить
          </Button>
        </div>
      </div>
      <RightSideUpload cellClicked={cellClicked} handleCurveClick={handleSelectionChange} curveNames={curveNames} />
    </div>
  );
};

export default UploadWindow;
