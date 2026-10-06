'use client';

import React from 'react';

interface SamarkanNumber30Props {
  className?: string;
  color?: string;
}

export const SamarkanNumber30: React.FC<SamarkanNumber30Props> = ({
  className = 'h-[0.76em] w-auto inline-block',
  color = '#FF5900',
}) => {
  return (
    <svg
      viewBox="0 0 106 72"
      className={className}
      style={{ color }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="3.0"
    >
      {/* Shirorekha Top Bar */}
      <rect x="4" y="6" width="98" height="5.5" rx="0.5" fill="currentColor" />

      {/* 3 hanging stem */}
      <rect x="18" y="11.5" width="5.5" height="9" fill="currentColor" />

      {/* 3 body - authentic Devanagari/Samarkan glyph */}
      <path
        d="M 18 20.5 H 23.5 C 33 20.5 41 23.5 41 30.5 C 41 36 34.5 38.5 27 39 L 14 39 L 26 42 C 37 43.5 44 48.5 44 56.5 C 44 63.5 36.5 67 25 67 C 18 67 12.5 64 12 59 L 17.5 57.5 C 18 60 21 61.8 25 61.8 C 32.5 61.8 38 59 38 55 C 38 49.5 31.5 46.5 22 45 L 18 44.5 L 23 41 C 31 39.5 35 36.5 35 30.5 C 35 25.5 30 24.5 23.5 24.5 H 18 V 20.5 Z"
        fill="currentColor"
      />

      {/* Diamond Dot */}
      <polygon points="50,57.5 54,61.5 50,65.5 46,61.5" fill="currentColor" />

      {/* 0 hanging stem */}
      <rect x="74" y="11.5" width="5.5" height="9" fill="currentColor" />

      {/* 0 loop */}
      <path
        d="M 76.75 20.5 C 88 20.5 97 29.5 97 43.5 C 97 57.5 88 66.5 76.75 66.5 C 65.5 66.5 56.5 57.5 56.5 43.5 C 56.5 29.5 65.5 20.5 76.75 20.5 Z M 76.75 26 C 69 26 62.5 33.5 62.5 43.5 C 62.5 53.5 69 61 76.75 61 C 84.5 61 91 53.5 91 43.5 C 91 33.5 84.5 26 76.75 26 Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SamarkanNumber30;
