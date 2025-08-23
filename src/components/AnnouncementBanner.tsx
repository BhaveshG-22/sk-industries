"use client";

interface AnnouncementBannerProps {
  backgroundColor?: string;
  textColor?: string;
  closeable?: boolean;
}

export default function AnnouncementBanner({
  backgroundColor = "bg-[var(--olive-green)]",
  textColor = "text-[var(--cream-white)]",
}: AnnouncementBannerProps) {

  // Internal array of announcements
  const messages = [
    "Free shipping over ₹499 | Additional 15% discount on purchases above ₹1000"
  ];

  // Don't render if no messages
  if (!messages.length) {
    return null;
  }

  return (
    <div className={`${textColor} ${backgroundColor} py-2 px-4 relative overflow-hidden`}>
      <div className="relative w-full flex items-center">
        {/* Scrolling Message Container */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap">
            <div className="inline-flex items-center space-x-40 text-xs font-medium animate-scroll">
              {messages.map((message, index) => (
                <span key={index} className="flex-shrink-0">{message}</span>
              ))}
              {messages.map((message, index) => (
                <span key={`repeat-${index}`} className="flex-shrink-0">{message}</span>
              ))}
              {messages.map((message, index) => (
                <span key={`repeat2-${index}`} className="flex-shrink-0">{message}</span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(20%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 90s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}