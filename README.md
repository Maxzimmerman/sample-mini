# sample-mini

A guided rebuild of sample-web's frontend conventions. The goal isn't to ship a real product — it's to give you hands-on practice with the exact stack, folder layout, and patterns you'll meet in `../sample-web`.

## How this repo works

You progress through 8 stages. Each stage has its own `LESSON.md` under `stages/`, plus stub files in `src/` with `// TODO:` markers. Tests in `__tests__/` folders fail until you fill in the TODOs. When all tests for a stage pass, you're done with it — move to the next.

See `CURRICULUM.md` for the full roadmap.

## First-time setup

```sh
cd sample-mini
npm install
```

## Daily commands

```sh
npm run dev               # Vite dev server (localhost:5173)
npm run test:unit:watch   # Vitest in watch mode — your main loop while learning
npm run test:unit         # One-shot run
npm run ts-check          # Project-wide tsc --noEmit
npm run lint              # ESLint
```

## Where to start

You're at **Stage 1**. Open `stages/01-typescript-basics/LESSON.md`.
