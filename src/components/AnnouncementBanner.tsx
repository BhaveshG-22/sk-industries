"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: number;
  backgroundColor?: string;
  textColor?: string;
  iconName?: string;
  isScrolling: boolean;
  showCloseButton: boolean;
  autoHide: boolean;
  autoHideDelay?: number;
  linkUrl?: string;
  linkText?: string;
}

interface AnnouncementBannerProps {
  backgroundColor?: string;
  textColor?: string;
  closeable?: boolean;
}

export default function AnnouncementBanner({
  backgroundColor = "bg-[#606C38]",
  textColor = "text-[#FEFAE0]",
}: AnnouncementBannerProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [closedAnnouncements, setClosedAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter out closed announcements
  const activeAnnouncements = announcements.filter(
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

  // Don't render if loading, no announcements, or all are closed
  if (loading || !activeAnnouncements.length) {
    return null;
  }
  
  // Use custom colors from the announcement or fall back to props
  const bgColor = currentAnnouncement?.backgroundColor || backgroundColor;
  const txtColor = currentAnnouncement?.textColor || textColor;

  return (
    <div 
      className={`py-2 px-4 relative overflow-hidden`}
      style={{ 
        backgroundColor: bgColor.startsWith('#') ? bgColor : undefined,
        color: txtColor.startsWith('#') ? txtColor : undefined
      }}
    >
      <div className="relative w-full flex items-center">
        {/* Scrolling Message Container */}
        <div className="flex-1 overflow-hidden">
          <div className="whitespace-nowrap">
            <div className={`inline-flex items-center space-x-40 text-xs font-medium ${
              currentAnnouncement.isScrolling ? 'animate-scroll' : ''
            }`}>
              {/* Display the message */}
              <span className="flex-shrink-0">
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
              </span>
              
              {/* Repeat for scrolling effect if enabled */}
              {currentAnnouncement.isScrolling && (
                <>
                  <span className="flex-shrink-0">
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
                  </span>
                  <span className="flex-shrink-0">
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