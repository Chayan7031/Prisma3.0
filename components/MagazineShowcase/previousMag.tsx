'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Book3DViewer, { PageData } from './Book3DViewer';


export interface PreviousMagProps {
  onOpenReader?: (edition?: string) => void;
  className?: string;
}

export const PreviousMag: React.FC<PreviousMagProps> = ({
  onOpenReader,
  className = '',
}) => {
  const router = useRouter();

  // 3D Sheets for PRISMA 1.0
  const prisma1Pages: PageData[] = useMemo(
    () => [
      {
        front: '/showcase/previous/prisma1_cover.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/showcase/previous/prisma1_back.webp',
      },
    ],
    []
  );

  // 3D Sheets for PRISMA 2.0
  const prisma2Pages: PageData[] = useMemo(
    () => [
      {
        front: '/showcase/previous/prisma2_cover.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/textures/prisma_content_page-0020.webp',
      },
      {
        front: '/textures/prisma_content_page-0021.webp',
        back: '/showcase/previous/prisma2_back.webp',
      },
    ],
    []
  );

  const handleReadArchive = (edition: string) => {
    if (onOpenReader) {
      onOpenReader(edition);
    } else {
      router.push('/read');
    }
  };

  const isTransparent = className.includes('bg-transparent');

  return (
    <section
      className={`relative w-full text-[#1E293B] overflow-hidden select-none font-space border-none ${
        isTransparent ? 'bg-transparent' : 'bg-[#E8D3A8]'
      } ${className}`}
      id="previous-magazines-section"
      style={
        isTransparent
          ? undefined
          : {
              backgroundImage: "url('/textures/parchment_texture.webp')",
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(195,168,120,0.25)_0%,transparent_60%)]" />
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


      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        {/* Section Header with Background Brain Motif */}
        <div className="relative text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          {/* Background Brain Illustration behind Archive Edition Header */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[620px] pointer-events-none select-none z-0 flex items-center justify-center opacity-30 mix-blend-multiply"
            aria-hidden="true"
          >
            <img
              src="/showcase/icons/design.svg"
              alt=""
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#FAF0D9]/90 border-2 border-[#BFA575] text-[#8C5E1B] text-sm sm:text-base font-bold tracking-[0.24em] uppercase mb-5 shadow-xs backdrop-blur-xs">
              <span>ARCHIVE EDITIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] mb-6">
              PRISMA <span className="text-[#2D6A4F]">1.0</span> &amp; PRISMA <span className="text-[#B36B15]">2.0</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-[#3A2E1A] leading-relaxed">
              Explore the previous two editions published by the KGEC Department of Computer Science &amp; Engineering.
            </p>
          </div>
        </div>

        {/* Exactly 2 Archive Editions: PRISMA 1.0 and PRISMA 2.0 */}
        <div className="relative">
          {/* BACKGROUND MOTIF: 3D Architectural Torus Ring (Centered behind both cards so cropped edges are concealed) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[32%] -translate-y-1/2 w-[700px] sm:w-[960px] lg:w-[1260px] pointer-events-none select-none z-0 flex items-center justify-center opacity-85"
            aria-hidden="true"
          >
            <img
              src="/showcase/icons/ring.svg"
              alt=""
              className="w-full h-auto object-contain"
            />
          </div>

          {/* The 2 Cards Grid in Front */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            
            {/* SECTION 1: PRISMA 1.0 */}
            <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:p-12 rounded-3xl bg-[#F5E5C9]/90 border-2 border-[#CBB383] hover:border-[#2D6A4F] shadow-[0_6px_24px_rgba(110,85,45,0.09)] hover:shadow-[0_12px_36px_rgba(110,85,45,0.16)] transition-all duration-300">
              {/* Top Tag & Edition Year */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-[#1B4332] text-[#95D5B2] text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xs">
                  VOLUME I • 2023
                </span>
                <span className="text-sm font-mono text-[#5C4B33] font-semibold tracking-wider">
                  INAUGURAL PRINT
                </span>
              </div>

              {/* 3D WebGL Rotating & Opening Book Viewer */}
              <div className="relative w-full h-[360px] sm:h-[420px] my-4 flex items-center justify-center">
                <div className="w-full h-full max-w-[380px]">
                  <Book3DViewer
                    pages={prisma1Pages}
                    onNavigateToRead={() => handleReadArchive('1.0')}
                    title="Click to Read PRISMA 1.0 Archive"
                    showBadge={false}
                    spinSpeed={0.80}
                    glowColor="rgba(27,67,50,0.18)"
                  />
                </div>
              </div>

              {/* Editorial Content & Details */}
              <div className="mt-4">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] mb-2 tracking-tight">
                  PRISMA <span className="text-[#2D6A4F]">1.0</span>
                </h3>
                <p className="text-base sm:text-lg font-bold text-[#2D6A4F] tracking-wide uppercase mb-3">
                  The Inaugural Edition
                </p>
                <p className="text-base sm:text-lg text-[#2E2516] leading-relaxed mb-8">
                  The foundational release celebrating the inception of PRISMA, chronicling student research breakthroughs, alumni trajectories, and departmental milestones.
                </p>

                {/* Active Action CTAs */}
                <div className="flex flex-row items-center gap-3 sm:gap-4 flex-nowrap">
                  <button
                    onClick={() => handleReadArchive('1.0')}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm sm:text-base font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Read Volume I</span>
                    <span className="font-bold">&gt;</span>
                  </button>

                  <a
                    href="/prisma_content.pdf"
                    download="PRISMA_1.0_Archive.pdf"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-[#FAF0D9] hover:bg-[#FFF6E3] text-[#0F172A] border-2 border-[#BFA575] hover:border-[#8C6830] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D6A4F]"
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

            {/* SECTION 2: PRISMA 2.0 */}
            <div className="relative flex flex-col justify-between p-7 sm:p-9 lg:p-12 rounded-3xl bg-[#F5E5C9]/90 border-2 border-[#CBB383] hover:border-[#B36B15] shadow-[0_6px_24px_rgba(110,85,45,0.09)] hover:shadow-[0_12px_36px_rgba(110,85,45,0.16)] transition-all duration-300">
              {/* Top Tag & Edition Year */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-[#112240] text-[#64FFDA] text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xs">
                  VOLUME II • 2024
                </span>
                <span className="text-sm font-mono text-[#5C4B33] font-semibold tracking-wider">
                  ANNUAL JOURNAL
                </span>
              </div>

            {/* 3D WebGL Rotating & Opening Book Viewer */}
            <div className="relative w-full h-[360px] sm:h-[420px] my-4 flex items-center justify-center">
              <div className="w-full h-full max-w-[380px]">
                <Book3DViewer
                  pages={prisma2Pages}
                  onNavigateToRead={() => handleReadArchive('2.0')}
                  title="Click to Read PRISMA 2.0 Archive"
                  showBadge={false}
                  spinSpeed={0.80}
                  glowColor="rgba(17,34,64,0.18)"
                />
              </div>
            </div>

            {/* Editorial Content & Details */}
            <div className="mt-4">
              <div className="mb-3">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] mb-2 tracking-tight">
                  PRISMA <span className="text-[#B36B15]">2.0</span>
                </h3>
                <p className="text-base sm:text-lg font-bold text-[#8C5E1B] tracking-wide uppercase">
                  Genesis of Intelligence
                </p>
              </div>
              <p className="text-base sm:text-lg text-[#2E2516] leading-relaxed mb-8">
                A deep dive into neural architectures, distributed intelligence, and the collaborative intersection between human creativity and autonomous systems.
              </p>

              {/* Active Action CTAs */}
              <div className="flex flex-row items-center gap-3 sm:gap-4 flex-nowrap">
                <button
                  onClick={() => handleReadArchive('2.0')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-7 sm:py-4 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm sm:text-base font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Read Volume 2</span>
                  <span className="font-bold">&gt;</span>
                </button>

                <a
                  href="/prisma_content.pdf"
                  download="PRISMA_2.0_Archive.pdf"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:px-6 sm:py-4 rounded-full bg-[#FAF0D9] hover:bg-[#FFF6E3] text-[#0F172A] border-2 border-[#BFA575] hover:border-[#8C6830] text-sm sm:text-base font-bold tracking-wide shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#C58B35]"
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

        </div>

        {/* EDITORIAL BOTTOM BAR */}
        <div className="relative z-10 pt-14 mt-16 border-t-2 border-[#DDD6C6]/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm sm:text-base text-[#64748B]">
          <div className="font-extrabold tracking-widest uppercase text-[#0F172A] text-sm sm:text-base">
            KGEC CSE DEPARTMENT
          </div>

          <div className="font-mono tracking-[0.24em] uppercase text-[#475569] text-center text-xs sm:text-sm">
            CODE &nbsp;/&nbsp; CREATE &nbsp;/&nbsp; CONNECT
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F172A] transition-colors p-1"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F172A] transition-colors p-1"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0F172A] transition-colors p-1"
              title="YouTube"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <span className="text-[#94A3B8] font-bold">/</span>
            <span className="font-extrabold tracking-wider text-[#0F172A] text-sm sm:text-base">PRISMA 3.0</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviousMag;
