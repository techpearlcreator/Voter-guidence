"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const IDLE_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const WARNING_DURATION = 10; // 10 seconds countdown

export default function IdleTimer() {
  const router = useRouter();
  const pathname = usePathname();
  const { content } = useLanguage();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_DURATION);

  const resetTimer = useCallback(() => {
    if (showWarning) {
      setShowWarning(false);
      setCountdown(WARNING_DURATION);
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Only set idle timer if not on home page
    if (pathname !== "/") {
      timeoutRef.current = setTimeout(() => {
        setShowWarning(true);
      }, IDLE_TIMEOUT);
    }
  }, [pathname, showWarning]);

  // Activity listeners
  useEffect(() => {
    const events = [
      "mousemove",
      "mousedown",
      "touchstart",
      "keydown",
      "scroll",
    ];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  // Countdown logic
  useEffect(() => {
    if (!showWarning) return;

    if (countdown <= 0) {
      setShowWarning(false);
      setCountdown(WARNING_DURATION);
      router.push("/");
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarning, countdown, router]);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl 4k:rounded-3xl p-8 4k:p-16 text-center max-w-lg 4k:max-w-2xl w-full shadow-2xl">
        <div className="w-16 h-16 4k:w-24 4k:h-24 mx-auto mb-4 4k:mb-8 rounded-full bg-saffron-light flex items-center justify-center">
          <svg
            className="w-8 h-8 4k:w-12 4k:h-12 text-saffron"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold mb-2 4k:mb-4 text-gray-900">
          {content.common.idleWarning}
        </h2>

        <p className="text-lg 4k:text-kiosk-lg text-gray-600 mb-6 4k:mb-10">
          {content.common.idleMessage.replace("{seconds}", String(countdown))}
        </p>

        {/* Countdown circle */}
        <div className="w-16 h-16 4k:w-24 4k:h-24 mx-auto mb-6 4k:mb-10 rounded-full border-4 border-saffron flex items-center justify-center">
          <span className="text-3xl 4k:text-kiosk-2xl font-bold text-saffron">
            {countdown}
          </span>
        </div>

        <button
          onClick={resetTimer}
          className="bg-navy text-white px-8 4k:px-14 py-4 4k:py-6 min-h-[48px] 4k:min-h-[80px] rounded-xl 4k:rounded-2xl text-lg 4k:text-kiosk-lg font-bold hover:bg-[#000066] transition-colors"
        >
          {content.common.stillHere}
        </button>
      </div>
    </div>
  );
}
