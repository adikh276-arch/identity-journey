import { useTranslation } from "react-i18next";

interface CheckInCardProps {
  selected: number | null;
  onSelect: (index: number) => void;
}

const CheckInCard = ({ selected, onSelect }: CheckInCardProps) => {
  const { t } = useTranslation();

  const sentences = [
    t("sentence_0"),
    t("sentence_1"),
    t("sentence_2"),
    t("sentence_3"),
    t("sentence_4"),
  ];

  return (
    <div className="card-base">
      <h2 className="text-base font-bold text-foreground">{t('one_word_today')}</h2>
      <p className="text-sm text-muted-foreground mt-1">
        {t('pick_sentence')}
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {sentences.map((text, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[48px] ${selected === i
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
