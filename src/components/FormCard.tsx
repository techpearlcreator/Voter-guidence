"use client";

import Link from "next/link";
import { FiUserPlus, FiUserMinus, FiEdit } from "react-icons/fi";

interface FormCardProps {
  formId: string;
  title: string;
  shortDescription: string;
  icon: string;
  color: "saffron" | "navy" | "green";
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserPlus: FiUserPlus,
  UserMinus: FiUserMinus,
  Edit: FiEdit,
};

const colorStyles: Record<
  string,
  { bg: string; border: string; iconBg: string; hover: string }
> = {
  saffron: {
    bg: "bg-saffron-light",
    border: "border-saffron",
    iconBg: "bg-saffron text-white",
    hover: "hover:shadow-[0_8px_30px_rgba(255,153,51,0.3)]",
  },
  navy: {
    bg: "bg-navy-light",
    border: "border-navy",
    iconBg: "bg-navy text-white",
    hover: "hover:shadow-[0_8px_30px_rgba(0,0,128,0.3)]",
  },
  green: {
    bg: "bg-green-light",
    border: "border-green-accent",
    iconBg: "bg-green-accent text-white",
    hover: "hover:shadow-[0_8px_30px_rgba(19,136,8,0.3)]",
  },
};

export default function FormCard({
  formId,
  title,
  shortDescription,
  icon,
  color,
}: FormCardProps) {
  const IconComponent = iconMap[icon] || FiEdit;
  const styles = colorStyles[color] || colorStyles.saffron;

  return (
    <Link href={`/form/${formId}/`} className="block group">
      <div
        className={`${styles.bg} ${styles.hover} border-2 ${styles.border} rounded-2xl 4k:rounded-3xl p-6 md:p-8 4k:p-12 min-h-[200px] 4k:min-h-[400px] flex flex-col items-center justify-center text-center gap-4 4k:gap-8 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]`}
      >
        {/* Icon */}
        <div
          className={`${styles.iconBg} w-16 h-16 4k:w-28 4k:h-28 rounded-full flex items-center justify-center`}
        >
          <IconComponent className="text-3xl 4k:text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl 4k:text-kiosk-2xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Description */}
        <p className="text-lg 4k:text-kiosk-lg text-gray-600">
          {shortDescription}
        </p>

        {/* Arrow indicator */}
        <div className="mt-2 text-gray-400 group-hover:text-gray-600 transition-colors">
          <svg
            className="w-8 h-8 4k:w-12 4k:h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
