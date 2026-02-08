"use client";

import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "./LanguageToggle";
import { useFullscreen } from "@/lib/useFullscreen";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default function Header() {
  const { content } = useLanguage();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-lg">
      <div className="max-w-7xl 4k:max-w-[90%] mx-auto px-4 4k:px-12 py-3 4k:py-6 flex items-center justify-between">
        {/* Title section */}
        <div className="flex items-center gap-3 4k:gap-6">
          {/* ECI emblem placeholder */}
          <div className="w-10 h-10 4k:w-20 4k:h-20 rounded-full bg-white/20 flex items-center justify-center text-lg 4k:text-3xl font-bold shrink-0">
            ECI
          </div>
          <div>
            <h1 className="text-lg 4k:text-kiosk-xl font-bold leading-tight">
              {content.header.title}
            </h1>
            <p className="text-sm 4k:text-kiosk-base text-white/70">
              {content.header.subtitle}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 4k:gap-4">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1 min-h-[48px] 4k:min-h-[80px] px-3 4k:px-6 py-2 4k:py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm 4k:text-kiosk-base transition-colors border border-white/20"
            aria-label={
              isFullscreen
                ? content.common.fullscreenExit
                : content.common.fullscreenEnter
            }
          >
            {isFullscreen ? (
              <MdFullscreenExit className="text-2xl 4k:text-4xl" />
            ) : (
              <MdFullscreen className="text-2xl 4k:text-4xl" />
            )}
            <span className="hidden sm:inline">
              {isFullscreen
                ? content.common.fullscreenExit
                : content.common.fullscreenEnter}
            </span>
          </button>
          <LanguageToggle />
        </div>
      </div>

      {/* Tricolor strip */}
      <div className="flex h-1 4k:h-2">
        <div className="flex-1 bg-saffron" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green-accent" />
      </div>
    </header>
  );
}
