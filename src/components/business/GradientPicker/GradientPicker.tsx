import React, { FC, useCallback, useState } from 'react';
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker';
import styles from './GradientPicker.module.css';
import Button from '@components/UI/Button/Button.tsx';
import classNames from 'classnames';
import { IGradient } from '../../../models/ContextualSettingsTypes.ts';

interface GradientPickerProps {
  onChangeGradient: (value: IGradient[]) => void;
  state: IGradient[];
}
interface GradientColors {
  value: string;
  left: number;
}
const GradientPicker: FC<GradientPickerProps> = ({ onChangeGradient, state }) => {
  const [color, setColor] = useState(
    'linear-gradient(90deg' + state.map((g) => `, ${g.value} ${g.position}%`).join('') + ')',
  );
  const { getGradientObject } = useColorPicker(color, setColor);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  /*const ref = useDetectClickOutside(
    {onTriggered: () => {setShowPicker(false)},
    disableTouch: true, disableKeys: true})*/

  const onChange = useCallback(
    (value: string, setColor: React.Dispatch<React.SetStateAction<string>>) => {
      const gradient = (getGradientObject()?.colors as GradientColors[]).map(({ value, left }) => {
        return { value: value, position: left } as IGradient;
      });
      onChangeGradient(gradient);
      setColor(value);
    },
    [getGradientObject, onChangeGradient],
  );
  const onShow = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      setShowPicker: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      e.stopPropagation();
      setShowPicker(true);
    },
    [],
  );
  const onDone = () => {
    setShowPicker(false);
  };
  return (
    <div className={styles.container}>
      <div className={classNames(styles.gradientPickerContainer, showPicker ? undefined : styles.none)}>
        <ColorPicker
          value={color}
          height={250}
          onChange={(v) => onChange(v, setColor)}
          hideAdvancedSliders={true}
          hideColorTypeBtns={true}
          hideColorGuide={true}
          hideGradientAngle={true}
          hideEyeDrop={true}
          hideInputType={true}
          hideOpacity={true}
          hideGradientType={true}
        />
      </div>
      <Button
        className={classNames(styles.btn)}
        onClick={(e) => {
          showPicker ? onDone() : onShow(e, setShowPicker);
        }}
      >
        {showPicker ? 'Готово' : 'Выбрать градиент'}
      </Button>
    </div>
  );
};

export default GradientPicker;
