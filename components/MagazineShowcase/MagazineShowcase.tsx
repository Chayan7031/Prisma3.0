'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pages as contentPages } from '@/content/content';
import Book3DViewer, { PageData } from './Book3DViewer';
import CrystalStones from './CrystalStones';


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
}

export const MagazineShowcase: React.FC<MagazineShowcaseProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
  className = '',
}) => {
  const router = useRouter();
  const pages = useMemo(() => buildMagazineShowcasePages(), []);

  const handleNavigateToRead = (page: number = 1) => {
    if (onOpenReader) {
      onOpenReader(page);
    } else {
      router.push(`/read${page > 1 ? `?page=${page}` : ''}`);
    }
  };

  const isTransparent = className.includes('bg-transparent');

  return (
    <section
      className={`relative w-full text-[#1E293B] overflow-hidden select-none font-space ${
        isTransparent ? 'bg-transparent' : 'bg-[#E8D3A8]'
      } ${className}`}
      id="magazine-showcase-section"
      style={
        isTransparent
          ? undefined
          : {
              backgroundImage: "url('/textures/parchment_texture.jpg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '400px 400px',
            }
      }
    >
      {!isTransparent && (
        <>
          {/* Vintage Parchment Lighting & Shading */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,248,225,0.45)_0%,transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_85%,rgba(195,168,120,0.25)_0%,transparent_60%)]" />
          </div>

          {/* Background Architectural Blueprint Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(145, 115, 68, 0.20) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(145, 115, 68, 0.20) 1px, transparent 1px)
                `,
                backgroundSize: '160px 160px',
              }}
            />
          </div>
        </>
      )}


      {/* Outer Content Container - Expanded width for wide luxury editorial spread */}
      <div className="relative max-w-[1440px] xl:max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28">
        
        {/* MAIN PRISMA 3.0 SHOWCASE: 3D Animated Book + Magazine Editorial Intro with wider separation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* LEFT COLUMN: 3D Rotating & Opening Book with Prismatic Crystals */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]">
            {/* Soft, Subtle Faceted Crystal Stones */}
            <CrystalStones />

            {/* 3D WebGL Book Canvas Viewport - Enlarged dimensions for more presence */}
            <div className="relative z-10 w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[620px] xl:max-w-[660px] h-[420px] sm:h-[500px] lg:h-[560px] xl:h-[600px]">
              <Book3DViewer
                pages={pages}
                onNavigateToRead={() => handleNavigateToRead(1)}
                title="Click or drag to explore PRISMA 3.0 in 3D"
                showBadge={false}
                glowColor="rgba(224,86,56,0.12)"
                scale={1.16}
                cameraDistance={3.95}
              />

            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Title, Copy, and Active CTAs with generous breathing room */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:pl-8 xl:pl-12 text-left">

            {/* Kicker */}
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-sm sm:text-base font-bold tracking-[0.28em] uppercase text-[#5C4A2E]">
                THE MAGAZINE
              </span>
            </div>

            {/* Main Headline: PRISMA 3.0 */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-7 text-[#0F172A] leading-[1.05]">
              PRISMA <span className="text-[#B36B15]">3.0</span>
            </h2>

            {/* Description Copy with Architectural Isometric Prism Motif */}
            <div className="relative mb-10 max-w-2xl">
              {/* Architectural Prism Motif behind description */}
              <div
                className="absolute -right-16 sm:-right-28 lg:-right-44 xl:-right-56 -top-20 sm:-top-32 lg:-top-44 w-[450px] sm:w-[700px] lg:w-[950px] xl:w-[1000px] pointer-events-none select-none z-0 opacity-30 mix-blend-multiply flex items-center justify-center"
                aria-hidden="true"
              >
                <img
                  src="/showcase/icons/prism.svg"
                  alt=""
                  className="w-full h-auto object-contain"
                />
              </div>

              <p className="relative z-10 text-lg sm:text-xl lg:text-2xl text-[#2E281E] leading-relaxed font-normal">
                A celebration of ideas, innovation and the incredible women shaping the future of technology.
                This edition explores how research, intelligence and empathy come together to build a more inclusive
                and innovative tomorrow.
              </p>
            </div>

            {/* Two Action CTAs */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6">
              {/* Primary CTA: Explore the Sections > (Warm Orange Button) */}
              <button
                onClick={() => handleNavigateToRead(1)}
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 sm:px-11 sm:py-5 rounded-full bg-gradient-to-r from-[#E05638] to-[#D94E28] hover:from-[#EB6345] hover:to-[#E05638] text-white text-base sm:text-lg lg:text-xl font-bold tracking-wide shadow-lg shadow-[#E05638]/25 hover:shadow-xl hover:shadow-[#E05638]/35 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>READ PRISMA 3.0</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                  &gt;
                </span>
              </button>



              {/* Secondary CTA: Download PDF */}
              <a
                href={pdfUrl}
                download="PRISMA_3.0_Magazine.pdf"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-[#FAF0D9]/85 hover:bg-[#FFF6E3] text-[#1E293B] border-2 border-[#BFA575] hover:border-[#967B48] text-base sm:text-lg lg:text-xl font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-[#C58B35]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MagazineShowcase;
