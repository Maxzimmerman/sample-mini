import type { Book, BookStatus } from '../types';

export interface BookFilters {
  status?: BookStatus;
  /** Case-insensitive substring match against `book.author`. */
  author?: string;
  /** Inclusive minimum page count. */
  minPages?: number;
}

export function filterBooks(books: Book[], filters: BookFilters): Book[] {
  return books.filter((book) => {
    if (filters.status !== undefined && book.status !== filters.status) {
      return false;
    }
    if (
      filters.author !== undefined &&
      !book.author.toLowerCase().includes(filters.author.toLowerCase())
    ) {
      return false;
    }
    if (filters.minPages !== undefined && book.pages < filters.minPages) {
      return false;
    }
    return true;
  });
}
