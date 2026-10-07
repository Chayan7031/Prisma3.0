'use client';

import React, { useEffect, useRef, useState } from 'react';

// Internal SVG font size; the SVG is then scaled back to 1em of the wrapper's font size
const UNITS = 100;

export interface DrawnTextProps {
  text: string;
  color: string;
  className?: string;
  /** Delay before the first character starts drawing (ms) */
  startDelay?: number;
  /** Delay between consecutive characters (ms) */
  stagger?: number;
  strokeWidth?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
}

/**
 * Text drawn in like the preloader / masthead: each character's outline traces in, then fills.
 * Typography (font, size, weight, letter-spacing, case) comes from `className` on the wrapper.
 * The draw animation is held by `#hero-section:not([data-entered]) .hero-title-char` in globals.css.
 */
export const DrawnText: React.FC<DrawnTextProps> = ({
  text,
  color,
  className,
  startDelay = 0,
  stagger = 40,
  strokeWidth = 2.5,
  as: Tag = 'span',
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [box, setBox] = useState({ x: 0, y: -75, width: text.length * 62, height: 100 });

  useEffect(() => {
    let cancelled = false;

    const measure = () => {
      const wrapper = wrapperRef.current;
      const textEl = textRef.current;
      if (cancelled || !wrapper || !textEl) return;
      const style = getComputedStyle(wrapper);
      const fontSize = parseFloat(style.fontSize) || 16;
      const spacingPx = parseFloat(style.letterSpacing) || 0;
      const spacing = (spacingPx / fontSize) * UNITS;
      textEl.setAttribute('letter-spacing', String(spacing));
      const b = textEl.getBBox();
      if (b.width > 0) {
        setLetterSpacing(spacing);
        setBox({ x: b.x, y: b.y, width: b.width, height: b.height });
      }
    };

    document.fonts.ready.then(measure);
    // Tracking changes across breakpoints
    window.addEventListener('resize', measure);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', measure);
    };
  }, [text]);

  return (
    <Tag ref={wrapperRef as React.Ref<never>} aria-label={text} className={className}>
      <svg
        aria-hidden="true"
        viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
        className="inline-block align-top overflow-visible"
        style={{ width: `${box.width / UNITS}em`, height: `${box.height / UNITS}em` }}
      >
        <text ref={textRef} x="0" y="0" fontSize={UNITS} letterSpacing={letterSpacing} strokeWidth={strokeWidth}>
          {text.split('').map((char, i) => (
            <tspan
              key={i}
              className="hero-title-char"
              stroke={color}
              fill={color}
              style={{ animationDelay: `${startDelay + i * stagger}ms` }}
            >
              {char === ' ' ? ' ' : char}
            </tspan>
          ))}
        </text>
      </svg>
    </Tag>
  );
};

export default DrawnText;
