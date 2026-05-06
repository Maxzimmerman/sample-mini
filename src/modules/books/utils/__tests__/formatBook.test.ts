import { describe, expect, it } from 'vitest';

import type { Book } from '../../types';
import { formatBook, statusLabel } from '../formatBook';

describe('statusLabel', () => {
  it('formats reading', () => {
    expect(statusLabel('reading')).toBe('Reading');
  });

  it('formats read', () => {
    expect(statusLabel('read')).toBe('Read');
  });

  it('formats want_to_read', () => {
    expect(statusLabel('want_to_read')).toBe('Want to read');
  });
});

describe('formatBook', () => {
  const book: Book = {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'read',
    pages: 688,
  };

  it('returns "Title by Author (Status)"', () => {
    expect(formatBook(book)).toBe('Dune by Frank Herbert (Read)');
  });

  it('reflects the status label', () => {
    expect(formatBook({ ...book, status: 'reading' })).toBe(
      'Dune by Frank Herbert (Reading)',
    );
    expect(formatBook({ ...book, status: 'want_to_read' })).toBe(
      'Dune by Frank Herbert (Want to read)',
    );
  });
});
