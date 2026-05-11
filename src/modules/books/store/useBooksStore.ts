import { create } from '@src/storeRegistry';

import type { Book, BookStatus } from '../types';
import { SAMPLE_BOOKS } from '../types';
import { filterBooks } from '../utils/filterBooks';

/**
 * The books module's single Zustand store.
 *
 * Mirrors the shape of `mosaic-web/src/modules/job-details-new/store.ts`:
 * - State and actions live in the same interface.
 * - An `initialState` constant captures the resettable subset.
 * - The store is constructed via `create` from '@src/storeRegistry',
 *   NOT directly from 'zustand'.
 *
 * Read sections 2–7 of stages/03-zustand-stores/LESSON.md before editing.
 */

export type StatusFilter = BookStatus | 'all';

export interface BooksState {
  books: Book[];
  statusFilter: StatusFilter;

  addBook: (book: Book) => void;
  updateBook: (id: string, patch: Partial<Book>) => void;
  removeBook: (id: string) => void;
  setStatusFilter: (status: StatusFilter) => void;
  reset: () => void;
}

const initialState = {
  books: SAMPLE_BOOKS,
  statusFilter: 'all' as StatusFilter,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useBooksStore = create<BooksState>((set, get) => ({
  ...initialState,

  // TODO (exercise 1):
  //   - addBook: append the book to state.books. Use the functional form
  //     of set because the new state depends on the current books array.
  //   - updateBook: map state.books, replacing the book whose id matches
  //     with { ...book, ...patch }. If no id matches, leave the list unchanged.
  //   - removeBook: filter state.books by id !== removed.
  //   - setStatusFilter: trivial set({ statusFilter: status }).
  //   - reset: set(initialState) — restores books AND statusFilter.

  addBook: () => {
    throw new Error('addBook not implemented');
  },

  updateBook: () => {
    throw new Error('updateBook not implemented');
  },

  removeBook: () => {
    throw new Error('removeBook not implemented');
  },

  setStatusFilter: () => {
    throw new Error('setStatusFilter not implemented');
  },

  reset: () => {
    throw new Error('reset not implemented');
  },
}));

/**
 * Derived: the books that pass the current status filter.
 *
 * Used as a selector:  useBooksStore(selectVisibleBooks)
 *
 * Implementation note: when statusFilter is 'all', return state.books
 * directly so the selector's return value is referentially stable across
 * renders (returning a fresh filter() result would cause every render to
 * re-render every subscriber).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const selectVisibleBooks = (state: BooksState): Book[] => {
  // TODO (exercise 2):
  //   - If state.statusFilter === 'all', return state.books.
  //   - Otherwise call filterBooks(state.books, { status: state.statusFilter }).
  void filterBooks;
  throw new Error('selectVisibleBooks not implemented');
};
