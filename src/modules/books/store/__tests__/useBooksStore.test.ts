import { beforeEach, describe, expect, it } from 'vitest';

import type { Book } from '../../types';
import { selectVisibleBooks, useBooksStore } from '../useBooksStore';

const makeBook = (overrides: Partial<Book> = {}): Book => ({
  id: 'x',
  title: 'Test Title',
  author: 'Test Author',
  status: 'want_to_read',
  pages: 100,
  ...overrides,
});

beforeEach(() => {
  useBooksStore.getState().reset();
});

describe('useBooksStore — initial state', () => {
  it('starts with the sample books', () => {
    const { books } = useBooksStore.getState();
    expect(books.length).toBeGreaterThan(0);
  });

  it('starts with statusFilter = all', () => {
    expect(useBooksStore.getState().statusFilter).toBe('all');
  });
});

describe('useBooksStore — addBook', () => {
  it('appends to the list', () => {
    const before = useBooksStore.getState().books.length;
    useBooksStore.getState().addBook(makeBook({ id: 'new-1' }));
    expect(useBooksStore.getState().books).toHaveLength(before + 1);
    expect(useBooksStore.getState().books.at(-1)?.id).toBe('new-1');
  });

  it('does not mutate the original array', () => {
    const before = useBooksStore.getState().books;
    useBooksStore.getState().addBook(makeBook({ id: 'new-2' }));
    expect(useBooksStore.getState().books).not.toBe(before);
  });
});

describe('useBooksStore — updateBook', () => {
  it('patches the matching book by id', () => {
    const target = useBooksStore.getState().books[0];
    useBooksStore.getState().updateBook(target.id, { status: 'read' });
    const updated = useBooksStore
      .getState()
      .books.find((b) => b.id === target.id);
    expect(updated?.status).toBe('read');
  });

  it('leaves the list unchanged when no id matches', () => {
    const before = useBooksStore.getState().books;
    useBooksStore.getState().updateBook('does-not-exist', { status: 'read' });
    expect(useBooksStore.getState().books).toEqual(before);
  });
});

describe('useBooksStore — removeBook', () => {
  it('removes the matching book by id', () => {
    const target = useBooksStore.getState().books[0];
    useBooksStore.getState().removeBook(target.id);
    const remaining = useBooksStore.getState().books;
    expect(remaining.find((b) => b.id === target.id)).toBeUndefined();
  });
});

describe('useBooksStore — setStatusFilter', () => {
  it('updates the filter', () => {
    useBooksStore.getState().setStatusFilter('reading');
    expect(useBooksStore.getState().statusFilter).toBe('reading');
  });
});

describe('useBooksStore — reset', () => {
  it('restores books AND statusFilter', () => {
    useBooksStore.getState().setStatusFilter('reading');
    useBooksStore.getState().addBook(makeBook({ id: 'extra' }));
    useBooksStore.getState().reset();
    expect(useBooksStore.getState().statusFilter).toBe('all');
    expect(
      useBooksStore.getState().books.find((b) => b.id === 'extra'),
    ).toBeUndefined();
  });
});

describe('selectVisibleBooks', () => {
  it('returns every book when filter is "all"', () => {
    const state = useBooksStore.getState();
    expect(selectVisibleBooks(state)).toEqual(state.books);
  });

  it('returns the same array reference when filter is "all" (stable for memoisation)', () => {
    const state = useBooksStore.getState();
    expect(selectVisibleBooks(state)).toBe(state.books);
  });

  it('filters by status', () => {
    useBooksStore.getState().setStatusFilter('read');
    const visible = selectVisibleBooks(useBooksStore.getState());
    expect(visible.length).toBeGreaterThan(0);
    expect(visible.every((b) => b.status === 'read')).toBe(true);
  });
});
