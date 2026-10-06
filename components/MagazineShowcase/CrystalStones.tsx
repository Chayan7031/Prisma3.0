'use client';

import React from 'react';

export const CrystalStones: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-visible ${className}`}
      aria-hidden="true"
    >
      {/* Soft, Gentle Ambient Warmth Behind Book (Low Opacity, No Harsh Glow) */}
      <div className="absolute w-[440px] sm:w-[500px] lg:w-[560px] h-[440px] sm:h-[500px] lg:h-[560px] rounded-full pointer-events-none opacity-40">
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 45% 45%, rgba(186, 215, 233, 0.35) 0%, rgba(220, 200, 160, 0.20) 45%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle, Understated Translucent Faceted Crystal Stones */}
      <svg
        viewBox="0 0 600 500"
        className="relative w-[480px] sm:w-[560px] lg:w-[620px] h-[400px] sm:h-[460px] lg:h-[520px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Natural, Soft, Muted Crystal Gradients (Subtle Ice & Pale Mineral) */}
          <linearGradient id="softIceFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d80b9" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#5da4c5" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#9BC2D8" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="softMutedCyan" x1="0%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#3fabc0" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#1dabe4" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="softPaleLavender" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#672dc5" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ae56b6" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="softPaleRose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#803955" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D5B6C5" stopOpacity="0.20" />
          </linearGradient>

          <linearGradient id="softTranslucentQuartz" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#b2be86" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#255c7e" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ========================================================= */}
        {/* LEFT FORMATION: SUBTLE FACETED CRYSTAL FORMATION          */}
        {/* ========================================================= */}
        <g className="crystal-left-formation">
          {/* Back Facet 1: Soft Pale Lavender Base */}
          <polygon
            points="70,160 145,115 160,240 85,270"
            fill="url(#softPaleLavender)"
            opacity="0.6"
          />

          {/* Back Facet 2: Upper Soft Quartz Spire */}
          <polygon
            points="145,115 185,75 220,135 155,170"
            fill="url(#softTranslucentQuartz)"
            opacity="0.65"
          />

          {/* Main Crystal Stone Apex (Left Primary Crystal Face) */}
          <polygon
            points="55,190 135,135 170,225 110,265"
            fill="url(#softMutedCyan)"
            opacity="0.7"
          />

          {/* Upper Reflective Facet */}
          <polygon
            points="135,135 180,85 170,225"
            fill="url(#softIceFacet)"
            opacity="0.65"
          />

          {/* Lower Muted Rose/Lavender Facet */}
          <polygon
            points="110,265 170,225 180,310 135,325"
            fill="url(#softPaleRose)"
            opacity="0.6"
          />

          {/* Bottom Shadow Facet */}
          <polygon
            points="85,270 135,325 180,310 160,240"
            fill="url(#softPaleLavender)"
            opacity="0.5"
          />

          {/* Delicate Crisp Ridge Lines (Natural Mineral Edges) */}
          <line
            x1="135"
            y1="135"
            x2="170"
            y2="225"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="55"
            y1="190"
            x2="135"
            y2="135"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
          <line
            x1="170"
            y1="225"
            x2="110"
            y2="265"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Small Upper Floating Shard */}
        <g className="crystal-top-shard">
          <polygon
            points="160,65 185,30 205,75 180,95"
            fill="url(#softIceFacet)"
            opacity="0.6"
          />
          <polygon
            points="185,30 205,75 220,50"
            fill="url(#softTranslucentQuartz)"
            opacity="0.6"
          />
          <line
            x1="185"
            y1="30"
            x2="205"
            y2="75"
            stroke="#FFFFFF"
            strokeWidth="1"
            opacity="0.6"
          />
        </g>

        {/* Small Lower Floating Shard */}
        <g className="crystal-bottom-shard">
          <polygon
            points="95,310 130,290 145,345 115,360"
            fill="url(#softPaleRose)"
            opacity="0.5"
          />
          <polygon
            points="130,290 160,330 145,345"
            fill="url(#softMutedCyan)"
            opacity="0.5"
          />
        </g>

        {/* ========================================================= */}
        {/* RIGHT SIDE: SOFT MUTED FLOATING SHARDS                   */}
        {/* ========================================================= */}
        <g className="crystal-right-cluster">
          <polygon
            points="420,95 455,60 460,110 435,125"
            fill="url(#softMutedCyan)"
            opacity="0.55"
          />
          <polygon
            points="455,60 480,85 460,110"
            fill="url(#softTranslucentQuartz)"
            opacity="0.5"
          />

          <polygon
            points="445,160 485,130 475,190 440,205"
            fill="url(#softPaleRose)"
            opacity="0.5"
          />
          <polygon
            points="485,130 515,165 475,190"
            fill="url(#softIceFacet)"
            opacity="0.55"
          />

          <polygon
            points="415,260 450,230 465,285 430,305"
            fill="url(#softPaleLavender)"
            opacity="0.45"
          />
        </g>

        {/* Subtle, Soft Crystal Highlights (Gentle, Non-Blinding Sparkles) */}
        <circle cx="135" cy="135" r="2.5" fill="#fffffe" opacity="0.75" />
        <circle cx="185" cy="30" r="2" fill="#f3eded" opacity="0.7" />
        <circle cx="110" cy="265" r="2" fill="#FFFFFF" opacity="0.65" />
        <circle cx="455" cy="60" r="2" fill="#eee8e8" opacity="0.65" />
        <circle cx="485" cy="130" r="2" fill="#ffffff" opacity="0.65" />
      </svg>
    </div>
  );
};

export default CrystalStones;
