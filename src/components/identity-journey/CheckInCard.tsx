const sentences = [
  "I felt seen for who I am today",
  "I kept a part of myself hidden today",
  "I'm still figuring myself out — and that's okay",
  "I felt free to just be me today",
  "Today was hard, but I'm still here",
];

interface CheckInCardProps {
  selected: number | null;
  onSelect: (index: number) => void;
}

const CheckInCard = ({ selected, onSelect }: CheckInCardProps) => {
  return (
    <div className="card-base">
      <h2 className="text-base font-bold text-foreground">One word, today</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Pick the sentence that feels closest to your day.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {sentences.map((text, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[48px] ${
              selected === i
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-lavender text-secondary-foreground hover:bg-lavender-mid"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CheckInCard;
