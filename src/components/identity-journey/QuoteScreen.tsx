import { motion } from "framer-motion";

const quotes = [
  "Being seen is everything. Hold onto that feeling — it's yours.",
  "Hiding isn't weakness. Sometimes it's wisdom. Your time will come.",
  "The most honest thing anyone can say is 'I'm still learning who I am.' You're doing that.",
  "That freedom? That's what you deserve every single day.",
  "Still here is more than enough. That took strength.",
];

const sentences = [
  "I felt seen for who I am today",
  "I kept a part of myself hidden today",
  "I'm still figuring myself out — and that's okay",
  "I felt free to just be me today",
  "Today was hard, but I'm still here",
];

interface QuoteScreenProps {
  selectedIndex: number;
  onClose: () => void;
}

const QuoteScreen = ({ selectedIndex, onClose }: QuoteScreenProps) => {
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
        Back to Home
      </motion.button>
    </motion.div>
  );
};

export default QuoteScreen;
