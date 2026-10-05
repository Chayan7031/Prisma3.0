'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CURATED_THEMES } from './data';
import CuratedThemeCard from './CuratedThemeCard';
import { LionFloraIllustration, WingFloraIllustration } from './ThemeArtwork';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CuratedThemesSectionProps {
  onOpenReader?: (page: number) => void;
}

export const CuratedThemesSection: React.FC<CuratedThemesSectionProps> = ({
  onOpenReader,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  const topThreeThemes = CURATED_THEMES.slice(0, 3);
  const bottomThreeThemes = CURATED_THEMES.slice(3, 6);

  useEffect(() => {
    if (!sectionRef.current || !row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout (>= 1024px):
      // Row 1 (Track I): 3 cards sweep in from Left to Right (x: -360 -> 0)
      // Row 2 (Track II): 3 cards sweep in from Right to Left (x: +360 -> 0)
      mm.add('(min-width: 1024px)', () => {
        const row1Cards = row1Ref.current?.children;
        if (row1Ref.current && row1Cards) {
          const tl1 = gsap.timeline({
            scrollTrigger: {
              trigger: row1Ref.current,
              start: 'top 88%',
              end: 'top 32%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // Track sweep from left to right + individual card cascade
          tl1.fromTo(
            row1Ref.current,
            { x: -320, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }
          ).fromTo(
            row1Cards,
            { x: -80, autoAlpha: 0, scale: 0.94 },
            {
              x: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.0,
              stagger: 0.14,
              ease: 'power2.out',
            },
            '<0.1'
          );
        }

        const row2Cards = row2Ref.current?.children;
        if (row2Ref.current && row2Cards) {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: row2Ref.current,
              start: 'top 88%',
              end: 'top 32%',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // Track sweep from right to left + individual card cascade
          tl2.fromTo(
            row2Ref.current,
            { x: 320, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }
          ).fromTo(
            row2Cards,
            { x: 80, autoAlpha: 0, scale: 0.94 },
            {
              x: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.0,
              stagger: 0.14,
              ease: 'power2.out',
            },
            '<0.1'
          );
        }
      });

      // Mobile/Tablet layout (< 1024px):
      // Subtle directional slide-in with full responsiveness
      mm.add('(max-width: 1023px)', () => {
        const row1Cards = row1Ref.current?.children;
        if (row1Cards && row1Cards.length > 0) {
          gsap.fromTo(
            row1Cards,
            {
              x: -80,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row1Ref.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.8,
              },
            }
          );
        }

        const row2Cards = row2Ref.current?.children;
        if (row2Cards && row2Cards.length > 0) {
          gsap.fromTo(
            row2Cards,
            {
              x: 80,
              autoAlpha: 0,
            },
            {
              x: 0,
              autoAlpha: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row2Ref.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="index"
      ref={sectionRef}
      className="relative w-full bg-[#EFEBE4] text-[#1E1B18] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-b border-dashed border-[#2A2622]/20 overflow-x-clip"
    >
      {/* Background Architectural Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply bg-[radial-gradient(#2A2622_0.75px,transparent_0.75px)] [background-size:28px_28px]" />

      {/* Decorative Line-Art Flourishes from Reference Images */}
      {/* Top Right Lion & Lily Flora Art */}
      <div className="absolute top-8 -right-6 sm:right-4 w-72 sm:w-96 md:w-[440px] opacity-20 pointer-events-none z-0">
        <LionFloraIllustration className="w-full h-auto" />
      </div>

      {/* Bottom Left Butterfly Wing & Flora Art */}
      <div className="absolute bottom-12 -left-6 sm:left-4 w-64 sm:w-80 md:w-[380px] opacity-20 pointer-events-none z-0">
        <WingFloraIllustration className="w-full h-auto" />
      </div>

      {/* Intersection Corner Crosshairs */}
      <div className="absolute top-0 left-6 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-[#2A2622]/40 select-none">
        +
      </div>
      <div className="absolute top-0 right-6 translate-x-1/2 -translate-y-1/2 text-xs font-mono text-[#2A2622]/40 select-none">
        +
      </div>
      <div className="absolute bottom-0 left-6 -translate-x-1/2 translate-y-1/2 text-xs font-mono text-[#2A2622]/40 select-none">
        +
      </div>
      <div className="absolute bottom-0 right-6 translate-x-1/2 translate-y-1/2 text-xs font-mono text-[#2A2622]/40 select-none">
        +
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header: Inspired by HackSpire Reference Structure */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20 pb-8 border-b border-[#2A2622]/15">
          <div className="max-w-xl">
            <span className="text-[11px] font-mono tracking-[0.28em] text-[#FF5722] font-semibold uppercase mb-3 block">
              [ 02 // PUBLICATION DIRECTORY • INDEX ]
            </span>
            <h2 className="font-samarkan text-3xl sm:text-4xl md:text-5xl text-[#1A1816] tracking-wide leading-tight">
              PRISMA <span className="text-[#FF5722]">3.0</span> INDEX
            </h2>
            <p className="text-sm font-serif italic text-[#787169] mt-2">
              Curatorial Directory & Table of Contents • प्रिज्मा ३.० सूची
            </p>
          </div>

          <div className="max-w-xl lg:text-right">
            <p className="text-xs sm:text-[13px] font-mono text-[#4A4540] leading-relaxed">
              Devi Durga wields ten arms, each channeling a Shakti to conquer the impossible.
              PRISMA carries that spirit into every chapter ahead, fusing technology with tradition.
              Select any volume to open directly in the reader.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: 3 INDEX CHAPTERS (PROLOGUE, THEMES, ENGINEERING) - LEFT TO RIGHT   */}
        {/* ========================================================================= */}
        <div className="w-full mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6 px-1">
            <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
            <span className="text-xs font-mono tracking-widest text-[#2A2622]/60 uppercase font-semibold">
              Volume I • Vision, Ambient Theme & Engineering (Chapters 01 – 03)
            </span>
          </div>

          <div
            ref={row1Ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full will-change-transform"
          >
            {topThreeThemes.map((theme, idx) => (
              <CuratedThemeCard
                key={theme.id}
                theme={theme}
                index={idx}
                onSelect={onOpenReader}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: 3 INDEX CHAPTERS (INNOVATIONS, CREATIVE, ARCHIVES) - RIGHT TO LEFT */}
        {/* ========================================================================= */}
        <div className="w-full">
          <div className="flex items-center gap-3 mb-6 px-1 justify-end">
            <span className="text-xs font-mono tracking-widest text-[#2A2622]/60 uppercase font-semibold text-right">
              Volume II • Laboratories, Creative Canvas & Archives (Chapters 04 – 06)
            </span>
            <span className="w-2 h-2 rounded-full bg-[#009688]" />
          </div>

          <div
            ref={row2Ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full will-change-transform"
          >
            {bottomThreeThemes.map((theme, idx) => (
              <CuratedThemeCard
                key={theme.id}
                theme={theme}
                index={idx + 3}
                onSelect={onOpenReader}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedThemesSection;
