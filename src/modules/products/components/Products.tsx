import { Card, CardContent, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

import type { Product } from '../types';

export interface ProductsProps {
  products: Product[];
};

export const Books({ products }: ProductsProps): JSX.Element {
   <Card>
     <CardContent></CardContent>
   </Card>
}
