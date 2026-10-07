'use client';

import { useEffect, RefObject } from 'react';

const INK = '#161121';
const FALL_MS = 420;
const SPLASH_MS = 520;
const SPREAD_MS = 1600;
const STAIN_MS = 1500;
const FALL_HEIGHT = 170;
// Smallest guaranteed blot radius as a fraction of /ink-drop.svg (r=62 of 200, minus the ragged edge)
const BLOT_MIN_RADIUS = 0.225;

const TEARDROP_SVG =
  '<svg viewBox="0 0 10 14" width="10" height="14" style="display:block">' +
  `<path fill="${INK}" d="M5 0C5 0 0 7 0 9.4a5 5 0 0 0 10 0C10 7 5 0 5 0Z"/></svg>`;

function revealFully(el: HTMLElement) {
  el.style.maskImage = 'none';
  el.style.webkitMaskImage = 'none';
}

/**
 * Ink-drop entrance for every `[data-ink-delay]` element inside `sectionRef`:
 * a drop falls onto the element, splashes, and the ink bleeds outward to reveal it.
 * Optional `data-ink-x` / `data-ink-y` (0–1) choose the impact point.
 */
export function useInkDrops(sectionRef: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!active || !section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>('[data-ink-delay]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(revealFully);
      return;
    }

    // Drops live outside the masked elements so the mask doesn't clip them
    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:60;';
    section.appendChild(layer);

    const timers: number[] = [];
    const animations: Animation[] = [];

    const splash = (x: number, y: number) => {
      const count = 6 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const size = 2 + Math.random() * 3;
        const dot = document.createElement('span');
        dot.style.cssText = `position:absolute;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;border-radius:50%;background:${INK};`;
        layer.appendChild(dot);

        // Mostly upward and sideways, like a drop hitting paper
        const angle = Math.PI + Math.random() * Math.PI;
        const dist = 14 + Math.random() * 26;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist * 0.7;
        const anim = dot.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${dx * 1.25}px, ${dy * 0.4 + 10}px) scale(0.3)`, opacity: 0 },
          ],
          { duration: SPLASH_MS, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)', fill: 'forwards' }
        );
        anim.onfinish = () => dot.remove();
        animations.push(anim);
      }
    };

    // Ink blot that pools on the paper at the impact point, then soaks away
    const stain = (x: number, y: number, elHeight: number) => {
      const size = Math.min(Math.max(elHeight * 2.2, 46), 120);
      const blot = document.createElement('img');
      blot.src = '/ink-drop.svg';
      blot.alt = '';
      blot.style.cssText = `position:absolute;left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;mix-blend-mode:multiply;`;
      layer.appendChild(blot);

      const rotate = Math.round(Math.random() * 360);
      const anim = blot.animate(
        [
          { transform: `rotate(${rotate}deg) scale(0.1)`, opacity: 0.95 },
          { transform: `rotate(${rotate}deg) scale(0.75)`, opacity: 0.9, offset: 0.25 },
          { transform: `rotate(${rotate}deg) scale(1)`, opacity: 0.55, offset: 0.55 },
          { transform: `rotate(${rotate}deg) scale(1.08)`, opacity: 0 },
        ],
        { duration: STAIN_MS, easing: 'cubic-bezier(0.2, 0.7, 0.4, 1)', fill: 'forwards' }
      );
      anim.onfinish = () => blot.remove();
      animations.push(anim);
    };

    const spread = (el: HTMLElement, ix: number, iy: number, width: number, height: number) => {
      const maxDist = Math.hypot(Math.max(ix, width - ix), Math.max(iy, height - iy));
      const size = maxDist / BLOT_MIN_RADIUS;
      const splat = size * 0.18;
      const at = (s: number) => `${ix - s / 2}px ${iy - s / 2}px`;

      const anim = el.animate(
        [
          { maskSize: '0px 0px', webkitMaskSize: '0px 0px', maskPosition: at(0), webkitMaskPosition: at(0), filter: 'brightness(0) blur(1.5px)' },
          { maskSize: `${splat}px ${splat}px`, webkitMaskSize: `${splat}px ${splat}px`, maskPosition: at(splat), webkitMaskPosition: at(splat), filter: 'brightness(0) blur(1px)', offset: 0.1 },
          { maskSize: `${size}px ${size}px`, webkitMaskSize: `${size}px ${size}px`, maskPosition: at(size), webkitMaskPosition: at(size), filter: 'brightness(0) blur(0px)', offset: 0.45 },
          { maskSize: `${size}px ${size}px`, webkitMaskSize: `${size}px ${size}px`, maskPosition: at(size), webkitMaskPosition: at(size), filter: 'brightness(1) blur(0px)' },
        ],
        { duration: SPREAD_MS, easing: 'cubic-bezier(0.3, 0.55, 0.45, 1)', fill: 'forwards' }
      );
      anim.onfinish = () => {
        revealFully(el);
        anim.cancel();
      };
      animations.push(anim);
    };

    const dropOnto = (el: HTMLElement) => {
      const sectionRect = section.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const ix = rect.width * Number(el.dataset.inkX ?? 0.25);
      const iy = rect.height * Number(el.dataset.inkY ?? 0.5);
      const x = rect.left - sectionRect.left + ix;
      const y = rect.top - sectionRect.top + iy;

      const drop = document.createElement('span');
      drop.style.cssText = `position:absolute;left:${x - 5}px;top:${y - 12}px;width:10px;height:14px;transform-origin:50% 100%;`;
      drop.innerHTML = TEARDROP_SVG;
      layer.appendChild(drop);

      const fall = drop.animate(
        [
          { transform: `translateY(-${FALL_HEIGHT}px) scale(0.55, 0.8)`, opacity: 0 },
          { opacity: 1, offset: 0.2 },
          { transform: 'translateY(0) scale(0.75, 1.35)', opacity: 1, offset: 0.9 },
          { transform: 'translateY(2px) scale(2.2, 0.3)', opacity: 0 },
        ],
        { duration: FALL_MS, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'forwards' }
      );
      animations.push(fall);
      fall.onfinish = () => {
        drop.remove();
        stain(x, y, rect.height);
        splash(x, y);
        spread(el, ix, iy, rect.width, rect.height);
      };
    };

    targets.forEach((el) => {
      timers.push(window.setTimeout(() => dropOnto(el), Number(el.dataset.inkDelay) || 0));
    });

    return () => {
      timers.forEach(clearTimeout);
      animations.forEach((a) => a.cancel());
      layer.remove();
    };
  }, [sectionRef, active]);
}
