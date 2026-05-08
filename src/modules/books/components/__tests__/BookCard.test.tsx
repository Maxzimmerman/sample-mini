import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Book } from '../../types';
import { BookCard } from '../BookCard';

const book: Book = {
  id: '1',
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'read',
  pages: 688,
};

describe('BookCard', () => {
  it('shows the title', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('Dune')).toBeInTheDocument();
  });

  it('shows the author', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });

  it('shows the page count', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText(/688/)).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('Read')).toBeInTheDocument();
  });
});
