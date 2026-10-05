'use client';

import React from 'react';

interface PrismaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'samarkan' | 'delta';
  showSubtitle?: boolean;
  className?: string;
}

export const PrismaLogo: React.FC<PrismaLogoProps> = ({
  size = 'lg',
  variant = 'samarkan',
  showSubtitle = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl lg:text-6xl',
    xl: 'text-5xl sm:text-6xl lg:text-7xl',
  };

  if (variant === 'samarkan') {
    return (
      <div className={`flex flex-col group select-none ${className}`}>
        <div className={`flex items-baseline gap-2 leading-none ${sizeClasses[size]}`}>
          <span className="font-samarkan lowercase tracking-wide text-[#161121] transition-opacity group-hover:opacity-85">
            prisma
          </span>
          <span className="font-space font-black text-[#BE953E] tracking-tight">
            3.0
          </span>
        </div>
        {showSubtitle && (
          <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#555555] uppercase font-semibold">
              KGEC CSE DEPARTMENT / ANNUAL MAGAZINE
            </span>
          </div>
        )}
      </div>
    );
  }

  const deltaHeights = {
    sm: 'w-[0.78em] h-[0.88em]',
    md: 'w-[0.8em] h-[0.9em]',
    lg: 'w-[0.82em] h-[0.92em]',
    xl: 'w-[0.84em] h-[0.94em]',
  };

  return (
    <div className={`flex flex-col group select-none ${className}`}>
      {/* Main Wordmark */}
      <div className={`flex items-baseline font-space font-black tracking-[0.02em] leading-none ${sizeClasses[size]}`}>
        {/* "PRISM" in solid crisp white */}
        <span className="text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)] transition-colors group-hover:text-slate-100">
          PRISM
        </span>

        {/* Delta "A" Triangle matching Reference 1 */}
        <span className={`relative inline-block mx-[0.06em] self-center ${deltaHeights[size]}`}>
          <svg
            viewBox="0 0 100 110"
            className="w-full h-full overflow-visible drop-shadow-[0_0_16px_rgba(0,217,255,0.45)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="prismaDeltaA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7DD3FC" />
                <stop offset="35%" stopColor="#38BDF8" />
                <stop offset="70%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>

              {/* Inner cutout shadow */}
              <linearGradient id="prismaDeltaCutout" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#050B16" />
                <stop offset="100%" stopColor="#071426" />
              </linearGradient>
            </defs>

            {/* Outer Delta Triangle */}
            <polygon
              points="50,6 97,104 3,104"
              fill="url(#prismaDeltaA)"
            />

            {/* Inner Negative Space Cutout */}
            <polygon
              points="50,52 74,104 26,104"
              fill="url(#prismaDeltaCutout)"
            />

            {/* Subtle glow edge on the crossbar */}
            <line
              x1="26"
              y1="104"
              x2="74"
              y2="104"
              stroke="#050B16"
              strokeWidth="2"
            />
          </svg>
        </span>

        {/* Space and "3.0" with smooth electric cyan to violet gradient */}
        <span className="ml-[0.18em] font-black tracking-tight bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
          3.0
        </span>
      </div>

      {/* Subtitle Badge */}
      {showSubtitle && (
        <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#00D9FF] uppercase font-medium">
            KGEC CSE DEPARTMENT
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          <span className="text-[8px] sm:text-[9px] font-mono tracking-wider text-slate-400 uppercase hidden sm:inline">
            ANNUAL MAGAZINE
          </span>
        </div>
      )}
    </div>
  );
};

export default PrismaLogo;
