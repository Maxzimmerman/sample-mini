/**
 * Domain types for the Books module.
 *
 * Mirrors the shape of sample-web's per-module `types.ts` — see e.g.
 * `sample-web/src/modules/job-details-new/types.ts`.
 *
 * Conventions used here:
 * - Domain enums are literal string unions, not TS enums.
 * - Object shapes use `interface`.
 * - Optional fields use `?`.
 */

export type BookStatus = 'want_to_read' | 'reading' | 'read';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  pages: number;
  /** ISO date string when the book was added to the library, e.g. '2024-03-12'. */
  addedAt?: string;
}

export const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'read',
    pages: 688,
    addedAt: '2024-03-12',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    status: 'reading',
    pages: 476,
  },
  {
    id: '3',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    status: 'want_to_read',
    pages: 400,
  },
  {
    id: '4',
    title: 'Annihilation',
    author: 'Jeff VanderMeer',
    status: 'read',
    pages: 195,
  },
];
