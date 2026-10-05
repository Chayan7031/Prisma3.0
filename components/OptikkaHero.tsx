'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import RibbonTorus from './RibbonTorus';

interface OptikkaHeroProps {
  onOpenReader?: (page?: number) => void;
  pdfUrl?: string;
  initialBrand?: 'prisma' | 'optikka';
  initialFont?: 'samarkan' | 'grotesk';
  scrollTargetId?: string;
}

export const OptikkaHero: React.FC<OptikkaHeroProps> = ({
  onOpenReader,
  pdfUrl = '/prisma_content.pdf',
  initialBrand = 'optikka',
  initialFont = 'samarkan',
  scrollTargetId = 'details-section',
}) => {
  const router = useRouter();

  // State controls for customization & interaction
  const [brandMode] = useState<'optikka' | 'prisma'>(initialBrand);
  const [fontMode] = useState<'samarkan' | 'grotesk'>(initialFont);
  const torusSpeed = 1.0;
  const [activeModal, setActiveModal] = useState<'abilities' | 'howItWorks' | 'connect' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = () => {
    const nextElem = document.getElementById(scrollTargetId);
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  const handleLaunchReader = (page: number = 1) => {
    if (onOpenReader) {
      onOpenReader(page);
    } else {
      router.push(`/read?page=${page}`);
    }
  };

  const isOptikka = brandMode === 'optikka';
  const brandTitle = isOptikka ? 'OPTIKKA' : 'PRISMA 3.0';
  const heroHeading = isOptikka ? 'Meet Optikka' : 'Meet Prisma';

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#11100F] text-[#1E1B18] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 select-none font-sans overflow-x-hidden"
    >
      {/* Outer Laptop / Display Bezel Frame for stunning presentation */}
      <div className="relative w-full max-w-[1720px] min-h-[92vh] lg:min-h-[90vh] bg-[#E8E2D8] rounded-[24px] sm:rounded-[32px] md:rounded-[40px] shadow-2xl border border-black/10 overflow-hidden flex flex-col justify-between transition-all duration-700">
        
        {/* Subtle Architectural Paper Texture & Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[radial-gradient(#1E1B18_0.75px,transparent_0.75px)] [background-size:28px_28px]" />
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/40 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#FF5722]/10 to-transparent blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* ARCHITECTURAL GRID OVERLAY (Dashed Lines)                                  */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Vertical Grid Line 1 (Column 1 / Column 2 boundary ~24%) */}
          <div className="absolute top-0 bottom-0 left-[24%] sm:left-[23%] md:left-[22%] lg:left-[22%] w-0 border-r border-dashed border-[#2A2622]/25" />

          {/* Vertical Grid Line 2 (Column 2 / Column 3 boundary ~42%) */}
          <div className="absolute top-0 bottom-0 left-[45%] sm:left-[42%] md:left-[39%] lg:left-[38%] w-0 border-r border-dashed border-[#2A2622]/25" />

          {/* Vertical Grid Line 3 (Column 3 / Column 4 boundary ~64%) */}
          <div className="absolute top-0 bottom-0 left-[68%] sm:left-[64%] md:left-[60%] lg:left-[56%] w-0 border-r border-dashed border-[#2A2622]/25" />

          {/* Horizontal Grid Line 1 (Below Header Nav ~72px) */}
          <div className="absolute left-0 right-0 top-[72px] sm:top-[80px] h-0 border-b border-dashed border-[#2A2622]/25" />

          {/* Horizontal Grid Line 2 (Equator Midline passing through Torus and Scroll Down ~45%) */}
          <div className="absolute left-0 right-0 top-[45%] h-0 border-b border-dashed border-[#2A2622]/25" />

          {/* Horizontal Grid Line 3 (Dividing above Bottom Text ~68%) */}
          <div className="absolute left-0 right-0 top-[68%] h-0 border-b border-dashed border-[#2A2622]/25" />

          {/* Subtle Intersection Crosshair Plus Signs */}
          <div className="absolute top-[80px] left-[22%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[80px] left-[38%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[80px] left-[56%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[45%] left-[22%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[45%] left-[38%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[45%] left-[56%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[68%] left-[22%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[68%] left-[38%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
          <div className="absolute top-[68%] left-[56%] -translate-x-1/2 -translate-y-1/2 text-[10px] text-[#2A2622]/40 font-mono">+</div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: HEADER NAVIGATION (Aligned precisely with vertical grid lines)       */}
        {/* ========================================================================= */}
        <header className="relative z-20 w-full h-[72px] sm:h-[80px] flex items-center px-6 sm:px-10 lg:px-14">
          {/* Logo / Brand (Column 1) */}
          <div className="w-[24%] sm:w-[23%] md:w-[22%] lg:w-[22%] pr-4 flex items-center">
            <a
              href="#overview"
              className="group text-left transition-transform hover:scale-[1.02] cursor-pointer"
              title="PRISMA 3.0"
            >
              <span
                className={`block text-xl sm:text-2xl md:text-3xl font-normal text-[#1A1816] tracking-wider leading-none transition-all duration-300 ${
                  fontMode === 'samarkan' ? 'font-samarkan' : 'font-mono uppercase font-semibold'
                }`}
              >
                {brandTitle}
              </span>
            </a>
          </div>

          {/* Nav Item 1: 3D PHYSICS (Aligned to Column 2 Header) */}
          <div className="w-[20%] sm:w-[18%] md:w-[16%] lg:w-[15%] pl-4 sm:pl-6 hidden sm:flex items-center">
            <a
              href="#preview"
              className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] text-[#3D3833] hover:text-[#FF5722] uppercase transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <span>3D PHYSICS</span>
            </a>
          </div>

          {/* Nav Item 2: ARTICLES (Aligned to Column 3 Header) */}
          <div className="w-[20%] sm:w-[18%] md:w-[16%] lg:w-[15%] pl-4 sm:pl-6 hidden sm:flex items-center">
            <a
              href="#articles"
              className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] text-[#3D3833] hover:text-[#FF5722] uppercase transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <span>ARTICLES</span>
            </a>
          </div>

          {/* Nav Item 3: FOREWORD */}
          <div className="w-[18%] sm:w-[16%] md:w-[14%] lg:w-[14%] pl-4 sm:pl-6 hidden md:flex items-center">
            <a
              href="#foreword"
              className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] text-[#3D3833] hover:text-[#FF5722] uppercase transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <span>FOREWORD</span>
            </a>
          </div>

          {/* Nav Item 4: BUILDERS */}
          <div className="w-[18%] sm:w-[16%] md:w-[14%] lg:w-[14%] pl-4 sm:pl-6 hidden lg:flex items-center">
            <a
              href="#editorial"
              className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] text-[#3D3833] hover:text-[#FF5722] uppercase transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <span>BUILDERS</span>
            </a>
          </div>

          {/* Nav Item 5: DOWNLOAD (Right Column / Edge) */}
          <div className="flex-1 flex justify-end items-center">
            <a
              href="#download"
              className="text-[11px] md:text-xs font-mono font-medium tracking-[0.2em] text-[#3D3833] hover:text-[#FF5722] uppercase transition-colors cursor-pointer"
            >
              DOWNLOAD
            </a>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* ROW 2: MIDDLE BODY WITH 3D RIBBON TORUS & TECHNICAL ANNOTATIONS            */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex-1 w-full min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-4">
          
          {/* Left Sub-annotation: CREATIVITY POWERED BY CODE */}
          <div className="absolute top-[32%] sm:top-[34%] left-6 sm:left-10 lg:left-14 max-w-[140px] pointer-events-none">
            <div className="text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] text-[#4A4540] uppercase leading-relaxed">
              CREATIVITY
              <br />
              POWERED BY CODE
            </div>
          </div>

          {/* Interactive 3D Ribbon Torus Canvas (Centered right on Vertical Line 1 & Horizontal Midline) */}
          <div className="absolute top-[45%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] md:w-[260px] md:h-[260px] lg:w-[280px] lg:h-[280px] z-30 transition-all duration-300">
            <RibbonTorus speed={torusSpeed} interactive={true} />
          </div>

          {/* Right Sub-annotation: SCROLL DOWN (Aligned with Equator Grid Line) */}
          <div className="absolute top-[45%] right-6 sm:right-10 lg:right-14 -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={handleScrollDown}
              className="group flex items-center gap-2 text-[10px] sm:text-[11px] font-mono font-medium tracking-[0.2em] text-[#4A4540] hover:text-black uppercase transition-all cursor-pointer"
            >
              <span>SCROLL DOWN</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 3: BOTTOM SECTION (Meet Optikka Headline & Editorial Paragraph)         */}
        {/* ========================================================================= */}
        <div className="relative z-20 w-full min-h-[160px] sm:min-h-[190px] flex flex-col lg:flex-row items-start lg:items-end justify-between px-6 sm:px-10 lg:px-14 pb-8 sm:pb-12 pt-4 gap-6">
          
          {/* Main Huge Display Title: "Meet Optikka" or "Meet Prisma" in Samarkan */}
          <div className="w-full lg:w-[50%]">
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-[95px] xl:text-[110px] font-normal text-[#1A1816] tracking-tight leading-[0.9] transition-all duration-500 ${
                fontMode === 'samarkan' ? 'font-samarkan' : 'font-sans font-medium'
              }`}
            >
              {heroHeading}
            </h1>
          </div>

          {/* Editorial Paragraph with Vibrant Orange Accent */}
          <div className="w-full lg:w-[48%] xl:w-[45%] max-w-2xl">
            <p className="text-xl sm:text-2xl md:text-[27px] lg:text-[30px] font-sans font-normal text-[#25221F] leading-[1.26] tracking-[-0.015em]">
              {isOptikka ? (
                <>
                  Optikka redefines design workflows, empowering you to scale creative, protect what matters, and launch faster—unlocking your{' '}
                  <span className="text-[#FF5722] font-medium">
                    revenue potential.
                  </span>
                </>
              ) : (
                <>
                  Prisma 3.0 redefines departmental storytelling, empowering students to scale creative thought, publish research, and launch future visions—unlocking your{' '}
                  <span className="text-[#FF5722] font-medium">
                    creative potential.
                  </span>
                </>
              )}
            </p>
          </div>
        </div>



      </div>

      {/* ========================================================================= */}
      {/* MODAL: ABILITIES DRAWER                                                   */}
      {/* ========================================================================= */}
      {activeModal === 'abilities' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#E8E2D8] rounded-[28px] border border-black/10 p-8 shadow-2xl text-[#1E1B18]">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-black">
                  Optikka / Prisma Core Abilities
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-white/60 border border-black/5">
                <div className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider mb-1">01 • Generative 3D</div>
                <h4 className="font-semibold text-base mb-1">Parametric Ribbon Toroids</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Interactive mathematical wireframe moiré ribbons rendered at 60fps with real-time gyroscopic mouse tilt.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-black/5">
                <div className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider mb-1">02 • Typography</div>
                <h4 className="font-semibold text-base mb-1">Samarkan Indic Modernism</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Infused with the authentic Devanagari shirorekha top line for an iconic fusion aesthetic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-black/5">
                <div className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider mb-1">03 • Architecture</div>
                <h4 className="font-semibold text-base mb-1">Swiss Editorial Grid</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Tactile warm oatmeal backdrop with mathematically disciplined dashed grid lines and intersection crosshairs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/60 border border-black/5">
                <div className="text-[10px] font-mono text-[#FF5722] uppercase tracking-wider mb-1">04 • Interactive Reader</div>
                <h4 className="font-semibold text-base mb-1">3D Flipbook Magazine</h4>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Full dual-page real-time flipbook engine rendering the complete departmental magazine content.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-[#1E1B18] text-[#E8E2D8] hover:bg-[#FF5722] hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: HOW IT WORKS                                                       */}
      {/* ========================================================================= */}
      {activeModal === 'howItWorks' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#E8E2D8] rounded-[28px] border border-black/10 p-8 shadow-2xl text-[#1E1B18]">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-black">
                  System Architecture & Workflow
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/60">
                <span className="w-6 h-6 rounded-full bg-[#1E1B18] text-[#E8E2D8] flex items-center justify-center font-mono text-xs flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-sm">Visual Synthesis & Layout</h4>
                  <p className="text-xs text-neutral-700 mt-0.5">
                    Grid columns dynamically position headings, 3D ribbons, and descriptive copy along proportional axes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/60">
                <span className="w-6 h-6 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-mono text-xs flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-sm">Real-time WebGL Moiré Computation</h4>
                  <p className="text-xs text-neutral-700 mt-0.5">
                    160 elliptical cross-sections rotate simultaneously to create optical interference waves and smooth color transition.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3.5 rounded-xl bg-white/60">
                <span className="w-6 h-6 rounded-full bg-[#1E1B18] text-[#E8E2D8] flex items-center justify-center font-mono text-xs flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-sm">Instant Reader Integration</h4>
                  <p className="text-xs text-neutral-700 mt-0.5">
                    Direct access to the 3D book reader, department articles, gallery showcase, and high-res PDF downloads.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setActiveModal(null);
                  handleLaunchReader(1);
                }}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-[#FF5722] text-white hover:bg-[#e04513] transition-colors cursor-pointer"
              >
                Launch 3D Magazine
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-[#1E1B18] text-[#E8E2D8] hover:bg-black transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: STAY CONNECTED                                                     */}
      {/* ========================================================================= */}
      {activeModal === 'connect' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#E8E2D8] rounded-[28px] border border-black/10 p-8 shadow-2xl text-[#1E1B18]">
            <div className="flex items-center justify-between pb-4 border-b border-black/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                <h3 className="font-mono text-xs uppercase tracking-widest font-semibold text-black">
                  Stay Connected
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-mono text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs text-neutral-700 leading-relaxed">
                Connect with the Department of Computer Science & Engineering, Kalyani Government Engineering College.
              </p>

              <div className="p-3 bg-white/70 rounded-xl border border-black/5 space-y-1">
                <div className="text-[10px] font-mono text-[#787169] uppercase">Department</div>
                <div className="text-xs font-semibold">CSE • Kalyani Govt. Engineering College</div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-black/5 space-y-1">
                <div className="text-[10px] font-mono text-[#787169] uppercase">Publication</div>
                <div className="text-xs font-semibold">PRISMA 3.0 • Volume III (2026)</div>
              </div>

              <div className="p-3 bg-white/70 rounded-xl border border-black/5 space-y-1">
                <div className="text-[10px] font-mono text-[#787169] uppercase">Contact & Submissions</div>
                <div className="text-xs font-mono text-[#FF5722]">prisma.cse.kgec@gmail.com</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-[#1E1B18] text-[#E8E2D8] hover:bg-[#FF5722] hover:text-white transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OptikkaHero;
