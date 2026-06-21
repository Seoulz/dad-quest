# Dad Quest

An interactive Father's Day scavenger hunt — six chapters of puzzles, memories, and a finale reveal.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize content

See [CONTENT.md](./CONTENT.md) — all personal content lives in `src/content/index.ts`.

## Build

```bash
npm run build
npm run preview
```

## Deploy

**Vercel (recommended):**

```bash
npx vercel login
npx vercel --prod
```

**GitHub Pages:**

```bash
npm run build
npx gh-pages -d dist
```

The app uses hash routing (`/#/`) so it works on static hosts without server rewrites.
