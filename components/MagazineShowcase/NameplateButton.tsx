'use client';

import React from 'react';

export interface NameplateButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  download?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  asBadge?: boolean;
}

export const NameplateButton: React.FC<NameplateButtonProps> = ({
  text,
  onClick,
  href,
  download,
  className = '',
  size = 'md',
  icon,
  asBadge = false,
}) => {
  // Sizing variants
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm sm:text-base min-h-[38px] rounded-[16px]',
    md: 'px-7 py-3 text-base sm:text-lg min-h-[48px] rounded-[22px]',
    lg: 'px-9 py-4 text-lg sm:text-xl min-h-[58px] rounded-[26px]',
  }[size];

  const content = (
    <>
      {/* Top Specular Rim Metallic Highlight */}
      <span
        className="absolute inset-x-2 top-0 h-[1.5px] rounded-full pointer-events-none opacity-85"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.95) 25%, rgba(255,255,255,0.9) 75%, rgba(255,255,255,0.2) 100%)',
          boxShadow: '0 1px 2px rgba(255,255,255,0.4)',
        }}
      />

      {/* Bottom-Left Electric Neon Blue / Cyan Crescent Glow Arc */}
      <span
        className="absolute -bottom-[1px] -left-[1px] w-[52%] h-[68%] rounded-bl-[24px] pointer-events-none transition-all duration-300"
        style={{
          borderBottom: '2.5px solid #00B4D8',
          borderLeft: '2.5px solid #0077B6',
          filter: 'drop-shadow(-3px 5px 10px rgba(0, 180, 216, 0.85)) drop-shadow(-1px 2px 4px rgba(0, 119, 182, 0.95))',
          maskImage: 'linear-gradient(to top right, black 40%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to top right, black 40%, transparent 85%)',
        }}
      />

      {/* Internal Corner Cyan Ambient Bloom */}
      <span
        className="absolute bottom-0 left-0 w-16 h-12 rounded-bl-full pointer-events-none opacity-60 group-hover:opacity-90 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 10% 90%, rgba(0, 212, 255, 0.45) 0%, rgba(0, 119, 182, 0.15) 50%, transparent 80%)',
        }}
      />

      {/* Centered Content with Icon & Text */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 font-sans font-semibold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
        {icon && <span className="inline-flex items-center text-cyan-300">{icon}</span>}
        <span>{text}</span>
      </span>
    </>
  );

  const sharedStyles: React.CSSProperties = {
    background: 'linear-gradient(180deg, #2D3036 0%, #1A1C20 52%, #101215 100%)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: `
      inset 0 1.5px 0.5px rgba(255, 255, 255, 0.65),
      inset 0 -1.5px 1px rgba(0, 0, 0, 0.9),
      inset 2px -2px 6px -1px rgba(0, 180, 216, 0.6),
      -4px 7px 18px -2px rgba(0, 150, 255, 0.45),
      0 10px 22px -4px rgba(0, 0, 0, 0.5)
    `,
  };

  if (asBadge) {
    return (
      <div
        className={`group relative inline-flex items-center justify-center select-none overflow-hidden ${sizeClasses} ${className}`}
        style={sharedStyles}
      >
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={`group relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${sizeClasses} ${className}`}
        style={sharedStyles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${sizeClasses} ${className}`}
      style={sharedStyles}
    >
      {content}
    </button>
  );
};

export default NameplateButton;
