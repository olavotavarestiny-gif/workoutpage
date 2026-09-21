'use client';

import { useEffect, useRef } from 'react';
import { wrapSponsorOffset } from './sponsor-motion';
import Image from 'next/image';
import { sponsors } from '@/lib/sponsors';

export function PartnerLogo({ id }: { id: string }) {
  const sponsor = sponsors.find((item) => item.id === id);
  if (!sponsor) return null;
  return (
    <span className={`partner-logo partner-logo-${id}`}>
      <Image
        unoptimized
        src={sponsor.logo}
        alt={sponsor.name}
        width={sponsor.width}
        height={sponsor.height}
        loading="lazy"
      />
    </span>
  );
}

export function Sponsors() {
  const viewport = useRef<HTMLDivElement>(null);
  const cycle = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const touching = useRef(false);
  const resumeAt = useRef(0);

  useEffect(() => {
    const element = viewport.current;
    const group = cycle.current;
    if (!element || !group) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = group.getBoundingClientRect().width;
    let position = width;
    let frame = 0;
    let previous = 0;
    let reduced = preference.matches;
    element.scrollLeft = position;
    const resize = new ResizeObserver(() => {
      const nextWidth = group.getBoundingClientRect().width;
      position = width
        ? wrapSponsorOffset((element.scrollLeft / width) * nextWidth, nextWidth)
        : nextWidth;
      width = nextWidth;
      element.scrollLeft = position;
    });
    resize.observe(group);
    const animate = (now: number) => {
      const elapsed = previous ? Math.min(now - previous, 50) : 0;
      previous = now;
      if (
        !document.hidden &&
        !hovered.current &&
        !focused.current &&
        !touching.current &&
        now >= resumeAt.current
      ) {
        position = wrapSponsorOffset(position + elapsed * 0.018, width);
        element.scrollLeft = position;
      } else {
        position = element.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    const motionChanged = () => {
      reduced = preference.matches;
      position = element.scrollLeft;
      cancelAnimationFrame(frame);
      previous = 0;
      if (!reduced) frame = requestAnimationFrame(animate);
    };
    const normalizeScroll = () => {
      if (!width) return;
      if (element.scrollLeft < width / 2 || element.scrollLeft >= width * 2.5) {
        position = wrapSponsorOffset(element.scrollLeft, width);
        element.scrollLeft = position;
      }
    };
    element.addEventListener('scroll', normalizeScroll, { passive: true });
    preference.addEventListener('change', motionChanged);
    motionChanged();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      element.removeEventListener('scroll', normalizeScroll);
      preference.removeEventListener('change', motionChanged);
    };
  }, []);

  return (
    <section
      className="sponsor-marquee"
      aria-label="Parceiros oficiais"
      onMouseEnter={() => {
        hovered.current = true;
      }}
      onMouseLeave={() => {
        hovered.current = false;
        touching.current = false;
      }}
    >
      <h2>COM O APOIO DE</h2>
      <p className="sr-only">
        {sponsors.map((sponsor) => sponsor.name).join(', ')}. Desliza para
        explorar os parceiros.
      </p>
      <div
        ref={viewport}
        className="sponsor-marquee-viewport"
        tabIndex={0}
        role="region"
        aria-label="Logotipos dos parceiros. Usa as setas do teclado ou desliza para explorar."
        onFocus={(event) => {
          focused.current = event.currentTarget.matches(':focus-visible');
        }}
        onBlur={() => {
          focused.current = false;
        }}
        onPointerDown={() => {
          touching.current = true;
        }}
        onPointerUp={() => {
          touching.current = false;
          resumeAt.current = performance.now() + 1800;
        }}
        onPointerCancel={() => {
          touching.current = false;
          resumeAt.current = performance.now() + 1800;
        }}
      >
        <div className="sponsor-marquee-track" aria-hidden="true">
          {[0, 1, 2].map((copy) => (
            <div
              className="sponsor-marquee-cycle"
              ref={copy === 0 ? cycle : undefined}
              key={copy}
            >
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div
                  className={`sponsor-marquee-item sponsor-marquee-${sponsor.id}`}
                  key={`${sponsor.id}-${index}`}
                >
                  <Image
                    unoptimized
                    src={sponsor.marqueeLogo}
                    alt=""
                    width={sponsor.marqueeWidth}
                    height={sponsor.marqueeHeight}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
