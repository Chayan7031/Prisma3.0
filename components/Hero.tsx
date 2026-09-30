'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getCloudinaryPageUrl } from '@/lib/cloudinary';

const MagazineShowcase = dynamic(() => import('@/components/MagazineShowcase'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[650px] 2xl:max-w-[720px] h-[350px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[580px] 2xl:h-[640px] flex flex-col items-center justify-center">
      <div className="w-9 h-9 border-2 border-[#00a8ff]/30 border-t-[#00a8ff] rounded-full animate-spin mb-3" />
      <span className="text-[11px] uppercase tracking-widest text-[#00a8ff] font-tech font-semibold">
        Loading 3D Magazine...
      </span>
    </div>
  ),
});

export interface HeroProps {
  onOpenReader?: (page?: number) => void;
  pdfUrl?: string;
  onReplayIntro?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
  onReplayIntro,
}) => {
  return (
    <section className="relative w-full min-h-screen bg-[#070d18] text-[#f8fafc] flex flex-col justify-between px-6 py-8 md:px-12 lg:px-20 overflow-x-hidden font-space select-none">
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft electric cyan ambient pool behind right column */}
        <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,168,255,0.12)_0%,rgba(0,210,255,0.04)_50%,transparent_70%)] blur-3xl" />
        {/* Subtle deep blue glow on top left */}
        <div className="absolute top-[5%] left-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.08)_0%,transparent_65%)] blur-3xl" />
        {/* Natural vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,10,18,0.7)_100%)]" />
      </div>

      {/* Top Header / Masthead */}
      <header className="relative z-30 w-full flex items-center justify-between pb-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-9 h-9 rounded-md bg-[#00a8ff]/10 border border-[#00a8ff]/30 flex items-center justify-center text-[#00a8ff] font-tech text-lg font-bold transition-colors group-hover:border-[#00a8ff]">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-tech uppercase leading-none">
              PRISMA <span className="text-[#00a8ff]">3.0</span>
            </span>
            <span className="text-xs text-slate-400 tracking-wide font-sans mt-0.5">
              Department of Computer Science & Engineering • KGEC
            </span>
          </div>
        </Link>

        {/* Clean Classic Navigation */}
        <nav className="flex items-center gap-3" aria-label="Main Navigation">
          <Link
            href="/read"
            onClick={(e) => {
              if (onOpenReader) {
                e.preventDefault();
                onOpenReader(1);
              }
            }}
            className="text-xs font-semibold tracking-wider uppercase text-black bg-[#00a8ff] hover:bg-[#38bdf8] px-5 py-2.5 rounded transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            title="Read PRISMA 3.0 Magazine"
          >
            Read Magazine
          </Link>

          <Link
            href="/read?page=10"
            onClick={(e) => {
              if (onOpenReader) {
                e.preventDefault();
                onOpenReader(10);
              }
            }}
            className="text-xs font-medium tracking-wider uppercase text-slate-300 hover:text-white px-3.5 py-2 transition-colors hidden sm:inline"
            title="Articles"
          >
            Articles
          </Link>

          {onReplayIntro && (
            <button
              type="button"
              onClick={onReplayIntro}
              className="text-xs font-medium tracking-wider uppercase text-slate-300 hover:text-white px-3.5 py-2 transition-colors cursor-pointer"
              title="Replay Video Intro"
            >
              Intro
            </button>
          )}
        </nav>
      </header>

      {/* Main Showcase Layout: 2 Columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center py-8 lg:py-12">
        
        {/* LEFT COLUMN: Classic Editorial Headline, Copy & CTAs */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left space-y-6 animate-fade-in-up">
          
          {/* Clean Editorial Kicker */}
          <div className="text-xs font-semibold tracking-[0.2em] text-[#00a8ff] uppercase">
            Annual Departmental Publication • 2026 Edition
          </div>

          {/* Main Title Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-tech leading-[1.08]">
              <span className="text-[#00a8ff]">2026:</span> How Technology is Becoming Ubiquitous
            </h1>
            <p className="text-lg sm:text-xl font-light text-slate-300 tracking-wide font-tech">
              Departmental Magazine of Computer Science & Engineering
            </p>
          </div>

          {/* Description Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            The flagship annual publication of Computer Science & Engineering at Kalyani Government Engineering College. A curated showcase of computing frontiers, student innovations, faculty perspectives, and artistic expressions presented with realistic 3D page-flip physics.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary CTA: Open Interactive Reader in /read */}
            <Link
              href="/read"
              onClick={(e) => {
                if (onOpenReader) {
                  e.preventDefault();
                  onOpenReader(1);
                }
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-[#00a8ff] hover:bg-[#38bdf8] text-black font-semibold text-sm tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,168,255,0.25)] hover:shadow-[0_6px_25px_rgba(0,168,255,0.4)] cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              <span>Read Magazine</span>
            </Link>

            {/* Secondary CTA: Download PDF */}
            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00a8ff]"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download PDF (20MB)</span>
              </a>
            )}
          </div>

          {/* Classic Stats Row (Clean Numbers & Dividers) */}
          <div className="flex items-center gap-8 sm:gap-12 pt-6 border-t border-white/10 w-full max-w-lg">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white font-tech leading-none">
                21
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">
                Full Pages
              </div>
            </div>

            <div className="w-[1px] h-9 bg-white/15" />

            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white font-tech leading-none">
                3D
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">
                Page Flip
              </div>
            </div>

            <div className="w-[1px] h-9 bg-white/15" />

            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#00a8ff] font-tech leading-none">
                2026
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">
                Edition
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Realistic 3D Magazine Showcase (Continuous Rotating, Page Flip & Back Cover) */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end animate-fade-in-up w-full">
          <MagazineShowcase onOpenReader={onOpenReader} />
        </div>

      </div>

      {/* Bottom Classic Footer */}
      <footer className="relative z-20 w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div>
          Kalyani Government Engineering College • Department of Computer Science & Engineering
        </div>
        <div>
          PRISMA 3.0 — 2026 Edition
        </div>
      </footer>
    </section>
  );
};

export default Hero;



