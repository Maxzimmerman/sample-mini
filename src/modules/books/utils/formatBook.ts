import type { Book, BookStatus } from '../types';

export function statusLabel(status: BookStatus): string {
  switch (status) {
    case 'read': return 'Read';
    case 'reading': return 'Reading';
    case 'want_to_read': return 'Want to read';
  }
}

/**
 * Returns a one-line display string for a book.
 *
 *   formatBook({ title: 'Dune', author: 'Frank Herbert', status: 'read', ... })
 *     -> 'Dune by Frank Herbert (Read)'
 */
export function formatBook(book: Book): string {
  return `${book.title} by ${book.author} (${statusLabel(book.status)})`;
}
