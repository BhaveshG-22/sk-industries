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
  const [isVisible, setIsVisible] = useState(true);

  // Use all announcements for continuous scroll
  const activeAnnouncements = initialAnnouncements;

  const handleCloseBanner = () => {
    setIsVisible(false);
  };

  // Don't render if no active announcements or banner is closed
  if (!activeAnnouncements.length || !isVisible) {
    return null;
  }

  // Use first announcement's colors or defaults (can be customized)
  const bgColor = activeAnnouncements[0]?.backgroundColor || "var(--primary-medium)";
  const txtColor = activeAnnouncements[0]?.textColor || "var(--accent-cream)";

  // Create content for a single announcement
  const createAnnouncementContent = (announcement: Announcement) => (
    <>
      {announcement.title && (
        <strong>{announcement.title}: </strong>
      )}
      {announcement.message}
      {announcement.linkUrl && announcement.linkText && (
        <a
          href={announcement.linkUrl}
          className="ml-2 underline hover:no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {announcement.linkText}
        </a>
      )}
    </>
  );

  // Generate the continuous scroll content by repeating all announcements
  const generateScrollContent = () => {
    const content = [];
    // Repeat the announcements multiple times for seamless scroll
    for (let i = 0; i < 8; i++) {
      activeAnnouncements.forEach((announcement, index) => {
        content.push(
          <span key={`${i}-${index}`} className="flex-shrink-0 mx-8">
            {createAnnouncementContent(announcement)}
          </span>
        );
      });
    }
    return content;
  };

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
            <div className="inline-flex items-center text-xs font-medium animate-continuous-scroll">
              {generateScrollContent()}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleCloseBanner}
          className="ml-4 p-1 hover:opacity-75 transition-opacity flex-shrink-0"
          aria-label="Close announcement banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes continuous-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-continuous-scroll {
          animation: continuous-scroll 120s linear infinite;
          animation-play-state: running;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}