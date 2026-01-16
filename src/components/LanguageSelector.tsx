import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { languages, Language } from "@/i18n/translations";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all duration-200"
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
        <span className="text-sm sm:text-base">{currentLang?.flag}</span>
        <span className="hidden lg:inline text-xs sm:text-sm font-medium">{currentLang?.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-44 sm:w-48 rounded-xl bg-card border border-border shadow-lg shadow-black/20 overflow-hidden z-50"
            >
              <div className="p-1.5 sm:p-2">
                <p className="text-xs text-muted-foreground px-2 py-1 mb-1">
                  {t("language.select")}
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      language === lang.code
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-secondary text-foreground"
                    }`}
                  >
                    <span className="text-base sm:text-lg">{lang.flag}</span>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{lang.nativeName}</p>
                      <p className="text-xs text-muted-foreground">
                        {lang.name}
                      </p>
                    </div>
                    {language === lang.code && (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;