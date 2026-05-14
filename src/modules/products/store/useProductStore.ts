import { create } from '@src/storeRegistry';

import {
  createProductActionSlice,
  type ProductActionSlice,
} from '../slices/productActionSlice';

export type ProductStore = ProductActionSlice & {
  reset: () => void;
};

export const useProductStore = create<ProductStore>((set, get, ...rest) => ({
  ...createProductActionSlice()(set, get, ...rest),

  reset: () => set({ products: [], loading: false }),
}));
