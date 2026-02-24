import Header from "@/components/identity-journey/Header";
import CheckInCard from "@/components/identity-journey/CheckInCard";
import WeekStrip from "@/components/identity-journey/WeekStrip";
import DoneSection from "@/components/identity-journey/DoneSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        <CheckInCard />
        <WeekStrip />
      </div>
      <DoneSection />
    </div>
  );
};

export default Index;
