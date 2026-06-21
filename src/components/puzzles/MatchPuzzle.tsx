import { useMemo, useState } from "react";
import type { Superpower } from "../../content";
import "./Puzzles.css";

type MatchPuzzleProps = {
  items: Superpower[];
  lessonLabels: string[];
  onComplete: () => void;
};

export function MatchPuzzle({ items, lessonLabels, onComplete }: MatchPuzzleProps) {
  const shuffledLessons = useMemo(
    () => [...lessonLabels].slice().reverse(),
    [lessonLabels],
  );

  const [selectedPower, setSelectedPower] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  const allMatched = items.every((item) => matches[item.id]);

  function handlePowerClick(id: string) {
    if (matches[id]) return;
    setSelectedPower(id);
    setFeedback(null);
  }

  function handleLessonClick(lesson: string) {
    if (!selectedPower) {
      setFeedback("Pick a superpower first.");
      setWrong(true);
      return;
    }

    const power = items.find((p) => p.id === selectedPower);
    if (!power) return;

    if (Object.values(matches).includes(lesson)) {
      setFeedback("That lesson is already matched.");
      setWrong(true);
      return;
    }

    if (power.lesson === lesson) {
      const next = { ...matches, [selectedPower]: lesson };
      setMatches(next);
      setSelectedPower(null);
      setWrong(false);
      setFeedback("Perfect match!");

      if (items.every((item) => next[item.id])) {
        setTimeout(onComplete, 800);
      }
    } else {
      setWrong(true);
      setFeedback("Not quite — try a different pairing.");
      setSelectedPower(null);
    }
  }

  return (
    <div className="puzzle">
      <p className="puzzle__prompt">Tap a superpower, then tap the lesson it matches.</p>
      <div className="match-grid">
        <div className="match-column">
          <h3 className="match-heading">Superpowers</h3>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`match-card ${selectedPower === item.id ? "match-card--selected" : ""} ${matches[item.id] ? "match-card--done" : ""}`}
              onClick={() => handlePowerClick(item.id)}
              disabled={!!matches[item.id]}
            >
              <span className="match-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="match-column">
          <h3 className="match-heading">Lessons</h3>
          {shuffledLessons.map((lesson) => {
            const used = Object.values(matches).includes(lesson);
            return (
              <button
                key={lesson}
                type="button"
                className={`match-card match-card--lesson ${used ? "match-card--done" : ""}`}
                onClick={() => handleLessonClick(lesson)}
                disabled={used || allMatched}
              >
                {lesson}
              </button>
            );
          })}
        </div>
      </div>
      {feedback && (
        <p className={`puzzle__feedback ${wrong ? "puzzle__feedback--wrong" : "puzzle__feedback--right"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
