'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis | null;
    __prismaScrollLocked?: boolean;
  }
}

export interface MagneticScrollProps {
  sectionIds?: string[];
  duration?: number;
  threshold?: number;
  cooldown?: number;
}

export const MagneticScroll: React.FC<MagneticScrollProps> = ({
  sectionIds = [
    'hero-section',
    'magazine-showcase-section',
    'previous-magazines',
    'site-footer',
  ],
  duration = 0.9,
  threshold = 18,
  cooldown = 320,
}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const isTransitioningRef = useRef(false);
  const accumulatedDeltaRef = useRef(0);
  const accumulatedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTransitionEndTimeRef = useRef(0);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch tracking for mobile swipe navigation
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const touchTriggeredRef = useRef(false);

  // Measure document offset tops for each section with fallbacks
  const getSectionOffsets = useCallback(() => {
    if (typeof window === 'undefined') return [0];

    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );

    return sectionIds.map((id, index) => {
      if (index === 0) return 0;
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = Math.round(rect.top + window.scrollY);
        return Math.min(Math.max(0, top), maxScroll);
      }
      return Math.min(Math.round(window.innerHeight * index), maxScroll);
    });
  }, [sectionIds]);

  // Find closest section based on current scroll position
  const getClosestSectionIndex = useCallback(() => {
    const offsets = getSectionOffsets();
    const currentScroll = typeof window !== 'undefined'
      ? (window.scrollY || lenisRef.current?.scroll || 0)
      : 0;

    let closestIndex = 0;
    let minDiff = Infinity;
    for (let i = 0; i < offsets.length; i++) {
      const diff = Math.abs(currentScroll - offsets[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  }, [getSectionOffsets]);

  // Magnetic scroll smoothly to target section
  const scrollToSection = useCallback(
    (targetIndex: number) => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      const offsets = getSectionOffsets();
      if (offsets.length === 0) return;

      const clampedIndex = Math.max(0, Math.min(targetIndex, offsets.length - 1));
      const targetOffset = offsets[clampedIndex];

      const currentScroll = window.scrollY || lenis.scroll || 0;
      if (Math.abs(currentScroll - targetOffset) < 10) {
        return;
      }

      isTransitioningRef.current = true;

      // Fail-safe timeout: guarantee isTransitioning resets
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
      safetyTimerRef.current = setTimeout(() => {
        isTransitioningRef.current = false;
        accumulatedDeltaRef.current = 0;
      }, duration * 1000 + 200);

      lenis.scrollTo(targetOffset, {
        duration,
        lock: true,
        force: true,
        // Silky smooth exponential easeOut
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
    [duration, cooldown, getSectionOffsets]
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 1. Initialize Lenis Smooth Scroll engine with syncTouch enabled
    const lenis = new Lenis({
      autoRaf: true,
      duration,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // 2. Desktop Wheel & Trackpad gesture handler
    const handleWheel = (e: WheelEvent) => {
      if (typeof window !== 'undefined' && window.__prismaScrollLocked) {
        e.preventDefault();
        return;
      }

      // Intercept wheel to prevent stopping at intermediate positions
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
      }, 120);

      if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
        accumulatedDeltaRef.current = 0;
        const closestIndex = getClosestSectionIndex();
        scrollToSection(closestIndex + direction);
      }
    };

    // 3. Mobile Touch swipe gesture handling (Direct & Responsive)
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        touchTriggeredRef.current = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchTriggeredRef.current || isTransitioningRef.current) return;
      if (typeof window !== 'undefined' && window.__prismaScrollLocked) return;
      if (!touchStartPosRef.current || e.touches.length === 0) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffY = touchStartPosRef.current.y - currentY;
      const diffX = touchStartPosRef.current.x - currentX;

      // Vertical swipe intent detected (diffY > 28px and primarily vertical)
      if (Math.abs(diffY) > 28 && Math.abs(diffY) > Math.abs(diffX) * 1.2) {
        touchTriggeredRef.current = true;
        const direction = diffY > 0 ? 1 : -1; // diffY > 0 means swipe UP -> scroll DOWN
        const closestIndex = getClosestSectionIndex();
        scrollToSection(closestIndex + direction);
      }
    };

    const handleTouchEnd = () => {
      touchStartPosRef.current = null;
      touchTriggeredRef.current = false;
    };

    // 4. Keyboard Navigation (Arrow Keys, PageUp/Down, Space, Home, End)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (typeof window !== 'undefined' && window.__prismaScrollLocked) return;

      const downKeys = ['ArrowDown', 'PageDown', ' '];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (downKeys.includes(e.key) && !e.shiftKey) {
        e.preventDefault();
        const closestIndex = getClosestSectionIndex();
        scrollToSection(closestIndex + 1);
      } else if (upKeys.includes(e.key) || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        const closestIndex = getClosestSectionIndex();
        scrollToSection(closestIndex - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(sectionIds.length - 1);
      }
    };

    // 5. Preloader / Hero scroll unlock listener
    const handleScrollUnlocked = () => {
      if (typeof window !== 'undefined') {
        window.__prismaScrollLocked = false;
      }
    };

    // Safety fallback: ensure scroll is unlocked after 14 seconds (never prematurely during preloader or slow hero reveal)
    const safetyUnlockTimeout = setTimeout(() => {
      handleScrollUnlocked();
    }, 14000);

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    window.addEventListener('prisma-scroll-unlocked', handleScrollUnlocked);

    return () => {
      clearTimeout(safetyUnlockTimeout);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      if (accumulatedTimerRef.current) clearTimeout(accumulatedTimerRef.current);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('prisma-scroll-unlocked', handleScrollUnlocked);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [
    duration,
    threshold,
    cooldown,
    sectionIds,
    scrollToSection,
    getClosestSectionIndex,
  ]);

  // Return null: dots UI is completely removed per user request
  return null;
};

export default MagneticScroll;
