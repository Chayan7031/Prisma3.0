'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Preloader } from '@/components/Preloader';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const MagazineShowcase = dynamic(() => import('@/components/MagazineShowcase'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[500px] bg-[#F1EDE2] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#FF4D00]/30 border-t-[#FF4D00] rounded-full animate-spin" />
    </div>
  ),
});
import {
  ArrowRight,
  Download,
  BookOpen,
  Calendar,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<'all' | '2026' | '2025' | '2024'>('all');

  const handleOpenReader = (page: number = 1) => {
    if (page > 1) {
      router.push(`/read?page=${page}`);
    } else {
      router.push('/read');
    }
  };

  const editions = [
    {
      id: 'prisma-2',
      volume: 'VOLUME 02',
      year: '2025',
      status: 'Archived Edition',
      statusColor: 'bg-[#FF4D00]/10 text-[#FF4D00] border-[#FF4D00]/30',
      title: 'PRISMA 2.0',
      theme: 'The Algorithmic Epoch • Intelligence, Systems & Future Compute',
      description:
        'The second departmental milestone chronicling the explosion of large language models, cloud native infrastructure, student hackathon podium finishes, and academic research papers.',
      coverImage: 'https://res.cloudinary.com/db9l85phg/image/upload/v1791316869/prisma2.0-cover_a3s0eb.jpg',
      pages: '24 Spreads',
      readUrl: '/read?page=1',
      pdfUrl: '/prisma_content.pdf',
      highlights: [
        'Large Language Models & Autonomous Agents',
        'High-Performance Distributed Cloud Architecture',
        'Quantum Computing & Cryptographic Protocols',
        'Alumni Memoirs: KGEC to Silicon Valley',
      ],
      current: false,
    },
    {
      id: 'prisma-1',
      volume: 'VOLUME 01',
      year: '2024',
      status: 'Inaugural Edition',
      statusColor: 'bg-white/10 text-slate-300 border-white/20',
      title: 'PRISMA 1.0',
      theme: 'Genesis of Innovation • Coding Tomorrow',
      description:
        'The historic inaugural publication that established the PRISMA legacy — uniting student engineers, faculty mentors, open-source contributors, and creative tech writers.',
      coverImage: '/prisma_1_cover.jpg',
      pages: '20 Spreads',
      readUrl: '/read?page=1',
      pdfUrl: '/prisma_content.pdf',
      highlights: [
        'Foundations of Modern Web Systems & Microservices',
        'Computer Vision on Edge Computing Hardware',
        'Open Source Culture & Student Hackathons',
        'Anthology of Departmental Tech Poems & Art',
      ],
      current: false,
    },
  ];

  const filteredEditions =
    selectedTag === 'all'
      ? editions
      : editions.filter((ed) => ed.year === selectedTag);

  return (
    <div className="relative w-full min-h-screen bg-[#121110] text-[#F8FAFC] overflow-x-hidden selection:bg-[#FF4D00]/30 selection:text-white flex flex-col justify-between">
      <Preloader />
      
      {/* Flagship Hero Section */}
      <Hero onOpenReader={handleOpenReader} pdfUrl="/prisma_content.pdf" />

      {/* 3D Magazine Showcase Section (Placed right after Hero) */}
      <MagazineShowcase onOpenReader={handleOpenReader} pdfUrl="/prisma_content.pdf" />

      {/* ========================================================================= */}
      {/* PREVIOUS MAGAZINES SECTION (Light Theme)                                  */}
      {/* ========================================================================= */}
      <section
        id="previous-magazines"
        className="relative z-20 w-full h-[100dvh] bg-[#F1EDE2] text-[#161121] overflow-hidden font-space flex items-center justify-center border-t border-[#161121]/10"
      >
        {/* Background Decorative Images & Animations */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Left Flower (Right half visible) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 w-[80vw] sm:w-[60vw] max-w-[800px] aspect-square opacity-70">
            <Image src="/book-bg-flower.png" alt="Flower Decoration" fill className="object-contain" />
          </div>
          
          {/* Right Flower (Left half visible) */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-[80vw] sm:w-[60vw] max-w-[800px] aspect-square opacity-70">
            <Image src="/book-bg-flower.png" alt="Flower Decoration" fill className="object-contain" />
          </div>
          
          {/* Animated Tech Orbits */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vh] aspect-square border border-[#161121]/5 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vh] aspect-square border border-[#BE953E]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute inset-0 bg-[url('/design_grid.svg')] opacity-[0.03] mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 py-10 flex flex-col md:flex-row items-center justify-center gap-16 lg:gap-32">
          
          {/* LEFT COLUMN: Typography & Header */}
          <div className="flex-1 flex flex-col justify-center items-center text-center max-w-lg">
            <style>{`
              @keyframes scaleLineX {
                0% { transform: scaleX(0); opacity: 0; }
                100% { transform: scaleX(1); opacity: 1; }
              }
              .animate-scale-line {
                animation: scaleLineX 1.5s cubic-bezier(0.23, 1, 0.32, 1) 0.3s forwards;
              }
              .animate-fade-in-diamond {
                animation: fade-in-up 1s cubic-bezier(0.23, 1, 0.32, 1) 0.6s forwards;
              }
            `}</style>

            {/* Premium Wide Spreading Line Animation */}
            <div className="flex items-center justify-center gap-4 w-full max-w-[300px] sm:max-w-[400px] mb-8 select-none">
              <div className="h-[2px] w-full bg-gradient-to-l from-[#FF4D00] to-transparent origin-right animate-scale-line scale-x-0" />
              <div className="relative w-3 h-3 flex-shrink-0 opacity-0 translate-y-2 animate-fade-in-diamond">
                <div className="absolute inset-0 border-2 border-[#FF4D00] rotate-45 animate-[spin_4s_linear_infinite]" />
              </div>
              <div className="h-[2px] w-full bg-gradient-to-r from-[#FF4D00] to-transparent origin-left animate-scale-line scale-x-0" />
            </div>

            <h2 className="relative z-10 font-samarkan text-6xl sm:text-[80px] lg:text-[100px] xl:text-[120px] tracking-wide text-[#161121] lowercase leading-[0.85] mb-6 md:mb-8 select-none animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              previous<br/><span className="text-[#FF4D00]">editions</span>
            </h2>
            
            <p className="relative z-10 text-xs sm:text-sm lg:text-base font-space text-[#555555] leading-relaxed max-w-sm animate-fade-in-up mx-auto" style={{ animationDelay: '300ms' }}>
              Explore the historical archive of our annual departmental publication — chronicling faculty research, student engineering breakthroughs, alumni memoirs, and creative literature.
            </p>
          </div>

          {/* RIGHT COLUMN: Book Showcase Grid */}
          <div className="flex-1 w-full flex justify-center items-center gap-6 sm:gap-10 lg:gap-16">
            {filteredEditions.slice(0, 2).map((edition, index) => (
              <div 
                key={edition.id} 
                className="group relative flex flex-col items-center w-[150px] sm:w-[200px] lg:w-[260px] animate-fade-in-up" 
                style={{ animationDelay: `${(index + 2) * 200}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                
                {/* 3D Book Cover Container */}
                <div className="relative w-full aspect-[3/4] mb-8 [perspective:1200px]">
                  {/* Book Element (Tilts symmetrically on hover based on index) */}
                  <div 
                    className={`relative w-full h-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_15px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_60px_rgba(255,77,0,0.2),_inset_2px_2px_5px_rgba(255,255,255,0.3)] border border-[#161121]/10 rounded-r-lg rounded-l-sm bg-[#161121] overflow-hidden ${
                      index === 0 
                        ? 'group-hover:[transform:rotateY(-18deg)_rotateX(5deg)_scale(1.05)]' 
                        : 'group-hover:[transform:rotateY(18deg)_rotateX(5deg)_scale(1.05)]'
                    }`}
                  >
                    <Image
                      src={edition.coverImage}
                      alt={edition.title}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Spine Binding Hinge Effect (Simulates the fold of a book cover) */}
                    <div className="absolute top-0 bottom-0 left-0 w-3 lg:w-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent mix-blend-overlay z-10" />
                    
                    {/* Dynamic Lighting Glare (Appears on tilt) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                    {/* Dark Hover Overlay & Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161121]/90 via-[#161121]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-20">
                      <span className="font-mono text-[#F1EDE2] text-[10px] lg:text-xs font-bold tracking-[0.3em] uppercase drop-shadow-md">
                        {edition.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info & Button */}
                <div className="text-center w-full">
                  <div className="text-[9px] lg:text-[10px] font-mono font-bold tracking-[0.25em] text-[#555555] uppercase mb-1">
                    {edition.volume}
                  </div>
                  <h3 className="font-samarkan text-2xl sm:text-3xl lg:text-4xl text-[#161121] lowercase mb-4 group-hover:text-[#BE953E] transition-colors">
                    {edition.title.replace('PRISMA', 'prisma')}
                  </h3>
                  
                  <Link
                    href={edition.readUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 w-full sm:w-auto rounded-none bg-[#FF4D00] hover:bg-[#E64500] text-white font-mono font-bold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(255,77,0,0.3)] hover:shadow-[0_8px_25px_rgba(255,77,0,0.4)]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read</span>
                  </Link>
                </div>
                
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Global Archival Footer (Matches Hero UI) */}
      <Footer />
    </div>
  );
}
