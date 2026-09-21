import Image from 'next/image';
import type { CourseModule } from '@/lib/config';

// Preserve each existing portrait cover's proportions. Replace with a standalone
// image when original Cademi assets become available; no raster assets are altered.
export function WorkoutCover({
  programme,
  className = '',
}: {
  programme: CourseModule;
  className?: string;
}) {
  return (
    <span className={`workout-cover ${className}`}>
      <Image
        unoptimized
        src="/images/cademi-modules-source.png"
        alt={`Bruno Samora — capa de ${programme.title}`}
        width={2940}
        height={1794}
        style={{ left: `${(-programme.imageX / 560) * 100}%` }}
      />
    </span>
  );
}
