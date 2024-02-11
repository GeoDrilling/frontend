import { useMemo } from 'react';
import { Project } from '../models/IProject.ts';

export const useFilteredProjects = (posts: Project[], query: string) => {
  return useMemo(() => {
    return posts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [posts, query]);
};
