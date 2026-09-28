'use client';

import { useState } from 'react';
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

type ViewState = 'hero' | 'reader';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>('hero');
  const [readerStartPage, setReaderStartPage] = useState<number>(1);

  const handleOpenReader = (page: number = 1) => {
    setReaderStartPage(page);
    setCurrentView('reader');
  };

  const handleCloseReader = () => {
    setCurrentView('hero');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0510] overflow-x-hidden">
      {/* ==================================================================== */}
      {/* 1. HERO SHOWCASE SCREEN (Departmental PRISMA 3.0 & Magazine Preview) */}
      {/* ==================================================================== */}
      {currentView === 'hero' && (
        <div className="animate-fade-in-up">
          <Hero
            onOpenReader={handleOpenReader}
            pdfUrl="/prisma_content.pdf"
          />
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. INTERACTIVE 3D FLIPBOOK READER                                    */}
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