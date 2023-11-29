import { FC } from 'react';
import styles from './Explorer.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindowsContext } from '../../../hooks/context/useWindowsContext.ts';
interface ExplorerProps {
  className?: string;
}
const Explorer: FC<ExplorerProps> = ({ className }) => {
  const { toggleExplorer } = useWindowsContext();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader
        image={'src/assets/images/icon_explorer.svg'}
        title={'Браузер проекта'}
        closeWindow={toggleExplorer}
      />
    </div>
  );
};

export default Explorer;
