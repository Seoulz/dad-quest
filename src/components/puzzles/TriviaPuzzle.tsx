import { useState } from "react";
import type { TriviaQuestion } from "../../content";
import "./Puzzles.css";

type TriviaPuzzleProps = {
  questions: TriviaQuestion[];
  onComplete: () => void;
};

export function TriviaPuzzle({ questions, onComplete }: TriviaPuzzleProps) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wrong, setWrong] = useState(false);

  const current = questions[step];

  function handleAnswer(index: number) {
    if (index === current.correctIndex) {
      setWrong(false);
      setFeedback("That's the one!");
      if (step === questions.length - 1) {
        setTimeout(onComplete, 600);
      } else {
        setTimeout(() => {
          setStep((s) => s + 1);
          setFeedback(null);
        }, 600);
      }
    } else {
      setWrong(true);
      setFeedback("Not quite — give it another shot.");
    }
  }

  return (
    <div className="puzzle">
      <p className="puzzle__progress">
        Question {step + 1} of {questions.length}
      </p>
      <h2 className="puzzle__prompt">{current.question}</h2>
      <div className="puzzle__options">
        {current.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className="option-btn"
            onClick={() => handleAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <p className={`puzzle__feedback ${wrong ? "puzzle__feedback--wrong" : "puzzle__feedback--right"}`}>
          {feedback}
        </p>
      )}
    </div>
  );
}
