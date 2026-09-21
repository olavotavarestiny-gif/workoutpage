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
  return (
    <section className="sponsors-section" aria-labelledby="sponsors-heading">
      <h2 id="sponsors-heading">COM O APOIO DE</h2>
      <div className="partner-row">
        {sponsors.map((sponsor) => (
          <div className="partner-slot" key={sponsor.id}>
            <PartnerLogo id={sponsor.id} />
          </div>
        ))}
      </div>
    </section>
  );
}
