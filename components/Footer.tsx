'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  Download,
  Code2,
  Terminal,
  Globe,
  GraduationCap,
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
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Soft Archival Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,255,0.7)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(190,149,62,0.1)_0%,transparent_60%)]" />

        {/* Architectural Blueprint Grid Lines */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(145, 115, 68, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(145, 115, 68, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Botanical Sketch Flourish (Bottom Left, Subtle) */}
        <div className="absolute -bottom-6 -left-6 sm:left-[1%] w-[180px] sm:w-[220px] h-[190px] sm:h-[232px] opacity-15 scale-x-[-1] rotate-[20deg] mix-blend-multiply">
          <Image
            src="/left_design_tight.png"
            alt="Botanical Sketch Flourish"
            fill
            sizes="220px"
            className="object-contain"
          />
        </div>

        {/* Butterflies Decor (Upper Right) */}
        <div className="hidden sm:block absolute top-[4%] right-[2%] w-[90px] sm:w-[110px] h-[90px] sm:h-[110px] opacity-50 mix-blend-multiply -rotate-12">
          <Image
            src="/page-bg-butterfly.png"
            alt="Butterflies Decor"
            fill
            sizes="110px"
            className="object-contain"
          />
        </div>

        {/* Blueprint Circuit Trace Line (Desktop overlay) */}
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 w-full h-full opacity-35 overflow-visible pointer-events-none select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Circuit Trace:
              - Enters at y=20 in Col 1
              - Steps down to y=38 under Col 2 & Col 3 headings (headings OVER line, content DOWN line)
              - Steps up to y=20 above Col 4 (Social Handles heading BELOW line and slightly right)
          */}
          <path
            d="M 30 20 H 380 L 405 38 H 910 L 935 20 H 1170"
            stroke="#FF4D00"
            strokeWidth="1.2"
            strokeDasharray="5 4"
          />
          {/* Circuit Calibration Nodes */}
          <circle cx="380" cy="20" r="2.8" fill="#FF4D00" />
          <circle cx="405" cy="38" r="2.8" fill="#FF4D00" />
          <circle cx="910" cy="38" r="2.8" fill="#FF4D00" />
          <circle cx="935" cy="20" r="2.8" fill="#FF4D00" />

          {/* Precision Target Crosshairs */}
          <g transform="translate(50, 110)" stroke="#FF4D00" strokeWidth="0.8">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
          <g transform="translate(1150, 130)" stroke="#FF4D00" strokeWidth="0.8">
            <line x1="-5" y1="0" x2="5" y2="0" />
            <line x1="0" y1="-5" x2="0" y2="5" />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* COMPACT MAIN FOOTER CONTAINER (Less than 30-40vh height)                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 py-6 sm:py-7 flex flex-col justify-between">
        
        {/* Main 4-Column Grid: Compact & Streamlined */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* COLUMN 1 (Span 4): College, Dept & PRISMA */}
          <div className="lg:col-span-4 space-y-2.5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 p-1 rounded-xl bg-white/80 border border-[#D5C9B8] shadow-xs">
                <img
                  src="/kgec_logo-removebg-preview.png"
                  alt="KGEC Logo"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="flex items-baseline gap-2 leading-none">
                <span className="font-samarkan text-3xl sm:text-4xl text-[#161121] lowercase">
                  prisma
                </span>
                <span className="font-samarkan text-3xl sm:text-4xl text-[#BE953E]">
                  3.0
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-[#1F1F1F] font-space font-extrabold uppercase tracking-[0.08em] text-xs sm:text-[13px] leading-tight">
                Kalyani Government Engineering College
              </h3>
              <p className="text-[#FF4D00] font-space font-bold uppercase tracking-[0.12em] text-[10px] sm:text-[11px] leading-tight mt-0.5">
                Department of Computer Science & Engineering
              </p>
            </div>

            <p className="text-[11px] text-[#555555] font-space leading-snug line-clamp-2 max-w-sm">
              Annual flagship magazine celebrating student research, algorithmic innovation, and open-source excellence at KGEC.
            </p>

            <div className="flex items-center gap-3 text-[10px] font-mono text-[#666666]">
              <span className="text-[#3A3A3A] font-bold uppercase tracking-wider">SAME DREAMS. MORE ALGORITHMS.</span>
              <span>•</span>
              <span>ESTD. 1995</span>
            </div>
          </div>

          {/* COLUMN 2 (Span 3): KGEC Dev Community */}
          <div className="lg:col-span-3 text-left">
            {/* Header: OVER the orange line */}
            <div className="h-7 flex items-center">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#FF4D00] font-bold">
                  KGEC Dev Community
                </h4>
              </div>
            </div>

            {/* Rest of part: DOWN the orange line */}
            <div className="mt-3.5 space-y-2">
              <p className="text-[11px] text-[#555555] font-space leading-snug">
                Student-led engineering collective driving open-source culture, hackathons, and software innovation.
              </p>

              <ul className="space-y-1.5 text-[11px] font-space text-[#333333]">
                <li>
                  <a
                    href="https://github.com/kgec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-[#FF4D00] transition-colors"
                  >
                    <Code2 className="w-3 h-3 text-[#FF4D00]" />
                    <span>Open Source Repositories</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 text-[#FF4D00]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://kgec.edu.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-[#FF4D00] transition-colors"
                  >
                    <Globe className="w-3 h-3 text-[#FF4D00]" />
                    <span>Official KGEC Portal (kgec.edu.in)</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-60 text-[#FF4D00]" />
                  </a>
                </li>
                <li>
                  <Link
                    href="/read"
                    className="group inline-flex items-center gap-1.5 hover:text-[#FF4D00] transition-colors"
                  >
                    <Terminal className="w-3 h-3 text-[#FF4D00]" />
                    <span>PRISMA 3D WebGL Platform</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 3 (Span 2): Archives & Downloads */}
          <div className="lg:col-span-2 text-left">
            {/* Header: OVER the orange line */}
            <div className="h-7 flex items-center">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#FF4D00] font-bold">
                Magazine Archive
              </h4>
            </div>

            {/* Rest of part: DOWN the orange line */}
            <div className="mt-3.5 space-y-2">
              <ul className="space-y-1.5 text-[11px] font-space text-[#333333]">
                <li>
                  <Link href="/read" className="hover:text-[#FF4D00] transition-colors flex items-center justify-between">
                    <span className="font-semibold">PRISMA 3.0</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-[#FF4D00]/10 text-[#FF4D00]">2026</span>
                  </Link>
                </li>
                <li>
                  <Link href="/read?page=1" className="hover:text-[#FF4D00] transition-colors flex items-center justify-between">
                    <span>PRISMA 2.0</span>
                    <span className="text-[9px] font-mono text-[#888888]">2025</span>
                  </Link>
                </li>
                <li>
                  <Link href="/read?page=1" className="hover:text-[#FF4D00] transition-colors flex items-center justify-between">
                    <span>PRISMA 1.0</span>
                    <span className="text-[9px] font-mono text-[#888888]">2024</span>
                  </Link>
                </li>
                <li className="pt-1">
                  <a
                    href="/prisma_content.pdf"
                    download="PRISMA_3.0_CSE_KGEC.pdf"
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#FF4D00] hover:text-[#E64500] uppercase tracking-wider"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* COLUMN 4 (Span 3): Social Media Handles (Heading shifted right ~15px & BELOW orange line) */}
          <div className="lg:col-span-3 text-left pl-3 sm:pl-5 pt-3">
            <div className="space-y-1 mb-2 pl-[15px]">
              <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#FF4D00] font-bold">
                Social Handles
              </h4>
              <p className="text-[10px] text-[#555555] font-space">
                Follow KGEC CSE & Dev Community:
              </p>
            </div>

            {/* Compact 3x2 Icon Pill Matrix */}
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              
              {/* GitHub */}
              <a
                href="https://github.com/kgec"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-[#161121] hover:text-[#FF4D00] shadow-xs"
                title="GitHub @kgec-dev"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-[9px] font-mono mt-1 font-semibold">GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/school/kalyani-government-engineering-college/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-[#0077B5] shadow-xs"
                title="LinkedIn KGEC CSE"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-[9px] font-mono mt-1 font-semibold text-[#161121]">LinkedIn</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-[#E1306C] shadow-xs"
                title="Instagram @kgec_prisma"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-[9px] font-mono mt-1 font-semibold text-[#161121]">Instagram</span>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-black hover:text-[#FF4D00] shadow-xs"
                title="X (Twitter) @kgec_cse"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-[9px] font-mono mt-1 font-semibold text-[#161121]">X / Twitter</span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-[#FF0000] shadow-xs"
                title="YouTube KGEC CSE"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="text-[9px] font-mono mt-1 font-semibold text-[#161121]">YouTube</span>
              </a>

              {/* Email / Mail */}
              <a
                href="mailto:prisma.kgec.cse@gmail.com"
                className="group flex flex-col items-center justify-center p-2 rounded-lg bg-white/70 hover:bg-white border border-[#D5C9B8] hover:border-[#FF4D00] transition-all text-[#FF4D00] shadow-xs"
                title="Email prisma.kgec.cse@gmail.com"
              >
                <Mail className="w-4 h-4" />
                <span className="text-[9px] font-mono mt-1 font-semibold text-[#161121]">Email</span>
              </a>

            </div>
          </div>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* COMPACT BOTTOM COLOPHON STRIP                                           */}
        {/* ----------------------------------------------------------------------- */}
        <div className="pt-4 mt-4 border-t border-[#D5C9B8]/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-[#555555]">
          
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 KGEC • Dept. of Computer Science & Engineering</span>
            <span className="text-[#FF4D00]">•</span>
            <span>Kalyani, WB 741235</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-[#777777]">
              Crafted by <strong className="text-[#161121] font-semibold">KGEC Dev Community</strong> & Editorial Board
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
