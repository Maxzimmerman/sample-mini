import { create } from '@src/storeRegistry';

import type { Book } from '../types';
import { SAMPLE_BOOKS } from '../types';
import { filterBooks } from '../utils/filterBooks';
import {
  createBookFilterSlice,
  type BookFilterSlice,
} from './slices/bookFilterSlice';
import {
  createBookListSlice,
  type BookListSlice,
} from './slices/bookListSlice';

export type { StatusFilter } from './slices/bookFilterSlice';

export type BooksStore = BookListSlice &
  BookFilterSlice & {
    reset: () => void;
  };

export const useBooksStore = create<BooksStore>((set, get, ...rest) => ({
  ...createBookListSlice()(set, get, ...rest),
  ...createBookFilterSlice()(set, get, ...rest),

  reset: () =>
    set({
      books: SAMPLE_BOOKS,
      statusFilter: 'all',
    }),
}));

export const selectVisibleBooks = (state: BooksStore): Book[] =>
  state.statusFilter === 'all'
    ? state.books
    : filterBooks(state.books, { status: state.statusFilter });
