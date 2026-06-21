# Content Guide — The Dad Quest

All personal content lives in one file: **`src/content/index.ts`**.

Edit that file to customize the experience. You do not need to touch puzzle logic or components.

## Quick checklist

Replace placeholder content in these sections:

| Section | What to change |
|---------|----------------|
| `questMeta` | Greeting name, intro message |
| `originStory` | Trivia Q&A + reveal photo/story |
| `dadJokes` | Scrambled punchline, joke text, your reaction |
| `greatestHits` | 3 photos, captions, memory choices |
| `superpowers` | Hobbies/icons + lessons he taught you |
| `wordsToLiveBy` | His quote, blank word, why it stuck |
| `insideTrack` | Inside joke, ROT13 message, shared memory |
| `finale` | Letter, gift details, experience plans |

## Station 1 — Origin Story

Update `originStory.questions` with real trivia (3 questions). Set `correctIndex` to the right answer (0-based).

Replace `originStory.imageUrl` with a photo path:

```ts
imageUrl: "/photos/dad-young.jpg"  // put file in public/photos/
```

Update `revealTitle` and `revealStory`.

## Station 2 — Dad Jokes

- `scrambled`: space-separated scrambled letters of the punchline
- `normalizedAnswer`: lowercase expected answer
- `joke`: the full joke
- `reaction`: your note about it

## Station 3 — Greatest Hits

Each item in `greatestHits.memories` needs:

- `imageUrl` — photo
- `choices` — 4 options (one correct)
- `correctIndex` — index of correct choice
- `caption` and `story` — shown after guessing

## Station 4 — Superpowers

Edit `superpowers.items` — each needs `label`, `icon` (emoji), and matching `lesson`.

Keep `lessonLabels` in sync (same lesson strings as in `items`).

## Station 5 — Words to Live By

- `quote` — full quote
- `blankWord` — word he has to fill in
- `template` — use `_____` for the blank
- `whyItStuck` — your paragraph

## Station 6 — Inside Track

Generate ROT13 at [rot13.com](https://rot13.com) or use the decoder hint in the puzzle.

- `encoded` — ROT13 of your message
- `wordBank` — words he taps to build the answer (include duplicates if needed)
- `normalizedAnswer` — lowercase expected phrase
- `memory` — the story behind the joke

## Finale

- `letter` — multi-line string (use `\n` for line breaks)
- `giftDescription` — what the gift is
- `giftLocation` — where to find it (optional physical hybrid)
- `experienceDescription` — planned outing or activity

## Adding photos

1. Create `public/photos/`
2. Add your images there
3. Reference them as `/photos/your-file.jpg` in `imageUrl`

## Resetting progress (for testing)

Open browser devtools → Application → Local Storage → delete `dad-quest-progress`.

Or run in the console:

```js
localStorage.removeItem('dad-quest-progress')
```

## Deploying updates

After editing content:

```bash
npm run build
npx vercel --prod
```

Or push to GitHub if connected to Vercel for automatic deploys.
