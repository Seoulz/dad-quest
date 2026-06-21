import { useState } from "react";
import confetti from "canvas-confetti";
import { Navigate } from "react-router-dom";
import { finale } from "../content";
import { useProgressContext } from "../context/ProgressContext";
import "./FinalePage.css";

function fireConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ["#f59e0b", "#fbbf24", "#fef3c7"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ["#f59e0b", "#fbbf24", "#fef3c7"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#f59e0b", "#fbbf24", "#fef3c7", "#ffffff"],
  });
  frame();
}

export function FinalePage() {
  const { canAccessFinale, unlockFinale } = useProgressContext();
  const [revealed, setRevealed] = useState(false);

  if (!canAccessFinale) {
    return <Navigate to="/station/1" replace />;
  }

  function handleReveal() {
    setRevealed(true);
    unlockFinale();
    fireConfetti();
  }

  return (
    <section className={`finale page-enter ${revealed ? "finale--revealed" : ""}`}>
      {!revealed ? (
        <div className="finale__teaser">
          <span className="finale__badge">Final Chapter</span>
          <h1 className="finale__title">You've made it.</h1>
          <p className="finale__lead">
            Six chapters down. One surprise left — a letter, a gift, and something to look forward to.
          </p>
          <button type="button" className="btn btn-primary btn-large" onClick={handleReveal}>
            {finale.unlockButton}
          </button>
        </div>
      ) : (
        <div className="finale__content fade-in">
          <article className="finale-card finale-card--letter">
            <h2>{finale.letterTitle}</h2>
            <div className="finale-letter">
              {finale.letter.split("\n").map((line, i) => (
                <p key={i}>{line || "\u00A0"}</p>
              ))}
            </div>
          </article>

          <article className="finale-card finale-card--gift">
            <h2>{finale.giftTitle}</h2>
            <p>{finale.giftDescription}</p>
            {finale.giftLocation && (
              <p className="finale-location">
                <span>Where to look:</span> {finale.giftLocation}
              </p>
            )}
          </article>

          <article className="finale-card finale-card--experience">
            <h2>{finale.experienceTitle}</h2>
            <p>{finale.experienceDescription}</p>
          </article>

          <p className="finale__closing">Happy Father's Day, Dad. 🎉</p>
        </div>
      )}
    </section>
  );
}
