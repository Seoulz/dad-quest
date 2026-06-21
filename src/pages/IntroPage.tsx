import { Navigate, useNavigate } from "react-router-dom";
import { questMeta } from "../content";
import { useProgressContext } from "../context/ProgressContext";
import "./IntroPage.css";

export function IntroPage() {
  const { progress, startQuest } = useProgressContext();
  const navigate = useNavigate();

  function handleStart() {
    startQuest();
    if (progress.completedStations.length > 0) {
      const next = progress.completedStations.length + 1;
      navigate(next > 6 ? "/finale" : `/station/${Math.min(next, 6)}`);
    } else {
      navigate("/station/1");
    }
  }

  if (progress.completedStations.length >= 6) {
    return <Navigate to="/finale" replace />;
  }

  return (
    <section className="intro page-enter">
      <div className="intro__badge">Father's Day 2026</div>
      <h1 className="intro__title">{questMeta.title}</h1>
      <p className="intro__subtitle">{questMeta.subtitle}</p>
      <div className="intro__card">
        <p className="intro__greeting">Dear {questMeta.introGreeting},</p>
        <p className="intro__message">{questMeta.introMessage}</p>
      </div>
      <button type="button" className="btn btn-primary btn-large" onClick={handleStart}>
        {progress.started ? "Continue the Quest" : questMeta.introButton}
      </button>
      {progress.started && (
        <p className="intro__resume">
          Progress saved — pick up right where you left off.
        </p>
      )}
    </section>
  );
}
