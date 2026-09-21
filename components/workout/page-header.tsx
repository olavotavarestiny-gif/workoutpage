import Image from 'next/image';
import Link from 'next/link';

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-header">
      <Link className="page-header-logo" href="/" aria-label="Página principal">
        <Image
          unoptimized
          src="/images/samorafit-workout-logo.webp"
          alt="SamoraFit Workout"
          width={166}
          height={38}
          priority
        />
      </Link>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
