'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ChevronLeft, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { GalleryPageItem } from './types';

interface PageModalProps {
  page: GalleryPageItem | null;
  allPages: GalleryPageItem[];
  onClose: () => void;
  onSelectPage: (page: GalleryPageItem) => void;
  onOpenReader?: (pageNumber: number) => void;
}

export const PageModal: React.FC<PageModalProps> = ({
  page,
  allPages,
  onClose,
  onSelectPage,
  onOpenReader,
}) => {
  const router = useRouter();

  // Keyboard navigation
  useEffect(() => {
    if (!page) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = allPages.findIndex((p) => p.pageNumber === page.pageNumber);
        if (currentIndex > 0) {
          onSelectPage(allPages[currentIndex - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const currentIndex = allPages.findIndex((p) => p.pageNumber === page.pageNumber);
        if (currentIndex < allPages.length - 1) {
          onSelectPage(allPages[currentIndex + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page, allPages, onClose, onSelectPage]);

  if (!page) return null;

  const currentIndex = allPages.findIndex((p) => p.pageNumber === page.pageNumber);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const handleLaunchReader = () => {
    if (onOpenReader) {
      onOpenReader(page.pageNumber);
    } else {
      router.push(`/read?page=${page.pageNumber}`);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Page ${page.pageNumber}: ${page.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-md animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-[#E8E2D8]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-mono font-semibold rounded-md bg-[#FF5722]/15 text-[#FF5722] border border-[#FF5722]/30">
              Page {page.pageNumber} of 21
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-[#5A544D]">
              {page.category}
            </span>
            <h3 className="hidden sm:inline font-semibold text-[#1A1816] text-sm truncate max-w-xs md:max-w-md">
              {page.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLaunchReader}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5722] hover:bg-[#e04513] text-white text-xs font-semibold font-mono tracking-wide shadow-sm transition-colors cursor-pointer"
              title="Open this page in 3D Flipbook"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read in 3D</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Image Viewport */}
        <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] md:min-h-[580px] bg-slate-100/50 flex items-center justify-center p-4 overflow-hidden group">
          <div className="relative w-full h-full max-w-2xl max-h-[70vh] flex items-center justify-center">
            {/* Soft decorative shadow behind high-res page */}
            <div className="absolute inset-4 bg-slate-300/40 rounded-lg blur-xl transform translate-y-3" />
            
            {/* Page Image */}
            <div className="relative w-auto h-full max-h-[70vh] aspect-[1/1.414] rounded-lg overflow-hidden shadow-xl border border-slate-200/80 bg-white">
              <Image
                src={page.imageUrl}
                alt={`Page ${page.pageNumber} - ${page.title}`}
                fill
                sizes="(max-width: 768px) 90vw, 700px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Left Arrow Button */}
          {prevPage && (
            <button
              onClick={() => onSelectPage(prevPage)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer z-10"
              title={`Previous: Page ${prevPage.pageNumber}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {nextPage && (
            <button
              onClick={() => onSelectPage(nextPage)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 transition-all hover:scale-105 cursor-pointer z-10"
              title={`Next: Page ${nextPage.pageNumber}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Footer Description */}
        <div className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div>
            <p className="font-semibold text-slate-800 text-sm">{page.title}</p>
            <p className="text-slate-500 mt-0.5">{page.description}</p>
          </div>

          <button
            onClick={handleLaunchReader}
            className="flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-medium whitespace-nowrap cursor-pointer hover:underline"
          >
            <span>Open in Interactive Flipbook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageModal;
