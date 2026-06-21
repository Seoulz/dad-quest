import { useState } from "react";
import type { PhotoMemory } from "../../content";
import "./Puzzles.css";

type PhotoGuessPuzzleProps = {
  memories: PhotoMemory[];
  onComplete: () => void;
};

export function PhotoGuessPuzzle({ memories, onComplete }: PhotoGuessPuzzleProps) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const current = memories[step];

  function handleAnswer(index: number) {
    if (index === current.correctIndex) {
      setWrong(false);
      setFeedback("You got it!");
      setRevealed(true);
      if (step === memories.length - 1) {
        setTimeout(onComplete, 900);
      } else {
        setTimeout(() => {
          setStep((s) => s + 1);
          setFeedback(null);
          setRevealed(false);
        }, 1200);
      }
    } else {
      setWrong(true);
      setFeedback("Hmm, not that one — look closer.");
    }
  }

  return (
    <div className="puzzle">
      <p className="puzzle__progress">
        Memory {step + 1} of {memories.length}
      </p>
      <div className={`photo-guess ${revealed ? "photo-guess--revealed" : ""}`}>
        <img
          src={current.imageUrl}
          alt=""
          className="photo-guess__image"
        />
        {!revealed && <div className="photo-guess__blur" aria-hidden="true" />}
      </div>
      <h2 className="puzzle__prompt">{current.blurLabel}</h2>
      <div className="puzzle__options">
        {current.choices.map((choice, index) => (
          <button
            key={choice}
            type="button"
            className="option-btn"
            onClick={() => handleAnswer(index)}
          >
            {choice}
          </button>
        ))}
      </div>
      {revealed && (
        <div className="photo-caption fade-in">
          <strong>{current.caption}</strong>
          <p>{current.story}</p>
        </div>
      )}
      {feedback && !revealed && (
        <p className={`puzzle__feedback ${wrong ? "puzzle__feedback--wrong" : "puzzle__feedback--right"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
