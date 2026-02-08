"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FormId } from "@/lib/content";
import VideoPlayer from "./VideoPlayer";
import { FiArrowLeft, FiCheckCircle, FiFileText, FiExternalLink } from "react-icons/fi";

interface FormGuidePageProps {
  formId: FormId;
}

const colorAccents: Record<string, { heading: string; button: string; stepBg: string; stepBorder: string }> = {
  saffron: {
    heading: "text-saffron",
    button: "bg-saffron hover:bg-[#e6892e]",
    stepBg: "bg-saffron-light",
    stepBorder: "border-saffron",
  },
  navy: {
    heading: "text-navy",
    button: "bg-navy hover:bg-[#000066]",
    stepBg: "bg-navy-light",
    stepBorder: "border-navy",
  },
  green: {
    heading: "text-green-accent",
    button: "bg-green-accent hover:bg-[#0f6e06]",
    stepBg: "bg-green-light",
    stepBorder: "border-green-accent",
  },
};

export default function FormGuidePage({ formId }: FormGuidePageProps) {
  const { content } = useLanguage();
  const form = content.forms[formId];
  const common = content.common;

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-2xl text-gray-500">Form not found</p>
      </div>
    );
  }

  const accent = colorAccents[form.color] || colorAccents.saffron;

  return (
    <div className="max-w-5xl 4k:max-w-[80%] mx-auto px-4 py-6 md:px-8 md:py-8 4k:px-16 4k:py-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 min-h-[48px] 4k:min-h-[80px] px-4 4k:px-8 py-2 4k:py-4 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-colors text-base 4k:text-kiosk-lg mb-6 4k:mb-10"
      >
        <FiArrowLeft className="text-xl 4k:text-3xl" />
        {common.backToHome}
      </Link>

      {/* Title and Description */}
      <div className="mb-8 4k:mb-14">
        <h1 className={`text-3xl md:text-4xl 4k:text-kiosk-3xl font-bold mb-3 4k:mb-6 ${accent.heading}`}>
          {form.title} — {form.shortDescription}
        </h1>
        <p className="text-lg 4k:text-kiosk-lg text-gray-700 leading-relaxed">
          {form.fullDescription}
        </p>
      </div>

      {/* Eligibility Section */}
      <section className="mb-8 4k:mb-14">
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900 mb-4 4k:mb-8 flex items-center gap-2">
          <FiCheckCircle className={`text-2xl 4k:text-4xl ${accent.heading}`} />
          {common.eligibilityTitle}
        </h2>
        <ul className="space-y-3 4k:space-y-5">
          {form.eligibility.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 4k:gap-5 text-base 4k:text-kiosk-base text-gray-700"
            >
              <span className={`mt-1 w-6 h-6 4k:w-9 4k:h-9 rounded-full ${accent.button} text-white flex items-center justify-center text-xs 4k:text-lg font-bold shrink-0`}>
                &#10003;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Documents Section */}
      <section className="mb-8 4k:mb-14">
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900 mb-4 4k:mb-8 flex items-center gap-2">
          <FiFileText className={`text-2xl 4k:text-4xl ${accent.heading}`} />
          {common.documentsTitle}
        </h2>
        <ul className="space-y-3 4k:space-y-5">
          {form.documentsRequired.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 4k:gap-5 text-base 4k:text-kiosk-base text-gray-700"
            >
              <FiFileText className={`mt-1 text-lg 4k:text-2xl shrink-0 ${accent.heading}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Steps Section */}
      <section className="mb-8 4k:mb-14">
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900 mb-4 4k:mb-8">
          {common.stepsTitle}
        </h2>
        <div className="space-y-4 4k:space-y-6">
          {form.steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 4k:gap-6 p-4 4k:p-8 rounded-xl 4k:rounded-2xl ${accent.stepBg} border-l-4 ${accent.stepBorder}`}
            >
              <span className={`w-8 h-8 4k:w-12 4k:h-12 rounded-full ${accent.button} text-white flex items-center justify-center text-sm 4k:text-xl font-bold shrink-0`}>
                {index + 1}
              </span>
              <p className="text-base 4k:text-kiosk-base text-gray-800 pt-1">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-8 4k:mb-14">
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900 mb-4 4k:mb-8">
          {common.videoTitle}
        </h2>
        <VideoPlayer videoUrl={form.videoUrl} title={form.title} />
      </section>

      {/* Apply Now CTA */}
      <section className={`${accent.stepBg} rounded-2xl 4k:rounded-3xl p-6 md:p-8 4k:p-14 text-center border-2 ${accent.stepBorder}`}>
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900 mb-3 4k:mb-6">
          {common.applyNowTitle}
        </h2>
        <p className="text-base 4k:text-kiosk-base text-gray-600 mb-6 4k:mb-10">
          {common.applyNowDescription}
        </p>
        <a
          href={form.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-3 ${accent.button} text-white font-bold text-lg 4k:text-kiosk-xl px-8 4k:px-14 py-4 4k:py-8 rounded-xl 4k:rounded-2xl min-h-[60px] 4k:min-h-[80px] transition-colors shadow-lg`}
        >
          {form.applyButtonText}
          <FiExternalLink className="text-xl 4k:text-3xl" />
        </a>
      </section>

      {/* Disclaimer */}
      <p className="text-center text-sm 4k:text-kiosk-base text-gray-400 mt-8 4k:mt-14">
        {common.disclaimer}
      </p>
    </div>
  );
}
