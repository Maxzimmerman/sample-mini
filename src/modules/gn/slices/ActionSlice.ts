import type { Human } from '../../humans/types';
import type { StateCreator } from 'zustand';

export interface ActionSlice {
  humans: Human[];
  loading: boolean;

  getAll: () => void;
  addOne: (human: Human) => void;
};

export const useActionSlice =
  (): StateCreator<ActionSlice, [], [], ActionSlice> => 
  (set) => ({
   humans: [],
   loading: false,

   getAll: () => { set({ humans: [], loading: false }) },
   addOne: (human: Human) => {
     set((state) => ({ humans: [...state.humans, human ]}));
		}
});
