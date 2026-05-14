import type { StateCreator } from 'zustand';
import type { Product } from '../types.ts';

export interface ProductActionSlice {
  products: Product[];
  addProduct: (product: Product) => void; 
};

export const createProductActionSlice =
  (): StateCreator<ProductStore, [], [], ProductActionSlice> => 
  (set) => ({
    products: [],

    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  });
