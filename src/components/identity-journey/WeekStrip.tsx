const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeekStripProps {
  loggedDays: boolean[];
}

const WeekStrip = ({ loggedDays }: WeekStripProps) => {
  return (
    <div className="card-base">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Your week
      </p>
      <div className="flex justify-between">
        {days.map((d, i) => (
          <div key={d} className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-lg ${
                loggedDays[i]
                  ? "bg-lavender-strong"
                  : "border-2 border-muted bg-transparent"
              }`}
            />
            <span className="text-[11px] text-muted-foreground font-medium">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekStrip;
