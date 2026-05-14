import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

import type { Product, ProductStatus } from '../types';

export interface ProductsProps {
  products: Product[];
}

const STATUS_LABEL: Record<ProductStatus, string> = {
  bought: 'Bought',
  liked: 'Liked',
  disliked: 'Disliked',
  not_seen: 'Not seen',
};

export function Products({ products }: ProductsProps): JSX.Element {
  return (
    <Stack spacing={2}>
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Typography variant="h6">{product.title}</Typography>
              <Chip label={STATUS_LABEL[product.status]} size="small" />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export default Products;
