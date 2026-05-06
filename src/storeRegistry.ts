import { create as zustandCreate, type StateCreator } from 'zustand';

/**
 * Wrapped `create` from zustand that registers each store's initial state
 * so we can wipe them all on logout.
 *
 * sample-web pattern (see sample-web/src/storeRegistry.ts):
 * every Zustand store goes through THIS `create`, never directly through
 * `import { create } from 'zustand'`. The wrapper records initial state at
 * construction time so `resetAllStores()` can restore it on logout.
 */

interface RegisteredStore {
  reset: () => void;
}

const stores: RegisteredStore[] = [];

export function create<T>(initializer: StateCreator<T>) {
  const useStore = zustandCreate<T>(initializer);
  const initialState = useStore.getState();
  stores.push({
    reset: () => useStore.setState(initialState, true),
  });
  return useStore;
}

/** Resets every registered store back to its initial state. Call on logout. */
export function resetAllStores(): void {
  for (const s of stores) s.reset();
}
