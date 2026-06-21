import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dad-quest-progress";

export type ProgressState = {
  started: boolean;
  completedStations: number[];
  finaleUnlocked: boolean;
};

const defaultState: ProgressState = {
  started: false,
  completedStations: [],
  finaleUnlocked: false,
};

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const startQuest = useCallback(() => {
    setProgress((prev) => ({ ...prev, started: true }));
  }, []);

  const completeStation = useCallback((stationId: number) => {
    setProgress((prev) => {
      if (prev.completedStations.includes(stationId)) return prev;
      const completedStations = [...prev.completedStations, stationId].sort(
        (a, b) => a - b,
      );
      return { ...prev, completedStations };
    });
  }, []);

  const unlockFinale = useCallback(() => {
    setProgress((prev) => ({ ...prev, finaleUnlocked: true }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isStationUnlocked = useCallback(
    (stationId: number) => {
      if (stationId === 1) return progress.started;
      return progress.completedStations.includes(stationId - 1);
    },
    [progress],
  );

  const isStationComplete = useCallback(
    (stationId: number) => progress.completedStations.includes(stationId),
    [progress],
  );

  const canAccessFinale =
    progress.completedStations.length >= 6 || progress.finaleUnlocked;

  return {
    progress,
    startQuest,
    completeStation,
    unlockFinale,
    resetProgress,
    isStationUnlocked,
    isStationComplete,
    canAccessFinale,
  };
}
