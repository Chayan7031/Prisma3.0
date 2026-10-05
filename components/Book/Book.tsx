'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { getMagazinePageUrls } from '@/lib/cloudinary';
import VectorPathDecor from './VectorPathDecor';
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
  /** Whether to show the Table of Contents option in toolbar (default: false) */
  showTOC?: boolean;
}

// ============================================================================
// Default Pages and Table of Contents (21 Pages via Cloudinary with local fallback)
// ============================================================================
export const DEFAULT_PAGES: string[] = getMagazinePageUrls(21);

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

// Helper functions for 3D layout, centering, and page mapping
const getBookState = (page: number, total: number, mobile: boolean): 'cover-front' | 'spread' | 'cover-back' => {
  if (mobile) return 'spread';
  if (page <= 1) return 'cover-front';
  if (page >= total) return 'cover-back';
  return 'spread';
};

const getCenteringOffset = (page: number, total: number, pageWidth: number, mobile: boolean): number => {
  if (mobile) return 0;
  if (page <= 1) return -pageWidth / 2;
  if (page >= total) return pageWidth / 2;
  return 0;
};

const userPageToInternalIndex = (userPage: number, odd: boolean, total: number, mobile = false): number => {
  if (mobile || !odd) return userPage - 1;
  if (userPage >= total) return total; // page 21 -> internal index 21
  return userPage - 1; // page 1 -> 0, page 20 -> 19
};

const internalIndexToUserPage = (index: number, odd: boolean, total: number, mobile = false): number => {
  if (mobile || !odd) return index + 1;
  if (index >= total) return total; // internal 21 -> page 21
  if (index === total - 1) return total - 1; // internal 20 (inside cover) -> page 20
  return index + 1;
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
  showTOC = false,
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
  const isOdd = pages.length % 2 === 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const currentPageRef = useRef<number>(initialPage);
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
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const isFlippingRef = useRef<boolean>(false);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const resizeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [centeringOffset, setCenteringOffset] = useState<number>(() =>
    getCenteringOffset(initialPage, pages.length, 420, false)
  );
  const flippingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Keep currentPageRef in sync with currentPage
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  // Sound disabled per user request
  const triggerFlipAudio = useCallback((): void => {}, []);

  // Preload page images to prevent flicker during 3D page turns
  useEffect(() => {
    pages.forEach((pageData) => {
      const src = typeof pageData === 'string' ? pageData : pageData.image;
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [pages]);

  // Detect prefers-reduced-motion for accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resetFlippingStateWithTimer = useCallback((durationMs: number) => {
    if (flippingTimerRef.current) {
      clearTimeout(flippingTimerRef.current);
    }
    flippingTimerRef.current = setTimeout(() => {
      isFlippingRef.current = false;
      setIsFlipping(false);
      flippingTimerRef.current = null;
    }, durationMs);
  }, []);

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
    const activePage = currentPageRef.current || 1;
    setCenteringOffset(getCenteringOffset(activePage, pages.length, finalWidth, mobileMode));
    return { width: finalWidth, height: finalHeight, isMobile: mobileMode };
  }, [aspectRatio, pages.length]);

  // Window Resize Listener with debounce
  useEffect(() => {
    calculateDimensions();
    const handleResize = (): void => {
      setIsResizing(true);
      calculateDimensions();
      if (resizeDebounceTimerRef.current) {
        clearTimeout(resizeDebounceTimerRef.current);
      }
      resizeDebounceTimerRef.current = setTimeout(() => {
        setIsResizing(false);
        calculateDimensions();
      }, 200);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeDebounceTimerRef.current) {
        clearTimeout(resizeDebounceTimerRef.current);
      }
    };
  }, [calculateDimensions]);

  // Fullscreen Change Listener with staggered bounds update
  const fullscreenTimersRef = useRef<NodeJS.Timeout[]>([]);
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(!!document.fullscreenElement);
      setIsResizing(true);
      calculateDimensions();
      fullscreenTimersRef.current.forEach(clearTimeout);
      fullscreenTimersRef.current = [
        setTimeout(calculateDimensions, 60),
        setTimeout(calculateDimensions, 160),
        setTimeout(() => {
          calculateDimensions();
          setIsResizing(false);
        }, 320),
      ];
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      fullscreenTimersRef.current.forEach(clearTimeout);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, [calculateDimensions]);

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
      // If odd total pages (e.g. 21), insert an inside back cover right before the last page
      // so StPageFlip creates a separate closing leaf for the back cover on desktop spread view
      if (!isMobile && isOdd && index === pages.length - 1) {
        const insideCoverEl = document.createElement('div');
        insideCoverEl.className = 'book-page book-inside-cover';
        insideCoverEl.setAttribute('data-density', 'soft');

        const insideContentEl = document.createElement('div');
        insideContentEl.className = 'book-page-content book-inside-cover-content';

        const watermarkEl = document.createElement('div');
        watermarkEl.className = 'book-endpaper-design';
        watermarkEl.innerHTML = `
          <div class="book-endpaper-crest">PRISMA 3.0</div>
          <div class="book-endpaper-sub">Department of Computer Science & Engineering</div>
          <div class="book-endpaper-detail">Kalyani Government Engineering College</div>
        `;
        insideContentEl.appendChild(watermarkEl);

        const insideSpine = document.createElement('div');
        insideSpine.className = 'book-spine-gradient spine-left';
        insideContentEl.appendChild(insideSpine);

        insideCoverEl.appendChild(insideContentEl);
        hostEl.appendChild(insideCoverEl);
      }

      const isCover = index === 0 || index === pages.length - 1;
      const imageSrc = typeof pageData === 'string' ? pageData : pageData.image;

      const pageEl = document.createElement('div');
      pageEl.className = `book-page ${index === 0 ? 'book-cover-front-page' : ''} ${index === pages.length - 1 ? 'book-cover-back-page' : ''}`;
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

    const activePage = currentPageRef.current || initialPage;
    const startInternalIndex = userPageToInternalIndex(activePage, isOdd, pages.length, isMobile);

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
        startPage: startInternalIndex,
        drawShadow: true,
        flippingTime: prefersReducedMotion ? 1 : (isMobile ? 500 : 950),
        useMouseEvents: true,
        swipeDistance: 25,
        clickEventForward: true,
        startZIndex: 10,
        autoSize: true,
        showPageCorners: !isMobile,
        disableFlipByClick: true,
      });

      flipInstance.loadFromHTML(hostEl.querySelectorAll('.book-page'));

      // Fix StPageFlip portrait mode flipPrev coordinate bug:
      // In portrait mode, render.getRect().left is negative (-pageWidth).
      // The library's flipPrev passes global x: 10, which converts to bookPos.x = 10 - rect.left = pageWidth + 10 (middle of spread),
      // failing isPointOnCorners and silently dropping the flip when disableFlipByClick is true.
      // Passing rect.left + 10 places the start point on the left corner of the active page.
      const flipCtrl = (flipInstance as any).getFlipController?.();
      const render = (flipInstance as any).getRender?.();
      if (flipCtrl && render) {
        const origFlipPrev = flipCtrl.flipPrev.bind(flipCtrl);
        flipCtrl.flipPrev = (corner: 'top' | 'bottom' = 'top') => {
          try {
            const rect = render.getRect();
            if (render.getOrientation() === 'portrait') {
              const cornerX = rect.left + 10;
              const cornerY = corner === 'bottom' ? rect.height - 2 : 1;
              flipCtrl.flip({ x: cornerX, y: cornerY });
              return;
            }
          } catch (e) {
            console.warn('flipPrev portrait calculation fallback', e);
          }
          origFlipPrev(corner);
        };

        flipInstance.flipPrev = (corner: 'top' | 'bottom' = 'top') => {
          flipCtrl.flipPrev(corner);
        };
      }

      pageFlipRef.current = flipInstance;
      setTotalPages(pages.length);
      setCurrentPage(activePage);
      setCenteringOffset(getCenteringOffset(activePage, pages.length, bookDimensions.width, isMobile));

      // Sync on PageFlip initial mount
      flipInstance.on('init', (e) => {
        const pageIdx = typeof e.data?.page === 'number'
          ? e.data.page
          : (typeof e.data === 'number' ? e.data : startInternalIndex);
        const userPage = internalIndexToUserPage(pageIdx, isOdd, pages.length, isMobile);
        setCurrentPage(userPage);
        currentPageRef.current = userPage;
        setCenteringOffset(getCenteringOffset(userPage, pages.length, bookDimensions.width, isMobile));
      });

      // Listen for animation start and completion to lock inputs and manage state
      flipInstance.on('changeState', (e) => {
        if (e.data === 'flipping' || e.data === 'user_fold') {
          isFlippingRef.current = true;
          setIsFlipping(true);
          resetFlippingStateWithTimer(isMobile ? 650 : 1200);
        } else if (e.data === 'read') {
          isFlippingRef.current = false;
          setIsFlipping(false);
          if (flippingTimerRef.current) {
            clearTimeout(flippingTimerRef.current);
            flippingTimerRef.current = null;
          }
        }
      });

      flipInstance.on('flip', (e) => {
        const userPage = internalIndexToUserPage(e.data, isOdd, pages.length, isMobile);
        setCurrentPage(userPage);
        currentPageRef.current = userPage;
        const targetOffset = getCenteringOffset(userPage, pages.length, bookDimensions.width, isMobile);
        setCenteringOffset(targetOffset);
        triggerFlipAudio();
        onPageChange?.(userPage);
        isFlippingRef.current = false;
        setIsFlipping(false);
        if (flippingTimerRef.current) {
          clearTimeout(flippingTimerRef.current);
          flippingTimerRef.current = null;
        }
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
  }, [bookDimensions.width, bookDimensions.height, isMobile, pages, prefersReducedMotion, initialPage, isOdd, resetFlippingStateWithTimer, onPageChange, triggerFlipAudio]);

  const handleNextPage = useCallback((): void => {
    if (isFlippingRef.current) return;
    if (currentPage >= totalPages) return;

    const nextPage = isMobile
      ? Math.min(totalPages, currentPage + 1)
      : (currentPage === 1 ? 2 : Math.min(totalPages, currentPage + 2));

    // Slide container concurrently with the flip
    setCenteringOffset(getCenteringOffset(nextPage, totalPages, bookDimensions.width, isMobile));
    isFlippingRef.current = true;
    setIsFlipping(true);
    resetFlippingStateWithTimer(isMobile ? 650 : 1200);

    if (pageFlipRef.current) {
      pageFlipRef.current.flipNext('top');
      if (pageFlipRef.current.getState() === 'read') {
        pageFlipRef.current.turnToNextPage();
      }
    }
  }, [currentPage, totalPages, bookDimensions.width, isMobile, resetFlippingStateWithTimer]);

  const handlePrevPage = useCallback((): void => {
    if (isFlippingRef.current) return;
    if (currentPage <= 1) return;

    const targetPage = isMobile
      ? Math.max(1, currentPage - 1)
      : (currentPage === totalPages
          ? Math.max(1, totalPages - 1)
          : (currentPage <= 3 ? 1 : Math.max(1, currentPage - 2)));

    // Slide container concurrently with the flip
    setCenteringOffset(getCenteringOffset(targetPage, totalPages, bookDimensions.width, isMobile));
    isFlippingRef.current = true;
    setIsFlipping(true);
    resetFlippingStateWithTimer(isMobile ? 650 : 1200);

    if (pageFlipRef.current) {
      pageFlipRef.current.flipPrev('top');
      if (pageFlipRef.current.getState() === 'read') {
        pageFlipRef.current.turnToPrevPage();
      }
    }
  }, [currentPage, totalPages, bookDimensions.width, isMobile, resetFlippingStateWithTimer]);

  const handleGoToPage = useCallback(
    (pageNum: number): void => {
      if (isFlippingRef.current) return;
      const target = Math.max(1, Math.min(totalPages, pageNum));
      if (target === currentPage) return;

      const targetOffset = getCenteringOffset(target, totalPages, bookDimensions.width, isMobile);
      setCenteringOffset(targetOffset);
      isFlippingRef.current = true;
      setIsFlipping(true);
      resetFlippingStateWithTimer(isMobile ? 650 : 1200);

      if (pageFlipRef.current) {
        const targetInternal = userPageToInternalIndex(target, isOdd, totalPages, isMobile);
        if (isMobile) {
          if (Math.abs(target - currentPage) === 1) {
            if (target > currentPage) {
              pageFlipRef.current.flipNext('top');
            } else {
              pageFlipRef.current.flipPrev('top');
            }
            if (pageFlipRef.current.getState() === 'read') {
              pageFlipRef.current.turnToPage(targetInternal);
            }
          } else {
            pageFlipRef.current.turnToPage(targetInternal);
          }
        } else {
          if (Math.abs(target - currentPage) <= 2) {
            pageFlipRef.current.flip(targetInternal, 'top');
          } else {
            pageFlipRef.current.turnToPage(targetInternal);
          }
        }
      }
    },
    [totalPages, currentPage, bookDimensions.width, isMobile, isOdd, resetFlippingStateWithTimer]
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
    if (isFlippingRef.current) {
      pointerStartXRef.current = null;
      pointerStartYRef.current = null;
      return;
    }

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
      if (
        !target.closest('.book-btn') &&
        !target.closest('.book-toolbar-container') &&
        !target.closest('.book-hotspot') &&
        !target.closest('.book-toc-drawer')
      ) {
        if (currentPage <= 1) {
          handleNextPage();
        } else if (currentPage >= totalPages) {
          handlePrevPage();
        } else {
          if (endX > window.innerWidth / 2) {
            handleNextPage();
          } else {
            handlePrevPage();
          }
        }
      }
    }
    pointerStartXRef.current = null;
    pointerStartYRef.current = null;
  };

  const bookState = getBookState(currentPage, totalPages, isMobile);

  return (
    <div
      className={`book-reader-container theme-${currentTheme} ${isEmbedded ? 'is-embedded' : ''} ${className}`}
      onPointerDownCapture={handlePointerDown}
      onPointerUpCapture={handlePointerUp}
    >
      <div className="book-reader-glow" />

      {/* Traditional PRISMA 3.0 Gold Filigree & Mandala Architectural Decorations */}
      <div className="book-decor-layer" aria-hidden="true">
        {/* Ambient Radial Warmth Glow */}
        <div className="book-decor-ambient-glow" />



        {/* Ornate Left Side Border Design */}
        <div className="book-decor-side-left">
          <img
            src="/book-bg-border.png"
            alt=""
            className="book-decor-img book-decor-side-img"
            draggable={false}
          />
        </div>

        {/* Ornate Right Side Border Design */}
        <div className="book-decor-side-right">
          <img
            src="/book-bg-border-right.png"
            alt=""
            className="book-decor-img book-decor-side-img"
            draggable={false}
          />
        </div>

        {/* Animated Spreading Circuit Lines - V2 */}
        <svg
          viewBox="0 0 1000 800"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible opacity-90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="neonOrangeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Group: Top Left Branch */}
          <g>
            {/* Base Wire */}
            <path d="M 380 250 L 250 250 L 250 100 L 50 100" stroke="#f97316" strokeWidth="1.5" opacity="0.3" />
            {/* Nodes */}
            <circle cx="380" cy="250" r="5" fill="#fceac5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="250" cy="250" r="2.5" fill="#ea580c" />
            <rect x="247" y="97" width="6" height="6" fill="#fceac5" stroke="#ea580c" strokeWidth="1.5" />
            {/* Cross Details */}
            <path d="M 120 70 L 120 80 M 115 75 L 125 75" stroke="#ea580c" strokeWidth="1.5" />
            {/* Animated Energy Pulse */}
            <path
              d="M 380 250 L 250 250 L 250 100 L 50 100"
              stroke="#ff8a3d"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#neonOrangeGlow)"
              style={{ strokeDasharray: '40 200', animation: 'book-circuit-flow 4s linear infinite reverse' }}
            />
          </g>

          {/* Group: Bottom Left Branch */}
          <g>
            <path d="M 360 550 L 220 550 L 150 700 L -20 700" stroke="#f97316" strokeWidth="1.5" opacity="0.3" />
            <circle cx="360" cy="550" r="5" fill="#fceac5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="220" cy="550" r="2.5" fill="#ea580c" />
            <circle cx="150" cy="700" r="3" fill="#ea580c" />
            <path d="M 180 620 L 180 630 M 175 625 L 185 625" stroke="#ea580c" strokeWidth="1.5" />
            <path
              d="M 360 550 L 220 550 L 150 700 L -20 700"
              stroke="#ff8a3d"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#neonOrangeGlow)"
              style={{ strokeDasharray: '50 250', animation: 'book-circuit-flow 5s linear infinite reverse' }}
            />
          </g>

          {/* Group: Top Right Branch */}
          <g>
            <path d="M 620 200 L 750 200 L 800 50 L 1020 50" stroke="#f97316" strokeWidth="1.5" opacity="0.3" />
            <circle cx="620" cy="200" r="5" fill="#fceac5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="750" cy="200" r="2.5" fill="#ea580c" />
            <rect x="797" y="47" width="6" height="6" fill="#fceac5" stroke="#ea580c" strokeWidth="1.5" />
            <path d="M 850 90 L 850 100 M 845 95 L 855 95" stroke="#ea580c" strokeWidth="1.5" />
            <path
              d="M 620 200 L 750 200 L 800 50 L 1020 50"
              stroke="#ff8a3d"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#neonOrangeGlow)"
              style={{ strokeDasharray: '40 220', animation: 'book-circuit-flow 4.5s linear infinite reverse' }}
            />
          </g>

          {/* Group: Bottom Right Branch */}
          <g>
            <path d="M 640 620 L 780 620 L 850 760 L 1020 760" stroke="#f97316" strokeWidth="1.5" opacity="0.3" />
            <circle cx="640" cy="620" r="5" fill="#fceac5" stroke="#ea580c" strokeWidth="2" />
            <circle cx="780" cy="620" r="2.5" fill="#ea580c" />
            <circle cx="850" cy="760" r="3" fill="#ea580c" />
            <path d="M 760 700 L 760 710 M 755 705 L 765 705" stroke="#ea580c" strokeWidth="1.5" />
            <path
              d="M 640 620 L 780 620 L 850 760 L 1020 760"
              stroke="#ff8a3d"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#neonOrangeGlow)"
              style={{ strokeDasharray: '60 300', animation: 'book-circuit-flow 5.5s linear infinite reverse' }}
            />
          </g>
        </svg>

        {/* Futuristic Robotic Hand Pointing at Book */}
        <div className="absolute top-[50%] -translate-y-1/2 -left-[12%] sm:-left-[5%] md:left-[0%] lg:left-[4%] w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] opacity-80 pointer-events-none z-0 mix-blend-multiply transition-all duration-700">
          <img
            src="/Futuristic-Robotic-Hand-Schematic.png"
            alt="Robotic Hand Schematic"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Futuristic Robotic Hand Pointing at Book (Right Side) */}
        <div className="absolute top-[50%] -translate-y-1/2 -right-[12%] sm:-right-[5%] md:right-[0%] lg:right-[4%] w-[300px] sm:w-[350px] md:w-[450px] lg:w-[500px] opacity-80 pointer-events-none z-0 mix-blend-multiply transition-all duration-700">
          <img
            src="/Futuristic-Robotic-Hand-Schematic-revert.png"
            alt="Robotic Hand Schematic Reversed"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Butterfly Above Right Hand */}
        <div className="absolute top-[15%] sm:top-[18%] md:top-[5%] right-[5%] sm:right-[10%] md:right-[15%] lg:right-[8%] w-[150px] sm:w-[180px] md:w-[220px] lg:w-[250px] opacity-75 pointer-events-none z-0 mix-blend-multiply transition-all duration-700 -rotate-12">
          <img
            src="/page-bg-butterfly.png"
            alt="Butterfly Decor"
            className="w-full h-auto object-contain"
            draggable={false}
          />
        </div>

        {/* Bottom Left Decor (Right beside the left border) */}
        <div className="absolute bottom-0 left-[10%] sm:left-[12%] md:left-[14%] lg:left-[4%] w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] opacity-100 pointer-events-none z-10 transition-all duration-700">
          <img
            src="/design/left_side-removebg-preview.png"
            alt="Bottom Left Decor"
            className="w-full h-auto object-contain object-bottom"
            style={{ filter: 'drop-shadow(0px 0px 10px rgba(0,0,0,0.3))' }}
            draggable={false}
          />
        </div>

        {/* Bottom Right Decor (Left beside the right border) */}
        <div className="absolute bottom-0 right-[10%] sm:right-[12%] md:right-[14%] lg:right-[4%] w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] opacity-100 pointer-events-none z-10 transition-all duration-700">
          <img
            src="/left_side-removebg-preview-right.png"
            alt="Bottom Right Decor"
            className="w-full h-auto object-contain object-bottom"
            style={{ filter: 'drop-shadow(0px 0px 10px rgba(0,0,0,0.3))' }}
            draggable={false}
          />
        </div>


      </div>

      {/* Top Header Bar (Only Close Button remains) */}
      <header className="book-top-bar" style={{ background: 'transparent', borderBottom: 'none', position: 'absolute', zIndex: 50 }}>

        <div className="book-top-actions" style={{ marginRight: '130px' }}>
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
          <div
            className={`flipbook-centering-wrapper is-${bookState} ${isFlipping ? 'is-flipping' : ''} ${isResizing ? 'is-resizing' : ''}`}
            style={{
              transform: `translateX(${centeringOffset}px)`,
            }}
          >
            {/* Page edge stack for front cover (right side) */}
            <div
              className={`book-edge-stack book-edge-stack-right ${bookState === 'cover-front' && !isFlipping ? 'is-visible' : ''}`}
            />

            {/* Flipbook Mount Point */}
            <div ref={mountContainerRef} className="flipbook-mount-wrapper" />

            {/* Page edge stack for back cover (left side) */}
            <div
              className={`book-edge-stack book-edge-stack-left ${bookState === 'cover-back' && !isFlipping ? 'is-visible' : ''}`}
            />
          </div>
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
              className={`book-hotspot book-hotspot-left ${isFlipping ? 'is-disabled' : ''}`}
              onClick={handlePrevPage}
              title="Previous Page (Left Arrow)"
              style={{ display: currentPage <= 1 ? 'none' : 'flex' }}
            >
              <div className="book-hotspot-btn">
                <ChevronLeftIcon />
              </div>
            </div>

            <div
              className={`book-hotspot book-hotspot-right ${isFlipping ? 'is-disabled' : ''}`}
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

      {/* Floating Bottom Toolbar (Restored and Theme-Matched) */}
      <footer className="book-toolbar-container">
        <nav className="book-toolbar" aria-label="Book Navigation Controls">
          {/* Page Turn & Input Group */}
          <div className="book-toolbar-group">
            <button
              type="button"
              className="book-btn book-btn-icon-only"
              onClick={handlePrevPage}
              disabled={currentPage <= 1 || isFlipping}
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
              disabled={currentPage >= totalPages || isFlipping}
              title="Next Page (→)"
              aria-label="Next Page"
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="book-toolbar-divider" />

          {/* Contents (Optional), Zoom & Theme Group */}
          <div className="book-toolbar-group">
            {showTOC && (
              <>
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
              </>
            )}

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
                className="book-btn book-btn-download"
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
      {showTOC && isTOCSidebarOpen && (
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
