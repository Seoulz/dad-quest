export type TriviaQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type PhotoMemory = {
  id: string;
  blurLabel: string;
  choices: string[];
  correctIndex: number;
  caption: string;
  story: string;
  imageUrl: string;
};

export type Superpower = {
  id: string;
  label: string;
  icon: string;
  lesson: string;
};

export const questMeta = {
  title: "The Dad Quest",
  subtitle: "A Father's Day adventure through the files only you two know.",
  introGreeting: "Dad",
  introMessage:
    "I've put together something special — six chapters of memories, jokes, and clues. Take your time. Each one unlocks the next.",
  introButton: "Begin the Quest",
};

export const stationMeta = [
  {
    id: 1,
    slug: "origin-story",
    title: "Origin Story",
    subtitle: "Chapter 1 — Where it all began",
    tone: "sweet" as const,
  },
  {
    id: 2,
    slug: "dad-jokes",
    title: "Certified Dad Jokes",
    subtitle: "Chapter 2 — Groan-worthy classics",
    tone: "funny" as const,
  },
  {
    id: 3,
    slug: "greatest-hits",
    title: "Greatest Hits",
    subtitle: "Chapter 3 — Memories in focus",
    tone: "sweet" as const,
  },
  {
    id: 4,
    slug: "superpowers",
    title: "Superpowers",
    subtitle: "Chapter 4 — What you taught me",
    tone: "mixed" as const,
  },
  {
    id: 5,
    slug: "words-to-live-by",
    title: "Words to Live By",
    subtitle: "Chapter 5 — The quote that stuck",
    tone: "sweet" as const,
  },
  {
    id: 6,
    slug: "inside-track",
    title: "The Inside Track",
    subtitle: "Chapter 6 — Just us",
    tone: "funny" as const,
  },
];

export const originStory = {
  revealTitle: "The Early Years",
  revealStory:
    "Before the dad jokes and the life lessons, there was a kid with big dreams and even bigger determination. This photo captures that spark — the same one you've carried into everything you do for our family.",
  imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
  questions: [
    {
      question: "Where did Dad grow up?",
      options: ["Chicago", "Boston", "Denver", "Seattle"],
      correctIndex: 1,
    },
    {
      question: "What was Dad's nickname as a kid?",
      options: ["Ace", "Sparky", "Bear", "Chip"],
      correctIndex: 0,
    },
    {
      question: "What was Dad's first job?",
      options: ["Lifeguard", "Paper route", "Camp counselor", "Dishwasher"],
      correctIndex: 2,
    },
  ] satisfies TriviaQuestion[],
};

export const dadJokes = {
  setup: "Unscramble the punchline to Dad's all-time favorite joke:",
  scrambled: "AN IMPASTA",
  answer: "AN IMPASTA",
  normalizedAnswer: "an impasta",
  joke: "What do you call a fake noodle? An impasta.",
  reaction:
    "I still groan every time — and then I laugh anyway. That's the Dad Effect™.",
};

export const greatestHits = {
  memories: [
    {
      id: "trip",
      blurLabel: "Guess this memory",
      choices: ["The beach trip", "Moving day", "First day of school", "Holiday dinner"],
      correctIndex: 0,
      caption: "The Great Beach Trip",
      story:
        "Sand everywhere, sunscreen in your hair, and you insisting the cooler had 'everything we need.' It did. It always does.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
    {
      id: "hike",
      blurLabel: "Guess this memory",
      choices: ["Birthday party", "Mountain hike", "Road trip", "Backyard BBQ"],
      correctIndex: 1,
      caption: "Summit Day",
      story:
        "You said we'd make it to the top before lunch. We didn't — but you never let me quit on the way up.",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    },
    {
      id: "home",
      blurLabel: "Guess this memory",
      choices: ["Game night", "Graduation", "Family reunion", "Sunday breakfast"],
      correctIndex: 3,
      caption: "Sunday Mornings",
      story:
        "Pancakes, bad coffee jokes, and the newspaper spread across the table. Still my favorite version of home.",
      imageUrl: "https://images.unsplash.com/photo-1499638616830-8c0875664457?w=800&q=80",
    },
  ] satisfies PhotoMemory[],
};

export const superpowers = {
  prompt: "Match each superpower to what Dad taught you about it:",
  items: [
    {
      id: "grill",
      label: "Master of the Grill",
      icon: "🔥",
      lesson: "Patience isn't waiting — it's knowing when things are ready.",
    },
    {
      id: "fix",
      label: "Fix-It Wizard",
      icon: "🔧",
      lesson: "Most problems have a solution if you're willing to look twice.",
    },
    {
      id: "travel",
      label: "Adventure Planner",
      icon: "✈️",
      lesson: "The best trips aren't perfect — they're the ones you figure out together.",
    },
    {
      id: "sports",
      label: "Sideline Coach",
      icon: "⚽",
      lesson: "Show up, try hard, and shake hands win or lose.",
    },
  ] satisfies Superpower[],
  lessonLabels: [
    "Patience isn't waiting — it's knowing when things are ready.",
    "Most problems have a solution if you're willing to look twice.",
    "The best trips aren't perfect — they're the ones you figure out together.",
    "Show up, try hard, and shake hands win or lose.",
  ],
};

export const wordsToLiveBy = {
  quote: "Measure twice, cut once.",
  blankWord: "twice",
  hint: "Fill in the missing word from Dad's favorite saying:",
  template: "Measure _____, cut once.",
  whyItStuck:
    "You say it before every project, every decision, every big moment. It's not about carpentry — it's about caring enough to get it right.",
};

export const insideTrack = {
  encoded: "GUR OBBX VF VA GUR TNENTR",
  cipherHint: "Decode the message (ROT13) — it's something only we would say:",
  answer: "THE BOOK IS IN THE GARAGE",
  normalizedAnswer: "the book is in the garage",
  memory:
    "Remember when you hid my birthday gift 'somewhere obvious' and I searched the whole house? The garage. It was always the garage.",
  wordBank: ["THE", "BOOK", "IS", "IN", "THE", "GARAGE"],
};

export const finale = {
  letterTitle: "A Letter for You",
  letter: `Dad,

Thank you for every early morning, every piece of advice I pretended not to hear, and every joke that made me roll my eyes and smile at the same time.

You taught me how to be curious, how to be kind, and how to keep going when things get hard. I'm grateful for all of it — the big moments and the quiet ones.

Happy Father's Day. I love you.

— Your kid`,
  giftTitle: "Your Gift",
  giftDescription:
    "A leather-bound journal for your next adventures — check the drawer of your nightstand.",
  giftLocation: "Nightstand drawer",
  experienceTitle: "What's Next",
  experienceDescription:
    "Dinner at your favorite spot — Saturday at 7 PM. Just us. Reservations are made.",
  unlockButton: "Open Your Surprise",
};
