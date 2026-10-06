'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { pageList } from '@/content/content';

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f4efe6] text-[#9e723e] select-none">
    <div className="w-12 h-12 border-2 border-[#9e723e]/30 border-t-[#9e723e] rounded-full animate-spin mb-4" />
    <p className="font-tech text-xl tracking-widest text-[#25221e] uppercase font-bold">
      PRISMA <span className="text-[#9e723e]">3.0</span>
    </p>
    <span className="text-xs text-[#8a8274] tracking-wider mt-1 font-sans">
      Opening Department Magazine...
    </span>
  </div>
);

// Dynamic import with SSR disabled for browser-only flipbook engine
const Book = dynamic(() => import('@/components/Book'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

function ReaderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : 1;

  return (
    <Book
      pages={pageList}
      initialPage={initialPage}
      showTOC={false}
      onClose={() => router.push('/')}
      title="PRISMA 3.0"
      subtitle="Department of Computer Science and Engineering • KGEC"
      pdfUrl="/prisma_content.pdf"
      initialTheme="parchment"
    />
  );
}

export default function ReadPage() {
  return (
    <main className="w-full h-screen bg-[#f4efe6] overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <ReaderContent />
      </Suspense>
    </main>
  );
}
