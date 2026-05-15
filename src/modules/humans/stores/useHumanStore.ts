import { create } from '../../../storeRegistry';
import { useActionSlice, type ActionSlice } from '../slices/actionSlice';

export type HumanStore = ActionSlice & {
  reset: () => void
};

export const useHumanStore = create<HumanStore>((set, get, ...rest) => ({
   ...useActionSlice()(set, get, ...rest),

   reset: () => set({ humans: [], loading: false }),
}));
