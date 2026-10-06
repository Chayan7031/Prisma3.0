'use client';

import React from 'react';

interface ThemeStoryCardProps {
  progress?: number;
}

export const ThemeStoryCard: React.FC<ThemeStoryCardProps> = () => {
  return (
    <div className="w-full max-w-xl text-left select-none">
      {/* Category / Theme Identifier */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]" />
        <span className="text-[11px] font-mono tracking-[0.25em] text-[#FF5722] uppercase">
          [ 02 // CURATORIAL THEME ]
        </span>
      </div>

      {/* Main Thematic Title */}
      <h3 className="text-3xl sm:text-4xl xl:text-5xl font-light text-white tracking-tight leading-[1.12] mb-2">
        The Ubiquitous Horizon
      </h3>

      {/* Elegant Subtitle with Indian Calligraphy Accent */}
      <p className="text-sm sm:text-base font-serif italic text-[#FF5722] tracking-wide mb-5">
        Where Curiosity Meets Creativity •{' '}
        <span className="font-samarkan not-italic text-lg sm:text-xl text-white/90">
          प्रिज्मा ३.०
        </span>
      </p>

      {/* Lead Narrative */}
      <p className="text-sm sm:text-[15px] text-[#D4CDC3] font-light leading-relaxed mb-6">
        PRISMA 3.0 explores the defining threshold of 2026—a world where computational intelligence departs from isolated glass screens to become an ambient, omnipresent fabric woven into human life.
      </p>

      {/* 3 Rhythmic Editorial Micro-Pillars (Clean, No Box Windows) */}
      <div className="space-y-4 mb-6 pt-5 border-t border-white/10">
        {/* 01 Ambient Intelligence */}
        <div className="flex items-baseline gap-3.5">
          <span className="text-xs font-mono text-[#FF5722] font-semibold tracking-wider shrink-0">
            01
          </span>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-medium">
              Ambient Ubiquity
            </h4>
            <p className="text-xs text-[#9E968B] leading-relaxed mt-0.5">
              Autonomous neural agents, distributed edge protocols, and invisible computing.
            </p>
          </div>
        </div>

        {/* 02 Indo-Modernist Roots */}
        <div className="flex items-baseline gap-3.5">
          <span className="text-xs font-mono text-[#FF5722] font-semibold tracking-wider shrink-0">
            02
          </span>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-medium">
              Indo-Modernist Synthesis
            </h4>
            <p className="text-xs text-[#9E968B] leading-relaxed mt-0.5">
              Classical Indian heritage and Devanagari aesthetics reimagined through modern systems.
            </p>
          </div>
        </div>

        {/* 03 Human Resonance */}
        <div className="flex items-baseline gap-3.5">
          <span className="text-xs font-mono text-[#FF5722] font-semibold tracking-wider shrink-0">
            03
          </span>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-medium">
              Human Resonance
            </h4>
            <p className="text-xs text-[#9E968B] leading-relaxed mt-0.5">
              Student research, poetry, and reflective essays celebrating the spirit of KGEC CSE.
            </p>
          </div>
        </div>
      </div>

      {/* Department Signature Quote */}
      <div className="pt-4 border-t border-white/10">
        <blockquote className="font-serif italic text-xs sm:text-sm text-[#FF5722]/90 leading-relaxed mb-1">
          “Where curiosity meets creativity, technology finds its true purpose.”
        </blockquote>
        <span className="text-[11px] font-mono text-[#787169] block">
          — Department of Computer Science & Engineering • KGEC
        </span>
      </div>
    </div>
  );
};

export default ThemeStoryCard;
