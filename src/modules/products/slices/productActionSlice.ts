import type { StateCreator } from 'zustand';

import { SAMPLE_PRODUCTS, type Product } from '../types';

export interface ProductActionSlice {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => void;
}

const mockFetchProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return SAMPLE_PRODUCTS;
};

export const createProductActionSlice =
  (): StateCreator<ProductActionSlice, [], [], ProductActionSlice> =>
  (set) => ({
    products: [],
    loading: false,

    fetchProducts: async () => {
      set({ loading: true });
      const products = await mockFetchProducts();
      set({ products, loading: false });
    },

    addProduct: (product) =>
      set((state) => ({ products: [...state.products, product] })),
  });
