import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FrozenProject } from '../models/IProject.ts';

export const useFiltered = <T,>(items: T[], query: string, filter: (item: T, query: string) => boolean) => {
  return useMemo(() => {
    return items.filter((i) => filter(i, query));
  }, [items, query, filter]);
};
export const useSorted = (
  items: FrozenProject[],
  byNameStartValue: boolean,
  isAscendingStartValue: boolean,
): [
  newItems: FrozenProject[],
  byName: boolean,
  setByName: Dispatch<SetStateAction<boolean>>,
  isAscending: boolean,
  setIsAscending: Dispatch<SetStateAction<boolean>>,
] => {
  const [byName, setByName] = useState(byNameStartValue);
  const [isAscending, setIsAscending] = useState(isAscendingStartValue);

  const newItems = useMemo(() => {
    if (byName) {
      if (isAscending) return [...items].sort((a, b) => a.name.localeCompare(b.name));
      else return [...items].sort((a, b) => b.name.localeCompare(a.name));
    } else {
      if (isAscending) return [...items].sort((a, b) => a.maxDepth - b.maxDepth);
      else return [...items].sort((a, b) => b.maxDepth - a.maxDepth);
    }
  }, [items, byName, isAscending]);
  return [newItems, byName, setByName, isAscending, setIsAscending];
};
