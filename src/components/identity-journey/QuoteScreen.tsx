import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface QuoteScreenProps {
  selectedIndex: number;
  onClose: () => void;
}

const QuoteScreen = ({ selectedIndex, onClose }: QuoteScreenProps) => {
  const { t } = useTranslation();

  const quotes = [
    t("quote_0"),
    t("quote_1"),
    t("quote_2"),
    t("quote_3"),
    t("quote_4"),
  ];

  const sentences = [
    t("sentence_0"),
    t("sentence_1"),
    t("sentence_2"),
    t("sentence_3"),
    t("sentence_4"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center"
    >
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {sentences[selectedIndex]}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-xl italic text-foreground leading-relaxed font-medium max-w-xs"
      >
        "{quotes[selectedIndex]}"
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        onClick={onClose}
        className="mt-10 text-sm text-primary font-medium hover:underline transition-all"
      >
        {t('back_home')}
      </motion.button>
    </motion.div>
  );
};

export default QuoteScreen;
