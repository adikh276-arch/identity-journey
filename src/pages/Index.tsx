import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/identity-journey/Header";
import CheckInCard from "@/components/identity-journey/CheckInCard";
import WeekStrip from "@/components/identity-journey/WeekStrip";
import DoneSection from "@/components/identity-journey/DoneSection";
import QuoteScreen from "@/components/identity-journey/QuoteScreen";

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const handleDone = () => {
    if (selected !== null) setShowQuote(true);
  };

  const handleClose = () => {
    setShowQuote(false);
    setSelected(null);
  };

  if (showQuote && selected !== null) {
    return <QuoteScreen selectedIndex={selected} onClose={handleClose} />;
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <CheckInCard selected={selected} onSelect={setSelected} />
        <WeekStrip />
      </div>
      <DoneSection enabled={selected !== null} onDone={handleDone} />
    </div>
  );
};

export default Index;
