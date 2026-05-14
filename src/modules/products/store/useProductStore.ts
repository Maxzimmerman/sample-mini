import { create } from '@src/storeRegistry';

import type { Product } from '../types.ts';
import { createProductActioinSlice,
	 type ProductActionSlice
} from './slices/productActionSlice';

export type ProductStore = ProductActionSlice {
  reset: () => void;
};


export const useProductStore = create<ProductStore>(( set,get, ...rest) => ({
  ...createProductActionSlice()(set, get, ...rest),

  reset: () =>
    set({
      products: []
    })
}))
