'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  Download,
  BookOpen,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[#F1EDE2] text-[#161121] overflow-hidden select-none font-space border-t border-[#D5C9B8]"
    >
      {/* ========================================================================= */}
      {/* VINTAGE ARCHIVAL BACKGROUND & BLUEPRINT MOTIFS (Matching Hero UI)          */}
      {/* ========================================================================= */}
      {false && (
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Soft Archival Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(255,255,255,0.75)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(190,149,62,0.1)_0%,transparent_60%)]" />

        {/* Architectural Blueprint Grid Lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(145, 115, 68, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(145, 115, 68, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Botanical Sketch Flourish (Bottom Left, Subtle) */}
        <div className="absolute -bottom-6 -left-6 sm:left-[1%] w-[160px] sm:w-[200px] h-[170px] sm:h-[210px] opacity-15 scale-x-[-1] rotate-[20deg] mix-blend-multiply">
          <Image
            src="/left_design_tight.png"
            alt="Botanical Sketch Flourish"
            fill
            sizes="200px"
            className="object-contain"
          />
        </div>

        {/* Butterflies Decor (Upper Right) */}
        <div className="absolute top-[6%] right-[2%] w-[60px] sm:w-[95px] h-[60px] sm:h-[95px] opacity-45 mix-blend-multiply -rotate-12">
          <Image
            src="/page-bg-butterfly.png"
            alt="Butterflies Decor"
            fill
            sizes="95px"
            className="object-contain"
          />
        </div>

        {/* Blueprint Circuit Trace Line: Runs from Left to Right under Magazine Archive */}
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-35 overflow-visible pointer-events-none select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main circuit line:
              - Enters at y=18
              - Steps down at (680, 18) to (710, 36) directly under the 'MAGAZINE ARCHIVE' heading
              - Runs across to x=1160 at y=36
          */}
          <path
            d="M 40 18 H 680 L 710 36 H 1160"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          <circle cx="680" cy="18" r="2.8" fill="#FF4D00" />
          <circle cx="710" cy="36" r="2.8" fill="#FF4D00" />
          <circle cx="1160" cy="36" r="2.8" fill="#FF4D00" />

          {/* Precision Target Crosshairs */}
          <g transform="translate(60, 95)" stroke="#FF4D00" strokeWidth="0.8">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(1130, 95)" stroke="#FF4D00" strokeWidth="0.8">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
        </svg>
      </div>
      )}

      {/* ========================================================================= */}
      {/* COMPACT MAIN FOOTER CONTENT (~25vh HEIGHT)                                */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-3">
        
        {/* Main Content: Split between Left Identity and Right Magazine Archive */}
        {/* Hidden as per user request */}
        {false && (
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-10">
          
          {/* LEFT: College & Department Identity */}
          <div className="space-y-3 text-left max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-10 h-10 shrink-0 p-1 rounded-xl bg-white/80 border border-[#D5C9B8] shadow-xs">
                <img
                  src="https://res.cloudinary.com/db9l85phg/image/upload/v1791353718/kgec_logo-removebg-preview_shf3cd.png"
                  alt="KGEC Logo"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>

              <div className="flex items-baseline gap-2 leading-none">
                <span className="font-samarkan text-3xl sm:text-[34px] text-[#161121] lowercase">
                  prisma
                </span>
                <span className="font-samarkan text-3xl sm:text-[34px] text-[#BE953E]">
                  3.0
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:ml-2 sm:pl-3 border-l-0 sm:border-l border-[#D5C9B8]">
                <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-xs inline-block" />
                <span className="font-mono text-[10px] text-[#555555]">
                  &gt; def createImpact(): <span className="inline-block w-1.5 h-[2px] bg-[#FF4D00] animate-pulse align-middle ml-0.5" />
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[#1F1F1F] font-space font-extrabold uppercase tracking-[0.06em] text-xs sm:text-[13px] leading-tight">
                Kalyani Government Engineering College
              </h3>
              <p className="text-[#FF4D00] font-space font-bold uppercase tracking-[0.1em] text-[10px] sm:text-[11px] leading-tight mt-0.5">
                Department of Computer Science & Engineering
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-mono text-[#666666]">
              <span className="text-[#3A3A3A] font-bold uppercase tracking-wider">SAME DREAMS. MORE ALGORITHMS.</span>
              <span>•</span>
              <span>ESTD. 1995</span>
              <span>•</span>
              <span>Kalyani, Nadia, West Bengal 741235</span>
            </div>
          </div>

          {/* RIGHT: Magazine Archive (Header OVER orange line, Editions DOWN orange line) */}
          <div className="text-left lg:text-right">
            {/* Header: OVER the orange line */}
            <div className="h-6 flex items-center lg:justify-end">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#FF4D00]" />
                <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#FF4D00] font-bold">
                  Magazine Archive
                </h4>
              </div>
            </div>

            {/* Edition Links: DOWN the orange line */}
            <div className="mt-3 flex flex-wrap items-center lg:justify-end gap-2 sm:gap-2.5">
              {/* PRISMA 3.0 */}
              <Link
                href="/read"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 hover:bg-[#FF4D00] border border-[#D5C9B8] hover:border-[#FF4D00] text-[#161121] hover:text-white transition-all text-[11px] font-space font-bold shadow-2xs group cursor-pointer"
              >
                <span>PRISMA 3.0</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[#FF4D00]/15 group-hover:bg-white/20 text-[#FF4D00] group-hover:text-white">
                  2026
                </span>
              </Link>

              {/* PRISMA 2.0 */}
              <Link
                href="/read?page=1"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-black/5 border border-[#D5C9B8] hover:border-[#999999] text-[#333333] transition-all text-[11px] font-space font-medium cursor-pointer"
              >
                <span>PRISMA 2.0</span>
                <span className="text-[9px] font-mono text-[#888888]">2025</span>
              </Link>

              {/* PRISMA 1.0 */}
              <Link
                href="/read?page=1"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 hover:bg-black/5 border border-[#D5C9B8] hover:border-[#999999] text-[#333333] transition-all text-[11px] font-space font-medium cursor-pointer"
              >
                <span>PRISMA 1.0</span>
                <span className="text-[9px] font-mono text-[#888888]">2024</span>
              </Link>

              {/* Download PDF */}
              <a
                href="/prisma_content.pdf"
                download="PRISMA_3.0_CSE_KGEC.pdf"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FF4D00] hover:bg-[#E64500] text-white transition-all text-[11px] font-mono font-semibold uppercase tracking-wider shadow-2xs cursor-pointer ml-1 sm:ml-1"
                title="Download 2026 PDF"
              >
                <Download className="w-3 h-3" />
                <span>PDF (20MB)</span>
              </a>
            </div>
          </div>

        </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* COMPACT BOTTOM COLOPHON STRIP                                           */}
        {/* ----------------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2 text-[10px] font-mono text-[#555555]">
          <div className="flex flex-wrap justify-center items-center gap-2 text-center sm:text-left">
            <span>© 2026 KGEC • Department of Computer Science & Engineering</span>
            <span className="text-[#FF4D00]">•</span>
            <span>All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-center">
            <span className="text-[#777777]">
              Crafted with algorithms & passion for PRISMA 3.0
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/80 hover:bg-[#FF4D00] border border-[#D5C9B8] hover:border-[#FF4D00] text-[#161121] hover:text-white font-mono text-[10px] transition-all cursor-pointer group shadow-2xs"
              title="Back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
