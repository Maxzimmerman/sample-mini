import { Chip } from '@mui/material';
import type { JSX } from 'react';

import type { BookStatus } from '../types';
import statusLabel from '../utils/formatBook';

interface BookStatusBadgeProps {
  status: BookStatus;
}

/**
 * A small chip that visually indicates a book's status.
 *
 *   <BookStatusBadge status="read" />
 *
 * Colour mapping:
 * - 'read'         → 'success'
 * - 'reading'      → 'primary'
 * - 'want_to_read' → 'default'
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function BookStatusBadge(_props: BookStatusBadgeProps): JSX.Element {
  // TODO (exercise 1):
  //   - Import `statusLabel` from '../utils/formatBook' and use it for the chip label.
  //   - Pick the colour from the mapping above (a switch over `status` works well).
  //   - Return <Chip size="small" label={...} color={...} />.
  // Rename `_props` to `{ status }` once you use it.
  // Tip: `Chip`'s `color` prop type is 'default' | 'primary' | 'secondary' | 'success' |
  //      'error' | 'info' | 'warning'. TS will narrow your switch for you.
  void Chip;
  throw new Error('Not implemented');
}
