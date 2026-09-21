'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { sponsors } from '@/lib/sponsors';
import { wrapSponsorOffset } from './sponsor-motion';

export function Sponsors() {
  const viewport = useRef<HTMLDivElement>(null);
  const firstCycle = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const touching = useRef(false);
  const resumeAt = useRef(0);

  useEffect(() => {
    const element = viewport.current;
    const cycle = firstCycle.current;
    if (!element || !cycle) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = cycle.getBoundingClientRect().width;
    let position = width;
    let frame = 0;
    let previous = 0;
    element.scrollLeft = position;

    const resize = new ResizeObserver(() => {
      width = cycle.getBoundingClientRect().width;
      position = width;
      element.scrollLeft = position;
    });
    const animate = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (
        !document.hidden &&
        !paused.current &&
        !touching.current &&
        now >= resumeAt.current
      ) {
        position = wrapSponsorOffset(position + elapsed * 0.016, width);
        element.scrollLeft = position;
      } else {
        position = element.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    const updateMotion = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!motion.matches) frame = requestAnimationFrame(animate);
    };
    const normalize = () => {
      if (
        width &&
        (element.scrollLeft < width / 2 || element.scrollLeft >= width * 2.5)
      ) {
        position = wrapSponsorOffset(element.scrollLeft, width);
        element.scrollLeft = position;
      }
    };
    const pause = () => {
      paused.current = true;
    };
    const resume = () => {
      paused.current = false;
      touching.current = false;
    };
    const startTouch = () => {
      touching.current = true;
    };
    const endTouch = () => {
      touching.current = false;
      resumeAt.current = performance.now() + 1600;
    };

    resize.observe(cycle);
    element.addEventListener('scroll', normalize, { passive: true });
    element.addEventListener('mouseenter', pause);
    element.addEventListener('mouseleave', resume);
    element.addEventListener('pointerdown', startTouch);
    element.addEventListener('pointerup', endTouch);
    element.addEventListener('pointercancel', endTouch);
    motion.addEventListener('change', updateMotion);
    updateMotion();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      element.removeEventListener('scroll', normalize);
      element.removeEventListener('mouseenter', pause);
      element.removeEventListener('mouseleave', resume);
      element.removeEventListener('pointerdown', startTouch);
      element.removeEventListener('pointerup', endTouch);
      element.removeEventListener('pointercancel', endTouch);
      motion.removeEventListener('change', updateMotion);
    };
  }, []);

  return (
    <section className="sponsors-section" aria-labelledby="sponsors-heading">
      <h2 id="sponsors-heading">COM O APOIO DE</h2>
      <div
        className="sponsor-viewport"
        ref={viewport}
        aria-label="Parceiros SamoraFit. Desliza para explorar."
      >
        <div className="sponsor-track" aria-hidden="true">
          {[0, 1, 2].map((copy) => (
            <div
              className="sponsor-cycle"
              ref={copy === 0 ? firstCycle : undefined}
              key={copy}
            >
              {sponsors.map((sponsor) => (
                <div
                  className={`sponsor-logo sponsor-logo-${sponsor.id}`}
                  key={`${copy}-${sponsor.id}`}
                >
                  <Image
                    unoptimized
                    src={sponsor.logo}
                    alt=""
                    width={sponsor.width}
                    height={sponsor.height}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">
        {sponsors.map((sponsor) => sponsor.name).join(', ')}
      </p>
    </section>
  );
}
