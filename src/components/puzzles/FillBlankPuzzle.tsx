import { useState } from "react";
import "./Puzzles.css";

type FillBlankPuzzleProps = {
  hint: string;
  template: string;
  blankWord: string;
  onComplete: () => void;
};

export function FillBlankPuzzle({
  hint,
  template,
  blankWord,
  onComplete,
}: FillBlankPuzzleProps) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === blankWord.toLowerCase()) {
      setWrong(false);
      setFeedback("Exactly right.");
      setTimeout(onComplete, 700);
    } else {
      setWrong(true);
      setFeedback("Think about what Dad always says before a project...");
    }
  }

  return (
    <div className="puzzle">
      <p className="puzzle__prompt">{hint}</p>
      <blockquote className="quote-template">{template.replace("_____", "______")}</blockquote>
      <form onSubmit={handleSubmit} className="puzzle__form">
        <input
          type="text"
          className="text-input"
          placeholder="Missing word..."
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
