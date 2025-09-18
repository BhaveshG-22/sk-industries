"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: number;
  backgroundColor?: string | null;
  textColor?: string | null;
  iconName?: string | null;
  isScrolling: boolean;
  showCloseButton: boolean;
  autoHide: boolean;
  autoHideDelay?: number | null;
  linkUrl?: string | null;
  linkText?: string | null;
}

interface AnnouncementBannerClientProps {
  initialAnnouncements: Announcement[];
}

export default function AnnouncementBannerClient({
  initialAnnouncements
}: AnnouncementBannerClientProps) {
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);

  // Filter out closed announcements
  const activeAnnouncements = initialAnnouncements.filter(
    announcement => !closedAnnouncements.includes(announcement.id)
  );

  const handleCloseAnnouncement = (announcementId: string) => {
    setClosedAnnouncements(prev => [...prev, announcementId]);
  };

  // Get the highest priority announcement for display
  const currentAnnouncement = activeAnnouncements[0];

  // Auto-hide functionality - always call hooks before any returns
  useEffect(() => {
    if (currentAnnouncement?.autoHide && currentAnnouncement?.autoHideDelay) {
      const timer = setTimeout(() => {
        handleCloseAnnouncement(currentAnnouncement.id);
      }, currentAnnouncement.autoHideDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentAnnouncement]);

  // Don't render if no active announcements
  if (!activeAnnouncements.length) {
    return null;
  }

  // Use custom colors or defaults
  const bgColor = currentAnnouncement.backgroundColor || "var(--primary-medium)";
  const txtColor = currentAnnouncement.textColor || "var(--accent-cream)";

  const MessageContent = () => (
    <>
      {currentAnnouncement.title && (
        <strong>{currentAnnouncement.title}: </strong>
      )}
      {currentAnnouncement.message}
      {currentAnnouncement.linkUrl && currentAnnouncement.linkText && (
        <a 
          href={currentAnnouncement.linkUrl}
          className="ml-2 underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {currentAnnouncement.linkText}
        </a>
      )}
    </>
  );

  return (
    <div 
      className="py-2 px-4 relative overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        color: txtColor
      }}
    >
      <div className="relative w-full flex items-center">
        {/* Message Container */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap">
            <div className={`inline-flex items-center space-x-40 text-xs font-medium ${
              currentAnnouncement.isScrolling ? 'animate-scroll' : ''
            }`}>
              {/* Display the message */}
              <span className="flex-shrink-0">
                <MessageContent />
              </span>
              
              {/* Repeat for scrolling effect if enabled */}
              {currentAnnouncement.isScrolling && (
                <>
                  <span className="flex-shrink-0">
                    <MessageContent />
                  </span>
                  <span className="flex-shrink-0">
                    <MessageContent />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Close Button */}
        {currentAnnouncement.showCloseButton && (
          <button
            onClick={() => handleCloseAnnouncement(currentAnnouncement.id)}
            className="ml-4 p-1 hover:opacity-75 transition-opacity"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4" />
          </button>
        )}
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