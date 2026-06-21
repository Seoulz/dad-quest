import { useMemo, useState } from "react";
import "./Puzzles.css";

type UnscramblePuzzleProps = {
  setup: string;
  scrambled: string;
  normalizedAnswer: string;
  onComplete: () => void;
};

export function UnscramblePuzzle({
  setup,
  scrambled,
  normalizedAnswer,
  onComplete,
}: UnscramblePuzzleProps) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  const letters = useMemo(() => scrambled.split(" "), [scrambled]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const guess = input.trim().toLowerCase();
    if (guess === normalizedAnswer) {
      setWrong(false);
      setFeedback("Correct! That joke never gets old.");
      setTimeout(onComplete, 700);
    } else {
      setWrong(true);
      setFeedback("Close — rearrange the letters and try again.");
    }
  }

  return (
    <div className="puzzle">
      <p className="puzzle__prompt">{setup}</p>
      <div className="scramble-display" aria-label="Scrambled letters">
        {letters.map((word, i) => (
          <span key={`${word}-${i}`} className="scramble-word">
            {word}
          </span>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="puzzle__form">
        <input
          type="text"
          className="text-input"
          placeholder="Type the punchline..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-primary">
          Check answer
        </button>
      </form>
      {feedback && (
        <p className={`puzzle__feedback ${wrong ? "puzzle__feedback--wrong" : "puzzle__feedback--right"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
