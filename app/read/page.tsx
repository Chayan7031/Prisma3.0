'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const Book = dynamic(() => import('@/components/Book'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141210] text-[#c59b6d]">
      <div className="w-12 h-12 border-3 border-[#c59b6d]/30 border-t-[#c59b6d] rounded-full animate-spin mb-4" />
      <p className="font-serif text-lg tracking-widest uppercase">Opening PRISMA 3.0...</p>
    </div>
  ),
});

export default function ReadPage() {
  const router = useRouter();

  return (
    <main className="w-full h-screen bg-[#141210] overflow-hidden">
      <Book
        onClose={() => router.push('/')}
        title="PRISMA 3.0"
        subtitle="Department of Computer Science and Engineering • KGEC"
        pdfUrl="/prisma_content.pdf"
      />
    </main>
  );
}
