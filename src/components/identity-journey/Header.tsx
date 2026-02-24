import { ArrowLeft } from "lucide-react";
import identityIcon from "@/assets/identity-journey-icon.png";

const Header = () => {
  return (
    <div className="flex items-center gap-3 px-5 py-4 bg-card">
      <button className="p-1 -ml-1 text-foreground/70 hover:text-foreground transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <img src={identityIcon} alt="Identity Journey" className="w-9 h-9" />
      <h1 className="text-lg font-bold text-foreground">Identity Journey</h1>
    </div>
  );
};

export default Header;
