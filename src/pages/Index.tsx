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

const Index = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [loggedDays, setLoggedDays] = useState<boolean[]>([false, false, false, false, false, false, false]);
  const userId = sessionStorage.getItem('user_id');

  useEffect(() => {
    if (userId) {
      fetch(`/identity_journey/api/progress/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.week_data) {
            setLoggedDays(data.week_data);
          }
        })
        .catch(err => console.error('Failed to fetch progress:', err));
    }
  }, [userId]);

  const handleDone = async () => {
    if (selected !== null && userId) {
      const todayIdx = getDayIndex();
      const updated = [...loggedDays];
      updated[todayIdx] = true;
      setLoggedDays(updated);

      try {
        await fetch('/identity_journey/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, week_data: updated }),
        });
        setShowQuote(true);
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
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
