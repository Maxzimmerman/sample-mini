# Stage 3b — Sliced stores (optional)

> **Do this stage only after Stage 3's tests are all green.** It's a refactor of the store you just wrote, not a new feature.

In Stage 3 you wrote `useBooksStore` as one flat object: list state, filter state, and all the actions co-located. That's the right shape for a store this size. But mosaic-web has stores with 30+ actions — `useTransportStore` is the textbook case — and at that size one file becomes painful to navigate. The solution mosaic-web uses is **slicing**: split the store into smaller `StateCreator` factories that compose into a single store at the top level. This stage teaches that mechanic on a deliberately undersized example, so the focus is on the pattern, not the volume of code.

By the end you'll have:
- `BookListSlice` (the list + CRUD actions) and `BookFilterSlice` (the filter + its setter) in separate files.
- `useBooksStore` composed from both slices in `useBooksStore.ts`, plus a top-level `reset` action that orchestrates both.
- All Stage 3 tests still passing — no behaviour change, just code organisation.

## 1. What a slice actually is

A slice is a typed subset of a store. Two pieces:

```ts
// 1. The slice's own state + action shape
export interface BookFilterSlice {
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
}

// 2. A factory that returns a StateCreator for that slice
export const createBookFilterSlice =
  (): StateCreator<BooksStore, [], [], BookFilterSlice> =>
  (set) => ({
    statusFilter: 'all',
    setStatusFilter: (status) => set({ statusFilter: status }),
  });
```

The generics on `StateCreator<...>` matter:
- **First** — the *full* store type (`BooksStore`). That's how `set`/`get` get typed to see *every other slice*'s fields too, so cross-slice reads work.
- **Second and third** — middleware mutators. Empty unless you're using `devtools`/`persist`/etc.
- **Fourth** — the type of *this* slice's contribution. TS uses it to enforce that the returned object exactly matches `BookFilterSlice`.

The factory is a function (not just a value) so each composition gets its own closure — important once slices need internal helpers.

## 2. Composing slices into one store

```ts
export type BooksStore = BookListSlice & BookFilterSlice & {
  reset: () => void;
};

export const useBooksStore = create<BooksStore>((set, get, ...rest) => ({
  ...createBookListSlice()(set, get, ...rest),
  ...createBookFilterSlice()(set, get, ...rest),

  reset: () => {
    // Reaches into both slices — that's the whole point of a top-level action
    set({
      books: SAMPLE_BOOKS,
      statusFilter: 'all',
    });
  },
}));
```

Key things to internalise:
- **The store type is an intersection (`&`) of slice types.** Add another slice later and you extend the intersection.
- **`set`/`get` are *shared*.** Both slices receive the same `set` and `get`, typed against the whole `BooksStore`. So `BookListSlice` can call `get().statusFilter` if it ever needs to, no extra wiring.
- **Top-level orchestrating actions live next to the spreads.** `reset` doesn't belong inside either slice because it spans both. mosaic-web's `useTransportStore` does the same thing — `init`, `save`, `discard` sit at the top, slice-specific helpers stay inside the slice.

## 3. Why pass `...rest` through

```ts
(set, get, ...rest) => ({
  ...createBookListSlice()(set, get, ...rest),
  ...
})
```

`...rest` carries any middleware-injected args (subscribers, devtools handles, etc.). Today there are none — `rest` is empty. But Zustand's typings expect the slice creators to receive the same tuple the outer creator did, and forwarding `...rest` is what keeps the types in sync if you ever wrap the store in `devtools(...)` or similar later. Treat it as boilerplate; copy it, don't think about it.

## 4. What this exercise is NOT teaching

- **It's not "one slice per file because files are nice".** Plenty of mosaic-web stores stay single-file forever (e.g. `useJobDetailsStore`) — slicing buys you nothing if there's no overlap or growth pressure. Reach for it when a store passes ~10 actions or splits cleanly along a sub-domain.
- **It's not state isolation.** Slices share `set`/`get` over the whole store. They can read each other freely. If you need actual isolation, you want two separate stores, not two slices.
- **It's not a perf optimisation.** Subscribers re-render based on selector return values, regardless of which slice the data lives in.

## 5. Your exercises

You're refactoring the Stage 3 store. The acceptance criterion is **the Stage 3 tests still pass unchanged** (`src/modules/books/store/__tests__/useBooksStore.test.ts`).

1. **Create** `src/modules/books/store/slices/bookListSlice.ts` exporting:
   - `interface BookListSlice` with: `books: Book[]`, `addBook`, `updateBook`, `removeBook`.
   - `const createBookListSlice = (): StateCreator<BooksStore, [], [], BookListSlice> => ...`
   - Initial value `books: SAMPLE_BOOKS`.

2. **Create** `src/modules/books/store/slices/bookFilterSlice.ts` exporting:
   - `interface BookFilterSlice` with: `statusFilter: StatusFilter`, `setStatusFilter`.
   - `const createBookFilterSlice = (): StateCreator<BooksStore, [], [], BookFilterSlice> => ...`
   - Initial value `statusFilter: 'all'`.

3. **Rewrite** `src/modules/books/store/useBooksStore.ts`:
   - Replace `BooksState` with `export type BooksStore = BookListSlice & BookFilterSlice & { reset: () => void }`.
   - Compose the slices in the `create<BooksStore>(...)` call as in §2.
   - `reset` stays at the top level and resets both slices' state.
   - `selectVisibleBooks` stays where it is — its `(state: BooksStore) => Book[]` signature now reads from the intersection type.

4. **No test changes required.** Re-run `npm run test:unit` and confirm green.

Optional polish:
- Move `StatusFilter` into `bookFilterSlice.ts` and re-export from `useBooksStore.ts`. Keeps the type next to the slice that owns it.
- The slice files should not import each other. If you find yourself reaching for one slice from the other, that's a sign the boundary is wrong — re-draw it.

## 6. What to compare against in mosaic-web

- `mosaic-web/src/modules/transport-details/store/store.ts` — the composition site. Skim `useTransportStore = create<TransportStore>()((set, get, ...rest) => ({ ...createRoadSlice()(set, get, ...rest), ...createAirSlice()(set, get, ...rest), ...initialDataState, ... }))`.
- `mosaic-web/src/modules/transport-details/store/air.ts` — a real slice. Note: it exports `type AirSlice = { ... }` and `const createAirSlice = (): StateCreator<TransportStore, [], [], AirSlice> => (set, get) => ({ ... })`, identical to the shape you're about to write.
- `mosaic-web/src/modules/transport-details/store/road.ts` — second slice. Open both side-by-side to see how two slices coexist.

Notice what mosaic-web *doesn't* do: it doesn't slice `useJobDetailsStore` even though that store has many actions, because they're all in one domain (job sub-resources) and there's no natural seam. Slicing isn't a default; it's a response to a specific shape.

## 7. Vocabulary

- **Slice** — a typed subset of a store, exposed as `interface XSlice` + `createXSlice` factory.
- **`StateCreator<Store, Mutators, MutatorsOut, SliceOut>`** — Zustand's type for a state-creating function. First generic is the full store; last is what this creator contributes.
- **Composition site** — the file where slices are spread together into one store object. The only place that imports every slice.
- **Cross-slice read** — calling `get().someOtherSliceField` from inside one slice's action. Legal and common; if you find yourself doing it constantly the slice boundary is probably wrong.

Stage 3b done? Tests still green? Then carry on to Stage 4 (API layer + `parseApiError`).
