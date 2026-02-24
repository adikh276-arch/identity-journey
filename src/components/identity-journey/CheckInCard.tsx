import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sentences = [
  {
    text: "I felt seen for who I am today",
    quote: "Being seen is everything. Hold onto that feeling — it's yours.",
  },
  {
    text: "I kept a part of myself hidden today",
    quote: "Hiding isn't weakness. Sometimes it's wisdom. Your time will come.",
  },
  {
    text: "I'm still figuring myself out — and that's okay",
    quote: "The most honest thing anyone can say is 'I'm still learning who I am.' You're doing that.",
  },
  {
    text: "I felt free to just be me today",
    quote: "That freedom? That's what you deserve every single day.",
  },
  {
    text: "Today was hard, but I'm still here",
    quote: "Still here is more than enough. That took strength.",
  },
];

const CheckInCard = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="card-base">
      <h2 className="text-base font-bold text-foreground">One word, today</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Pick the sentence that feels closest to your day.
      </p>

      <div className="mt-4 flex flex-col gap-2.5">
        {sentences.map((s, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 min-h-[48px] ${
              selected === i
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-lavender text-secondary-foreground hover:bg-lavender-mid"
            }`}
          >
            {s.text}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="bg-lavender rounded-xl px-4 py-4">
              <p className="text-sm italic text-accent-foreground leading-relaxed">
                "{sentences[selected].quote}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckInCard;
