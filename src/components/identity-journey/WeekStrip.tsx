import { useTranslation } from "react-i18next";

interface WeekStripProps {
  loggedDays: (number | null)[];
}

const ITEM_COLORS = [
  "bg-violet-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-rose-500",
  "bg-sky-500",
];

const WeekStrip = ({ loggedDays }: WeekStripProps) => {
  const { t } = useTranslation();

  const days = [
    t("mon"),
    t("tue"),
    t("wed"),
    t("thu"),
    t("fri"),
    t("sat"),
    t("sun"),
  ];

  return (
    <div className="card-base">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {t('your_week', 'Your week')}
      </p>
      <div className="flex justify-between">
        {days.map((d, i) => {
          const selectedIndex = loggedDays[i];
          const isLogged = selectedIndex !== null && selectedIndex !== undefined;

          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-lg transition-colors border-2 ${isLogged
                    ? `${ITEM_COLORS[selectedIndex as number]} border-transparent`
                    : "border-muted bg-transparent"
                  }`}
              />
              <span className="text-[11px] text-muted-foreground font-medium">{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekStrip;
