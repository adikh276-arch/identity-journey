import { useState, useEffect } from "react";
import Header from "@/components/identity-journey/Header";
import CheckInCard from "@/components/identity-journey/CheckInCard";
import WeekStrip from "@/components/identity-journey/WeekStrip";
import DoneSection from "@/components/identity-journey/DoneSection";
import QuoteScreen from "@/components/identity-journey/QuoteScreen";

const getDayIndex = () => {
  const day = new Date().getDay();
  // Convert Sunday=0..Saturday=6 to Mon=0..Sun=6
  return day === 0 ? 6 : day - 1;
};

const STORAGE_KEY = "identity-journey-week";

const getStoredDays = (): boolean[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === 7) return parsed;
    }
  } catch {}
  return [false, false, false, false, false, false, false];
};

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [loggedDays, setLoggedDays] = useState<boolean[]>(getStoredDays);

  const handleDone = () => {
    if (selected !== null) {
      const todayIdx = getDayIndex();
      const updated = [...loggedDays];
      updated[todayIdx] = true;
      setLoggedDays(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setShowQuote(true);
    }
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
        <WeekStrip loggedDays={loggedDays} />
      </div>
      <DoneSection enabled={selected !== null} onDone={handleDone} />
    </div>
  );
};

export default Index;
