import { Link } from "react-router-dom";
import "./StationShell.css";

type StationShellProps = {
  chapter: number;
  title: string;
  subtitle: string;
  tone: "sweet" | "funny" | "mixed";
  solved: boolean;
  onContinue?: () => void;
  continueLabel?: string;
  continueTo?: string;
  children: React.ReactNode;
};

export function StationShell({
  chapter,
  title,
  subtitle,
  tone,
  solved,
  onContinue,
  continueLabel = "Continue to next chapter",
  continueTo,
  children,
}: StationShellProps) {
  return (
    <article className={`station station--${tone} page-enter`}>
      <header className="station__header">
        <span className="station__chapter">Chapter {chapter}</span>
        <h1 className="station__title">{title}</h1>
        <p className="station__subtitle">{subtitle}</p>
      </header>
      <div className="station__content">{children}</div>
      {solved && (
        <footer className="station__footer fade-in">
          {continueTo ? (
            <Link to={continueTo} className="btn btn-primary">
              {continueLabel}
            </Link>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onContinue}>
              {continueLabel}
            </button>
          )}
        </footer>
      )}
    </article>
  );
}
