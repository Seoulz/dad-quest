import "./MemoryReveal.css";

type MemoryRevealProps = {
  title: string;
  story: string;
  imageUrl?: string;
  tone?: "sweet" | "funny" | "mixed";
  children?: React.ReactNode;
};

export function MemoryReveal({
  title,
  story,
  imageUrl,
  tone = "sweet",
  children,
}: MemoryRevealProps) {
  return (
    <div className={`memory-reveal memory-reveal--${tone} fade-in`}>
      {imageUrl && (
        <div className="memory-reveal__photo-wrap">
          <img src={imageUrl} alt="" className="memory-reveal__photo" />
        </div>
      )}
      <div className="memory-reveal__body">
        <p className="memory-reveal__label">Memory unlocked</p>
        <h3 className="memory-reveal__title">{title}</h3>
        <p className="memory-reveal__story">{story}</p>
        {children}
      </div>
    </div>
  );
}
