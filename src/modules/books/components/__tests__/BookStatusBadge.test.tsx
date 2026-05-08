import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BookStatusBadge } from '../BookStatusBadge';

describe('BookStatusBadge', () => {
  it('shows "Read" for status read', () => {
    render(<BookStatusBadge status="read" />);
    expect(screen.getByText('Read')).toBeInTheDocument();
  });

  it('shows "Reading" for status reading', () => {
    render(<BookStatusBadge status="reading" />);
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  it('shows "Want to read" for status want_to_read', () => {
    render(<BookStatusBadge status="want_to_read" />);
    expect(screen.getByText('Want to read')).toBeInTheDocument();
  });
});
