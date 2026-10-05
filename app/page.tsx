'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const handleOpenReader = (page: number = 1) => {
    if (page > 1) {
      router.push(`/read?page=${page}`);
    } else {
      router.push('/read');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#11100F] text-[#1E1B18] overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-[#070d18] min-h-screen text-white">
        <Hero onOpenReader={handleOpenReader} pdfUrl="/prisma_content.pdf" />
      </div>

      {/* Details Section (Target for "SCROLL DOWN") */}
      <section
        id="details-section"
        className="relative z-20 w-full max-w-7xl mx-auto px-6 py-20 text-[#E8E2D8] bg-[#11100F]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FF5722]">
              Department of Computer Science & Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mt-2 text-white">
              PRISMA 3.0 <span className="font-samarkan text-[#FF5722] text-4xl sm:text-5xl ml-2">प्रिज्मा</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm font-mono text-neutral-400 leading-relaxed">
            The official departmental magazine embodying cutting-edge research, alumni memoirs, artistic design, and technological foresight.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-[#1A1816] border border-white/5 hover:border-[#FF5722]/40 transition-all group">
            <div className="text-[10px] font-mono text-[#FF5722] tracking-widest uppercase mb-3">
              01 • Digital Publication
            </div>
            <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#FF5722] transition-colors">
              3D Interactive Flipbook
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Turn pages in authentic dual-spread simulation with full zoom, navigation, and crisp high-resolution renders.
            </p>
            <button
              onClick={() => handleOpenReader(1)}
              className="inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-[#FF5722] transition-colors cursor-pointer"
            >
              <span>Launch Reader</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-[#1A1816] border border-white/5 hover:border-[#FF5722]/40 transition-all group">
            <div className="text-[10px] font-mono text-[#FF5722] tracking-widest uppercase mb-3">
              03 • High Definition
            </div>
            <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#FF5722] transition-colors">
              Offline PDF Archive
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              Download the complete, unabridged departmental edition for offline archival and print reading.
            </p>
            <a
              href="/prisma_content.pdf"
              download="PRISMA_3.0_CSE_KGEC.pdf"
              className="inline-flex items-center gap-2 text-xs font-mono text-white group-hover:text-[#FF5722] transition-colors cursor-pointer"
            >
              <span>Download PDF</span>
              <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
