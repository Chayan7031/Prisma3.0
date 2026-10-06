'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import Link from 'next/link';
import Image from 'next/image';
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
      id: 'prisma-3',
      volume: 'VOLUME 03',
      year: '2026',
      status: 'Current Flagship',
      statusColor: 'bg-[#00D9FF]/10 text-[#00D9FF] border-[#00D9FF]/30',
      title: 'PRISMA 3.0',
      theme: 'Women in Tech • How Technology Is Becoming Ubiquitous',
      description:
        'The flagship 2026 edition exploring artificial intelligence frontiers, gender parity in computing, zero-trust cybersecurity, and the visionary students shaping tomorrow’s engineering landscape.',
      coverImage: 'https://res.cloudinary.com/daybrhbsc/image/upload/v1790614624/prisma_magazine_cover_page.jpg',
      pages: '21 Spreads',
      readUrl: '/read',
      pdfUrl: '/prisma_content.pdf',
      highlights: [
        'Generative AI Models & Neural Architectures',
        'Women in Tech: Leadership & Innovation',
        'Zero-Trust Security & Modern Cryptography',
        'KGEC Faculty Breakthroughs & Student Startups',
      ],
      current: true,
    },
    {
      id: 'prisma-2',
      volume: 'VOLUME 02',
      year: '2025',
      status: 'Archived Edition',
      statusColor: 'bg-[#C084FC]/10 text-[#C084FC] border-[#C084FC]/30',
      title: 'PRISMA 2.0',
      theme: 'The Algorithmic Epoch • Intelligence, Systems & Future Compute',
      description:
        'The second departmental milestone chronicling the explosion of large language models, cloud native infrastructure, student hackathon podium finishes, and academic research papers.',
      coverImage: '/prisma_logo.jpg',
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
      
      {/* Flagship Hero Section */}
      <Hero onOpenReader={handleOpenReader} pdfUrl="/prisma_content.pdf" />

      {/* ========================================================================= */}
      {/* PREVIOUS MAGAZINES SECTION (On the same page, right after Hero)            */}
      {/* ========================================================================= */}
      <section
        id="previous-magazines"
        className="relative z-20 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 border-t border-white/5 scroll-mt-6"
      >
        {/* Masthead Banner */}
        <div className="space-y-4 max-w-3xl pb-8 border-b border-white/10">
          {/* Departmental Archives Label in Image 3 Script Style */}
          <div className="relative inline-flex flex-col items-start select-none pt-1">
            <span className="font-script text-2xl sm:text-3xl text-slate-100 font-bold tracking-wide drop-shadow-[0_0_16px_rgba(0,217,255,0.4)]">
              Departmental Archives • 2024 — 2026
            </span>
            {/* Signature Underline Brush Accent from Reference Image 3 */}
            <svg viewBox="0 0 200 8" className="w-40 sm:w-52 h-2 -mt-1 text-[#00D9FF] overflow-visible" fill="none">
              <path d="M 2 4 Q 80 7 195 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
            </svg>
          </div>

          {/* Masthead Title in "Women in Tech" Style (Single Line) */}
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 pt-1 pb-1">
            {/* Left Bracket with Tech Accents */}
            <div className="hidden sm:flex items-center gap-1.5 select-none">
              <span className="text-3xl sm:text-4xl text-[#C084FC] font-light leading-none">&#123;</span>
              <div className="flex flex-col text-[7px] font-mono tracking-widest text-slate-400 uppercase leading-[1.1]">
                <span className="text-slate-300">READ</span>
                <span className="text-[#00D9FF]">BUILD</span>
                <span className="text-[#C084FC]">LEAD</span>
                <span className="text-slate-300">ARCHIVE</span>
              </div>
            </div>

            {/* "Previous" in Women script */}
            <span className="font-script font-bold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#00D9FF] leading-none drop-shadow-[0_0_20px_rgba(192,132,252,0.4)] select-none">
              Previous
            </span>

            {/* "EDITIONS OF" in small cyan tech lettering */}
            <span className="text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.25em] text-[#00D9FF] uppercase font-semibold">
              EDITIONS OF
            </span>

            {/* "PRISMA" in TECH bold geometric styling */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-space tracking-tight text-white leading-none inline-block">
              PRISMA
            </h2>

            {/* Right Accent Bar and Sub-Tagline */}
            <div className="hidden md:flex items-center gap-3 pl-3 border-l-2 border-[#00D9FF]/40">
              <div className="text-[8px] font-mono tracking-widest uppercase leading-tight">
                <div className="text-[#00D9FF]">HERITAGE</div>
                <div className="text-slate-300">COLLECTION</div>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed font-space max-w-2xl">
            Explore the historical archive of our annual departmental publication — chronicling faculty research, student engineering breakthroughs, alumni memoirs, and creative literature from Kalyani Government Engineering College.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-4">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedTag === 'all'
                  ? 'bg-[#00AFFF] text-[#050B16] font-bold shadow-[0_0_15px_rgba(0,175,255,0.35)]'
                  : 'bg-[#071426] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              All Volumes ({editions.length})
            </button>
            <button
              onClick={() => setSelectedTag('2026')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedTag === '2026'
                  ? 'bg-[#00AFFF] text-[#050B16] font-bold shadow-[0_0_15px_rgba(0,175,255,0.35)]'
                  : 'bg-[#071426] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              PRISMA 3.0 (2026)
            </button>
            <button
              onClick={() => setSelectedTag('2025')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedTag === '2025'
                  ? 'bg-[#00AFFF] text-[#050B16] font-bold shadow-[0_0_15px_rgba(0,175,255,0.35)]'
                  : 'bg-[#071426] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              PRISMA 2.0 (2025)
            </button>
            <button
              onClick={() => setSelectedTag('2024')}
              className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                selectedTag === '2024'
                  ? 'bg-[#00AFFF] text-[#050B16] font-bold shadow-[0_0_15px_rgba(0,175,255,0.35)]'
                  : 'bg-[#071426] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              PRISMA 1.0 (2024)
            </button>
          </div>
        </div>

        {/* Editions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredEditions.map((edition) => (
            <div
              key={edition.id}
              className={`relative rounded-2xl bg-[#071426]/80 border ${
                edition.current ? 'border-[#00D9FF]/40 shadow-[0_0_30px_rgba(0,175,255,0.15)]' : 'border-white/10'
              } p-6 sm:p-7 flex flex-col justify-between hover:border-[#00D9FF]/50 transition-all duration-300 group`}
            >
              <div>
                {/* Header Tag and Year */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border ${edition.statusColor}`}
                  >
                    {edition.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00D9FF]" />
                    {edition.year}
                  </span>
                </div>

                {/* Cover Image Preview */}
                <div className="relative w-full h-[240px] rounded-xl overflow-hidden mb-6 bg-[#050B16] border border-white/10 group-hover:border-[#00D9FF]/40 transition-colors">
                  <Image
                    src={edition.coverImage}
                    alt={edition.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Page Count Badge */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#050B16]/90 border border-white/15 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
                    {edition.pages}
                  </div>
                </div>

                {/* Title & Theme */}
                <h3 className="text-2xl font-bold text-white font-space mb-1 group-hover:text-[#00D9FF] transition-colors">
                  {edition.title}
                </h3>
                <div className="text-xs font-mono text-[#00D9FF] tracking-wide mb-3">
                  {edition.theme}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 font-space leading-relaxed mb-6">
                  {edition.description}
                </p>

                {/* Key Highlights Checklist */}
                <div className="space-y-1.5 pb-6 border-t border-white/5 pt-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                    Key Features & Topics
                  </div>
                  {edition.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-space text-slate-300">
                      <span className="text-[#00D9FF] mt-0.5">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <Link
                  href={edition.readUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00AFFF] hover:bg-[#00D9FF] text-[#050B16] font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,175,255,0.25)] cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{edition.current ? 'Launch 3D Reader' : 'Read Edition'}</span>
                </Link>

                <a
                  href={edition.pdfUrl}
                  download={`${edition.title.replace(' ', '_')}_CSE_KGEC.pdf`}
                  className="inline-flex items-center justify-center p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Download Offline PDF Archive"
                >
                  <Download className="w-4 h-4 text-[#00D9FF]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Department Archival Credentials Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#071426] via-[#091b33] to-[#071426] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#00D9FF] uppercase">
              <GraduationCap className="w-4 h-4 text-[#00D9FF]" />
              <span>COLLEGE ARCHIVE REPOSITORY</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white font-space">
              Contribute to the Upcoming PRISMA Edition
            </h4>
            <p className="text-xs text-slate-400 font-space leading-relaxed">
              Are you a student, researcher, or faculty member of KGEC CSE? Submissions for technical papers, alumni memoirs, and artistic spreads open annually each autumn.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/v2"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs tracking-wider uppercase transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>Experience White Edition (V2)</span>
            </Link>
          </div>
        </div>

        {/* Global Footer */}
        <footer className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 Kalyani Government Engineering College • Department of Computer Science & Engineering
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/read" className="hover:text-white transition-colors">
              Reader
            </Link>
            <a href="#previous-magazines" className="hover:text-white transition-colors text-[#00D9FF]">
              Previous Magazines
            </a>
            <Link href="/v2" className="hover:text-white transition-colors">
              White Edition
            </Link>
            <a href="/prisma_content.pdf" download className="hover:text-white transition-colors">
              PDF
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
