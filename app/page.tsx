'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';

const MagazineShowcase = dynamic(
  () => import('@/components/MagazineShowcase').then((mod) => mod.MagazineShowcase),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[500px] flex items-center justify-center bg-[#F8F6F0]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#C58B35]/30 border-t-[#C58B35] rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#B47B2B] font-mono font-bold">
            Loading PRISMA 3.0 Showcase...
          </span>
        </div>
      </div>
    ),
  }
);

const PreviousMag = dynamic(
  () => import('@/components/MagazineShowcase').then((mod) => mod.PreviousMag),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] flex items-center justify-center bg-[#F4F1EA]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#112240]/30 border-t-[#112240] rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#112240] font-mono font-bold">
            Loading Archive Editions...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Home() {
  const router = useRouter();

  const handleOpenReader = (pageOrEdition: number | string = 1) => {
    if (typeof pageOrEdition === 'number' && pageOrEdition > 1) {
      router.push(`/read?page=${pageOrEdition}`);
    } else {
      router.push('/read');
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#070d18] overflow-x-hidden">
      {/* 1. UPPER HERO SHOWCASE SCREEN (Maintained by Department Team) */}
      <section className="animate-fade-in-up">
        <Hero
          onOpenReader={(p) => handleOpenReader(p || 1)}
          pdfUrl="/prisma_content.pdf"
        />
      </section>

      {/* 2 & 3. CONTINUOUS WARM PARCHMENT CANVAS: PRISMA 3.0 & ARCHIVE EDITIONS */}
      <div
        className="relative w-full bg-[#E8D3A8] text-[#1E293B] overflow-hidden select-none font-space"
        style={{
          backgroundImage: "url('/textures/parchment_texture.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
        }}
      >
        {/* Continuous Soft Ambient Vignette Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,248,225,0.45)_0%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_45%,rgba(195,168,120,0.22)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,rgba(195,168,120,0.22)_0%,transparent_60%)]" />
        </div>

        {/* Continuous Architectural Blueprint Grid Overlay (Zero Seams) */}
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(145, 115, 68, 0.18) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(145, 115, 68, 0.18) 1px, transparent 1px)
              `,
              backgroundSize: '160px 160px',
            }}
          />
        </div>

        {/* 2. MAIN PRISMA 3.0 EDITORIAL SHOWCASE (3D Opening Book, Overview & Glowing Stones) */}
        <MagazineShowcase
          onOpenReader={(p) => handleOpenReader(p || 1)}
          pdfUrl="/prisma_content.pdf"
          className="!bg-transparent"
        />

        {/* 3. ARCHIVE SECTION: PREVIOUS EDITIONS (PRISMA 2.0 & PRISMA 1.0 with 3D Opening Books) */}
        <PreviousMag
          onOpenReader={(edition) => handleOpenReader(edition || 1)}
          className="!bg-transparent"
        />
      </div>
    </main>
  );
}
