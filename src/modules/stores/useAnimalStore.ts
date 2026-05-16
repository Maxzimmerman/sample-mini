import { create } from '../../storeRegistry';
import { type ActionSlice, useActionSlice } from '../animals/slices/ActionSlice';

export type AnimalStore = ActionSlice & {
  reset: () => void;
}

export const useAnimalStore = create<AnimalStore>(( set, get, ...rest) =>  ({
  ...useActionSlice()(set, get, ...rest),

  reset: () => set({ animals: [], loading: false }),
}));
