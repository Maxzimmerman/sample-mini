import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

/**
 * A single-book preview card.
 *
 *   <BookCard book={book} />
 *
 * Layout (inside <Card><CardContent>...</CardContent></Card>):
 * - Title       — Typography variant="h6"
 * - Author      — Typography variant="body2", color="text.secondary"
 * - Page count  — Typography variant="caption", e.g. "688 pages"
 * - Status      — <BookStatusBadge status={book.status} />
 *
 * Lay them out with <Stack spacing={1}>.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BookCard(_props: BookCardProps): JSX.Element {
  // TODO (exercise 2):
  //   - Import BookStatusBadge from './BookStatusBadge'.
  //   - Build the layout described above.
  // Rename `_props` to `{ book }` once you use it.
  void Card; void CardContent; void Stack; void Typography;
  throw new Error('Not implemented');
}
