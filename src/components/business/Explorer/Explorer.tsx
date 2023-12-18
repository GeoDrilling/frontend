import { FC } from 'react';
import styles from './Explorer.module.css';
import WindowHeader from '@components/business/WindowHeader/WindowHeader.tsx';
import classNames from 'classnames';
import { useWindows } from '../../../hooks/context/useWindows.ts';
import FilesTree from '@components/business/FilesTree/FilesTree.tsx';
interface ExplorerProps {
  className?: string;
}
const Explorer: FC<ExplorerProps> = ({ className }) => {
  const { toggleExplorer } = useWindows();
  return (
    <div className={classNames(styles.container, className)}>
      <WindowHeader
        image={'/src/assets/images/icon_explorer.svg'}
        title={'Браузер проекта'}
        closeWindow={toggleExplorer}
      />
      <div className={styles.boxExplorer}>
        <FilesTree />
      </div>
    </div>
  );
};

export default Explorer;
