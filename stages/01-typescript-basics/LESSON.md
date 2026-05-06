# Stage 1 — TypeScript fundamentals

Welcome. This stage is about reading and writing types — the foundation everything else in sample-web builds on. You won't write a single React component this stage; you'll only write TypeScript that runs in tests.

By the end you'll have:
- Read a `Book` type and a `BookStatus` union
- Implemented `formatBook(book) -> "Title by Author (Status)"`
- Implemented `filterBooks(books, filters)` with an AND combination
- All tests in `src/modules/books/utils/__tests__/` passing

## 1. Why types?

In sample, when you write a function that takes a job, you don't pass a free-form object — you pass a `Job`. The type tells future-you (and your IDE) exactly what fields exist. If you mistype `job.transportType` as `job.transpotrType`, the compiler stops you before runtime.

You'll see this everywhere in sample-web:
- `sample-web/src/modules/job-details-new/types.ts` defines `Job`, `JobStatus`, etc.
- `sample-web/src/api/jobApi.ts` is typed: `getJob(id: string): Promise<Job>`.

## 2. Three core moves

### a) Literal union types
sample-web models domain enums as **string unions**, not enum classes:

```ts
export type JobStatus = 'draft' | 'in_progress' | 'completed';
```

Why? They serialize cleanly over JSON, narrow nicely in `switch`, and TS rejects typos.

> **Note**: `tsconfig.app.json` has `erasableSyntaxOnly: true`, which forbids `enum`. So unions are the only option here anyway.

### b) Interfaces for object shapes

```ts
export interface Job {
  id: string;
  reference: string;
  status: JobStatus;
  notes?: string;  // optional — may be undefined
}
```

sample-web mostly uses `interface` for object shapes and `type` for unions/utilities. We'll do the same.

### c) Type narrowing with exhaustive switch

```ts
function label(s: BookStatus): string {
  switch (s) {
    case 'reading': return 'Reading';
    case 'read': return 'Read';
    case 'want_to_read': return 'Want to read';
  }
}
```

TS knows the switch is exhaustive — every case in the union is handled, so the function is guaranteed to return a string. If you later add a 4th status to the union, the compiler will flag this function as missing a case. That's the type system catching a bug before runtime.

### d) `import type` (a config quirk you'll hit)

`tsconfig.app.json` has `verbatimModuleSyntax: true`. That means **type-only imports must be marked**:

```ts
// ✅
import type { Book, BookStatus } from '../types';

// ❌ — TS error: 'Book' is a type and must be imported using a type-only import
import { Book, BookStatus } from '../types';
```

Mix runtime + type imports? Use the inline form:

```ts
import { something, type Book } from '../types';
```

## 3. Your exercises

Open these files. Each has `// TODO:` markers next to a `throw new Error('Not implemented')`.

1. **Read** `src/modules/books/types.ts`. Don't change it. Just understand it.
2. **Implement** `src/modules/books/utils/formatBook.ts` — both `statusLabel` and `formatBook`.
3. **Implement** `src/modules/books/utils/filterBooks.ts`.

Run tests in watch mode:

```sh
npm run test:unit:watch
```

When all tests in `src/modules/books/utils/__tests__/` are green, you're done with Stage 1.

## 4. What to compare against in sample-web

When you're done, open these files in sample-web side-by-side:

- `sample-web/src/modules/job-details-new/types.ts` — same shape as our `Book` types, just bigger.
- Search any module's `types.ts` for `' | '` — every domain enum is a literal union.
- Look at any util file (e.g. `sample-web/src/common/utils/` files) — pure functions, types in the signature, tested in `__tests__/`.

## 5. Vocabulary you'll see in code review

- **Narrowing**: TS proving that inside an `if` branch, a value has a more specific type than its declaration. (e.g. `if (status === 'read') { /* status is 'read' here */ }`).
- **Discriminated union**: A union of object types where each variant has a unique literal field that picks it out. (We'll meet these in Stage 4 when we model API errors.)
- **Optional chaining (`?.`) and nullish coalescing (`??`)**: `book.addedAt ?? 'never'`.

That's it. Run the tests, fix the TODOs, ping me for Stage 2 (components + MUI).
