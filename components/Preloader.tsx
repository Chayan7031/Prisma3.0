'use client';

import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const duration = 2500; // Exactly 2.5s for simultaneous sync
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Smooth ease-out cubic for realistic loading feel
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progressRatio, 3);
      const currentProgress = easeOut * 100;

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${currentProgress}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.innerText = `${Math.floor(currentProgress)}`;
      }

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Fully loaded
        setTimeout(() => {
          setIsLoaded(true);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('prisma-preloader-open'));
          }
          
          setTimeout(() => {
            setIsHidden(true);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('prisma-preloader-complete'));
            }
            if (onComplete) onComplete();
          }, 1100); // Matches CSS transition duration
        }, 200); // Tiny pause for visual confirmation
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none font-space overflow-hidden">
      
      <style>{`
        @keyframes svg-text-draw-white {
          0% {
            stroke-dashoffset: 300;
            fill: transparent;
          }
          40% {
            stroke-dashoffset: 0;
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: white;
          }
        }
        @keyframes svg-text-draw-orange {
          0% {
            stroke-dashoffset: 300;
            fill: transparent;
          }
          40% {
            stroke-dashoffset: 0;
            fill: transparent;
          }
          100% {
            stroke-dashoffset: 0;
            fill: #FF4D00;
          }
        }
      `}</style>

      {/* 
        The "Window" Box. 
        It has a massive box-shadow that acts as the screen background.
        When isLoaded is true, it stretches out to fill the screen, revealing the page underneath.
      */}
      <div 
        className="relative flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.77,0,0.175,1)] border"
        style={{
          width: isLoaded ? '100vw' : 'min(70vw, 450px)',
          height: isLoaded ? '100vh' : '36px',
          boxShadow: '0 0 0 200vmax #111111', // Pure dark screen
          backgroundColor: isLoaded ? 'transparent' : '#1A1A1A', // Track color
          borderColor: isLoaded ? 'transparent' : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        
        {/* Progress Bar Fill - Ultra optimized without React state bindings */}
        <div 
          ref={progressBarRef}
          className="absolute top-0 left-0 h-full bg-white transition-opacity duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{ 
            width: '0%', // Controlled via requestAnimationFrame
            opacity: isLoaded ? 0 : 1,
          }}
        />

        {/* PRISMA 3.0 Animated Text */}
        <div 
          className={`absolute -top-36 sm:-top-48 w-full flex justify-center transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        >
          <svg viewBox="0 0 700 150" className="w-[340px] sm:w-[500px] h-auto overflow-visible">
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle" 
              className="font-samarkan text-[90px] sm:text-[130px] lowercase tracking-wide"
              strokeWidth="2"
            >
              {"prisma 3.0".split("").map((char, i) => {
                const isOrange = i >= 7;
                // Delay staggering: 10 chars, distributed over 1.5 seconds. Total anim = 1s.
                // 1.5s + 1s = 2.5s (Matches exact loading duration perfectly)
                const delay = i * (1.5 / 9);
                return (
                  <tspan
                    key={i}
                    stroke={isOrange ? "#FF4D00" : "white"}
                    style={{
                      strokeDasharray: 300,
                      strokeDashoffset: 300,
                      fill: 'transparent',
                      animation: `${isOrange ? 'svg-text-draw-orange' : 'svg-text-draw-white'} 1s ease-out forwards ${delay}s`
                    }}
                  >
                    {char}
                  </tspan>
                );
              })}
            </text>
          </svg>
        </div>

        {/* Progress Number - Ultra optimized without React state bindings */}
        <div 
          className={`absolute -bottom-16 sm:-bottom-20 text-white text-5xl sm:text-7xl font-space font-light tracking-[0.1em] transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        >
          <span ref={progressTextRef}>0</span><span className="text-2xl sm:text-4xl text-white/40 ml-1">%</span>
        </div>
      </div>
    </div>
  );
};
