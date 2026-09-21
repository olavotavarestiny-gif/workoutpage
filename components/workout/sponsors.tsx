'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
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
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const stop = () => setPaused(true);
    api.on('pointerDown', stop);
    return () => {
      api.off('pointerDown', stop);
    };
  }, [api]);
  useEffect(() => {
    if (!api || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 3200);
    return () => window.clearInterval(timer);
  }, [api, paused, hovered, focused, reducedMotion]);
  return (
    <section
      className="sponsor-carousel-section"
      aria-label="Parceiros SamoraFit"
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'start', duration: 45 }}
        className="sponsor-carousel"
        aria-label="Logotipos dos parceiros"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
      >
        <div className="sponsor-carousel-heading">
          <div>
            <span className="sponsor-label">COM O APOIO DE</span>
            <a href="#parceiros">Conhecer os parceiros ↗</a>
          </div>
          <div className="sponsor-controls">
            <CarouselPrevious
              className="sponsor-control"
              aria-label="Parceiro anterior"
              onClick={() => {
                setPaused(true);
                api?.scrollPrev();
              }}
            />
            {!reducedMotion && (
              <button
                type="button"
                className="sponsor-control"
                aria-label={
                  paused ? 'Reproduzir carrossel' : 'Pausar carrossel'
                }
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
            )}
            <CarouselNext
              className="sponsor-control"
              aria-label="Próximo parceiro"
              onClick={() => {
                setPaused(true);
                api?.scrollNext();
              }}
            />
          </div>
        </div>
        <CarouselContent className="sponsor-track" aria-live="off">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <CarouselItem
              className="sponsor-slide"
              key={`${sponsor.id}-${index}`}
              aria-hidden={index >= sponsors.length || undefined}
            >
              <div className="sponsor-tile">
                <PartnerLogo id={sponsor.id} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
