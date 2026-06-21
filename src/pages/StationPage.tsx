import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { MemoryReveal } from "../components/MemoryReveal";
import { StationShell } from "../components/StationShell";
import { CipherPuzzle } from "../components/puzzles/CipherPuzzle";
import { FillBlankPuzzle } from "../components/puzzles/FillBlankPuzzle";
import { MatchPuzzle } from "../components/puzzles/MatchPuzzle";
import { PhotoGuessPuzzle } from "../components/puzzles/PhotoGuessPuzzle";
import { TriviaPuzzle } from "../components/puzzles/TriviaPuzzle";
import { UnscramblePuzzle } from "../components/puzzles/UnscramblePuzzle";
import {
  dadJokes,
  greatestHits,
  insideTrack,
  originStory,
  stationMeta,
  superpowers,
  wordsToLiveBy,
} from "../content";
import { useProgressContext } from "../context/ProgressContext";

export function StationPage() {
  const { id } = useParams<{ id: string }>();
  const stationId = Number(id);
  const meta = stationMeta.find((s) => s.id === stationId);
  const { isStationUnlocked, isStationComplete, completeStation } = useProgressContext();
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSolved(isStationComplete(stationId));
  }, [stationId, isStationComplete]);

  if (!meta || Number.isNaN(stationId) || stationId < 1 || stationId > 6) {
    return <Navigate to="/" replace />;
  }

  if (!isStationUnlocked(stationId)) {
    return <Navigate to={`/station/${Math.max(1, stationId - 1)}`} replace />;
  }

  function handleComplete() {
    setSolved(true);
    completeStation(stationId);
  }

  const nextPath = stationId < 6 ? `/station/${stationId + 1}` : "/finale";

  function renderPuzzle() {
    switch (stationId) {
      case 1:
        return (
          <>
            {!solved && (
              <TriviaPuzzle
                questions={originStory.questions}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal
                title={originStory.revealTitle}
                story={originStory.revealStory}
                imageUrl={originStory.imageUrl}
                tone="sweet"
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            {!solved && (
              <UnscramblePuzzle
                setup={dadJokes.setup}
                scrambled={dadJokes.scrambled}
                normalizedAnswer={dadJokes.normalizedAnswer}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal title="Hall of Fame Joke" story={dadJokes.reaction} tone="funny">
                <p className="joke-reveal">"{dadJokes.joke}"</p>
              </MemoryReveal>
            )}
          </>
        );
      case 3:
        return (
          <>
            {!solved && (
              <PhotoGuessPuzzle
                memories={greatestHits.memories}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal
                title="Greatest Hits — Complete"
                story="Three memories, three moments that still make me smile. Thanks for every one of them."
                tone="sweet"
              />
            )}
          </>
        );
      case 4:
        return (
          <>
            {!solved && (
              <MatchPuzzle
                items={superpowers.items}
                lessonLabels={superpowers.lessonLabels}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal
                title="Superpowers Unlocked"
                story="These aren't just hobbies — they're the things you passed down without even trying."
                tone="mixed"
              >
                <ul className="lesson-list">
                  {superpowers.items.map((item) => (
                    <li key={item.id}>
                      <span>{item.icon}</span> {item.label}: {item.lesson}
                    </li>
                  ))}
                </ul>
              </MemoryReveal>
            )}
          </>
        );
      case 5:
        return (
          <>
            {!solved && (
              <FillBlankPuzzle
                hint={wordsToLiveBy.hint}
                template={wordsToLiveBy.template}
                blankWord={wordsToLiveBy.blankWord}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal
                title="Words to Live By"
                story={wordsToLiveBy.whyItStuck}
                tone="sweet"
              >
                <blockquote className="final-quote">"{wordsToLiveBy.quote}"</blockquote>
              </MemoryReveal>
            )}
          </>
        );
      case 6:
        return (
          <>
            {!solved && (
              <CipherPuzzle
                cipherHint={insideTrack.cipherHint}
                encoded={insideTrack.encoded}
                normalizedAnswer={insideTrack.normalizedAnswer}
                wordBank={insideTrack.wordBank}
                onComplete={handleComplete}
              />
            )}
            {solved && (
              <MemoryReveal
                title="The Inside Track"
                story={insideTrack.memory}
                tone="funny"
              />
            )}
          </>
        );
      default:
        return null;
    }
  }

  return (
    <StationShell
      chapter={meta.id}
      title={meta.title}
      subtitle={meta.subtitle}
      tone={meta.tone}
      solved={solved}
      continueTo={nextPath}
      continueLabel={stationId < 6 ? "Next chapter" : "Open the finale"}
    >
      {renderPuzzle()}
    </StationShell>
  );
}
