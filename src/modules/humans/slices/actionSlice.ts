import type { StateCreator } from 'zustand';
import type { Human } from '../types';

export const SAMPLE_HUMANS: Human[] = [
  {
    name: "MAX",
    type: 'Child'
  },
];

export interface ActionSlice {
  humans: Human[],
  loading: boolean;
  getAll: () => Promise<void>,
  add: (name: string) => void
}

export const useActionSlice = 
  (): StateCreator<ActionSlice, [], [], ActionSlice> => 
  (set) => ({
      humans: [],
      loading: false,
      
      getAll: async () => { set({ humans: SAMPLE_HUMANS, loading: false }) },

      add: (name) => { 
        let newHuman: Human = { name: name, type: 'Adult' };
	set((state) => ({ humans: [...state.humans, newHuman] }));
      }
   });
