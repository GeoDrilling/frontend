import { FC, useCallback, useMemo } from 'react';
import styles from './FilesTree.module.css';
import { useScroll } from '../../../hooks/useScroll.tsx';
import Directory, { IDirectory, IFile } from '@components/business/FilesTree/Directory.tsx';
import { useProjectContext } from '../../../hooks/context/useProjectContext.ts';

const FilesTree: FC = () => {
  const { curves } = useProjectContext();
  const scrollRef = useScroll([curves.length]);

  const constructTree = useCallback((root: IDirectory, paths: string[][], depth: number): IDirectory => {
    const nextPaths = paths.filter((p) => p.length > depth);
    if (nextPaths.length !== 0) {
      let lastDirectoryName = nextPaths[0][depth - 1];
      let nextPathsForDirectory: string[][] = [];
      nextPaths.forEach((path) => {
        if (path[depth - 1] !== lastDirectoryName) {
          const dir = constructTree(
            { name: lastDirectoryName, files: [], isFile: false } as IDirectory,
            nextPathsForDirectory,
            depth + 1,
          );
          root.files.push(dir);
          lastDirectoryName = path[depth - 1];
          nextPathsForDirectory = [path];
        } else {
          nextPathsForDirectory.push(path);
        }
      });
      const dir = constructTree(
        { name: lastDirectoryName, files: [], isFile: false } as IDirectory,
        nextPathsForDirectory,
        depth + 1,
      );
      root.files.push(dir);
    }

    const files = paths
      .filter((p) => p.length == depth)
      .map((p) => {
        return { name: p[depth - 1], isFile: true } as IFile;
      });
    if (files.length > 0) root.files = [...root.files, ...files];

    return root;
  }, []);

  const paths = useMemo(
    () =>
      curves
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((curve) => {
          let path: string[];
          if (curve.name.startsWith('/')) path = curve.name.slice(1, curve.name.length).split('/');
          else path = curve.name.split('/');
          return path;
        }),
    [curves],
  );
  const root: IDirectory = useMemo(
    () => constructTree({ name: '', files: [], isFile: false }, paths, 1),
    [paths, constructTree],
  );
  if (curves.length <= 0) return <div className={styles.container} />;
  return (
    <div className={styles.container} ref={scrollRef}>
      <Directory dir={root} prefix={''} />
    </div>
  );
};

export default FilesTree;
