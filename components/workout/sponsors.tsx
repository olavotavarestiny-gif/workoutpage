"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { campaigns, sponsors } from "@/lib/sponsors";

export function SponsorLogo({ id }: { id: string }) {
  const sponsor = sponsors.find((item) => item.id === id);
  if (!sponsor) return null;
  return <span className={`sponsor-logo sponsor-logo-${id}`}><img src={sponsor.logo} alt={sponsor.name} /></span>;
}

export function SponsorStrip() {
  return <section className="sponsors" aria-label="Patrocinadores">
    <span className="sponsors-caption">COM O APOIO DE</span>
    <div className="sponsor-row">{sponsors.map((sponsor) => <div className={`sponsor-slot ${sponsor.id === "pumangol" ? "sponsor-main" : ""}`} key={sponsor.id}><SponsorLogo id={sponsor.id} /></div>)}</div>
  </section>;
}

export function AdvertisingCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!api) return;
    const select = () => setActive(api.selectedScrollSnap());
    api.on("select", select); select();
    return () => { api.off("select", select); };
  }, [api]);
  useEffect(() => {
    if (!api || paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => { if (!document.hidden) api.scrollNext(); }, 5500);
    return () => window.clearInterval(timer);
  }, [api, paused, hovered, focused, reducedMotion]);
  if (!campaigns.length) return null;
  return <section className="advertising" aria-label="Publicidade">
    <Carousel opts={{ loop: true }} setApi={setApi} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} aria-label="Anúncios dos patrocinadores">
      <CarouselContent className="ad-track">
        {campaigns.map((campaign, index) => {
          const sponsor = sponsors.find((item) => item.id === campaign.sponsorId);
          const content = campaign.image ? <img className="campaign-image" src={campaign.image} alt={campaign.imageAlt || `Publicidade ${sponsor?.name || ""}`} /> : <><div className="ad-copy"><span className="ad-label">PUBLICIDADE</span><h2>{sponsor?.name}</h2><span className="ad-detail">No SamoraFit Workout.</span></div><div className="ad-brand"><SponsorLogo id={campaign.sponsorId} /></div></>;
          return <CarouselItem key={campaign.id} aria-label={`${index + 1} de ${campaigns.length}`} aria-hidden={active !== index}>
            {campaign.url ? <a className={`ad-slide ad-${campaign.sponsorId}`} href={campaign.url} target="_blank" rel="noopener noreferrer sponsored" tabIndex={active === index ? 0 : -1}>{content}</a> : <div className={`ad-slide ad-${campaign.sponsorId}`}>{content}</div>}
          </CarouselItem>;
        })}
      </CarouselContent>
      <div className="ad-controls">
        <div className="ad-dots">{campaigns.map((campaign, index) => <button key={campaign.id} aria-label={`Mostrar anúncio ${index + 1}`} aria-current={active === index ? "true" : undefined} onClick={() => { api?.scrollTo(index); setPaused(true); }} className={active === index ? "selected" : ""} />)}</div>
        <span className="ad-count">{String(active + 1).padStart(2, "0")} / {String(campaigns.length).padStart(2, "0")}</span>
        {!reducedMotion && <button className="ad-control" onClick={() => setPaused(!paused)} aria-label={paused ? "Retomar anúncios" : "Pausar anúncios"}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
        <button className="ad-control" onClick={() => { api?.scrollPrev(); setPaused(true); }} aria-label="Anúncio anterior"><ArrowLeft size={17} /></button>
        <button className="ad-control" onClick={() => { api?.scrollNext(); setPaused(true); }} aria-label="Próximo anúncio"><ArrowRight size={17} /></button>
      </div>
    </Carousel>
  </section>;
}
