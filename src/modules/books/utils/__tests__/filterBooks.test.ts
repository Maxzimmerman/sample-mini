import { describe, expect, it } from 'vitest';

import type { Book } from '../../types';
import { filterBooks } from '../filterBooks';

const books: Book[] = [
  { id: '1', title: 'Dune', author: 'Frank Herbert', status: 'read', pages: 688 },
  { id: '2', title: 'Project Hail Mary', author: 'Andy Weir', status: 'reading', pages: 476 },
  { id: '3', title: 'The Three-Body Problem', author: 'Liu Cixin', status: 'want_to_read', pages: 400 },
  { id: '4', title: 'Annihilation', author: 'Jeff VanderMeer', status: 'read', pages: 195 },
];

describe('filterBooks', () => {
  it('returns all books when filters are empty', () => {
    expect(filterBooks(books, {})).toHaveLength(4);
  });

  it('filters by status', () => {
    const result = filterBooks(books, { status: 'read' });
    expect(result.map((b) => b.id).sort()).toEqual(['1', '4']);
  });

  it('filters by author (case-insensitive substring)', () => {
    expect(filterBooks(books, { author: 'herbert' })).toHaveLength(1);
    expect(filterBooks(books, { author: 'HERBERT' })).toHaveLength(1);
    expect(filterBooks(books, { author: 'wei' })).toHaveLength(1);
    expect(filterBooks(books, { author: 'rowling' })).toHaveLength(0);
  });

  it('filters by minPages (inclusive)', () => {
    const result = filterBooks(books, { minPages: 400 });
    expect(result.map((b) => b.id).sort()).toEqual(['1', '2', '3']);
  });

  it('combines multiple filters with AND', () => {
    const result = filterBooks(books, { status: 'read', minPages: 500 });
    expect(result.map((b) => b.id)).toEqual(['1']);
  });

  it('does not mutate the input array', () => {
    const original = [...books];
    filterBooks(books, { status: 'read' });
    expect(books).toEqual(original);
  });
});
