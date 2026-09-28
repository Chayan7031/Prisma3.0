'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';

const LoadingScreen = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070d18] text-[#00a8ff] select-none">
    <div className="w-12 h-12 border-2 border-[#00a8ff]/30 border-t-[#00a8ff] rounded-full animate-spin mb-4" />
    <p className="font-tech text-xl tracking-widest text-white uppercase font-bold">
      PRISMA <span className="text-[#00a8ff]">3.0</span>
    </p>
    <span className="text-xs text-slate-400 tracking-wider mt-1 font-sans">
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
    <main className="w-full h-screen bg-[#070d18] overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <ReaderContent />
      </Suspense>
    </main>
  );
}
