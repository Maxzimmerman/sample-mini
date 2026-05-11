import { Chip, type ChipProps } from '@mui/material';
import type { JSX } from 'react';

import type { BookStatus } from '../types';
import { statusLabel } from '../utils/formatBook';

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
export function BookStatusBadge({ status }: BookStatusBadgeProps): JSX.Element {
  const color: ChipProps['color'] = statusColor(status);
  return <Chip size="small" label={statusLabel(status)} color={color} />;
}

function statusColor(status: BookStatus): ChipProps['color'] {
  switch (status) {
    case 'read':
      return 'success';
    case 'reading':
      return 'primary';
    case 'want_to_read':
      return 'default';
  }
}
