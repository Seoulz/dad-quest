import { Link } from "react-router-dom";
import { stationMeta } from "../content";
import { useProgressContext } from "../context/ProgressContext";
import "./Layout.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const { progress } = useProgressContext();
  const total = stationMeta.length;
  const done = progress.completedStations.length;

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">DQ</span>
          <span className="brand-text">The Dad Quest</span>
        </Link>
        {progress.started && (
          <div className="progress-indicator" aria-label={`${done} of ${total} chapters complete`}>
            <span className="progress-label">
              {done}/{total}
            </span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
