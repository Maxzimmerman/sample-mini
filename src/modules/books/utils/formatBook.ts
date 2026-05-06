import type { Book, BookStatus } from '../types';

/**
 * Returns a human-readable label for a book status.
 *
 *   statusLabel('reading')      -> 'Reading'
 *   statusLabel('read')         -> 'Read'
 *   statusLabel('want_to_read') -> 'Want to read'
 *
 * Hint: use a `switch (status)` on the union. TS will warn you if you miss a case.
 */
export function statusLabel(_status: BookStatus): string {
  // TODO (exercise 1): replace this with a switch over `_status` that
  // returns the string for each of the three BookStatus values.
  // Rename `_status` to `status` once you actually use it (noUnusedParameters
  // on the `_` prefix is the convention for "intentionally unused").
  throw new Error('Not implemented');
}

/**
 * Returns a one-line display string for a book.
 *
 *   formatBook({ title: 'Dune', author: 'Frank Herbert', status: 'read', ... })
 *     -> 'Dune by Frank Herbert (Read)'
 */
export function formatBook(_book: Book): string {
  // TODO (exercise 2): build the string `${title} by ${author} (${statusLabel(...)})`.
  // Rename `_book` to `book` once you use it.
  throw new Error('Not implemented');
}
