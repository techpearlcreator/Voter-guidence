"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HiOutlineLanguage } from "react-icons/hi2";

export default function LanguageToggle() {
  const { content, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 min-h-[48px] 4k:min-h-[80px] px-4 4k:px-8 py-2 4k:py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-base 4k:text-kiosk-lg transition-colors border border-white/20"
      aria-label="Toggle language"
    >
      <HiOutlineLanguage className="text-xl 4k:text-4xl" />
      <span>{content.header.languageToggleLabel}</span>
    </button>
  );
}
