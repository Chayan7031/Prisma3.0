'use client';

import React from 'react';

export interface VectorPathDecorProps {
  currentTheme?: 'charcoal' | 'parchment';
  className?: string;
}


export const VectorPathDecor: React.FC<VectorPathDecorProps> = ({
  currentTheme = 'charcoal',
  className = '',
}) => {
  const isParchment = currentTheme === 'parchment';

  return (
    <div
      className={`book-vector-decor-container ${isParchment ? 'theme-parchment' : 'theme-charcoal'} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="book-vector-decor-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* =========================================================================
              UNIFIED CONTINUOUS PERIMETER VECTOR PATH (100% INVISIBLE MOTION TRACK)
              Dimensions & Clearances:
              - Left Corridor: X=350 (Static design ends at X=230 -> 40px buffer for 160px mandala)
              - Right Corridor: X=1570 (Static design starts at X=1690 -> 40px buffer)
              - Top Edge: Y=145 (Clear of top bar and book)
              - Bottom Edge: Y=930 (Clear of bottom toolbar and book)
              ========================================================================= */}
          <path
            id="vPathPerimeterCircuit"
            d="M 350 220
               C 350 150 400 145 480 145
               C 720 145 1200 145 1440 145
               C 1520 145 1570 150 1570 220
               C 1570 380 1570 540 1570 700
               C 1570 860 1570 890 1570 910
               C 1570 930 1520 930 1440 930
               C 1200 930 720 930 480 930
               C 400 930 350 930 350 910
               C 350 890 350 860 350 700
               C 350 540 350 380 350 220 Z"
          />
        </defs>

        {/* =========================================================================
            FOUR CONTINUOUSLY TRAVELING FULL ROUND MANDALAS
            Locked at 25% phase intervals (12s apart on a 48s loop):
            - Guaranteed ZERO collision with each other (always ~950px apart)
            - Guaranteed ZERO collision with static side or corner designs
            ========================================================================= */}

        {/* MANDALA 1 (Phase 0% - Starts Top-Left, travels across top to right) */}
        <g className="vector-moving-entity">
          <animateMotion dur="48s" repeatCount="indefinite" rotate="0" begin="0s">
            <mpath href="#vPathPerimeterCircuit" />
          </animateMotion>
          <g className="decor-rotator">
            <image
              href="/design/full_round_design.png"
              x="-80"
              y="-80"
              width="250"
              height="250"
              preserveAspectRatio="xMidYMid meet"
              className="book-decor-img book-decor-moving-img"
            />
          </g>
        </g>

        {/* MANDALA 2 (Phase 25% - Starts Top-Right, travels down right flank to bottom) */}
        <g className="vector-moving-entity">
          <animateMotion dur="48s" repeatCount="indefinite" rotate="0" begin="-12s">
            <mpath href="#vPathPerimeterCircuit" />
          </animateMotion>
          <g className="decor-rotator-reverse">
            <image
              href="/design/full_round_design.png"
              x="-80"
              y="-80"
              width="250"
              height="250"
              preserveAspectRatio="xMidYMid meet"
              className="book-decor-img book-decor-moving-img"
            />
          </g>
        </g>

        {/* MANDALA 3 (Phase 50% - Starts Bottom-Right, travels across bottom to left) */}
        <g className="vector-moving-entity">
          <animateMotion dur="48s" repeatCount="indefinite" rotate="0" begin="-24s">
            <mpath href="#vPathPerimeterCircuit" />
          </animateMotion>
          <g className="decor-rotator">
            <image
              href="/design/full_round_design.png"
              x="-80"
              y="-80"
              width="250"
              height="250"
              preserveAspectRatio="xMidYMid meet"
              className="book-decor-img book-decor-moving-img"
            />
          </g>
        </g>

        {/* MANDALA 4 (Phase 75% - Starts Bottom-Left, travels up left flank to top) */}
        <g className="vector-moving-entity">
          <animateMotion dur="48s" repeatCount="indefinite" rotate="0" begin="-36s">
            <mpath href="#vPathPerimeterCircuit" />
          </animateMotion>
          <g className="decor-rotator-reverse">
            <image
              href="/design/full_round_design.png"
              x="-80"
              y="-80"
              width="250"
              height="250"
              preserveAspectRatio="xMidYMid meet"
              className="book-decor-img book-decor-moving-img"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default VectorPathDecor;
