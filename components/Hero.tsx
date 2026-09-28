'use client';

import React from 'react';
import Image from 'next/image';

export interface HeroProps {
  onOpenReader: (page?: number) => void;
  pdfUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
}) => {
  return (
    <section className="relative w-full min-h-screen bg-[#0e0c0a] text-[#f6f3eb] flex items-center justify-center px-6 py-12 md:px-12 lg:px-20 overflow-x-hidden font-sans select-none">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm amber radial glow focused behind the book on the right */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(197,155,109,0.18)_0%,rgba(197,155,109,0.05)_45%,transparent_70%)] blur-2xl" />
        {/* Soft subtle glow on top left */}
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(160,110,60,0.08)_0%,transparent_65%)] blur-3xl" />
        {/* Subtle grid or vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,8,6,0.6)_100%)]" />
      </div>

      {/* Top Bar with College Branding and Optional Replay */}
      <header className="absolute top-6 left-6 right-6 md:left-12 md:right-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#c59b6d]/15 border border-[#c59b6d]/30 flex items-center justify-center text-[#c59b6d] text-xs font-serif font-bold">
            P
          </div>
          <span className="text-sm tracking-widest uppercase font-serif font-semibold text-[#c5beaf]">
            PRISMA <span className="text-[#c59b6d] font-light">3.0</span>
          </span>
        </div>

      </header>

      {/* Main Showcase Layout: 2 Columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12 lg:pt-0">
        
        {/* LEFT COLUMN: Magazine Details, Headlines, CTAs & Stats */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7 animate-fade-in-up">
          
          {/* Top Pill Badge */}
          <div className="flex flex-col items-start gap-2.5">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#1b1713] border border-[#c59b6d]/35 text-[#c59b6d] text-xs font-semibold tracking-[0.22em] uppercase shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Kalyani Government Engineering College • CSE
            </div>
            
            {/* Small decorative ornament */}
            <div className="flex items-center gap-2 pl-2 text-[#c59b6d]/50 text-xs">
              <span className="w-4 h-[1px] bg-[#c59b6d]/35" />
              <span className="text-[10px]">✦</span>
              <span className="w-4 h-[1px] bg-[#c59b6d]/35" />
            </div>
          </div>

          {/* Main Title Heading */}
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f6f3eb] font-sans leading-[1.08]">
              Departmental
            </h1>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#c59b6d] font-sans leading-[1.08]">
              PRISMA 3.0
            </h2>
          </div>

          {/* Description Paragraph */}
          <p className="text-[#a59c8e] text-base md:text-lg leading-relaxed max-w-xl font-normal">
            The annual departmental magazine of{' '}
            <strong className="text-[#f6f3eb] font-semibold">
              Computer Science & Engineering
            </strong>
            . Read articles, faculty insights, creative expressions, and department
            achievements with authentic 3D page flip physics on desktop and mobile.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary CTA: Open Interactive Reader */}
            <button
              type="button"
              onClick={() => onOpenReader(1)}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c59b6d] via-[#d4a373] to-[#b38555] text-[#141210] font-semibold text-base tracking-wide shadow-[0_4px_25px_rgba(197,155,109,0.35)] hover:shadow-[0_6px_35px_rgba(197,155,109,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:rotate-6"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>Open Interactive Reader</span>
            </button>

            {/* Secondary CTA: Download PDF */}
            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1b1713]/90 hover:bg-[#25201b] border border-white/10 hover:border-[#c59b6d]/40 text-[#e4dfd5] font-medium text-base tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-[0_2px_15px_rgba(0,0,0,0.4)]"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#c59b6d]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF (20MB)</span>
              </a>
            )}
          </div>

          {/* Stats Metrics Row */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 pt-6 border-t border-[#c59b6d]/15 w-full max-w-lg">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#f6f3eb] font-sans">
                21
              </div>
              <div className="text-[11px] sm:text-xs tracking-[0.2em] font-semibold text-[#8c8273] uppercase mt-1">
                Full Pages
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#f6f3eb] font-sans">
                3D
              </div>
              <div className="text-[11px] sm:text-xs tracking-[0.2em] font-semibold text-[#8c8273] uppercase mt-1">
                Flip Physics
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#f6f3eb] font-sans">
                100%
              </div>
              <div className="text-[11px] sm:text-xs tracking-[0.2em] font-semibold text-[#8c8273] uppercase mt-1">
                Mobile Ready
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic 3D Magazine Cover Preview */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end animate-fade-in-up">
          <div
            className="group relative w-full max-w-[380px] sm:max-w-[420px] aspect-[1/1.414] rounded-2xl cursor-pointer perspective-[1200px]"
            onClick={() => onOpenReader(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onOpenReader(1);
              }
            }}
            aria-label="Open Magazine flipbook from Front Cover"
          >
            {/* Ambient Behind-Book Glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#c59b6d]/25 via-amber-500/10 to-transparent blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* 3D Realistic Card Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#f7f4ee] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_5px_15px_rgba(0,0,0,0.4)] transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
              
              {/* Front Page Magazine Cover (Page 0001) */}
              <Image
                src="/prisma_content_page-0001.jpg"
                alt="PRISMA 3.0 Magazine Front Cover Preview"
                fill
                priority
                className="object-cover object-top select-none pointer-events-none"
              />

              {/* Realistic subtle book spine gradient crease on left */}
              <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/25 via-black/08 to-transparent" />

              {/* Top-Right Badge: EDITION 3.0 */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-block px-3 py-1 rounded-md bg-[#161310] text-[#f6f3eb] text-xs font-bold tracking-widest uppercase shadow-md border border-white/10">
                  Edition 3.0
                </span>
              </div>

              {/* Center / Bottom Floating CTA: 'Click to Read' */}
              <div className="absolute bottom-6 right-6 z-20">
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#161310]/92 hover:bg-[#161310] text-[#f6f3eb] text-sm font-semibold tracking-wide border border-white/25 shadow-[0_8px_25px_rgba(0,0,0,0.7)] group-hover:border-[#c59b6d] group-hover:shadow-[0_8px_30px_rgba(197,155,109,0.45)] transition-all duration-300">
                  <span className="w-5 h-5 rounded-full bg-[#c59b6d] text-[#141210] flex items-center justify-center text-[10px] pl-0.5">
                    ▶
                  </span>
                  <span>Click to Read</span>
                </div>
              </div>

              {/* Subtle hover gloss layer */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
