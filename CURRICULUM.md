# Curriculum

The path from "I can read TypeScript" to "I can ship a feature in sample-web". Each stage builds the previous stage's work into a richer sample-web-shaped app.

| Stage | Topic | What you'll build | Skill check |
| --- | --- | --- | --- |
| 0 | **Project scaffold** (no exercises) | Vite + React + MUI + Vitest + path aliases + `storeRegistry` | App boots; tests can run |
| 1 | **TypeScript fundamentals** | `Book` types, `formatBook`, `filterBooks` | Unit tests green |
| 2 | **React components + MUI** | `BookCard`, `BookStatusBadge`; rendered list in `App.tsx` | Visible in browser, looks right |
| 3 | **Zustand stores via `storeRegistry`** | Book editor store with actions, derived selectors | Store tests green |
| 4 | **API layer + `parseApiError`** | axios `coreApiClient`, mocked backend, `parseApiError` matching sample-web's two error shapes | parseApiError tests green |
| 5 | **Forms with React Hook Form + Zod** | `BookForm` with Zod validation and backend field-error binding | Submit happy + sad path |
| 6 | **Entity-grid pattern** | `createScopedStore` + `createEntityDataGridStore` clones, books list with pagination/filter/sort using DataGrid Pro | Grid sorts/filters/paginates |
| 7 | **Routing + i18n** | `react-router-dom` v7 routes via constants, `react-i18next` with `TranslationKey` union | Navigate `/books` ↔ `/books/:id` |
| 8 | **Capstone** | Combine all of the above into a usable books app: list page, detail page, edit modal | Independently shippable |

## Stage cadence

- Each stage takes roughly 30–90 minutes if you're new to the concept.
- Each LESSON has a "What to compare against in sample-web" section pointing at the real files in `../sample-web` that use the same pattern. **Open them.** That's how you learn the codebase, not just React.
- Don't skip the tests. Pattern-match on the test names and assertions — they encode the expected behaviour exactly.

## When you're stuck

1. Re-read the relevant section of the LESSON.
2. Open the sample-web file mentioned at the bottom of the LESSON and look at how the real codebase does it.
3. The TS error is usually telling the truth — read it carefully.
4. Ask Claude for the next stage when all the current stage's tests are green.
