# Stage 2 — React components + MUI

You wrote pure-TS utility functions in Stage 1. Now we add a UI layer using React function components and Material UI (MUI) — the same primitives mosaic-web uses on every screen.

By the end you'll have:
- Read what a TS-typed component looks like.
- Written `BookStatusBadge` (a coloured chip).
- Written `BookCard` (a card showing a single book).
- Replaced the placeholder in `App.tsx` with a list of `BookCard`s rendered from `SAMPLE_BOOKS`.
- All tests in `src/modules/books/components/__tests__/` green.
- Four book cards visible in your browser.

## 1. A React component is a function

```tsx
export function Hello() {
  return <Typography>Hello, world</Typography>;
}
```

That's the whole API. No `class`, no `extends`, no `render()` method. The function returns JSX, React turns the JSX into DOM nodes.

## 2. Props are the function's argument

Props are passed as a single object. Type it with an `interface` next to the component:

```tsx
interface HelloProps {
  name: string;
  loud?: boolean;
}

export function Hello({ name, loud }: HelloProps) {
  const greeting = `Hello, ${name}`;
  return <Typography>{loud ? greeting.toUpperCase() : greeting}</Typography>;
}
```

Notice:
- The props interface lives next to the component, not in a shared `types.ts`. Domain types (`Book`) go in `types.ts`; component-specific shapes don't.
- We destructure `{ name, loud }` in the signature. Almost every component in mosaic-web does this.
- Optional props use `?` (just like `Book.addedAt` in Stage 1).

## 3. JSX is just function calls

`<Typography variant="h6">Hello</Typography>` compiles to `React.createElement(Typography, { variant: 'h6' }, 'Hello')`. So:
- **Attributes** are props passed to the component. `<Card sx={{ p: 2 }}>` passes `sx={{ p: 2 }}`.
- **Children** are whatever sits between the open and close tags.
- `{ ... }` inside JSX is an escape hatch back to TS expressions: `<Typography>{book.title}</Typography>`.

## 4. The MUI primitives you'll use most

- **`Box`** — a styled `<div>`. Reach for it when you need one container with `sx`-driven styling.
- **`Stack`** — children laid out in a row or column with consistent spacing. `<Stack direction="row" spacing={2}>`. Easier than hand-rolling flexbox.
- **`Typography`** — text. The `variant` prop (`h1`–`h6`, `body1`, `body2`, `overline`, `caption`) picks a typographic role from the theme.
- **`Card` / `CardContent` / `CardActions`** — a contained content surface.
- **`Chip`** — a small pill, used for tags or statuses. Has `label` and `color` props.

You discover the full prop list via autocomplete; nobody memorises mui.com.

## 5. The `sx` prop

Every MUI component accepts `sx`:

```tsx
<Box sx={{ p: 2, mt: 1, bgcolor: 'background.paper', borderRadius: 1 }} />
```

Two things plain CSS doesn't give you:
- **Theme-aware shorthands.** `p: 2` becomes `padding: theme.spacing(2)` (`16px` by default). `bgcolor: 'background.paper'` reads from the theme palette.
- **Type-checked.** Typo `borderRdius` and TS yells.

You'll also see `styled(...)` components in mosaic-web. `sx` is the default; reach for `styled` only when a component has lots of custom CSS.

## 6. Lists need `.map()` and `key`

To render a list, map the array into JSX:

```tsx
<Stack spacing={2}>
  {books.map((book) => (
    <BookCard key={book.id} book={book} />
  ))}
</Stack>
```

The `key` prop is **required** for any rendered list — React uses it to match old and new items on re-render. It must be **stable and unique within the list**. Use the entity's `id`, never the array index (indices shift when you sort/filter).

## 7. Path aliases

Two equivalent imports — prefer the alias:

```tsx
// ✅ what mosaic-web does
import { BookCard } from '@books/components/BookCard';

// works but discouraged once paths get deep
import { BookCard } from '../../modules/books/components/BookCard';
```

Aliases live in `tsconfig.app.json` under `paths`. mosaic-web has 78 of them.

## 8. Your exercises

1. **Implement** `src/modules/books/components/BookStatusBadge.tsx`. It takes `status: BookStatus` and renders an MUI `Chip` whose label comes from `statusLabel(...)` (your Stage 1 helper) and whose `color` is picked by status:
   - `'read'` → `'success'`
   - `'reading'` → `'primary'`
   - `'want_to_read'` → `'default'`

2. **Implement** `src/modules/books/components/BookCard.tsx`. It takes `book: Book` and renders an MUI `Card` showing:
   - title (variant `h6`)
   - author (variant `body2`, colour `text.secondary`)
   - page count (e.g. `688 pages`, variant `caption`)
   - a `<BookStatusBadge status={book.status} />`

   Lay them out with `<Stack spacing={1}>` inside `<CardContent>`.

3. **Wire it up.** In `App.tsx`, import `SAMPLE_BOOKS` from `@books/types` and `BookCard` from `@books/components/BookCard`. Replace the placeholder info panel with `<Stack spacing={2}>` containing one `BookCard` per book.

Run the tests and the dev server in two terminals:

```sh
npm run test:unit:watch
npm run dev
```

Done when:
- Tests in `src/modules/books/components/__tests__/` are all green.
- `localhost:5173` shows four cards, each with a coloured status chip.

## 9. What to compare against in mosaic-web

- `mosaic-web/src/modules/<any>/components/` — every component file has the same shape: imports, props interface, named export. Open one and notice how mechanical it is.
- `mosaic-web/src/common/components/` — small shared components (badges, chips, status pills). At least one will follow the same "Chip + colour-by-status" pattern you just wrote.
- Search for `sx={{` across mosaic-web to see how heavy `sx` usage is in real code.

## 10. Vocabulary

- **Props** — the data passed into a component.
- **JSX** — the HTML-looking syntax in `.tsx` files; compiles to `React.createElement` calls.
- **Render** — when React calls your component function and walks its returned JSX tree.
- **Reconciliation** — the diff React does between two renders to figure out which DOM nodes to update. (You don't write reconciliation; you write JSX and React does the rest.)

Stage 2 done? Ping me for Stage 3 (Zustand state via `storeRegistry`).
