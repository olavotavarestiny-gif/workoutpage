'use client';

import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { studentDemo, type PartnerAd } from '@/lib/student-data';
import { PartnerLogo } from './sponsors';

function AdAction({ ad }: { ad: PartnerAd }) {
  if (ad.link)
    return (
      <a
        className="ad-link"
        href={ad.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
      >
        {ad.cta}
        <ArrowUpRight size={17} />
      </a>
    );
  return (
    <Dialog>
      <DialogTrigger className="ad-link">
        {ad.cta}
        <ArrowUpRight size={17} />
      </DialogTrigger>
      <DialogContent
        className="programme-dialog ad-dialog"
        showCloseButton={false}
      >
        <DialogClose
          className="icon-button dialog-close"
          aria-label="Fechar campanha"
        >
          <X size={21} />
        </DialogClose>
        <PartnerLogo id={ad.brand} />
        <DialogTitle className="dialog-title">Mais informações</DialogTitle>
        <DialogDescription className="dialog-description">
          Os detalhes desta campanha ainda não estão disponíveis.
        </DialogDescription>
        <DialogClose className="button-secondary">Fechar</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function AdSpotlight({ ad }: { ad: PartnerAd }) {
  return (
    <article className="ad-spotlight">
      <div className="spotlight-copy">
        <span className="eyebrow">PARCEIRO EM DESTAQUE</span>
        <PartnerLogo id={ad.brand} />
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
        <AdAction ad={ad} />
      </div>
      {ad.image && (
        <div className="spotlight-image">
          <Image
            unoptimized
            src={ad.image}
            alt={ad.imageAlt}
            width={5760}
            height={3840}
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}
export function AdCard({ ad }: { ad: PartnerAd }) {
  return (
    <article className="ad-card">
      <div className="ad-card-visual">
        {ad.image ? (
          <Image
            unoptimized
            src={ad.image}
            alt={ad.imageAlt}
            width={1200}
            height={800}
            loading="lazy"
          />
        ) : (
          <PartnerLogo id={ad.brand} />
        )}
      </div>
      <div className="ad-card-copy">
        <span className="eyebrow">PARCEIRO SAMORAFIT</span>
        <h3>{ad.title}</h3>
        <p>{ad.description}</p>
        <AdAction ad={ad} />
      </div>
    </article>
  );
}
export function PartnerOffers() {
  return (
    <section className="offers-section" aria-labelledby="offers-heading">
      <div className="section-heading">
        <h2 id="offers-heading">Parceiros SamoraFit</h2>
      </div>
      <div className="offers-grid">
        {studentDemo.ads.map((ad) =>
          ad.placement === 'spotlight' ? (
            <AdSpotlight key={ad.id} ad={ad} />
          ) : (
            <AdCard key={ad.id} ad={ad} />
          ),
        )}
      </div>
    </section>
  );
}
