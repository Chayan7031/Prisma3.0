'use client';

import React from 'react';

/**
 * Regal line-art illustration of a lion crowned with flora and lilies
 * Inspired by Devi Durga's vahana and classical Indian botanical sketches
 */
export const LionFloraIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lionStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2622" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#FF5722" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2A2622" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Lily and Lotus Blooms Crown */}
      <g stroke="url(#lionStrokeGrad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Top central flower */}
        <path d="M200 40 C190 25, 210 25, 200 10 C190 25, 170 30, 185 45 C170 40, 160 55, 180 60 C165 65, 170 80, 190 75 C195 85, 210 85, 205 70 C220 75, 230 60, 215 55 C230 50, 225 35, 210 40 Z" />
        <path d="M195 45 Q200 25 205 45" />
        <path d="M185 55 Q200 45 215 55" />

        {/* Right side cascading lilies */}
        <path d="M235 65 C255 45, 275 60, 265 80 C285 75, 295 95, 280 110 C295 120, 285 140, 265 135 C270 150, 255 160, 240 145 C235 130, 220 120, 235 105 Z" />
        <path d="M250 85 Q265 95 255 115" />
        <path d="M260 100 Q275 110 265 125" />
        
        {/* Flower stamens with fine pollen tips */}
        <circle cx="200" cy="20" r="1.5" fill="#FF5722" fillOpacity="0.4" />
        <circle cx="215" cy="28" r="1.5" fill="#FF5722" fillOpacity="0.4" />
        <circle cx="185" cy="28" r="1.5" fill="#FF5722" fillOpacity="0.4" />
        <circle cx="270" cy="70" r="1.5" fill="#FF5722" fillOpacity="0.4" />
        <circle cx="280" cy="90" r="1.5" fill="#FF5722" fillOpacity="0.4" />
      </g>

      {/* Majestic Lion Head Outline */}
      <g stroke="url(#lionStrokeGrad)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {/* Cranium and Forehead */}
        <path d="M150 140 C170 125, 230 125, 250 140 C265 155, 260 180, 255 200" />
        {/* Forehead wrinkles and noble brow lines */}
        <path d="M175 150 Q200 142 225 150" />
        <path d="M180 160 Q200 152 220 160" />
        <path d="M185 170 Q200 164 215 170" />

        {/* Eyes - Deep, discerning, meditative */}
        {/* Left eye */}
        <path d="M165 185 C175 180, 185 180, 192 188 C185 192, 175 192, 165 185 Z" fill="#2A2622" fillOpacity="0.08" />
        <circle cx="180" cy="186" r="3" fill="#2A2622" fillOpacity="0.35" />
        <path d="M160 180 Q178 175 195 182" />

        {/* Right eye */}
        <path d="M208 188 C215 180, 225 180, 235 185 C225 192, 215 192, 208 188 Z" fill="#2A2622" fillOpacity="0.08" />
        <circle cx="220" cy="186" r="3" fill="#2A2622" fillOpacity="0.35" />
        <path d="M205 182 Q222 175 240 180" />

        {/* Nose Bridge and Muzzle */}
        <path d="M194 190 L192 230 C190 240, 175 250, 180 260 C185 270, 215 270, 220 260 C225 250, 210 240, 208 230 L206 190" />
        {/* Nose leather */}
        <path d="M188 245 C195 240, 205 240, 212 245 C215 252, 208 258, 200 258 C192 258, 185 252, 188 245 Z" fill="#2A2622" fillOpacity="0.15" />
        
        {/* Whisker pads & chin */}
        <path d="M188 255 C175 258, 165 270, 175 285 C185 295, 200 295, 200 285" />
        <path d="M212 255 C225 258, 235 270, 225 285 C215 295, 200 295, 200 285" />
        <path d="M190 295 C195 305, 205 305, 210 295" />

        {/* Whiskers */}
        <path d="M170 270 Q140 275 115 285" strokeWidth="0.8" />
        <path d="M168 276 Q135 285 110 300" strokeWidth="0.8" />
        <path d="M172 282 Q142 295 120 315" strokeWidth="0.8" />
        <path d="M230 270 Q260 275 285 285" strokeWidth="0.8" />
        <path d="M232 276 Q265 285 290 300" strokeWidth="0.8" />
        <path d="M228 282 Q258 295 280 315" strokeWidth="0.8" />

        {/* Mane - Flowing organic tresses framing face */}
        <path d="M145 155 C120 170, 110 200, 115 230 C105 250, 95 280, 105 310 C85 330, 80 370, 95 400 C110 430, 140 450, 175 460" />
        <path d="M255 155 C280 170, 290 200, 285 230 C295 250, 305 280, 295 310 C315 330, 320 370, 305 400 C290 430, 260 450, 225 460" />
        
        {/* Layered mane strands */}
        <path d="M130 190 C140 220, 135 250, 145 280 C135 305, 125 335, 135 365" strokeWidth="0.8" />
        <path d="M270 190 C260 220, 265 250, 255 280 C265 305, 275 335, 265 365" strokeWidth="0.8" />
        <path d="M150 320 C160 360, 155 390, 170 420" strokeWidth="0.8" />
        <path d="M250 320 C240 360, 245 390, 230 420" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

/**
 * Translucent botanical wing and flora flourish
 * Inspired by natural metamorphosis, wings of innovation, and organic computing
 */
export const WingFloraIllustration: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 360 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wingStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2A2622" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#FF5722" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2A2622" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Butterfly Wing Veins */}
      <g stroke="url(#wingStrokeGrad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Wing Boundary */}
        <path d="M10 220 C40 160, 90 90, 160 40 C220 -5, 280 10, 310 50 C340 90, 330 150, 300 200 C270 250, 240 280, 250 330 C260 380, 220 420, 170 430 C120 440, 70 410, 50 360 C30 310, 20 270, 10 220 Z" />

        {/* Primary Structural Veins */}
        <path d="M50 250 C110 210, 180 160, 270 120" />
        <path d="M60 260 C130 240, 200 220, 280 210" />
        <path d="M70 270 C120 280, 180 300, 230 350" />
        <path d="M80 290 C110 320, 140 360, 170 410" />

        {/* Secondary Delicate Sub-Veins */}
        <path d="M140 185 C170 140, 210 100, 260 70" strokeWidth="0.8" />
        <path d="M170 165 C210 140, 245 125, 290 120" strokeWidth="0.8" />
        <path d="M190 220 C230 210, 260 220, 285 240" strokeWidth="0.8" />
        <path d="M180 260 C210 270, 230 290, 245 320" strokeWidth="0.8" />
        <path d="M130 300 C155 320, 175 350, 195 380" strokeWidth="0.8" />

        {/* Botanical vines entwined with the wing */}
        <path d="M40 380 C60 360, 80 340, 85 310 C90 280, 105 250, 120 220 C135 190, 140 150, 130 120 C120 90, 140 60, 160 40" strokeWidth="1" strokeDasharray="3 3" />
        
        {/* Little leaves branching off */}
        <path d="M85 330 C95 325, 105 330, 100 340 C95 350, 85 345, 85 330 Z" fill="#2A2622" fillOpacity="0.05" />
        <path d="M110 260 C120 255, 130 260, 125 270 C120 280, 110 275, 110 260 Z" fill="#2A2622" fillOpacity="0.05" />
        <path d="M135 180 C145 175, 155 180, 150 190 C145 200, 135 195, 135 180 Z" fill="#2A2622" fillOpacity="0.05" />
      </g>
    </svg>
  );
};
