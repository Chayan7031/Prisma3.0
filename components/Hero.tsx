'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Download,
} from 'lucide-react';

declare global {
  interface Window {
    __prismaPreloaderComplete?: boolean;
    __prismaScrollLocked?: boolean;
  }
}

// Linear RGB interpolation helper for smooth color transitions
function interpolateRgb(
  rgb1: [number, number, number],
  rgb2: [number, number, number],
  t: number
): string {
  const clamped = Math.min(Math.max(t, 0), 1);
  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * clamped);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * clamped);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * clamped);
  return `rgb(${r}, ${g}, ${b})`;
}

// Blueprint sketch palette (monochromatic drafting tones at scroll = 0)
const DRAFT_GRAY: [number, number, number] = [148, 140, 128];
const DRAFT_TEXT: [number, number, number] = [138, 131, 120];
const DRAFT_TITLE: [number, number, number] = [96, 89, 78];

// Fully revealed vibrant palette (active brand tones at scroll = 1)
const BRAND_ORANGE: [number, number, number] = [255, 77, 0];
const ELECTRIC_ORANGE: [number, number, number] = [255, 89, 0];
const RICH_OBSIDIAN: [number, number, number] = [22, 17, 33];
const DARK_TEXT: [number, number, number] = [31, 31, 31];

// Generate SVG mask path for clean displaced reveal (no black line)
function getSvgMaskPath(p: number): string {
  if (p <= 0.0005) return 'M -60 -60 L 640 -60 L 640 -60 L -60 -60 Z';
  if (p >= 0.9995) return 'M -60 -60 L 640 -60 L 640 500 L -60 500 Z';

  // Base boundary moves vertically down across the 418px face artwork
  const baseY = p * 450 - 10;
  const points: string[] = [];

  // Subtle natural organic wave across the width
  for (let x = 640; x >= -60; x -= 25) {
    const wave = Math.sin((x / 577) * Math.PI * 4) * 8 + Math.cos((x / 577) * Math.PI * 8) * 4;
    points.push(`L ${x} ${(baseY + wave).toFixed(1)}`);
  }

  return `M -60 -60 L 640 -60 ${points.join(' ')} Z`;
}

export interface HeroProps {
  onOpenReader?: (page?: number) => void;
  pdfUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
}) => {
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    // 1. Strictly prevent scrolling while the preloader and hero reveal are active
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowUp', 'ArrowDown', ' '];
      if (keys.includes(e.key) || keys.includes(e.code)) {
        e.preventDefault();
      }
    };

    const lockScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        window.__prismaScrollLocked = true;
      }
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', preventScrollKeys, { passive: false });
    };

    const unlockScroll = () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventScrollKeys);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        window.__prismaScrollLocked = false;
      }
      window.dispatchEvent(new CustomEvent('prisma-scroll-unlocked'));
    };

    lockScroll();

    let animFrameId: number;
    let animTimeoutId: NodeJS.Timeout;
    let hasStarted = false;

    // Automatic reveal animation: transforms hero section from fade to bright
    const startRevealAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;

      window.scrollTo(0, 0);

      const animDuration = 3800; // Slower, luxurious 3.8s reveal for cinematic organic bloom
      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const rawT = Math.min(elapsed / animDuration, 1);

        // Silky smooth cubic easeInOut for organic acceleration and soft deceleration
        const easedT = rawT < 0.5
          ? 4 * rawT * rawT * rawT
          : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

        setRevealProgress(easedT);

        if (rawT < 1) {
          animFrameId = requestAnimationFrame(step);
        } else {
          // Animation complete: lock is released, allowing the user to freely scroll
          setRevealProgress(1);
          unlockScroll();
        }
      };

      animFrameId = requestAnimationFrame(step);
    };

    // Triggered right when the preloader has fully finished loading and is completely hidden
    const handlePreloaderComplete = () => {
      animTimeoutId = setTimeout(() => {
        startRevealAnimation();
      }, 250);
    };

    if (typeof window !== 'undefined' && window.__prismaPreloaderComplete) {
      animTimeoutId = setTimeout(() => {
        startRevealAnimation();
      }, 250);
    } else {
      window.addEventListener('prisma-preloader-complete', handlePreloaderComplete);
    }

    // Fallback: only if preloader event doesn't fire within 9000ms, start automatically
    const fallbackTimeout = setTimeout(() => {
      if (!hasStarted) {
        startRevealAnimation();
      }
    }, 9000);

    // Hard safety guarantee: unconditionally unlock after 14000ms
    const safetyUnlockTimeout = setTimeout(() => {
      unlockScroll();
    }, 14000);

    return () => {
      window.removeEventListener('prisma-preloader-complete', handlePreloaderComplete);
      clearTimeout(animTimeoutId);
      clearTimeout(fallbackTimeout);
      clearTimeout(safetyUnlockTimeout);
      cancelAnimationFrame(animFrameId);
      unlockScroll();
    };
  }, []);

  const svgMaskPath = useMemo(() => getSvgMaskPath(revealProgress), [revealProgress]);

  // Dynamic colors transitioning across the Hero section tied to scroll progress
  const sunStrokeColor = useMemo(() => interpolateRgb(DRAFT_GRAY, BRAND_ORANGE, revealProgress), [revealProgress]);
  const circuitTraceColor = useMemo(() => interpolateRgb(DRAFT_GRAY, ELECTRIC_ORANGE, revealProgress), [revealProgress]);
  const titlePrismaColor = useMemo(() => interpolateRgb(DRAFT_TITLE, RICH_OBSIDIAN, revealProgress), [revealProgress]);
  const codeBarColor = useMemo(() => interpolateRgb(DRAFT_GRAY, BRAND_ORANGE, revealProgress), [revealProgress]);
  const codeTextColor = useMemo(() => interpolateRgb(DRAFT_TEXT, [68, 68, 68], revealProgress), [revealProgress]);
  const subtitleColor = useMemo(() => interpolateRgb(DRAFT_TEXT, [85, 85, 85], revealProgress), [revealProgress]);
  const taglineDreamColor = useMemo(() => interpolateRgb(DRAFT_TEXT, DARK_TEXT, revealProgress), [revealProgress]);
  const taglineAlgoColor = useMemo(() => interpolateRgb(DRAFT_TEXT, BRAND_ORANGE, revealProgress), [revealProgress]);
  const pillarsTextColor = useMemo(() => interpolateRgb(DRAFT_TEXT, [34, 34, 34], revealProgress), [revealProgress]);
  const pillarsBarColor = useMemo(() => interpolateRgb(DRAFT_GRAY, BRAND_ORANGE, revealProgress), [revealProgress]);
  const quoteTextColor = useMemo(() => interpolateRgb(DRAFT_TEXT, DARK_TEXT, revealProgress), [revealProgress]);
  const deptHeaderColor = useMemo(() => interpolateRgb(DRAFT_TEXT, BRAND_ORANGE, revealProgress), [revealProgress]);
  const btnBgColor = useMemo(() => interpolateRgb(DRAFT_TEXT, BRAND_ORANGE, revealProgress), [revealProgress]);

  const handleLaunchReader = (page: number = 1) => {
    if (onOpenReader) {
      onOpenReader(page);
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen bg-[#F1EDE2] overflow-x-hidden flex flex-col justify-between font-space select-none transition-colors duration-300"
      style={{
        backgroundImage: `radial-gradient(ellipse 70% 60% at 65% 55%, rgba(255, 110, 30, ${revealProgress * 0.11}) 0%, transparent 75%)`,
      }}
    >
      
      {/* ========================================================================= */}
      {/* DISTORTED BOTANICAL SKETCH FLOURISHES (left-design & design0 across UI)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        
        {/* 2. Mid/Bottom-Left: Behind buttons & tagline */}
        <div className="absolute bottom-[3%] -left-6 sm:left-[1%] w-[200px] sm:w-[280px] aspect-[275/291] opacity-25 scale-x-[-1] rotate-[22deg] mix-blend-multiply">
          <Image
            src="/left_design_tight.png"
            alt="Botanical Sketch Flourish"
            fill
            className="object-contain"
          />
        </div>

        {/* 3. Upper-Center: Subtle whisper below top navbar */}
        <div className="hidden lg:block absolute top-[5%] left-[42%] w-[160px] aspect-[275/291] opacity-20 -rotate-[18deg] mix-blend-multiply">
          <Image
            src="/left_design_tight.png"
            alt="Botanical Sketch Flourish"
            fill
            className="object-contain"
          />
        </div>

        {/* 4. Center-Mid: Tilted between left typography and center artwork */}
        <div className="hidden md:block absolute top-[28%] left-[34%] lg:left-[22%] w-[170px] sm:w-[220px] aspect-[215/230] opacity-25 rotate-[35deg] scale-y-[-1] mix-blend-multiply">
          <Image
            src="/design0.png"
            alt="Botanical Sketch Flourish"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <header className="relative z-30 w-full max-w-[1840px] mx-auto px-4 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-2 flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-5">
        
        {/* KGEC Logo */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[90px] lg:h-[90px] shrink-0 animate-fade-in-up" style={{ animationDelay: '100ms', opacity: 0, animationFillMode: 'forwards' }}>
          <img
            src="/kgec_logo-removebg-preview.png"
            alt="KGEC Logo"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* College Name & Department Text */}
        <div className="text-center md:text-left animate-fade-in-up flex flex-col gap-0.5 sm:gap-1" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-[#1F1F1F] font-space font-extrabold uppercase tracking-[0.05em] sm:tracking-[0.12em] lg:tracking-[0.18em] text-[15px] sm:text-[17px] lg:text-[20px] leading-tight max-w-[95vw] md:max-w-none whitespace-nowrap">
            Kalyani Government Engineering College
          </h2>
          <p
            className="font-space font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] text-[10px] sm:text-[12px] lg:text-[14px] leading-tight whitespace-nowrap transition-colors duration-200"
            style={{ color: deptHeaderColor }}
          >
            Computer Science and Engineering
          </p>
        </div>

      </header>

      {/* ========================================================================= */}
      {/* MAIN HERO SHOWCASE (Left Text + Right Grounded Artwork)                   */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1840px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-start lg:justify-center pt-8 lg:pt-0 pb-12 lg:pb-0">
        
        {/* ===================================================================== */}
        {/* LEFT COLUMN: Typography, Masthead & Action Buttons                    */}
        {/* ===================================================================== */}
        <div className="w-full lg:max-w-[480px] xl:max-w-[530px] flex flex-col items-start text-left z-20 py-2 sm:py-10 flex-none relative pointer-events-auto">
          
          {/* 1. Code Line with Orange Vertical Bar (Color transforming on scroll) */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4 select-none animate-fade-in-up" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
            <span
              className="w-[3px] h-[18px] rounded-sm inline-block mr-0.5 transition-colors duration-200"
              style={{ backgroundColor: codeBarColor }}
            />
            <span
              className="font-mono text-[10px] sm:text-[14px] font-medium tracking-wide transition-colors duration-200"
              style={{ color: codeTextColor }}
            >
              &gt; def create Impact():{' '}
              <span
                className="inline-block w-2.5 h-[2px] animate-pulse align-middle ml-0.5"
                style={{ backgroundColor: codeBarColor }}
              />
            </span>
          </div>

          {/* 2. Monumental Headline: prisma 3.0 (Color transforming on scroll) */}
          <div className="flex items-baseline gap-2 sm:gap-4 leading-none select-none mb-2 sm:mb-4 animate-fade-in-up" style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}>
            <h1
              className="font-samarkan text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[86px] xl:text-[96px] tracking-wide lowercase transition-colors duration-200"
              style={{ color: titlePrismaColor }}
            >
              prisma
            </h1>
            <span
              className="font-samarkan text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[86px] xl:text-[96px] tracking-tight transition-colors duration-200"
              style={{ color: btnBgColor }}
            >
              3.0
            </span>
          </div>

          {/* 3. Department Subtitle (Color transforming on scroll) */}
          <div
            className="mt-2 sm:mt-4 text-[9px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.24em] uppercase leading-relaxed font-semibold select-none animate-fade-in-up transition-colors duration-200"
            style={{ animationDelay: '500ms', opacity: 0, animationFillMode: 'forwards', color: subtitleColor }}
          >
            <p>KGEC CSE DEPARTMENT</p>
            <p>ANNUAL MAGAZINE</p>
          </div>

          {/* 4. Tagline: SAME DREAMS. MORE ALGORITHMS. (Text highlight effect like heronai) */}
          <div className="mt-5 sm:mt-8 mb-5 sm:mb-8 text-[10px] sm:text-sm font-space font-black tracking-[0.18em] sm:tracking-[0.22em] uppercase space-y-1 select-none animate-fade-in-up" style={{ animationDelay: '650ms', opacity: 0, animationFillMode: 'forwards' }}>
            <div className="transition-colors duration-200" style={{ color: taglineDreamColor }}>
              SAME DREAMS.
            </div>
            <div className="transition-colors duration-200" style={{ color: taglineAlgoColor }}>
              MORE ALGORITHMS.
            </div>
          </div>

          {/* 5. Action Buttons (Read Magazine blooms into brand orange) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full animate-fade-in-up" style={{ animationDelay: '800ms', opacity: 0, animationFillMode: 'forwards' }}>
            {/* Primary Button: Read Magazine */}
            <Link
              href="/read"
              onClick={(e) => {
                e.preventDefault();
                handleLaunchReader(1);
              }}
              style={{
                backgroundColor: btnBgColor,
                boxShadow: `0 4px 20px rgba(255, 77, 0, ${0.12 + revealProgress * 0.32})`,
              }}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-white font-space font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>READ MAGAZINE</span>
            </Link>

            {/* Secondary Button: Download PDF */}
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="PRISMA_3.0_CSE_KGEC.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-transparent hover:bg-black/[0.03] border border-[#C8BCAB] hover:border-[#FF4D00] text-[#222222] font-space font-semibold text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#222222]" />
                <span>Download PDF</span>
              </a>
            )}
          </div>

        </div>

        {/* ===================================================================== */}
        {/* RIGHT ARTWORK: Sized Proximity Matching Reference Image              */}
        {/* ===================================================================== */}
        <div className="absolute inset-0 lg:left-auto lg:right-0 lg:bottom-0 lg:top-0 w-full h-full lg:w-[60%] xl:w-[62%] flex items-end justify-center pointer-events-none z-0 lg:z-10 overflow-hidden sm:overflow-visible">
          
          {/* ------------------------------------------------------------------- */}
          {/* TOP RIGHT: Pillar Typography (Color transforming on scroll)         */}
          {/* ------------------------------------------------------------------- */}
          <div className="absolute top-20 sm:top-2 lg:top-3 right-4 sm:right-10 lg:right-14 xl:right-16 z-20 text-right select-none pointer-events-auto animate-fade-in-up" style={{ animationDelay: '1000ms', opacity: 0, animationFillMode: 'forwards' }}>
            <div
              className="text-[7px] sm:text-[11px] lg:text-[12px] font-space font-bold tracking-[0.2em] sm:tracking-[0.28em] uppercase space-y-0.5 sm:space-y-1 transition-colors duration-200"
              style={{ color: pillarsTextColor }}
            >
              <div>INNOVATION</div>
              <div>LEADERSHIP</div>
              <div>INCLUSION</div>
              <div>IMPACT</div>
            </div>
            <div
              className="w-6 sm:w-12 h-[1.5px] sm:h-[2px] ml-auto mt-1 sm:mt-2 rounded-full animate-slide-in-right transition-colors duration-200"
              style={{ animationDelay: '1200ms', opacity: 0, animationFillMode: 'forwards', backgroundColor: pillarsBarColor }}
            />
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* SVG VECTOR LINES, SOLAR DISK & ELECTRIC CURRENTS                    */}
          {/* ------------------------------------------------------------------- */}
          <svg
            viewBox="0 0 1000 800"
            className="absolute -bottom-[2%] left-[48%] -translate-x-1/2 w-[135%] h-auto sm:left-0 sm:translate-x-0 sm:-translate-y-20 sm:bottom-auto sm:inset-0 sm:w-full sm:h-full sm:scale-[1.05] pointer-events-none z-0 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Solar Radial Gradient for Warm Orange Core (Blooms on scroll) */}
              <radialGradient id="solarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6600" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#FF4D00" stopOpacity="0.88" />
                <stop offset="92%" stopColor="#E64000" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#E64000" stopOpacity="0.1" />
              </radialGradient>

              {/* Architectural Blueprint Base Gradient for Sun at 0% scroll */}
              <radialGradient id="solarGlowBlueprint" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D8D2C4" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#C8C0B0" stopOpacity="0.4" />
                <stop offset="92%" stopColor="#B6AD9C" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#A89F8D" stopOpacity="0.05" />
              </radialGradient>

              {/* Stipple Grain Dot Pattern */}
              <pattern id="stippleDots" width="5" height="5" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.8" fill="#E23C00" opacity="0.6" />
                <circle cx="4" cy="4" r="0.7" fill="#d55c20ff" opacity="0.7" />
                <circle cx="1.5" cy="4" r="0.5" fill="#D93500" opacity="0.45" />
                <circle cx="4" cy="1.5" r="0.6" fill="#FF6B1A" opacity="0.5" />
              </pattern>

              {/* Electric Current Glowing Filter */}
              <filter id="electricCurrentGlow" x="-0%" y="-0%" width="106%" height="106%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Main Sun Disk (Colour transformation from blueprint draft to glowing solar star) */}
            <g transform="translate(595, 345)">
              {/* Blueprint Base Sun Disk (Visible in initial state, fades gently as solar core rises) */}
              <circle
                cx="0"
                cy="0"
                r="200"
                fill="url(#solarGlowBlueprint)"
                stroke={sunStrokeColor}
                strokeWidth="1.2"
                opacity={Math.max(0.12, 1 - revealProgress * 0.88)}
              />

              {/* Radiant Fiery Orange Solar Disk (Blooms into brilliance on scroll) */}
              <circle
                cx="0"
                cy="0"
                r="200"
                fill="url(#solarGlow)"
                opacity={revealProgress}
                style={{ willChange: 'opacity' }}
              />

              {/* Stipple Grain Dot Texture (Ignites with ember warmth on scroll) */}
              <circle
                cx="0"
                cy="0"
                r="200"
                fill="url(#stippleDots)"
                opacity={0.12 + revealProgress * 0.88}
              />
              
              {/* Radiating Ticks along Sun Perimeter (Transitions from blueprint gray to flame orange) */}
              <line x1="200" y1="0" x2="218" y2="0" stroke={sunStrokeColor} strokeWidth={1.0 + revealProgress * 0.3} />
              <line x1="0" y1="-200" x2="0" y2="-218" stroke={sunStrokeColor} strokeWidth={1.0 + revealProgress * 0.3} />
              <line x1="0" y1="200" x2="0" y2="218" stroke={sunStrokeColor} strokeWidth={1.0 + revealProgress * 0.3} />
              <line x1="141" y1="-141" x2="155" y2="-155" stroke={sunStrokeColor} strokeWidth={0.9 + revealProgress * 0.3} />
              <line x1="141" y1="141" x2="155" y2="155" stroke={sunStrokeColor} strokeWidth={0.9 + revealProgress * 0.3} />
            </g>

            {/* 2. Blueprint Ring 1 (Displaced Left around Human Hair) */}
            <g transform="translate(470, 335)">
              <circle cx="0" cy="0" r="235" stroke={sunStrokeColor} strokeWidth="1.2" opacity={0.55 + revealProgress * 0.35} />
              <circle cx="-235" cy="0" r="3.5" fill={sunStrokeColor} />
              <line x1="-235" y1="0" x2="-252" y2="0" stroke={sunStrokeColor} strokeWidth="1.3" />
              <line x1="0" y1="-235" x2="0" y2="-252" stroke={sunStrokeColor} strokeWidth="1.3" />
              <line x1="-166" y1="-166" x2="-180" y2="-180" stroke={sunStrokeColor} strokeWidth="1" />
            </g>

            {/* 3. Blueprint Ring 2 (Dashed Astrolabe Circle, Displaced Center-Mid) */}
            <g transform="translate(525, 355)">
              <circle cx="0" cy="0" r="275" stroke={sunStrokeColor} strokeWidth="0.9" strokeDasharray="7 5" opacity={0.45 + revealProgress * 0.35} />
              <line x1="0" y1="-275" x2="0" y2="-290" stroke={sunStrokeColor} strokeWidth="1.2" />
              <circle cx="0" cy="-275" r="3" fill={sunStrokeColor} />
            </g>

            {/* 4. Blueprint Ring 3 (Outer Wide Horizon Ring, Displaced Lower-Right) */}
            <g transform="translate(550, 370)">
              <circle cx="0" cy="0" r="325" stroke={sunStrokeColor} strokeWidth="0.55" strokeDasharray="4 8" opacity={0.3 + revealProgress * 0.25} />
            </g>

            {/* 5. Inner Calibration Ring (Displaced Upper-Left) */}
            <g transform="translate(505, 320)">
              <circle cx="0" cy="0" r="160" stroke={sunStrokeColor} strokeWidth="0.75" strokeDasharray="2 6" opacity={0.32 + revealProgress * 0.28} />
            </g>

            {/* --------------------------------------------------------------- */}
            {/* CIRCUIT TRACES (Transforming from Blueprint Lines to Electric)   */}
            {/* --------------------------------------------------------------- */}

            {/* Branch 1: Upper Left (Connecting from Left Hair Ring towards Left Column) */}
            <g stroke={circuitTraceColor} strokeWidth="1.1" fill="none">
              <path d="M 235 335 H 175 L 140 270 V 160 H 90" />
              <circle cx="90" cy="160" r="4" fill={circuitTraceColor} />
              <circle cx="175" cy="335" r="3" fill={circuitTraceColor} />
              <rect x="137" y="267" width="6.5" height="6.5" fill={circuitTraceColor} />

              {/* Electric Current Stream Flow (Surges on scroll) */}
              <path
                d="M 235 335 H 175 L 140 270 V 160 H 90"
                pathLength={100}
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-1"
                opacity={revealProgress * 0.95}
              />
              <path
                d="M 235 335 H 175 L 140 270 V 160 H 90"
                pathLength={100}
                stroke={circuitTraceColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-1"
                opacity={revealProgress * 0.8}
              />
              {/* Terminal Capacitor Spark Node */}
              <circle cx="90" cy="160" r="4" fill="#FFFFFF" filter="url(#electricCurrentGlow)" className="animate-spark-1" opacity={revealProgress} />
            </g>

            {/* Branch 2: Lower Left (Horizontal line with 45-deg drop) */}
            <g stroke={circuitTraceColor} strokeWidth="1.1" fill="none">
              <path d="M 310 540 H 160 L 120 585 H 60" />
              <circle cx="60" cy="585" r="4" fill={circuitTraceColor} />
              <circle cx="160" cy="540" r="3" fill={circuitTraceColor} />
              <line x1="240" y1="530" x2="240" y2="550" strokeWidth="1.6" />

              {/* Electric Current Stream Flow */}
              <path
                d="M 310 540 H 160 L 120 585 H 60"
                pathLength={100}
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-2"
                opacity={revealProgress * 0.95}
              />
              <path
                d="M 310 540 H 160 L 120 585 H 60"
                pathLength={100}
                stroke={circuitTraceColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-2"
                opacity={revealProgress * 0.8}
              />
              {/* Terminal Capacitor Spark Node */}
              <circle cx="60" cy="585" r="4" fill="#FFFFFF" filter="url(#electricCurrentGlow)" className="animate-spark-2" opacity={revealProgress} />
            </g>

            {/* Branch 3: Top Right (Leading to Innovation Pillar & Foliage) */}
            <g stroke={circuitTraceColor} strokeWidth="1.1" fill="none">
              <path d="M 720 220 L 775 165 V 95 H 850" />
              <circle cx="850" cy="95" r="4" fill={circuitTraceColor} />
              <circle cx="775" cy="165" r="3" fill={circuitTraceColor} />
              
              {/* Secondary Parallel Trace */}
              <path d="M 750 250 L 805 195 V 135 H 870" strokeWidth="0.85" />
              <rect x="867" y="132" width="6.5" height="6.5" fill={circuitTraceColor} />

              {/* Electric Current Stream Flow */}
              <path
                d="M 720 220 L 775 165 V 95 H 850"
                pathLength={100}
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-3"
                opacity={revealProgress * 0.95}
              />
              <path
                d="M 720 220 L 775 165 V 95 H 850"
                pathLength={100}
                stroke={circuitTraceColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-3"
                opacity={revealProgress * 0.8}
              />
              {/* Terminal Capacitor Spark Node */}
              <circle cx="850" cy="95" r="4" fill="#FFFFFF" filter="url(#electricCurrentGlow)" className="animate-spark-1" opacity={revealProgress} />
            </g>

            {/* Branch 4: Lower Right (Connecting into Wireframe Head & BR Design) */}
            <g stroke={circuitTraceColor} strokeWidth="1.1" fill="none">
              <path d="M 750 440 L 810 500 V 630" />
              <circle cx="810" cy="500" r="3.5" fill={circuitTraceColor} />
              <circle cx="810" cy="630" r="4" fill={circuitTraceColor} />

              {/* Electric Current Stream Flow */}
              <path
                d="M 750 440 L 810 500 V 630"
                pathLength={100}
                stroke="#FFFFFF"
                strokeWidth="2.4"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-4"
                opacity={revealProgress * 0.95}
              />
              <path
                d="M 750 440 L 810 500 V 630"
                pathLength={100}
                stroke={circuitTraceColor}
                strokeWidth="3.6"
                strokeLinecap="round"
                filter="url(#electricCurrentGlow)"
                className="animate-current-branch-4"
                opacity={revealProgress * 0.8}
              />
              {/* Terminal Capacitor Spark Node */}
              <circle cx="810" cy="630" r="4" fill="#FFFFFF" filter="url(#electricCurrentGlow)" className="animate-spark-2" opacity={revealProgress} />
            </g>

            {/* Precision Target Crosshairs (+) */}
            <g transform="translate(160, 260)" stroke={sunStrokeColor} strokeWidth="0.9">
              <line x1="-6" y1="0" x2="6" y2="0" />
              <line x1="0" y1="-6" x2="0" y2="6" />
              <circle cx="0" cy="0" r="1.5" fill={sunStrokeColor} />
            </g>
            <g transform="translate(835, 330)" stroke={sunStrokeColor} strokeWidth="0.9">
              <line x1="-6" y1="0" x2="6" y2="0" />
              <line x1="0" y1="-6" x2="0" y2="6" />
              <circle cx="0" cy="0" r="1.5" fill={sunStrokeColor} />
            </g>
          </svg>

          {/* ------------------------------------------------------------------- */}
          {/* CENTERPIECE: Woman Artwork (Architectural Sketch-to-Render Reveal)  */}
          {/* ------------------------------------------------------------------- */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[110vw] xs:w-[105vw] sm:w-[85vw] md:w-full max-w-[500px] sm:max-w-[580px] md:max-w-[680px] lg:max-w-[780px] xl:max-w-[850px] 2xl:max-w-[920px] flex items-end justify-center pointer-events-none sm:pointer-events-auto overflow-visible origin-bottom scale-[1.0] sm:scale-100">
            <div className="relative w-full h-auto">
              {/* 1. Underlying Base Layer: Architectural Blueprint Line Sketch (Visible at 0% scroll) */}
              <img
                src="/woman_sketch_fine.png"
                alt="PRISMA 3.0 Renaissance Cyborg Woman Blueprint Sketch"
                className="relative z-10 w-full h-auto object-contain object-bottom drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] select-none pointer-events-none"
                draggable={false}
              />

              {/* 2. Top Revealed Layer: Photorealistic Color Render with Displacement Filter Mask (Heron AI ink mask, NO dark overlay line) */}
              {revealProgress > 0.001 && (
                <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-visible">
                  <svg
                    viewBox="0 0 577 418"
                    className="w-full h-full object-contain object-bottom pointer-events-none select-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.14)]"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <filter id="sharedDisplacementFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.045 0.055"
                          numOctaves={4}
                          seed={5}
                          result="noise"
                        />
                        <feDisplacementMap
                          in="SourceGraphic"
                          in2="noise"
                          scale={55}
                          xChannelSelector="R"
                          yChannelSelector="G"
                          result="displaced"
                        />
                        <feGaussianBlur in="displaced" stdDeviation="1.6" result="blurred" />
                        <feComponentTransfer in="blurred" result="contrast">
                          <feFuncA type="linear" slope="2.2" intercept="-0.6" />
                        </feComponentTransfer>
                      </filter>

                      <mask id="womanInkMask" maskContentUnits="userSpaceOnUse" x="-80" y="-80" width="750" height="600">
                        <path
                          fill="#FFFFFF"
                          style={{ filter: 'url(#sharedDisplacementFilter)' }}
                          d={svgMaskPath}
                        />
                      </mask>
                    </defs>

                    <image
                      href="/Face_woman_prisma-removebg-preview.png"
                      x="0"
                      y="0"
                      width="577"
                      height="418"
                      mask="url(#womanInkMask)"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* BOTTOM RIGHT (BR): Wireframe Head Upward + Bottom Space Quote       */}
          {/* ------------------------------------------------------------------- */}
          
          {/* 1. Wireframe Head & Foliage Drawing (Shifted slightly down) */}
          <div className="absolute right-0 sm:right-2 lg:right-4 top-[24%] sm:top-[20%] lg:top-[22%] z-0 w-[85px] xs:w-[100px] sm:w-[165px] lg:w-[195px] xl:w-[220px] aspect-[326/582] opacity-85 pointer-events-auto animate-floating">
            <Image
              src="/br_design_tight.png"
              alt="Wireframe Head and Circuit Graphics"
              fill
              className="object-contain object-top"
            />
          </div>

          {/* 2. Downside Editorial Quote at the Bottom Space (Color transforming on scroll) */}
          <div className="absolute right-0 sm:right-5 lg:right-7 bottom-2 sm:bottom-6 lg:bottom-8 z-30 max-w-[85px] xs:max-w-[105px] sm:max-w-[125px] lg:max-w-[140px] text-right pointer-events-auto select-none animate-fade-in-up" style={{ animationDelay: '1400ms', opacity: 0, animationFillMode: 'forwards' }}>
            <p
              className="font-serif-italic text-[8.5px] xs:text-[10px] sm:text-[12.5px] lg:text-[13.5px] italic leading-[1.24] tracking-tight font-medium transition-colors duration-200"
              style={{ color: quoteTextColor }}
            >
              Not just<br />
              the software<br />
              you build,<br />
              <span
                className="font-semibold transition-colors duration-200"
                style={{ color: taglineAlgoColor }}
              >
                the intellect
              </span><br />
              behind it.
            </p>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SEAMLESS BLUR & GRADIENT FEATHER TO SECOND SECTION                        */}
      {/* ========================================================================= */}
      <div className="absolute -bottom-1 left-0 right-0 h-28 sm:h-36 lg:h-44 pointer-events-none z-20 select-none overflow-hidden">
        {/* Soft directional backdrop blur to dissolve the bottom cut of the artwork */}
        <div
          className="absolute inset-0 backdrop-blur-[8px] sm:backdrop-blur-[14px]"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, black 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 30%, black 85%)',
          }}
        />
        {/* Gradient fade to #F1EDE2 matching section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F1EDE2]/60 to-[#F1EDE2]" />
      </div>

    </section>
  );
};

export default Hero;
