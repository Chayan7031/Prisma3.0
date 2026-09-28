'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import './Book.css';

// ============================================================================
// Built-in Clean SVG Icons (Zero external dependency requirement)
// ============================================================================
const ChevronLeftIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ContentsIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="15" y2="12" />
    <line x1="3" y1="18" x2="18" y2="18" />
  </svg>
);

const ZoomInIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const FullscreenEnterIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const FullscreenExitIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6 7 7M10 4v6m0 0H4m6 0L3 3m10 7h6m0 0V4m0 6 7-7" />
  </svg>
);

const SoundOnIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SoundOffIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const DownloadIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Theme Toggle Icon (Sun / Moon / Parchment indicator)
const PaletteIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// ============================================================================
// Types and Interfaces
// ============================================================================
export interface TOCItem {
  title: string;
  page: number;
}

export interface PageObject {
  image: string;
  title?: string;
  [key: string]: any;
}

export type PageItem = string | PageObject;

export interface BookDimensions {
  width: number;
  height: number;
}

export interface BookProps {
  /** Array of image URLs or { image, title } objects */
  pages?: PageItem[];
  /** 1-based initial page number */
  initialPage?: number;
  /** Downloadable PDF URL */
  pdfUrl?: string;
  /** Title displayed in header */
  title?: string;
  /** Subtitle displayed in header */
  subtitle?: string;
  /** Table of contents items */
  toc?: TOCItem[];
  /** Callback on page flip (newPageNumber) => void */
  onPageChange?: (newPageNumber: number) => void;
  /** Callback when Close button clicked */
  onClose?: () => void;
  /** Whether page flip sound is enabled */
  soundEnabled?: boolean;
  /** Optional custom sound URL (falls back to Web Audio) */
  soundUrl?: string;
  /** Page height/width aspect ratio */
  aspectRatio?: number;
  /** True if embedded inline in a page instead of modal */
  isEmbedded?: boolean;
  /** Theme palette */
  initialTheme?: 'charcoal' | 'parchment';
  /** Additional wrapper class name */
  className?: string;
}

// ============================================================================
// Default Pages and Table of Contents (21 Pages from public/)
// ============================================================================
export const DEFAULT_PAGES: string[] = Array.from({ length: 21 }, (_, index) => {
  const num = String(index + 1).padStart(4, '0');
  return `/prisma_content_page-${num}.jpg`;
});

export const DEFAULT_TOC: TOCItem[] = [
  { title: 'Front Cover', page: 1 },
  { title: 'President & Editorial Board', page: 2 },
  { title: 'From the Desk of HOD', page: 3 },
  { title: 'Faculty & Department Insights', page: 4 },
  { title: 'Students’ Magazine Committee', page: 6 },
  { title: 'Technical Articles & Horizons', page: 10 },
  { title: 'Creative Expressions & Poetry', page: 14 },
  { title: 'Department Events & Highlights', page: 18 },
  { title: 'Special Thanks & Back Cover', page: 21 },
];

// ============================================================================
// Web Audio API Synthesizer (Realistic Page Rustle / Flip Sound)
// ============================================================================
const playSynthesizedFlipSound = (): void => {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const duration = 0.18;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(550, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.07);
    filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + duration);
    filter.Q.setValueAtTime(2.8, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.24, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + duration);
  } catch (e) {
    // Graceful fallback
  }
};

/**
 * Standalone Independent Book Component
 */
export const Book: React.FC<BookProps> = ({
  pages = DEFAULT_PAGES,
  initialPage = 1,
  pdfUrl = '/prisma_content.pdf',
  title = 'PRISMA 3.0',
  subtitle = 'Department of Computer Science and Engineering • KGEC',
  toc = DEFAULT_TOC,
  onPageChange,
  onClose,
  soundEnabled: initialSoundEnabled = true,
  soundUrl,
  aspectRatio = 1.414,
  isEmbedded = false,
  initialTheme = 'charcoal',
  className = '',
}) => {
  const mountContainerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(pages.length);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTOCSidebarOpen, setIsTOCSidebarOpen] = useState<boolean>(false);
  const [isSoundActive, setIsSoundActive] = useState<boolean>(initialSoundEnabled);
  const [currentTheme, setCurrentTheme] = useState<'charcoal' | 'parchment'>(initialTheme);
  const [pageInputValue, setPageInputValue] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [bookDimensions, setBookDimensions] = useState<BookDimensions>({ width: 420, height: 594 });
  const [isReady, setIsReady] = useState<boolean>(false);

  // Sound disabled per user request
  const triggerFlipAudio = useCallback((): void => {}, []);

  // Screen size & dimension calculation
  const calculateDimensions = useCallback((): { width: number; height: number; isMobile: boolean } => {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const mobileMode = winWidth < 768;
    setIsMobile(mobileMode);

    let calculatedHeight = winHeight - (mobileMode ? 140 : 160);
    let calculatedWidth = calculatedHeight / aspectRatio;

    if (mobileMode) {
      const maxAvailableWidth = winWidth - 24;
      if (calculatedWidth > maxAvailableWidth) {
        calculatedWidth = maxAvailableWidth;
        calculatedHeight = calculatedWidth * aspectRatio;
      }
      if (calculatedHeight > winHeight - 130) {
        calculatedHeight = winHeight - 130;
        calculatedWidth = calculatedHeight / aspectRatio;
      }
    } else {
      const maxAvailableSpreadWidth = winWidth - 64;
      if (calculatedWidth * 2 > maxAvailableSpreadWidth) {
        calculatedWidth = maxAvailableSpreadWidth / 2;
        calculatedHeight = calculatedWidth * aspectRatio;
      }
    }

    const finalWidth = Math.max(240, Math.round(calculatedWidth));
    const finalHeight = Math.max(340, Math.round(calculatedHeight));

    setBookDimensions({ width: finalWidth, height: finalHeight });
    return { width: finalWidth, height: finalHeight, isMobile: mobileMode };
  }, [aspectRatio]);

  // Window Resize Listener
  useEffect(() => {
    calculateDimensions();
    const handleResize = (): void => {
      calculateDimensions();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  // Fullscreen Change Listener
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Initialize and mount PageFlip
  useEffect(() => {
    const container = mountContainerRef.current;
    if (!container || bookDimensions.width === 0 || pages.length === 0) return;

    setIsReady(false);

    if (pageFlipRef.current) {
      try {
        pageFlipRef.current.destroy();
      } catch (e) {
        // Silently catch
      }
      pageFlipRef.current = null;
    }

    container.innerHTML = '';

    const hostEl = document.createElement('div');
    hostEl.className = 'flipbook-host';
    container.appendChild(hostEl);

    pages.forEach((pageData, index) => {
      const isCover = index === 0 || index === pages.length - 1;
      const imageSrc = typeof pageData === 'string' ? pageData : pageData.image;

      const pageEl = document.createElement('div');
      pageEl.className = 'book-page';
      pageEl.setAttribute('data-density', isCover ? 'hard' : 'soft');

      const contentEl = document.createElement('div');
      contentEl.className = 'book-page-content';

      const imgEl = document.createElement('img');
      imgEl.src = imageSrc;
      imgEl.alt = `Page ${index + 1}`;
      imgEl.className = 'book-page-image';
      imgEl.loading = index < 4 ? 'eager' : 'lazy';

      contentEl.appendChild(imgEl);

      // Realistic 3D spine depth gradient
      if (!isCover) {
        const spineEl = document.createElement('div');
        const isLeftPage = (index + 1) % 2 === 0;
        spineEl.className = `book-spine-gradient ${isLeftPage ? 'spine-right' : 'spine-left'}`;
        contentEl.appendChild(spineEl);
      }

      // Page Number Indicator
      const numEl = document.createElement('div');
      const isLeft = (index + 1) % 2 === 0;
      numEl.className = `book-page-number ${isLeft ? 'number-left' : 'number-right'}`;
      numEl.innerText = `${index + 1}`;
      contentEl.appendChild(numEl);

      pageEl.appendChild(contentEl);
      hostEl.appendChild(pageEl);
    });

    const startPageIndex = Math.max(0, Math.min(pages.length - 1, currentPage - 1));

    try {
      const flipInstance = new PageFlip(hostEl, {
        width: bookDimensions.width,
        height: bookDimensions.height,
        size: 'fixed',
        minWidth: 240,
        maxWidth: 1200,
        minHeight: 340,
        maxHeight: 1700,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: isMobile,
        startPage: startPageIndex,
        drawShadow: true,
        flippingTime: 750,
        useMouseEvents: true,
        swipeDistance: 25,
        clickEventForward: true,
        startZIndex: 10,
        autoSize: true,
        showPageCorners: true,
        disableFlipByClick: true,
      });

      flipInstance.loadFromHTML(hostEl.querySelectorAll('.book-page'));
      pageFlipRef.current = flipInstance;
      setTotalPages(flipInstance.getPageCount());

      flipInstance.on('flip', (e) => {
        const newPageNum = e.data + 1;
        setCurrentPage(newPageNum);
        triggerFlipAudio();
        onPageChange?.(newPageNum);
      });

      setIsReady(true);
    } catch (err) {
      console.error('Failed to load PageFlip:', err);
    }

    return () => {
      if (pageFlipRef.current) {
        try {
          pageFlipRef.current.destroy();
        } catch (e) {
          // ignore
        }
        pageFlipRef.current = null;
      }
      if (container.contains(hostEl)) {
        container.removeChild(hostEl);
      }
    };
  }, [bookDimensions.width, bookDimensions.height, isMobile, pages, triggerFlipAudio, onPageChange, currentPage]);

  const handleNextPage = useCallback((): void => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext();
    }
  }, []);

  const handlePrevPage = useCallback((): void => {
    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev();
    }
  }, []);

  const handleGoToPage = useCallback(
    (pageNum: number): void => {
      const target = Math.max(1, Math.min(totalPages, pageNum));
      if (pageFlipRef.current) {
        pageFlipRef.current.turnToPage(target - 1);
      }
    },
    [totalPages]
  );

  const handlePageInputSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const parsed = parseInt(pageInputValue, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      handleGoToPage(parsed);
    }
    setPageInputValue('');
  };

  const handleZoomIn = (): void => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = (): void => setZoomLevel((z) => Math.max(0.6, +(z - 0.25).toFixed(2)));
  const handleZoomReset = (): void => setZoomLevel(1);

  const toggleTheme = (): void => {
    setCurrentTheme((prev) => (prev === 'charcoal' ? 'parchment' : 'charcoal'));
  };

  const handleToggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      const target = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };
      if (target.requestFullscreen) {
        target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
      }
    } else {
      const doc = document as Document & {
        webkitExitFullscreen?: () => Promise<void>;
      };
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          handleNextPage();
          break;
        case 'ArrowLeft':
          handlePrevPage();
          break;
        case 'Home':
          handleGoToPage(1);
          break;
        case 'End':
          handleGoToPage(totalPages);
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
        case '0':
          handleZoomReset();
          break;
        case 'Escape':
          if (isTOCSidebarOpen) {
            setIsTOCSidebarOpen(false);
          } else if (onClose) {
            onClose();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage, handleGoToPage, totalPages, isTOCSidebarOpen, onClose]);

  const pointerStartXRef = useRef<number | null>(null);
  const pointerStartYRef = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.isPrimary) {
      pointerStartXRef.current = e.clientX;
      pointerStartYRef.current = e.clientY;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!e.isPrimary || pointerStartXRef.current === null || pointerStartYRef.current === null) return;
    const endX = e.clientX;
    const endY = e.clientY;
    const diffX = endX - pointerStartXRef.current;
    const diffY = endY - pointerStartYRef.current;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    } else if (Math.abs(diffX) < 20 && Math.abs(diffY) < 20) {
      const target = e.target as HTMLElement;
      if (!target.closest('.book-btn') && !target.closest('.book-toolbar-container') && !target.closest('.book-hotspot')) {
        if (endX > window.innerWidth / 2) {
          handleNextPage();
        } else {
          handlePrevPage();
        }
      }
    }
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  };

  return (
    <div
      className={`book-reader-container theme-${currentTheme} ${isEmbedded ? 'is-embedded' : ''} ${className}`}
      onPointerDownCapture={handlePointerDown}
      onPointerUpCapture={handlePointerUp}
    >
      <div className="book-reader-glow" />

      {/* Top Header Bar */}
      <header className="book-top-bar">
        <div className="book-top-info">
          <div className="book-top-title">
            <span>{title}</span>
            <span className="book-top-badge">CSE DEPARTMENT</span>
          </div>
          {subtitle && <div className="book-top-subtitle">{subtitle}</div>}
        </div>

        <div className="book-top-actions">
          {onClose && (
            <button
              type="button"
              className="book-btn book-btn-close book-btn-icon-only"
              onClick={onClose}
              title="Close Reader"
              aria-label="Close Reader"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </header>

      {/* Viewport for Interactive Book Canvas */}
      <main className={`book-viewport ${zoomLevel > 1 ? 'is-zoomed' : ''}`}>
        <div
          className="book-zoom-wrapper"
          style={{
            transform: `scale(${zoomLevel})`,
            width: zoomLevel > 1 ? `${bookDimensions.width * (isMobile ? 1 : 2) * zoomLevel}px` : 'auto',
            height: zoomLevel > 1 ? `${bookDimensions.height * zoomLevel}px` : 'auto',
          }}
        >
          <div ref={mountContainerRef} className="flipbook-mount-wrapper" />
        </div>

        {!isReady && (
          <div className="book-loading-container">
            <div className="book-spinner" />
            <span className="book-loading-text">Preparing Pages...</span>
          </div>
        )}

        {!isMobile && (
          <>
            <div
              className="book-hotspot book-hotspot-left"
              onClick={handlePrevPage}
              title="Previous Page (Left Arrow)"
              style={{ display: currentPage <= 1 ? 'none' : 'flex' }}
            >
              <div className="book-hotspot-btn">
                <ChevronLeftIcon />
              </div>
            </div>

            <div
              className="book-hotspot book-hotspot-right"
              onClick={handleNextPage}
              title="Next Page (Right Arrow)"
              style={{ display: currentPage >= totalPages ? 'none' : 'flex' }}
            >
              <div className="book-hotspot-btn">
                <ChevronRightIcon />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Floating Bottom Toolbar */}
      <footer className="book-toolbar-container">
        <nav className="book-toolbar" aria-label="Book Navigation Controls">
          {/* Page Turn & Input Group */}
          <div className="book-toolbar-group">
            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              title="Previous Page (←)"
              aria-label="Previous Page"
            >
              <ChevronLeftIcon />
            </button>

            <form onSubmit={handlePageInputSubmit} className="book-page-jump-form">
              <input
                type="text"
                className="book-page-input"
                value={pageInputValue}
                onChange={(e) => setPageInputValue(e.target.value)}
                placeholder={currentPage.toString()}
                title="Type page and press Enter"
                aria-label="Go to page number"
              />
              <span className="book-page-total">/ {totalPages}</span>
            </form>

            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              title="Next Page (→)"
              aria-label="Next Page"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="book-toolbar-divider" />

          {/* Contents, Zoom & Theme Group */}
          <div className="book-toolbar-group">
            <button
              type="button"
              className="book-btn"
              onClick={() => setIsTOCSidebarOpen(true)}
              title="Table of Contents"
              aria-label="Open Table of Contents"
            >
              <ContentsIcon />
              <span className="book-btn-label">Contents</span>
            </button>

            <div className="book-toolbar-divider" />

            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 0.6}
              title="Zoom Out (-)"
              aria-label="Zoom Out"
            >
              <ZoomOutIcon />
            </button>

            <button
              type="button"
              className="book-btn book-zoom-indicator"
              onClick={handleZoomReset}
              title="Reset Zoom to 100% (0)"
              aria-label="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>

            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2.5}
              title="Zoom In (+)"
              aria-label="Zoom In"
            >
              <ZoomInIcon />
            </button>

            <button
              type="button"
              className={`book-btn book-btn-icon-only ${currentTheme === 'parchment' ? 'is-active' : ''}`}
              onClick={toggleTheme}
              title={currentTheme === 'charcoal' ? 'Switch to Parchment Ivory Theme' : 'Switch to Dark Charcoal Theme'}
              aria-label="Toggle Theme"
            >
              <PaletteIcon />
            </button>

            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handleToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
            </button>
          </div>

          <div className="book-toolbar-divider" />

          {/* Audio, Download & Close Group */}
          <div className="book-toolbar-group">

            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="book-btn"
                title="Download Magazine PDF"
                aria-label="Download Magazine PDF"
              >
                <DownloadIcon />
                <span className="book-btn-label">Download</span>
              </a>
            )}

            {onClose && (
              <button
                type="button"
                className="book-btn book-btn-close"
                onClick={onClose}
                title="Close Magazine Viewer (Esc)"
                aria-label="Close Viewer"
              >
                <CloseIcon />
                <span className="book-btn-label">Close</span>
              </button>
            )}
          </div>
        </nav>
      </footer>

      {/* Table of Contents Drawer Modal */}
      {isTOCSidebarOpen && (
        <div className="book-toc-overlay" onClick={() => setIsTOCSidebarOpen(false)}>
          <aside
            className="book-toc-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Table of Contents"
          >
            <div className="book-toc-header">
              <div>
                <h2 className="book-toc-title">Contents</h2>
                <div className="book-toc-subtitle">{title} • CSE KGEC</div>
              </div>
              <button
                type="button"
                className="book-btn book-btn-icon-only"
                onClick={() => setIsTOCSidebarOpen(false)}
                aria-label="Close Table of Contents"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="book-toc-list">
              {toc.map((item, index) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`book-toc-item ${isActive ? 'is-current' : ''}`}
                    onClick={() => {
                      handleGoToPage(item.page);
                      setIsTOCSidebarOpen(false);
                    }}
                  >
                    <span className="book-toc-item-title">
                      <span>{item.title}</span>
                    </span>
                    <span className="book-toc-item-page">Page {item.page}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Book;
