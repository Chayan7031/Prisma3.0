'use client';

import React, { useMemo, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import { pages as contentPages } from '@/content/content';
import Book3DViewer, { PageData } from './Book3DViewer';
import RibbonTorus from '../RibbonTorus';

// Generate magazine sheets from pages with back cover
export function buildMagazineShowcasePages(): PageData[] {
  const frontCover =
    contentPages.cover ||
    'https://res.cloudinary.com/daybrhbsc/image/upload/f_auto,q_auto,w_1000/v1790614624/prisma_magazine_cover_page.jpg';

  const backCover = contentPages.backCover || '/prisma_backcover.png';

  // Inside content pages from Cloudinary
  const contentList: string[] = [];
  for (let i = 1; i <= 16; i++) {
    const key = `Page${i}` as keyof typeof contentPages;
    const rawUrl = contentPages[key];
    if (rawUrl && typeof rawUrl === 'string') {
      const optimized = rawUrl.includes('/image/upload/')
        ? rawUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_800/')
        : rawUrl;
      contentList.push(optimized);
    } else {
      contentList.push(
        i % 2 === 0
          ? '/textures/prisma_content_page-0020.jpg'
          : '/textures/prisma_content_page-0021.jpg'
      );
    }
  }

  const sheets: PageData[] = [
    {
      front: frontCover,
      back: contentList[0],
    },
  ];

  for (let i = 1; i < contentList.length - 1; i += 2) {
    sheets.push({
      front: contentList[i],
      back: contentList[i + 1],
    });
  }

  // Last sheet contains final inside page on front, and custom Back Cover on back
  sheets.push({
    front: contentList[contentList.length - 1],
    back: backCover,
  });

  return sheets;
}

export type { PageData };

export interface MagazineShowcaseProps {
  onOpenReader?: (page?: number) => void;
  pdfUrl?: string;
  className?: string;
  hideCta?: boolean;
}

export const MagazineShowcase: React.FC<MagazineShowcaseProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
  className = '',
  hideCta,
}) => {
  const router = useRouter();
  const pages = useMemo(() => buildMagazineShowcasePages(), []);
  const editorialBlockRef = useRef<HTMLDivElement>(null);
  const [isBlockInView, setIsBlockInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsBlockInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (editorialBlockRef.current) {
      observer.observe(editorialBlockRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigateToRead = (page: number = 1) => {
    if (onOpenReader) {
      onOpenReader(page);
    } else {
      router.push(`/read${page > 1 ? `?page=${page}` : ''}`);
    }
  };

  const handleExploreSections = () => {
    const target = document.getElementById('previous-magazines');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (onOpenReader) {
      onOpenReader(1);
    } else {
      router.push('/read');
    }
  };

  const isTransparent = className.includes('bg-transparent');

  return (
    <section
      className={`relative w-full text-[#161121] overflow-hidden select-none font-space ${isTransparent ? 'bg-transparent' : 'bg-[#F1EDE2]'
        } ${className}`}
      id="magazine-showcase-section"
    >
      {!isTransparent && (
        <>
          {/* Subtle Vintage Archival Lighting */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_35%,rgba(255,255,255,0.7)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(190,149,62,0.12)_0%,transparent_55%)]" />
          </div>

          {/* Architectural Blueprint Grid Lines matching Hero aesthetic */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(145, 115, 68, 0.14) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(145, 115, 68, 0.10) 1px, transparent 1px)
                `,
                backgroundSize: '120px 120px',
              }}
            />
          </div>

          {/* 1. Flying Butterflies & Swallows (page-bg-butterfly) - Upper Left & Right */}
          <div className="absolute top-[73%] left-[2%] sm:left-[5%] lg:left-[7%] w-[160px] sm:w-[210px] lg:w-[250px] aspect-square opacity-85 mix-blend-multiply pointer-events-none select-none z-10 animate-floating">
            <Image
              src="/page-bg-butterfly.png"
              alt="Butterflies Decor"
              fill
              sizes="(max-width: 768px) 180px, 250px"
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block absolute top-[2%] right-[4%] lg:right-[33%] w-[140px] sm:w-[180px] lg:w-[220px] aspect-square opacity-75 mix-blend-multiply pointer-events-none select-none z-10 -rotate-12">
            <Image
              src="/page-bg-butterfly.png"
              alt="Butterflies Decor"
              fill
              sizes="(max-width: 768px) 160px, 220px"
              className="object-contain"
            />
          </div>

          {/* 2. Celestial Earth/Moon with Orbit Trails & 'A SMARTER TOMORROW' (page-bg-earth) - Lower Left */}
          <div className="absolute -bottom-4 top-[2%] left-[2%] sm:left-[4%] lg:left-[6%] w-[180px] sm:w-[220px] lg:w-[260px] aspect-square opacity-80 lg:opacity-90 mix-blend-multiply pointer-events-none select-none z-10">
            <Image
              src="/page-bg-earth-removebg.png"
              alt="A Smarter Tomorrow Earth Decor"
              fill
              sizes="(max-width: 768px) 200px, 260px"
              className="object-contain"
            />
          </div>

          {/* 3. Anatomical Cybernetic Profile Blueprint (page-bg-face) - Right Flank Editorial Backdrop */}
          <div className="absolute top-[10%] sm:top-[8%] right-[0%] sm:right-[2%] lg:right-[3%] w-[220px] sm:w-[280px] lg:w-[350px] xl:w-[390px] h-[300px] sm:h-[380px] lg:h-[460px] opacity-25 lg:opacity-30 mix-blend-multiply pointer-events-none select-none z-0">
            <Image
              src="/page-bg-face.png"
              alt="Cybernetic Anatomical Face Blueprint"
              fill
              sizes="(max-width: 768px) 280px, 390px"
              className="object-contain object-top"
            />
          </div>

          {/* Wireframe Torus Peeking at the Bottom-Right Corner (from reference image) */}
          <div className="absolute -bottom-28 -right-16 sm:-bottom-24 sm:-right-8 w-[280px] sm:w-[360px] lg:w-[420px] h-[280px] sm:h-[360px] lg:h-[420px] opacity-45 pointer-events-none select-none z-0">
            <RibbonTorus speed={0.4} interactive={false} />
          </div>
        </>
      )}

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] xl:max-w-[1560px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-28">

        {/* Two-Column Grid: 3D Magazine Showcase (Left) + Editorial Text (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">

          {/* LEFT COLUMN: 3D Animated Magazine Viewer with Hero Section Woman Background Element */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] overflow-visible">

            {/* 1. Hero Section Solar Halo, Blueprint Rings & Circuit Vectors (Enlarged Monumental Presence) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible">
              {/* Soft Ambient Warmth Diffusion Halo */}
              <div className="absolute w-[480px] sm:w-[580px] lg:w-[680px] h-[480px] sm:h-[580px] lg:h-[680px] rounded-full pointer-events-none opacity-45 blur-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,0,0.25)_0%,rgba(190,149,62,0.14)_50%,transparent_72%)]" />

              <svg
                viewBox="0 0 800 800"
                className="w-[165%] sm:w-[155%] md:w-[145%] lg:w-[140%] max-w-[850px] sm:max-w-[980px] lg:max-w-[1100px] h-auto overflow-visible pointer-events-none scale-110 sm:scale-120 lg:scale-130 transform-gpu"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Solar Radial Gradient for Warm Orange Core (from Hero) */}
                  <radialGradient id="showcaseSolarGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF6600" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#FF4D00" stopOpacity="0.85" />
                    <stop offset="92%" stopColor="#E64000" stopOpacity="0.70" />
                    <stop offset="100%" stopColor="#E64000" stopOpacity="0.08" />
                  </radialGradient>

                  {/* Stipple Grain Dot Pattern (from Hero) */}
                  <pattern id="showcaseStippleDots" width="5" height="5" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="0.8" fill="#E23C00" opacity="0.6" />
                    <circle cx="4" cy="4" r="0.7" fill="#d55c20ff" opacity="0.7" />
                    <circle cx="1.5" cy="4" r="0.5" fill="#D93500" opacity="0.45" />
                    <circle cx="4" cy="1.5" r="0.6" fill="#FF6B1A" opacity="0.5" />
                  </pattern>

                  {/* Electric Current Glowing Filter */}
                  <filter id="showcaseElectricGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="electricCurrentGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Main Solid Orange Stippled Sun Disk */}
                <g transform="translate(400, 400)">
                  <circle cx="0" cy="0" r="175" fill="url(#showcaseSolarGlow)" opacity="0.92" />
                  <circle cx="0" cy="0" r="175" fill="url(#showcaseStippleDots)" />

                  {/* Radiating Ticks along Sun Perimeter */}
                  <line x1="175" y1="0" x2="192" y2="0" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="-175" y1="0" x2="-192" y2="0" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="0" y1="-175" x2="0" y2="-192" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="0" y1="175" x2="0" y2="192" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="124" y1="-124" x2="136" y2="-136" stroke="#FF4D00" strokeWidth="1.1" />
                  <line x1="124" y1="124" x2="136" y2="136" stroke="#FF4D00" strokeWidth="1.1" />
                  <line x1="-124" y1="-124" x2="-136" y2="-136" stroke="#FF4D00" strokeWidth="1.1" />
                  <line x1="-124" y1="124" x2="-136" y2="136" stroke="#FF4D00" strokeWidth="1.1" />
                </g>

                {/* Blueprint Ring 1 */}
                <g transform="translate(375, 390)">
                  <circle cx="0" cy="0" r="215" stroke="#FF4D00" strokeWidth="1.2" opacity="0.8" />
                  <circle cx="-215" cy="0" r="3.5" fill="#FF4D00" />
                  <line x1="-215" y1="0" x2="-230" y2="0" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="0" y1="-215" x2="0" y2="-230" stroke="#FF4D00" strokeWidth="1.3" />
                  <line x1="-152" y1="-152" x2="-165" y2="-165" stroke="#FF4D00" strokeWidth="1" />
                </g>

                {/* Blueprint Ring 2 (Dashed Astrolabe Circle) */}
                <g transform="translate(420, 410)">
                  <circle cx="0" cy="0" r="255" stroke="#FF4D00" strokeWidth="0.9" strokeDasharray="7 5" opacity="0.7" />
                  <line x1="0" y1="-255" x2="0" y2="-270" stroke="#FF4D00" strokeWidth="1.2" />
                  <circle cx="0" cy="-255" r="3" fill="#FF4D00" />
                </g>

                {/* Blueprint Ring 3 (Outer Wide Horizon Ring) */}
                <g transform="translate(430, 420)">
                  <circle cx="0" cy="0" r="300" stroke="#FF4D00" strokeWidth="0.55" strokeDasharray="4 8" opacity="0.4" />
                </g>

                {/* Inner Calibration Ring */}
                <g transform="translate(390, 380)">
                  <circle cx="0" cy="0" r="145" stroke="#FF4D00" strokeWidth="0.75" strokeDasharray="2 6" opacity="0.45" />
                </g>

                {/* ------------------------------------------------------------- */}
                {/* BRANCH 3 (TOP-RIGHT) - MATCHING USER IMAGE 1 WITH FLOW ANIMATION */}
                {/* ------------------------------------------------------------- */}
                <g stroke="#ff5900ff" strokeWidth="1.2" fill="none">
                  {/* Primary Trace Path */}
                  <path d="M 520 280 L 575 220 V 140 H 660" />
                  {/* Hollow Circle Terminal Node */}
                  <circle cx="660" cy="140" r="4.5" stroke="#ff5900ff" strokeWidth="1.8" fill="#F1EDE2" />
                  {/* Middle Dot Node */}
                  <circle cx="575" cy="220" r="3.2" fill="#ff5900ff" />

                  {/* Secondary Parallel Trace */}
                  <path d="M 545 300 L 600 240 V 170 H 685" strokeWidth="0.9" />
                  {/* Square Node */}
                  <rect x="681.5" y="166.5" width="7" height="7" fill="#ff5900ff" />

                  {/* Electric Current Stream Flow */}
                  <path
                    d="M 520 280 L 575 220 V 140 H 660"
                    pathLength={100}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-3"
                  />
                  <path
                    d="M 520 280 L 575 220 V 140 H 660"
                    pathLength={100}
                    stroke="#ff5900ff"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-3"
                    opacity="0.85"
                  />
                  {/* Terminal Capacitor Spark Node */}
                  <circle
                    cx="660"
                    cy="140"
                    r="4.5"
                    fill="#FFFFFF"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-spark-1"
                  />
                </g>

                {/* ------------------------------------------------------------- */}
                {/* BRANCH 2 (LOWER-LEFT) - MATCHING USER IMAGE 2 WITH FLOW ANIMATION */}
                {/* ------------------------------------------------------------- */}
                <g stroke="#ff5900ff" strokeWidth="1.2" fill="none">
                  {/* Primary Trace Path with 45-deg rise */}
                  <path d="M 330 450 H 220 L 165 510 H 95" />
                  {/* Hollow Circle Terminal Node */}
                  <circle cx="95" cy="510" r="4.5" stroke="#ff5900ff" strokeWidth="1.8" fill="#F1EDE2" />
                  {/* Middle Dot Node */}
                  <circle cx="220" cy="450" r="3.2" fill="#ff5900ff" />
                  {/* Vertical Calibration Tick Mark */}
                  <line x1="270" y1="440" x2="270" y2="460" stroke="#ff5900ff" strokeWidth="1.8" />

                  {/* Electric Current Stream Flow */}
                  <path
                    d="M 330 450 H 220 L 165 510 H 95"
                    pathLength={100}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-2"
                  />
                  <path
                    d="M 330 450 H 220 L 165 510 H 95"
                    pathLength={100}
                    stroke="#ff5900ff"
                    strokeWidth="3.8"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-2"
                    opacity="0.85"
                  />
                  {/* Terminal Capacitor Spark Node */}
                  <circle
                    cx="95"
                    cy="510"
                    r="4.5"
                    fill="#FFFFFF"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-spark-2"
                  />
                </g>

                {/* Branch 1 (Upper Left) with Electric Flow */}
                <g stroke="#ff5900ff" strokeWidth="1.1" fill="none">
                  <path d="M 270 330 H 210 L 175 265 V 170 H 120" />
                  <circle cx="120" cy="170" r="4" fill="#ff5900ff" />
                  <circle cx="210" cy="330" r="3" fill="#ff5900ff" />
                  <rect x="172" y="262" width="6" height="6" fill="#ff5900ff" />

                  <path
                    d="M 270 330 H 210 L 175 265 V 170 H 120"
                    pathLength={100}
                    stroke="#FFFFFF"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-1"
                  />
                  <path
                    d="M 270 330 H 210 L 175 265 V 170 H 120"
                    pathLength={100}
                    stroke="#ff5900ff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    filter="url(#showcaseElectricGlow)"
                    className="animate-current-branch-1"
                    opacity="0.8"
                  />
                  <circle cx="120" cy="170" r="4" fill="#FFFFFF" filter="url(#showcaseElectricGlow)" className="animate-spark-1" />
                </g>

                {/* Precision Target Crosshairs (+) */}
                <g transform="translate(130, 290)" stroke="#FF4D00" strokeWidth="0.9">
                  <line x1="-6" y1="0" x2="6" y2="0" />
                  <line x1="0" y1="-6" x2="0" y2="6" />
                  <circle cx="0" cy="0" r="1.5" fill="#FF4D00" />
                </g>
                <g transform="translate(680, 350)" stroke="#FF4D00" strokeWidth="0.9">
                  <line x1="-6" y1="0" x2="6" y2="0" />
                  <line x1="0" y1="-6" x2="0" y2="6" />
                  <circle cx="0" cy="0" r="1.5" fill="#FF4D00" />
                </g>
              </svg>
            </div>

            {/* 3D WebGL Book Viewport with Showcase Animation */}
            <div className="relative z-10 w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[600px] xl:max-w-[640px] h-[400px] sm:h-[480px] lg:h-[540px] xl:h-[580px]">
              <Book3DViewer
                pages={pages}
                onNavigateToRead={() => handleNavigateToRead(1)}
                title="Click or drag to explore PRISMA 3.0 in 3D"
                showBadge={false}
                glowColor="rgba(255, 77, 0, 0.08)"
                scale={1.05}
                cameraDistance={4.4}
                tiltX={-0.18}
                tiltZ={-0.10}
                spinSpeed={0.75}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Title, Copy & Actions matching Hero UI */}
          <div
            ref={editorialBlockRef}
            className="lg:col-span-6 flex flex-col justify-center lg:pl-6 xl:pl-10 text-left relative z-10"
          >
            {/* Kicker: THE MAGAZINE with Hero Orange Bar */}
            <div
              className={`flex items-center gap-2 mb-3.5 select-none transition-all duration-700 ease-out transform ${
                isBlockInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
            >
              <span className="w-3.5 h-[2.5px] bg-[#FF4D00] inline-block rounded-xs animate-pulse" />
              <span className="text-xs sm:text-sm font-space font-extrabold tracking-[0.28em] uppercase text-[#555555]">
                THE MAGAZINE
              </span>
            </div>

            {/* Monumental Headline: prisma 3.0 in Samarkan Font matching Hero Section */}
            <div
              className={`flex items-baseline gap-2.5 sm:gap-4 leading-none select-none mb-4 sm:mb-6 transition-all duration-800 delay-150 ease-out transform ${
                isBlockInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <h2 className="font-samarkan text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[78px] xl:text-[88px] tracking-wide text-[#161121] lowercase transition-all duration-500 hover:tracking-wider cursor-default">
                prisma
              </h2>
              <span className="font-samarkan text-[3.2rem] xs:text-6xl sm:text-7xl md:text-8xl lg:text-[78px] xl:text-[88px] tracking-tight text-[#BE953E] transition-all duration-500 hover:scale-105 drop-shadow-[0_2px_16px_rgba(190,149,62,0.25)] cursor-default">
                3.0
              </span>
            </div>

            {/* Editorial Description Copy */}
            <div
              className={`relative mb-8 sm:mb-10 max-w-2xl transition-all duration-800 delay-300 ease-out transform ${
                isBlockInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="relative z-10 text-base sm:text-lg lg:text-[19px] xl:text-xl text-[#3A3A3A] leading-relaxed font-space font-normal">
                A celebration of ideas, innovation and the incredible women shaping the future of technology.
                This edition explores how research, intelligence and empathy come together to build a more inclusive
                and innovative tomorrow.
              </p>
            </div>

            {/* Action Buttons with Micro-Animations */}
            {!hideCta && (
              <div
                className={`flex flex-wrap items-center gap-4 sm:gap-5 transition-all duration-800 delay-450 ease-out transform ${
                  isBlockInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {/* Primary CTA: Explore the Sections > */}
                <button
                  onClick={handleExploreSections}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-9 sm:py-4 rounded-xl bg-gradient-to-r from-[#FF4D00] to-[#E64500] hover:from-[#FF5D1A] hover:to-[#FF4D00] text-white text-sm sm:text-base font-space font-bold tracking-wide shadow-[0_4px_16px_rgba(255,77,0,0.28)] hover:shadow-[0_8px_26px_rgba(255,77,0,0.45)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore the Sections</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                    &gt;
                  </span>
                </button>

                {/* Secondary CTA: Download PDF */}
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download="PRISMA_3.0_Magazine.pdf"
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#FAF6EE] hover:bg-white text-[#161121] border border-[#C8BCAB] hover:border-[#FF4D00] text-sm sm:text-base font-space font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98] cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#FF4D00] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default MagazineShowcase;
