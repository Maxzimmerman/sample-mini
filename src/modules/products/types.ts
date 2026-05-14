export type ProductStatus = 'bought' | 'liked' | 'disliked' | 'not_seen';

export interface Product {
  id: string;
  title: string;
  status: ProductStatus;
}

export const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', title: 'Sourdough loaf', status: 'bought' },
  { id: '2', title: 'Espresso machine', status: 'liked' },
  { id: '3', title: 'Wool socks', status: 'not_seen' },
  { id: '4', title: 'Pineapple pizza', status: 'disliked' },
];
