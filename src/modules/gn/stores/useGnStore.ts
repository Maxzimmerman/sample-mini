import { create } from 'zustand';
import { type ActionSlice, useActionSlice } from '../slices/ActionSlice';

export type Store = ActionSlice & {
 reset: () => void;
}

export const Store = create<ActionSlice>(( set, get, ...rest)=> ({
  ...useActionSlice()(set, get, ...rest),

  reset: () => { set({ humans: [], loading: false }) },
	}));
