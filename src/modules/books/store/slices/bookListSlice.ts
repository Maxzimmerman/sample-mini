import type { StateCreator } from 'zustand';

import type { Book } from '../../types';
import { SAMPLE_BOOKS } from '../../types';
import type { BooksStore } from '../useBooksStore';

export interface BookListSlice {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, patch: Partial<Book>) => void;
  removeBook: (id: string) => void;
}

export const createBookListSlice =
  (): StateCreator<BooksStore, [], [], BookListSlice> =>
  (set) => ({
    books: SAMPLE_BOOKS,

    addBook: (book) => set((state) => ({ books: [...state.books, book] })),

    updateBook: (id, patch) =>
      set((state) => ({
        books: state.books.map((book) =>
          book.id === id ? { ...book, ...patch } : book,
        ),
      })),

    removeBook: (id) =>
      set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
  });
