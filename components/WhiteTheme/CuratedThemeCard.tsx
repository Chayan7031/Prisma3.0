'use client';

import React from 'react';
import { CuratedTheme } from './types';
import { ArrowUpRight } from 'lucide-react';

interface CuratedThemeCardProps {
  theme: CuratedTheme;
  index: number;
  onSelect?: (page: number) => void;
}

export const CuratedThemeCard: React.FC<CuratedThemeCardProps> = ({
  theme,
  index,
  onSelect,
}) => {
  // Theme-specific styling tokens reflecting the watercolor washes in the reference images
  const themeStyles = {
    ai: {
      // Pink / Rose / Lavender watercolor wash
      gradient:
        'bg-gradient-to-b from-[#FCE4EC] via-[#F8BBD0]/80 to-[#F48FB1]/70',
      borderColor: 'border-[#F48FB1]/40',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#880E4F]',
      badgeBg: 'bg-[#880E4F]/10 text-[#880E4F]',
      petalColor: 'fill-[#E91E63]/15',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(233,30,99,0.25)]',
      pattern: 'petal',
    },
    blockchain: {
      // Golden Saffron / Sunflower / Honey watercolor wash
      gradient:
        'bg-gradient-to-b from-[#FFF9E6] via-[#FFF3D0]/85 to-[#FFE082]/75',
      borderColor: 'border-[#FFD54F]/50',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#795548]',
      badgeBg: 'bg-[#795548]/10 text-[#795548]',
      petalColor: 'fill-[#FF9800]/20',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(255,160,0,0.25)]',
      pattern: 'amberFloral',
    },
    cybersecurity: {
      // Mint / Seafoam / Jade watercolor wash
      gradient:
        'bg-gradient-to-b from-[#E8F8F5] via-[#D1F2EB]/85 to-[#A3E4D7]/75',
      borderColor: 'border-[#80CBC4]/50',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#004D40]',
      badgeBg: 'bg-[#004D40]/10 text-[#004D40]',
      petalColor: 'fill-[#009688]/15',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(0,150,136,0.25)]',
      pattern: 'mintBotanical',
    },
    agriculture: {
      // Sky Blue / Cerulean / Aqua watercolor wash
      gradient:
        'bg-gradient-to-b from-[#E1F5FE] via-[#B3E5FC]/85 to-[#81D4FA]/75',
      borderColor: 'border-[#4FC3F7]/50',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#01579B]',
      badgeBg: 'bg-[#01579B]/10 text-[#01579B]',
      petalColor: 'fill-[#0288D1]/15',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(2,136,209,0.25)]',
      pattern: 'waterRipples',
    },
    robotics: {
      // Peach / Warm Apricot / Champagne watercolor wash
      gradient:
        'bg-gradient-to-b from-[#FBE9E7] via-[#FFCCBC]/85 to-[#FFAB91]/75',
      borderColor: 'border-[#FF8A65]/50',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#BF360C]',
      badgeBg: 'bg-[#BF360C]/10 text-[#BF360C]',
      petalColor: 'fill-[#FF5722]/15',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(255,87,34,0.25)]',
      pattern: 'peachBlossom',
    },
    gaming: {
      // Twilight Lavender / Wisteria / Violet watercolor wash
      gradient:
        'bg-gradient-to-b from-[#EDE7F6] via-[#D1C4E9]/85 to-[#B39DDB]/75',
      borderColor: 'border-[#9575CD]/50',
      titleColor: 'text-[#1F1B18]',
      subtitleColor: 'text-[#4A148C]',
      badgeBg: 'bg-[#4A148C]/10 text-[#4A148C]',
      petalColor: 'fill-[#7E57C2]/15',
      glowColor: 'group-hover:shadow-[0_20px_40px_-15px_rgba(126,87,194,0.25)]',
      pattern: 'twilightCelestial',
    },
  }[theme.themeType];

  return (
    <div
      onClick={() => onSelect?.(theme.pageTarget)}
      className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-[26px] overflow-hidden min-h-[460px] h-[480px] w-full border ${themeStyles.borderColor} ${themeStyles.gradient} shadow-sm hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer select-none ${themeStyles.glowColor}`}
    >
      {/* Background Organic Watercolor Silhouettes & Texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Paper Grain Overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply bg-[radial-gradient(#2A2622_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

        {/* Custom Decorative Silhouettes matching theme */}
        {themeStyles.pattern === 'petal' && (
          <svg
            className="absolute -top-12 -left-8 w-64 h-64 pointer-events-none transform -rotate-12 transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <path
              d="M30,90 C50,30 110,20 150,50 C190,80 180,140 140,165 C100,190 40,170 20,130 Z"
              className={themeStyles.petalColor}
            />
            <path
              d="M80,40 C120,30 160,70 140,110 C120,150 60,140 50,100 Z"
              fill="#F48FB1"
              fillOpacity="0.12"
            />
          </svg>
        )}

        {themeStyles.pattern === 'amberFloral' && (
          <svg
            className="absolute -bottom-10 -right-8 w-72 h-72 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <path
              d="M100,100 C120,60 160,50 180,80 C200,110 180,150 150,170 C120,190 80,180 70,140 Z"
              className={themeStyles.petalColor}
            />
            <path
              d="M60,110 C80,80 120,70 140,100 C160,130 130,170 100,160 Z"
              fill="#FFB300"
              fillOpacity="0.12"
            />
          </svg>
        )}

        {themeStyles.pattern === 'mintBotanical' && (
          <svg
            className="absolute -top-10 -right-10 w-64 h-64 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <path
              d="M40,40 C90,20 150,40 170,90 C190,140 160,180 110,180 C60,180 20,130 20,90 Z"
              className={themeStyles.petalColor}
            />
            <path
              d="M70,70 Q130,50 140,120 Q120,160 80,130 Z"
              fill="#26A69A"
              fillOpacity="0.15"
            />
          </svg>
        )}

        {themeStyles.pattern === 'waterRipples' && (
          <svg
            className="absolute -bottom-8 -left-8 w-64 h-64 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <circle
              cx="70"
              cy="130"
              r="60"
              fill="none"
              stroke="#0288D1"
              strokeWidth="1.5"
              strokeOpacity="0.15"
            />
            <circle
              cx="70"
              cy="130"
              r="90"
              fill="none"
              stroke="#0288D1"
              strokeWidth="1"
              strokeOpacity="0.1"
            />
            <path
              d="M40,120 C70,90 120,90 150,130 C130,160 80,170 50,150 Z"
              className={themeStyles.petalColor}
            />
          </svg>
        )}

        {themeStyles.pattern === 'peachBlossom' && (
          <svg
            className="absolute top-16 left-12 w-52 h-52 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="18" fill="#FF7043" fillOpacity="0.12" />
            <path
              d="M100,80 C90,50 110,50 100,30 C90,50 70,55 85,75 Z"
              className={themeStyles.petalColor}
            />
            <path
              d="M100,120 C90,150 110,150 100,170 C90,150 70,145 85,125 Z"
              className={themeStyles.petalColor}
            />
          </svg>
        )}

        {themeStyles.pattern === 'twilightCelestial' && (
          <svg
            className="absolute -top-12 -left-6 w-64 h-64 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            viewBox="0 0 200 200"
          >
            <polygon
              points="100,20 120,70 175,75 135,110 145,165 100,135 55,165 65,110 25,75 80,70"
              className={themeStyles.petalColor}
            />
          </svg>
        )}
      </div>

      {/* Top Header Section: Title & Subtitle on Right side (matching reference) */}
      <div className="relative z-10 flex items-start justify-between w-full">
        {/* Index Chapter & Page Range Tag */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-[11px] font-mono tracking-widest text-[#2A2622]/50 font-bold">
            {theme.chapter || `INDEX ${theme.number}`}
          </span>
          {theme.pageRange && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-black/5 text-[#2A2622]/70 border border-black/10">
              {theme.pageRange}
            </span>
          )}
        </div>

        {/* Title & Indian Philosophical Epithet aligned to right */}
        <div className="flex flex-col items-end text-right">
          <h3
            className={`text-3xl sm:text-4xl font-normal tracking-tight ${themeStyles.titleColor} leading-none`}
          >
            {theme.title}
          </h3>
          <span
            className={`text-[10px] sm:text-[11px] font-mono tracking-[0.2em] font-semibold uppercase mt-1.5 ${themeStyles.subtitleColor}`}
          >
            {theme.subtitle}
          </span>
        </div>
      </div>

      {/* Bottom Section: Narrative Description & Jump Link */}
      <div className="relative z-10 w-full pt-6">
        <p className="text-xs sm:text-[13px] text-[#2A2622]/85 leading-relaxed font-normal mb-5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
          {theme.description}
        </p>

        {/* Footer Meta & Interaction Prompt */}
        <div className="flex items-center justify-between pt-3 border-t border-black/10">
          <span className="text-[10px] font-mono text-[#2A2622]/50 tracking-wider">
            Jump to Page {theme.pageTarget} • CSE KGEC
          </span>
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-[#2A2622]/70 group-hover:text-[#FF5722] transition-colors">
            <span>Read Chapter</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedThemeCard;
