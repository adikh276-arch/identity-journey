import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.parent !== window) {
      // Embedded in iframe — notify parent to handle navigation
      window.parent.postMessage({ action: "goBack" }, "*");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center justify-between px-5 py-4 bg-card">
      <div className="flex items-center gap-3">
        <button 
          onClick={handleBack}
          className="p-1 -ml-1 text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t('app_title')}</h1>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
