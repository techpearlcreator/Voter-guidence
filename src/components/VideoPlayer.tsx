"use client";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  compact?: boolean;
}

export default function VideoPlayer({ videoUrl, title, compact = false }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className={`aspect-video w-full ${compact ? "" : "max-w-4xl 4k:max-w-7xl"} bg-gray-100 rounded-xl 4k:rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300`}>
        <div className="text-center p-8">
          <svg
            className="w-12 h-12 4k:w-20 4k:h-20 mx-auto text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg 4k:text-kiosk-lg text-gray-500 font-medium">
            Video coming soon
          </p>
        </div>
      </div>
    );
  }

  const isLocalVideo = videoUrl.endsWith(".mp4") || videoUrl.endsWith(".webm") || videoUrl.endsWith(".ogg");
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");

  // Prepend basePath for local files
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resolvedUrl = isLocalVideo && videoUrl.startsWith("/") ? `${basePath}${videoUrl}` : videoUrl;

  if (isLocalVideo) {
    return (
      <div className={`aspect-video w-full ${compact ? "" : "max-w-4xl 4k:max-w-7xl"} rounded-xl 4k:rounded-2xl overflow-hidden shadow-lg bg-black`}>
        <video
          src={resolvedUrl}
          title={title}
          className="w-full h-full object-contain"
          controls
          controlsList="nodownload"
          playsInline
          preload="metadata"
        >
          Your browser does not support video playback.
        </video>
      </div>
    );
  }

  if (isYouTube) {
    return (
      <div className={`aspect-video w-full ${compact ? "" : "max-w-4xl 4k:max-w-7xl"} rounded-xl 4k:rounded-2xl overflow-hidden shadow-lg`}>
        <iframe
          src={videoUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return null;
}
