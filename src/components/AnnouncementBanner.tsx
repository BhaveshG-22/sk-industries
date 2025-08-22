"use client";

interface AnnouncementBannerProps {
  messages?: string[];
  backgroundColor?: string;
  textColor?: string;
  closeable?: boolean;
}

export default function AnnouncementBanner({
  messages = [],
  backgroundColor = "bg-[var(--olive-green)]",
  textColor = "text-[var(--cream-white)]",
}: AnnouncementBannerProps) {

  // Don't render if no messages or if banner is closed
  if (!messages.length) {
    return null;
  }



  // Join all messages with separator for continuous scroll
  const combinedMessage = messages.join(" • ");

  return (
    <div className={`${textColor} ${backgroundColor} py-2 px-4 relative overflow-hidden`}>
      <div className="relative w-full flex items-center">
        {/* Scrolling Message Container */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap">
            <div className="inline-block text-xs font-medium animate-scroll">
              {combinedMessage} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {combinedMessage} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {combinedMessage}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 240s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}