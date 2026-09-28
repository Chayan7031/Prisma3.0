'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

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

function ReaderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  return (
    <Book
      initialPage={initialPage}
      showTOC={false}
      onClose={() => router.push('/')}
      title="PRISMA 3.0"
      subtitle="Department of Computer Science and Engineering • KGEC"
      pdfUrl="/prisma_content.pdf"
    />
  );
}

export default function ReadPage() {
  return (
    <main className="w-full h-screen bg-[#141210] overflow-hidden">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141210] text-[#c59b6d]">
            <div className="w-12 h-12 border-3 border-[#c59b6d]/30 border-t-[#c59b6d] rounded-full animate-spin mb-4" />
            <p className="font-serif text-lg tracking-widest uppercase">Opening PRISMA 3.0...</p>
          </div>
        }
      >
        <ReaderContent />
      </Suspense>
    </main>
  );
}
