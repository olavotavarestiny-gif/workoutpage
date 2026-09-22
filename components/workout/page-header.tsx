import Image from 'next/image';
import { CademiLink } from './cademi-link';

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
      <CademiLink
        className="page-header-logo"
        href="/"
        aria-label="Página principal"
      >
        <Image
          unoptimized
          src="/images/samorafit-workout-logo.webp"
          alt="SamoraFit Workout"
          width={166}
          height={38}
          priority
        />
      </CademiLink>
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
