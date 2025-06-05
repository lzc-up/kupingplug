"use client";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { language, changeLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
        className
      )}
    >
      <span className="text-xs">{language === 'zh' ? '🇨🇳' : '🇺🇸'}</span>
      <span>{language === 'zh' ? '中文' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;