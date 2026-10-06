'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

export interface MagneticScrollProps {
  sectionIds?: string[];
  duration?: number;
  threshold?: number;
  cooldown?: number;
  showIndicators?: boolean;
}

const SECTION_LABELS: Record<string, string> = {
  'hero-section': '01 // HERO',
  'magazine-showcase-section': '02 // 3D SHOWCASE',
  'previous-magazines': '03 // ARCHIVE',
  'site-footer': '04 // FOOTER',
};

export const MagneticScroll: React.FC<MagneticScrollProps> = ({
  sectionIds = [
    'hero-section',
    'magazine-showcase-section',
    'previous-magazines',
    'site-footer',
  ],
  duration = 1.1,
  threshold = 24,
  cooldown = 400,
  showIndicators = true,
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const isTransitioningRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const accumulatedDeltaRef = useRef(0);
  const accumulatedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTransitionEndTimeRef = useRef(0);
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);

  // Measure document offset tops for each registered section
  const getOffsets = useCallback(() => {
    if (typeof window === 'undefined') return [];
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    return sectionIds.map((id, index) => {
      if (index === 0) return 0;
      const el = document.getElementById(id);
      if (!el) return 0;

      // For footer / final section, ensure we scroll to maxScroll so the entire footer is visible
      if (id === 'site-footer' || index === sectionIds.length - 1) {
        const rect = el.getBoundingClientRect();
        const top = Math.round(rect.top + window.scrollY);
        return Math.min(top, maxScroll);
      }

      const rect = el.getBoundingClientRect();
      return Math.round(rect.top + window.scrollY);
    });
  }, [sectionIds]);

  // Magnetic scroll smoothly to target section
  const scrollToSection = useCallback(
    (targetIndex: number, userInitiated = true) => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      const offsets = getOffsets();
      if (offsets.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(targetIndex, offsets.length - 1));
      const targetOffset = offsets[clampedIndex];

      // Avoid redundant trigger if already at target
      if (
        userInitiated &&
        clampedIndex === activeIndexRef.current &&
        Math.abs(window.scrollY - targetOffset) < 5
      ) {
        return;
      }

      isTransitioningRef.current = true;
      activeIndexRef.current = clampedIndex;
      setActiveSectionIndex(clampedIndex);

      lenis.scrollTo(targetOffset, {
        duration,
        lock: true,
        // Silky smooth exponential easeOut curve
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          lastTransitionEndTimeRef.current = Date.now();
          setTimeout(() => {
            isTransitioningRef.current = false;
            accumulatedDeltaRef.current = 0;
          }, cooldown);
        },
      });
    },
    [duration, cooldown, getOffsets]
  );

  useEffect(() => {
    // Prevent browser native scroll position restoration on reload
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 1. Initialize Lenis Smooth Scroll engine
    const lenis = new Lenis({
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Start with Lenis stopped if the hero preloader lock is currently active
    if ((window as any).__prismaScrollLocked) {
      lenis.stop();
    }

    // 2. RequestAnimationFrame loop for Lenis
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync active index if scrolled programmatically (e.g. from internal buttons)
    lenis.on('scroll', (e: { scroll: number }) => {
      if (!isTransitioningRef.current) {
        const offsets = getOffsets();
        const current = e.scroll;
        let closest = 0;
        let minDiff = Infinity;
        for (let i = 0; i < offsets.length; i++) {
          const diff = Math.abs(current - offsets[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        }
        if (closest !== activeIndexRef.current) {
          activeIndexRef.current = closest;
          setActiveSectionIndex(closest);
        }
      }
    });

    // 3. Wheel & Trackpad Gesture Handler
    const handleWheel = (e: WheelEvent) => {
      // If hero reveal / preloader is still locking the page:
      if ((window as any).__prismaScrollLocked) {
        e.preventDefault();
        return;
      }

      // Intercept wheel to prevent stopping at intermediate positions!
      e.preventDefault();

      if (isTransitioningRef.current) {
        return;
      }

      const now = Date.now();
      if (now - lastTransitionEndTimeRef.current < cooldown) {
        return;
      }

      accumulatedDeltaRef.current += e.deltaY;

      if (accumulatedTimerRef.current) {
        clearTimeout(accumulatedTimerRef.current);
      }
      accumulatedTimerRef.current = setTimeout(() => {
        accumulatedDeltaRef.current = 0;
      }, 140);

      if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
        accumulatedDeltaRef.current = 0;
        const nextIndex = activeIndexRef.current + direction;
        scrollToSection(nextIndex);
      }
    };

    // 4. Touch swipe gesture handling (Mobile / Tablet)
    const handleTouchStart = (e: TouchEvent) => {
      if ((window as any).__prismaScrollLocked) return;
      if (e.touches.length > 0) {
        touchStartRef.current = {
          y: e.touches[0].clientY,
          time: Date.now(),
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if ((window as any).__prismaScrollLocked || isTransitioningRef.current) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if ((window as any).__prismaScrollLocked || isTransitioningRef.current) return;
      if (!touchStartRef.current || e.changedTouches.length === 0) return;

      const deltaY = touchStartRef.current.y - e.changedTouches[0].clientY;
      const deltaTime = Date.now() - touchStartRef.current.time;
      touchStartRef.current = null;

      // Deliberate vertical swipe detected
      if (Math.abs(deltaY) > 38 && deltaTime < 700) {
        const direction = deltaY > 0 ? 1 : -1;
        const nextIndex = activeIndexRef.current + direction;
        scrollToSection(nextIndex);
      }
    };

    // 5. Keyboard Navigation (Arrow Keys, PageUp/Down, Space, Home, End)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((window as any).__prismaScrollLocked) return;

      const downKeys = ['ArrowDown', 'PageDown', ' '];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (downKeys.includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        scrollToSection(activeIndexRef.current + 1);
      } else if (upKeys.includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        scrollToSection(activeIndexRef.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sectionIds.length - 1);
      }
    };

    // 6. Preloader / Hero scroll unlock listener
    const handleScrollUnlocked = () => {
      setIsUnlocked(true);
      (window as any).__prismaScrollLocked = false;
      lenisRef.current?.start();
    };

    // Check if already unlocked at mount time
    if (!(window as any).__prismaScrollLocked) {
      setIsUnlocked(true);
    }

    // 7. Window resize handler
    const handleResize = () => {
      lenis.resize();
    };

    // Attach passive: false listeners to intercept intermediate stopping
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    window.addEventListener('prisma-scroll-unlocked', handleScrollUnlocked);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('prisma-scroll-unlocked', handleScrollUnlocked);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, [duration, threshold, cooldown, sectionIds, scrollToSection, getOffsets]);

  if (!showIndicators) return null;

  return (
    <nav
      aria-label="Section Navigation"
      className={`fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3.5 pointer-events-none select-none transition-all duration-700 ${
        isUnlocked ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      {sectionIds.map((id, index) => {
        const isActive = activeSectionIndex === index;
        const label = SECTION_LABELS[id] || `0${index + 1}`;

        return (
          <button
            key={id}
            onClick={() => scrollToSection(index)}
            aria-label={`Scroll to ${label}`}
            className="group relative flex items-center justify-end pointer-events-auto p-1.5 focus:outline-none"
          >
            {/* Tooltip on hover */}
            <span
              className={`absolute right-7 px-2.5 py-1 rounded bg-[#161121]/90 backdrop-blur-md text-[9px] font-mono tracking-[0.18em] text-[#F1EDE2] uppercase border border-[#FF4D00]/20 whitespace-nowrap pointer-events-none transition-all duration-300 transform ${
                isActive
                  ? 'opacity-80 translate-x-0'
                  : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {label}
            </span>

            {/* Indicator Dot / Pill */}
            <div
              className={`relative transition-all duration-400 rounded-full ${
                isActive
                  ? 'w-2.5 h-7 bg-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.6)]'
                  : 'w-2 h-2 bg-[#161121]/25 hover:bg-[#FF4D00]/60 hover:scale-125'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-full animate-ping bg-[#FF4D00]/40" />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
};

export default MagneticScroll;
