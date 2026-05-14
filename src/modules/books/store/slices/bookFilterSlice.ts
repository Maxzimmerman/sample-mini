import type { StateCreator } from 'zustand';

import type { BookStatus } from '../../types';
import type { BooksStore } from '../useBooksStore';

export type StatusFilter = BookStatus | 'all';

export interface BookFilterSlice {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

export const createBookFilterSlice =
  (): StateCreator<BooksStore, [], [], BookFilterSlice> =>
  (set) => ({
    statusFilter: 'all',
    setStatusFilter: (status) => set({ statusFilter: status }),
  });
