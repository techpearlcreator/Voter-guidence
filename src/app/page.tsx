"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import FormCard from "@/components/FormCard";
import VideoPlayer from "@/components/VideoPlayer";
import { getAllFormIds, FormId } from "@/lib/content";

export default function HomePage() {
  const { content } = useLanguage();
  const formIds = getAllFormIds();
  const [activeVideo, setActiveVideo] = useState<FormId>("form6");

  const activeForm = content.forms[activeVideo];

  return (
    <div className="px-4 py-8 md:px-8 4k:px-16 4k:py-16 max-w-7xl 4k:max-w-[90%] mx-auto">
      {/* Page heading */}
      <div className="text-center mb-8 4k:mb-16">
        <h1 className="text-3xl md:text-4xl 4k:text-kiosk-3xl font-bold text-navy mb-3 4k:mb-6">
          {content.home.heading}
        </h1>
        <p className="text-lg 4k:text-kiosk-lg text-gray-600 max-w-2xl 4k:max-w-4xl mx-auto">
          {content.home.subheading}
        </p>
      </div>

      {/* Video Section */}
      <section className="mb-10 4k:mb-20">
        <h2 className="text-2xl md:text-3xl 4k:text-kiosk-2xl font-bold text-navy text-center mb-2 4k:mb-4">
          {content.common.watchVideos}
        </h2>
        <p className="text-base 4k:text-kiosk-base text-gray-500 text-center mb-6 4k:mb-10">
          {content.common.watchVideosSubtitle}
        </p>

        {/* Video Tab Buttons */}
        <div className="flex justify-center gap-3 4k:gap-6 mb-6 4k:mb-10 flex-wrap">
          {formIds.map((formId) => {
            const form = content.forms[formId];
            const isActive = activeVideo === formId;
            const colorMap: Record<string, string> = {
              saffron: isActive ? "bg-saffron text-white" : "bg-saffron-light text-saffron border-saffron",
              navy: isActive ? "bg-navy text-white" : "bg-navy-light text-navy border-navy",
              green: isActive ? "bg-green-accent text-white" : "bg-green-light text-green-accent border-green-accent",
            };
            return (
              <button
                key={formId}
                onClick={() => setActiveVideo(formId)}
                className={`px-6 4k:px-10 py-3 4k:py-5 rounded-xl 4k:rounded-2xl font-bold text-base 4k:text-kiosk-lg min-h-[48px] 4k:min-h-[80px] border-2 transition-all ${colorMap[form.color] || colorMap.saffron}`}
              >
                {form.title} — {form.shortDescription}
              </button>
            );
          })}
        </div>

        {/* Video Player */}
        <div className="flex justify-center">
          <VideoPlayer
            videoUrl={activeForm.videoUrl}
            title={`${activeForm.title} — ${activeForm.shortDescription}`}
          />
        </div>
      </section>

      {/* Form cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 4k:gap-12">
        {formIds.map((formId: FormId) => {
          const form = content.forms[formId];
          return (
            <FormCard
              key={formId}
              formId={formId}
              title={form.title}
              shortDescription={form.shortDescription}
              icon={form.icon}
              color={form.color as "saffron" | "navy" | "green"}
            />
          );
        })}
      </div>

      {/* Disclaimer */}
      <p className="text-center text-sm 4k:text-kiosk-base text-gray-400 mt-8 4k:mt-16 max-w-2xl 4k:max-w-4xl mx-auto">
        {content.common.disclaimer}
      </p>
    </div>
  );
}
