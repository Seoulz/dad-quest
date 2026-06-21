import { useMemo, useState } from "react";
import "./Puzzles.css";

type CipherPuzzleProps = {
  cipherHint: string;
  encoded: string;
  normalizedAnswer: string;
  wordBank: string[];
  onComplete: () => void;
};

function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function CipherPuzzle({
  cipherHint,
  encoded,
  normalizedAnswer,
  wordBank,
  onComplete,
}: CipherPuzzleProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);
  const [showDecoder, setShowDecoder] = useState(false);

  const available = useMemo(() => {
    const used = new Map<string, number>();
    selected.forEach((w) => used.set(w, (used.get(w) ?? 0) + 1));
    return wordBank.filter((w) => {
      const count = wordBank.filter((x) => x === w).length;
      const usedCount = used.get(w) ?? 0;
      return usedCount < count;
    });
  }, [selected, wordBank]);

  function addWord(word: string) {
    setSelected((prev) => [...prev, word]);
    setFeedback(null);
  }

  function removeWord(index: number) {
    setSelected((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const guess = selected.join(" ").trim().toLowerCase();
    if (guess === normalizedAnswer) {
      setWrong(false);
      setFeedback("Decoded! Only we would get that one.");
      setTimeout(onComplete, 700);
    } else {
      setWrong(true);
      setFeedback("Not quite — tap words below to build the message.");
    }
  }

  function handleClear() {
    setSelected([]);
    setFeedback(null);
  }

  return (
    <div className="puzzle">
      <p className="puzzle__prompt">{cipherHint}</p>
      <div className="cipher-encoded">{encoded}</div>
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => setShowDecoder((v) => !v)}
      >
        {showDecoder ? "Hide decoder hint" : "Need a hint? Show ROT13 decode"}
      </button>
      {showDecoder && (
        <p className="decoder-hint fade-in">Decoded: {rot13(encoded)}</p>
      )}

      <div className="word-builder">
        <div className="word-builder__selected">
          {selected.length === 0 ? (
            <span className="word-builder__placeholder">Tap words to build the message...</span>
          ) : (
            selected.map((word, i) => (
              <button
                key={`${word}-${i}`}
                type="button"
                className="word-chip word-chip--selected"
                onClick={() => removeWord(i)}
              >
                {word} ×
              </button>
            ))
          )}
        </div>
        <div className="word-bank">
          {available.map((word, i) => (
            <button
              key={`${word}-${i}`}
              type="button"
              className="word-chip"
              onClick={() => addWord(word)}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="puzzle__form puzzle__form--row">
        <button type="button" className="btn btn-ghost" onClick={handleClear}>
          Clear
        </button>
        <button type="submit" className="btn btn-primary">
          Decode message
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
