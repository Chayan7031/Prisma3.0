'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

// Dynamic import with SSR disabled for browser-only flipbook engine
const Book = dynamic(() => import('@/components/Book'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141210] text-[#c59b6d]">
      <div className="w-12 h-12 border-3 border-[#c59b6d]/30 border-t-[#c59b6d] rounded-full animate-spin mb-4" />
      <p className="font-serif text-lg tracking-widest uppercase">Opening PRISMA 3.0...</p>
    </div>
  ),
});

type ViewState = 'intro' | 'hero' | 'reader';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('intro');
  const [readerStartPage, setReaderStartPage] = useState<number>(1);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Automatically transition from Home Page Intro to Hero page after intro animation plays
  useEffect(() => {
    if (currentView !== 'intro') return;

    // Start subtle crossfade at 3.5s, switch view at 3.8s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3500);

    const switchTimer = setTimeout(() => {
      setCurrentView('hero');
      setIsFadingOut(false);
    }, 3900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(switchTimer);
    };
  }, [currentView]);

  const handleOpenReader = (page: number = 1) => {
    setReaderStartPage(page);
    setCurrentView('reader');
  };

  const handleCloseReader = () => {
    setCurrentView('hero');
  };

  const handleSkipIntro = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentView('hero');
      setIsFadingOut(false);
    }, 200);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0510] overflow-hidden">
      {/* ==================================================================== */}
      {/* 1. INTRO / HOME SPLASH SCREEN (Traditional Woman + Robot Woman)      */}
      {/* ==================================================================== */}
      {currentView === 'intro' && (
        <main
          className={`relative w-full h-screen bg-gradient-to-b from-[#0a0510] via-[#1a1025] to-[#050010] overflow-hidden flex items-center justify-center font-sans transition-opacity duration-500 ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Quick skip button */}
          <button
            type="button"
            onClick={handleSkipIntro}
            className="absolute top-6 right-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs tracking-widest uppercase font-mono text-purple-200 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span>Skip to Magazine</span>
            <span>→</span>
          </button>

          {/* Ambient connecting lines and glow */}
          <div className="absolute inset-0 z-0 opacity-60">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-[2px] transform -translate-y-1/2" />
            <div className="absolute top-[55%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-400 to-transparent transform -translate-y-1/2 rotate-[4deg]" />
            <div className="absolute top-[45%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent transform -translate-y-1/2 -rotate-[4deg]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-purple-900/30 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* Left Character - Traditional Woman */}
          <div className="absolute left-0 bottom-0 h-[90vh] w-[70vw] z-10 animate-slide-left pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/traditional_woman.png"
                alt="Traditional Indian Woman"
                fill
                className="object-contain object-left-bottom"
                priority
              />
            </div>
          </div>

          {/* Right Character - Robot Woman */}
          <div className="absolute right-0 bottom-0 h-[70vh] w-[70vw] z-10 animate-slide-right pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/robot_woman.png"
                alt="Futuristic Robot Woman"
                fill
                className="object-contain object-right-bottom"
                priority
              />
            </div>
          </div>

          {/* Center Content - Title and Logo */}
          <div className="relative z-20 flex flex-col items-center animate-fade-in-up">
            <div className="text-center animate-floating">
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-white to-purple-200 drop-shadow-2xl mb-6">
                PRISMA <span className="font-light">3.0</span>
              </h1>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-200/60" />
                <p className="text-xl md:text-2xl tracking-[0.4em] font-light text-purple-100 uppercase">
                  CSE Annual Magazine
                </p>
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-200/60" />
              </div>
            </div>

            {/* Subtle progress indicator for auto-transition */}
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="text-[11px] tracking-widest uppercase font-mono text-purple-300/70">
                Loading Departmental Showcase
              </span>
              <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-200 to-purple-400 animate-[pulse_2s_ease-in-out_infinite]" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ==================================================================== */}
      {/* 2. HERO SHOWCASE SCREEN (Departmental PRISMA 3.0 & Magazine Preview) */}
      {/* ==================================================================== */}
      {currentView === 'hero' && (
        <div className="animate-fade-in-up">
          <Hero
            onOpenReader={handleOpenReader}
            pdfUrl="/prisma_content.pdf"
            onReplayIntro={() => setCurrentView('intro')}
          />
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. INTERACTIVE 3D FLIPBOOK READER                                    */}
      {/* ==================================================================== */}
      {currentView === 'reader' && (
        <Book
          initialPage={readerStartPage}
          onClose={handleCloseReader}
          title="PRISMA 3.0"
          subtitle="Department of Computer Science and Engineering • KGEC"
          pdfUrl="/prisma_content.pdf"
        />
      )}
    </div>
  );
}