'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Download,
  ArrowRight,
  Sparkles,
  FileText,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ARTICLES_DATA, EDITORIAL_TEAMS } from './data';
import WhiteShowcase from './WhiteShowcase';
import MandalaFlourish from './MandalaFlourish';
import ThemeStoryCard from './ThemeStoryCard';
import CuratedThemesSection from './CuratedThemesSection';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhiteThemePage() {
  const router = useRouter();
  const previewSectionRef = useRef<HTMLElement>(null);
  const magazineWrapperRef = useRef<HTMLDivElement>(null);
  const themeTextWrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // GSAP ScrollTrigger Pinned Horizontal Progression
  useEffect(() => {
    if (
      !previewSectionRef.current ||
      !magazineWrapperRef.current ||
      !themeTextWrapperRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout (>= 1024px): Magazine centers, locks, glides left, text fades in on right
      mm.add('(min-width: 1024px)', () => {
        // Start centered in section (50% offset aligns center of left column with viewport center)
        gsap.set(magazineWrapperRef.current, { xPercent: 50 });
        gsap.set(themeTextWrapperRef.current, { autoAlpha: 0, x: 50 });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: previewSectionRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Track overall pinned progress on subtle bottom indicator
        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            { scaleX: 1, duration: 2.15, ease: 'none' },
            0
          );
        }

        // 1. Initial dwell: Magazine stays centered while section locks in place
        tl.to({}, { duration: 0.35 })
          // 2. Smooth, optimized slide to left & theme text fade in on right
          .to(magazineWrapperRef.current, {
            xPercent: 0,
            duration: 1.0,
            ease: 'power2.inOut',
          })
          .to(
            themeTextWrapperRef.current,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.9,
              ease: 'power2.out',
            },
            '<+=0.1'
          )
          // 3. Final dwell: Stays comfortably locked in 50/50 spread for reading & 3D interaction
          .to({}, { duration: 0.8 });
      });

      // Mobile/tablet layout (< 1024px): Magazine stays centered, text fades in below
      mm.add('(max-width: 1023px)', () => {
        gsap.set(magazineWrapperRef.current, { xPercent: 0 });
        gsap.set(themeTextWrapperRef.current, { autoAlpha: 0, y: 30 });
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: previewSectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });

        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            { scaleX: 1, duration: 2.0, ease: 'none' },
            0
          );
        }

        tl.to({}, { duration: 0.3 })
          .to(themeTextWrapperRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out',
          })
          .to({}, { duration: 0.7 });
      });
    }, previewSectionRef);

    return () => ctx.revert();
  }, []);

  // Synchronize body background to obsidian dark
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    const originalColor = document.body.style.color;
    document.body.style.backgroundColor = '#11100F';
    document.body.style.color = '#F5F2EB';

    return () => {
      document.body.style.backgroundColor = originalBg;
      document.body.style.color = originalColor;
    };
  }, []);

  const handleOpenReader = (page: number = 1) => {
    if (page > 1) {
      router.push(`/read?page=${page}`);
    } else {
      router.push('/read');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#11100F] text-[#F5F2EB] font-sans selection:bg-[#FF5722]/30 selection:text-[#FF5722] scroll-smooth overflow-x-clip">
      
      {/* ========================================================================= */}
      {/* SECTION 1 (OFF-WHITE IN BLACK BEZEL): ARCHITECTURAL SAMARKAN HERO          */}
      {/* ========================================================================= */}

      {/* ========================================================================= */}
      {/* SECTION 2 (BLACK): PINNED GSAP 3D MAGAZINE & THEME STORY SHOWCASE          */}
      {/* ========================================================================= */}
      <section
        id="preview"
        ref={previewSectionRef}
        className="relative w-full h-screen bg-[#11100F] text-[#F5F2EB] flex flex-col items-center justify-between overflow-hidden pt-8 sm:pt-10 pb-8 sm:pb-10 px-4 sm:px-8 border-b border-dashed border-white/15"
      >
        {/* Intersection Crosshairs */}
        <div className="absolute bottom-0 left-6 -translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute bottom-0 right-6 translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>

        {/* Top Header: Symmetrical Mandala Flourish & Samarkan PRISMA 3.0 Title */}
        <div className="flex flex-col items-center justify-center select-none z-10 shrink-0">
          {/* Symmetrical Ornamental Mandala Flourish */}
          <div className="w-40 sm:w-48 md:w-56 max-w-xs mb-2">
            <MandalaFlourish variant="orange" glow={true} className="w-full h-auto" />
          </div>

          {/* PRISMA 3.0 in Samarkan Font */}
          <h2 className="font-samarkan text-3xl sm:text-4xl md:text-5xl text-[#F5F2EB] tracking-wider leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            PRISMA <span className="text-[#FF5722]">3.0</span>
          </h2>
        </div>

        {/* Dynamic Scroll-Driven Showcase: Harmonious 50/50 Double Spread */}
        <div className="relative w-full max-w-6xl xl:max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 xl:gap-20 px-4 sm:px-8 my-auto">
          {/* Left: 3D Floating Magazine Container (GSAP animates from center xPercent: 50 to left xPercent: 0) */}
          <div
            ref={magazineWrapperRef}
            className="w-full lg:w-1/2 flex items-center justify-center will-change-transform"
          >
            <WhiteShowcase onOpenReader={handleOpenReader} />
          </div>

          {/* Right: Simple Theme Explanation Text (Pure Editorial Typography, No Window, No Buttons) */}
          <div
            ref={themeTextWrapperRef}
            className="w-full lg:w-1/2 max-w-xl flex items-center justify-center lg:justify-start will-change-transform"
          >
            <ThemeStoryCard />
          </div>
        </div>

        {/* Subtle Progress Bar at bottom showing scroll progression within the locked section */}
        <div className="w-32 sm:w-48 h-0.5 rounded-full bg-white/10 overflow-hidden shrink-0">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-[#FF5722] rounded-full shadow-[0_0_8px_#FF5722] origin-left"
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3 (OFF-WHITE): 6 CURATED THEMES (DUAL-TRACK GSAP SCROLLTRIGGER)    */}
      {/* ========================================================================= */}
      <CuratedThemesSection onOpenReader={handleOpenReader} />


      {/* ========================================================================= */}
      {/* SECTION 4 (BLACK): VOICES OF LEADERSHIP & FOREWORD                        */}
      {/* ========================================================================= */}
      <section
        id="foreword"
        className="relative w-full bg-[#11100F] text-[#F5F2EB] py-20 px-4 sm:px-6 md:px-8 border-b border-dashed border-white/15"
      >
        {/* Intersection Crosshairs */}
        <div className="absolute top-0 left-6 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute top-0 right-6 translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute bottom-0 left-6 -translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute bottom-0 right-6 translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-8">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#FF5722] uppercase mb-2">
              [ 03 // LEADERSHIP VOICES ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              Departmental Foreword
            </h2>
          </div>

          {/* Blockquote Box */}
          <div className="relative w-full p-8 sm:p-14 rounded-3xl bg-[#1A1816] border border-white/10 shadow-xl flex flex-col items-center">
            {/* Quote Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#FF5722]/15 border border-[#FF5722]/30 text-[#FF5722] flex items-center justify-center font-serif text-3xl font-bold mb-6">
              “
            </div>

            {/* Blockquote Body */}
            <blockquote className="text-lg sm:text-xl md:text-2xl text-neutral-200 font-light leading-relaxed max-w-2xl mb-8">
              Technology has shifted from an external instrument to an ambient, ubiquitous reality.
              In <span className="font-semibold text-white">PRISMA 3.0</span>, our students and
              faculty capture this transformative epoch through rigorous technical inquiries, creative
              reflections, and innovative software craftsmanship.
            </blockquote>

            {/* Attribution */}
            <div className="flex flex-col items-center">
              <span className="font-bold text-white text-base">
                Department of Computer Science & Engineering
              </span>
              <span className="text-xs font-mono text-neutral-400 mt-0.5">
                Kalyani Government Engineering College • Established 1995
              </span>
            </div>

            {/* Jump to HOD Desk Page Button */}
            <button
              onClick={() => handleOpenReader(3)}
              className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF5722] hover:bg-[#e04513] text-white font-mono text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Read Full Message from HOD (Page 3)</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 (OFF-WHITE): EDITORIAL BOARD & STUDENT BUILDERS                 */}
      {/* ========================================================================= */}
      <section
        id="editorial"
        className="relative w-full bg-[#E8E2D8] text-[#1E1B18] py-20 px-4 sm:px-6 md:px-8 border-b border-dashed border-[#2A2622]/20"
      >
        {/* Subtle Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#1E1B18_0.75px,transparent_0.75px)] [background-size:28px_28px]" />

        {/* Intersection Crosshairs */}
        <div className="absolute top-0 left-6 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-[#2A2622]/40">+</div>
        <div className="absolute top-0 right-6 translate-x-1/2 -translate-y-1/2 text-xs font-mono text-[#2A2622]/40">+</div>
        <div className="absolute bottom-0 left-6 -translate-x-1/2 translate-y-1/2 text-xs font-mono text-[#2A2622]/40">+</div>
        <div className="absolute bottom-0 right-6 translate-x-1/2 translate-y-1/2 text-xs font-mono text-[#2A2622]/40">+</div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-12">
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#FF5722] uppercase mb-2">
              [ 04 // THE BUILDERS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1816] tracking-tight">
              Editorial Board & Engineering Team
            </h2>
            <p className="text-[#5A544D] text-xs sm:text-sm font-mono max-w-xl mt-3 leading-relaxed">
              Recognizing the dedication of faculty patrons, student editors, 3D engineers, and
              designers who brought the 2026 edition to life.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {EDITORIAL_TEAMS.map((cat, idx) => (
              <div
                key={idx}
                className="flex flex-col p-6 sm:p-7 rounded-3xl bg-[#F6F1E8] border border-[#2A2622]/15 shadow-md hover:border-[#FF5722]/40 transition-all"
              >
                <div className="mb-5">
                  <h3 className="font-tech text-lg font-bold text-[#1A1816]">
                    {cat.categoryTitle}
                  </h3>
                  <p className="text-xs font-mono text-[#5A544D] mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-1">
                  {cat.members.map((member, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3 rounded-2xl bg-[#EAE4DC] border border-[#2A2622]/10 flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#1A1816]">
                          {member.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#5A544D]">{member.role}</span>
                        <span className="text-[10px] text-[#787169]">{member.department}</span>
                      </div>

                      {member.badge && (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/25 text-[#FF5722]">
                          {member.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6 (BLACK): FINAL DIGITAL ACCESS & ARCHIVE DOWNLOAD                */}
      {/* ========================================================================= */}
      <section
        id="download"
        className="relative w-full bg-[#11100F] text-[#F5F2EB] py-20 px-4 sm:px-6 md:px-8 border-b border-dashed border-white/15"
      >
        {/* Intersection Crosshairs */}
        <div className="absolute top-0 left-6 -translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute top-0 right-6 translate-x-1/2 -translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute bottom-0 left-6 -translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>
        <div className="absolute bottom-0 right-6 translate-x-1/2 translate-y-1/2 text-xs font-mono text-white/30">+</div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="w-full rounded-[36px] bg-[#161412] border border-white/10 p-8 sm:p-14 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
            
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF5722]/15 border border-[#FF5722]/30 text-[#FF5722] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Digital Access</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-light text-white max-w-2xl leading-tight mb-4">
              Immerse Yourself in <span className="font-samarkan text-[#FF5722] text-4xl sm:text-6xl ml-2">PRISMA 3.0</span>
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-xl mb-8 leading-relaxed">
              Explore all 21 pages with tactile page-flip physics in your browser, or download the
              uncompressed, high-fidelity PDF edition for archival offline reading.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => handleOpenReader(1)}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-neutral-200 text-[#11100F] font-mono text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#FF5722]" />
                <span>Open 3D Flipbook Reader</span>
              </button>

              <a
                href="/prisma_content.pdf"
                download="PRISMA_3.0_CSE_KGEC.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#FF5722] hover:bg-[#e04513] text-white font-mono text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Archive PDF (20MB)</span>
              </a>
            </div>

            <p className="text-[11px] font-mono text-neutral-500 mt-6">
              Compatible with all modern desktop and mobile browsers • Zero plugins required
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER (BLACK): MINIMALIST ARCHITECTURAL FOOTER                           */}
      {/* ========================================================================= */}
      <footer className="relative z-10 w-full border-t border-white/10 bg-[#0C0B0A] py-14 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center">
        <div className="w-full max-w-5xl flex flex-col items-center">
          {/* Logo & Department */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-bold text-xs">
              P
            </div>
            <span className="font-samarkan text-xl font-normal text-white uppercase tracking-wide">
              PRISMA <span className="text-[#FF5722]">3.0</span> • <span className="font-mono text-sm text-neutral-400">V2 Alternating Edition</span>
            </span>
          </div>

          <p className="text-xs font-mono text-neutral-400 max-w-md mb-6">
            Department of Computer Science & Engineering • Kalyani Government Engineering College,
            West Bengal 741235.
          </p>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400 mb-8">
            <a href="#overview" className="hover:text-[#FF5722] transition-colors">Overview</a>
            <a href="#preview" className="hover:text-[#FF5722] transition-colors">3D Physics</a>
            <a href="#articles" className="hover:text-[#FF5722] transition-colors">Curated Articles</a>
            <a href="#foreword" className="hover:text-[#FF5722] transition-colors">Foreword</a>
            <a href="#editorial" className="hover:text-[#FF5722] transition-colors">Editorial Board</a>
            <a href="#download" className="hover:text-[#FF5722] transition-colors">Download</a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-[1px] bg-white/10 mb-6" />

          {/* Copyright */}
          <div className="text-[11px] font-mono text-neutral-500">
            © 2026 Department of Computer Science & Engineering, KGEC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
