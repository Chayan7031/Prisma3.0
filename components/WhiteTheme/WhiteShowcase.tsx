'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MagazineShowcase = dynamic(() => import('@/components/MagazineShowcase'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[650px] 2xl:max-w-[700px] h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#FF5722]/30 border-t-[#FF5722] rounded-full animate-spin mb-3" />
      <span className="text-xs uppercase tracking-widest text-[#FF5722] font-mono font-semibold">
        Loading 3D Magazine...
      </span>
    </div>
  ),
});

interface WhiteShowcaseProps {
  onOpenReader?: (page?: number) => void;
}

export const WhiteShowcase: React.FC<WhiteShowcaseProps> = ({ onOpenReader }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Soft Ambient Pedestal Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[650px] h-[350px] rounded-full bg-gradient-to-tr from-[#FF5722]/15 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Pure 3D Floating Magazine with zero enclosing window or extra buttons */}
      <div className="relative z-10 w-full flex items-center justify-center py-2 pb-4 sm:pb-8">
        <MagazineShowcase hideCta={true} onOpenReader={onOpenReader} />
      </div>
    </div>
  );
};

export default WhiteShowcase;
