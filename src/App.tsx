import { useEffect } from 'react';
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material';

import BookCard from '@books/components/BookCard';
import { SAMPLE_BOOKS } from '@books/types';
import Products from '@products/components/Products';
import { useProductStore } from '@products/store/useProductStore';
import { Humans }  from '../src/modules/humans/components/Human';
import { useHumanStore } from '../src/modules/humans/stores/useHumanStore';
import Animals from '../src/modules/animala/components/Animal';

export function App() {
  const products = useProductStore((s) => s.products);
  const loading = useProductStore((s) => s.loading);
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const humans = useHumanStore((s) => s.humans);
  const getAll = useHumanStore((s) => s.getAll);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    getAll()
  }, [getAll()]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            sample-mini
          </Typography>
          <Typography variant="h3" component="h1">
            Books
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A guided rebuild of sample-web's frontend conventions.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" gutterBottom>
            You're at Stage 0.
          </Typography>
          <Typography variant="body2">
            Open <code>stages/01-typescript-basics/LESSON.md</code> and run
            <code> npm run test:unit:watch</code> to begin.
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ mt: 4 }}>
        {SAMPLE_BOOKS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </Stack>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Products
        </Typography>
        {loading ? <CircularProgress /> : <Products products={products} />}
      </Box>
    <Humans humans={ humans }></Humans>
    <Animals></Animals>
    </Container>
  );
}
