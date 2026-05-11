# Stage 3 — Zustand stores via `storeRegistry`

So far the books in `App.tsx` are imported straight from `SAMPLE_BOOKS`. That's fine for a placeholder but useless once the user wants to *do* anything — mark a book as read, hide everything that isn't `'reading'`, add a new title. State has to live somewhere outside the component tree so any component can read it and any action can change it. That somewhere, in mosaic-web, is a Zustand store.

By the end you'll have:
- A `useBooksStore` holding the book list and a status filter.
- Actions: `addBook`, `updateBook`, `removeBook`, `setStatusFilter`, `reset`.
- A `selectVisibleBooks` derived selector that applies the filter.
- `App.tsx` reading the books from the store, not from `SAMPLE_BOOKS` directly.
- A "Mark as read" button on each `BookCard` that calls `updateBook`.
- All tests in `src/modules/books/store/__tests__/` green.

## 1. What a Zustand store is

A Zustand store is two things wrapped in one:
- A small bag of state (the **state**).
- A bag of functions that mutate that state (the **actions**).

You access both through a single React hook. The hook is the store.

```tsx
const books = useBooksStore((s) => s.books);          // subscribe to a slice
const addBook = useBooksStore((s) => s.addBook);      // grab an action

addBook({ id: '5', title: '...', author: '...', status: 'want_to_read', pages: 200 });
```

Three properties that matter:
- **Components re-render only when their selected slice changes.** If you select `s.books`, you don't re-render when `statusFilter` changes.
- **Outside React, you can call `useBooksStore.getState()` and `useBooksStore.setState(...)` directly.** That's how tests and non-React code touch the store.
- **No `<Provider>` wrapping.** The store is module-scoped; importing it gives you the singleton.

## 2. Why the `storeRegistry` wrapper exists

Open `src/storeRegistry.ts`. Note we re-export `create` ourselves:

```ts
import { create as zustandCreate, type StateCreator } from 'zustand';

const stores: RegisteredStore[] = [];

export function create<T>(initializer: StateCreator<T>) {
  const useStore = zustandCreate<T>(initializer);
  const initialState = useStore.getState();
  stores.push({
    reset: () => useStore.setState(initialState, true),
  });
  return useStore;
}

export function resetAllStores(): void {
  for (const s of stores) s.reset();
}
```

It records each store's initial state at construction time, so `resetAllStores()` can wipe every store back to that snapshot on logout. mosaic-web does the same thing in `mosaic-web/src/storeRegistry.ts`. **Every store you write must go through this `create`** — never `import { create } from 'zustand'` directly. If you do, your store is invisible to `resetAllStores` and stale data leaks across logins.

## 3. Defining a store

```ts
import type { Book, BookStatus } from '../types';
import { create } from '@src/storeRegistry';

interface BooksState {
  books: Book[];
  statusFilter: BookStatus | 'all';

  addBook: (book: Book) => void;
  setStatusFilter: (status: BookStatus | 'all') => void;
}

const initialState = {
  books: [],
  statusFilter: 'all' as const,
};

export const useBooksStore = create<BooksState>((set, get) => ({
  ...initialState,

  addBook: (book) =>
    set((state) => ({ books: [...state.books, book] })),

  setStatusFilter: (status) => set({ statusFilter: status }),
}));
```

Things to notice:
- **State and actions live in the same interface.** No "actions slice" pattern in vanilla mosaic-web — read jobs from `useJobDetailsStore` and you'll see `fetchAll`, `deletePackage`, etc. sitting alongside `carrierBookings`, `finance`, etc.
- **`set(...)` accepts two shapes.** `set({ statusFilter: status })` is fine when the next state doesn't depend on the previous one. `set((state) => ({ books: [...state.books, book] }))` is required when it does — the functional form gets the latest state at the moment of the update.
- **`get()`** is the non-reactive read of current state inside an action. Use it when one action needs to look at state to decide what to do, without subscribing to a re-render (you're not in a component).
- **`initialState`** lives in a constant so `reset` can restore it. Pattern from `mosaic-web/src/modules/job-details-new/store.ts:62-70`.

## 4. The functional vs object form of `set`

```ts
// ❌ uses a snapshot — fine for single writes from one component, but
//    breaks if two updates race
addBook: (book) => set({ books: [...get().books, book] }),

// ✅ always uses the freshest state at update time
addBook: (book) => set((state) => ({ books: [...state.books, book] })),
```

Rule of thumb: **if the next state depends on the current state, use the functional form.** Otherwise the plain object form is shorter.

## 5. Selectors: pick the smallest slice you need

```tsx
// ❌ returns the whole store — component re-renders on ANY change
const store = useBooksStore();

// ✅ subscribes only to `books`
const books = useBooksStore((s) => s.books);

// ✅ subscribes only to the action
const addBook = useBooksStore((s) => s.addBook);
```

Two things to internalise:
- **Selector return value is compared with `Object.is`.** Returning a freshly-constructed array or object from the selector breaks memoisation:
  ```tsx
  // ❌ new array every render → infinite re-renders
  const titles = useBooksStore((s) => s.books.map((b) => b.title));
  ```
  Either move the derivation into a standalone function (called outside the selector) or use `useShallow` from `zustand/shallow`. You'll see `useShallow` across mosaic-web — search for it.
- **Actions are stable.** `s.addBook` is the same function reference forever, so it's safe to put in a `useEffect` dep array.

## 6. Derived state: keep it outside the store

Don't add `filteredBooks` as state. Compute it from `books` + `statusFilter`:

```ts
export const selectVisibleBooks = (state: BooksState): Book[] =>
  state.statusFilter === 'all'
    ? state.books
    : filterBooks(state.books, { status: state.statusFilter });

// in a component:
const books = useBooksStore(selectVisibleBooks);
```

Why? Stored derived state goes out of sync. Recomputed derived state can't. The cost is recomputing on every re-render — fine until it's measurably not, at which point you reach for `useMemo` or push the computation into the selector with `useShallow`.

## 7. Testing a store

Stores are usable straight out of the box in tests, no React required:

```ts
import { useBooksStore } from '../useBooksStore';

beforeEach(() => {
  useBooksStore.setState(
    { books: [], statusFilter: 'all' },
    true,  // ⬅️ replace, not merge — wipes any actions overwritten in a prior test
  );
});

it('addBook appends to the list', () => {
  useBooksStore.getState().addBook(makeBook());
  expect(useBooksStore.getState().books).toHaveLength(1);
});
```

Two API points to remember:
- `useStore.getState()` — read.
- `useStore.setState(partial, replace?)` — write. Pass `true` as the second arg to **replace** the entire state instead of merging. Use it in `beforeEach` to reset.

## 8. Stretch: sliced stores (just so you know they exist)

Once a store grows past ~10 actions it's worth splitting into slices. mosaic-web does this in `mosaic-web/src/modules/transport-details/store/`:

```ts
// store.ts
export const useTransportStore = create<TransportStore>()((set, get, ...rest) => ({
  ...createRoadSlice()(set, get, ...rest),
  ...createAirSlice()(set, get, ...rest),
  ...initialDataState,
  // top-level actions that orchestrate both slices
}));
```

```ts
// air.ts
export type AirSlice = { ... };
export const createAirSlice =
  (): StateCreator<TransportStore, [], [], AirSlice> =>
  (set, get) => ({ ... });
```

Each slice is just a `StateCreator` returning its own fields. They share `set`/`get` over the **whole** store, so they can read each other's state freely. We don't use slicing in this stage — `useBooksStore` is small enough to stay in one file — but when you eventually open `transport-details/store/` in mosaic-web, that's what you're looking at.

## 9. Your exercises

1. **Implement** `src/modules/books/store/useBooksStore.ts`. The shape:

   ```ts
   interface BooksState {
     books: Book[];
     statusFilter: BookStatus | 'all';

     addBook: (book: Book) => void;
     updateBook: (id: string, patch: Partial<Book>) => void;
     removeBook: (id: string) => void;
     setStatusFilter: (status: BookStatus | 'all') => void;
     reset: () => void;
   }
   ```

   Initial state: `books: SAMPLE_BOOKS`, `statusFilter: 'all'`. Use the `create` from `@src/storeRegistry` — not the one from `zustand`.

2. **Export a selector** `selectVisibleBooks` from the same file. It must apply `filterBooks` from stage 1 when `statusFilter` is a real status, and return all books when it's `'all'`.

3. **Wire it up in `App.tsx`.** Replace the static `SAMPLE_BOOKS.map(...)` with a store-driven version: read `useBooksStore(selectVisibleBooks)` for the cards. Add a row of filter chips (one per status + "All") that call `setStatusFilter` on click — the active one gets `color="primary"`, the rest `color="default"`. Add an "Mark as read" button to `BookCard` (`CardActions`) that calls `updateBook(book.id, { status: 'read' })`. The button should be disabled when the book is already `'read'`.

Run the tests and the dev server:

```sh
npm run test:unit:watch
npm run dev
```

Done when:
- Tests in `src/modules/books/store/__tests__/` are all green.
- Clicking a filter chip narrows the visible cards.
- Clicking "Mark as read" turns that book's chip green and disables the button.

## 10. What to compare against in mosaic-web

- `mosaic-web/src/modules/job-details-new/store.ts` — canonical "state + actions" store with an `initialState` constant and a `reset()` action. Read it top-to-bottom.
- `mosaic-web/src/storeRegistry.ts` — the same wrapper, slightly fancier. Confirms the pattern is project-wide, not made-up for this exercise.
- `mosaic-web/src/modules/transport-details/store/` — the slicing pattern from §8. Skim `store.ts` first, then `air.ts` to see how a slice declares its type and a `createXSlice` factory.
- Search for `useShallow(` across mosaic-web to see how selectors that *do* return composite shapes avoid the re-render trap.
- Search for `.getState()` to see how non-React code (e.g. `air.ts:407` reading `useStaticDataStore.getState()`) reads other stores without subscribing.

## 11. Vocabulary

- **Store** — the bag of state + actions returned by `create(...)`. Imported as `useFooStore`.
- **Selector** — a function `(state) => slice` passed to the store hook. Determines what triggers a re-render.
- **Action** — a function on the store that calls `set(...)` to update state.
- **`set`** — write. Object form merges, functional form `(state) => partial` derives from current.
- **`get`** — non-reactive read inside an action.
- **Slice** — a `StateCreator` that contributes a typed subset of fields/actions to a larger store. Use only when a single file gets too big.

Stage 3 done? Ping me for Stage 4 (API layer + `parseApiError`).
