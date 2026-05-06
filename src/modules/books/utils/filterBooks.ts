import type { Book, BookStatus } from '../types';

export interface BookFilters {
  status?: BookStatus;
  /** Case-insensitive substring match against `book.author`. */
  author?: string;
  /** Inclusive minimum page count. */
  minPages?: number;
}

/**
 * Returns the books matching every supplied filter (AND combination).
 * Filters that are `undefined` are ignored. Does NOT mutate the input array.
 *
 *   filterBooks(books, { status: 'read' })       -> only books with status 'read'
 *   filterBooks(books, { author: 'herbert' })    -> author contains 'herbert' (any case)
 *   filterBooks(books, {})                       -> all books
 *   filterBooks(books, { status: 'read', minPages: 500 }) -> AND
 */
export function filterBooks(_books: Book[], _filters: BookFilters): Book[] {
  // TODO (exercise 3): use `_books.filter(...)` and return the result.
  // Each filter, when defined, must match. When undefined, skip that check.
  // Rename `_books` and `_filters` once you use them.
  throw new Error('Not implemented');
}
