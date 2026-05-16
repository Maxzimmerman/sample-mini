import type { StateCreator } from 'zustand';
import type { Animal } from '../types';

const DATA: Animal[] = [
  {
    name: "MAX",
    type: 'hunter',
  },
  {
    name: "AARON",
    type: 'prey',
  }
]

export interface ActionSlice {
  animals: Animal[];
  loading: boolean;

  getAll: () => void;
  addOne: (animasl: Animal) => void;
}

export const useActionSlice =
  (): StateCreator<ActionSlice, [], [], ActionSlice> => 
  (set) => ({
    animals: [],
    loading: false,

    getAll: () => {
      set({ animals: DATA, loading: false });
    },

    addOne: (animal: Animal) => {
      set((state) => ({ animals: [...state.animals, animal ] }));
    }
});
