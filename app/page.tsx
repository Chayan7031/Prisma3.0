'use client';

import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';

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
    <div className="relative w-full min-h-screen bg-[#0a0510] overflow-x-hidden">
      {/* HERO SHOWCASE SCREEN (Departmental PRISMA 3.0 & Magazine Preview) */}
      <div className="animate-fade-in-up">
        <Hero
          onOpenReader={handleOpenReader}
          pdfUrl="/prisma_content.pdf"
        />
      </div>
    </div>
  );
}