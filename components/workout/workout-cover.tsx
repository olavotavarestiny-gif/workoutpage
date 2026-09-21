import Image from 'next/image';
import type { CourseModule } from '@/lib/config';

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
        src={programme.cover}
        alt={`Bruno Samora — capa de ${programme.title}`}
        width={560}
        height={994}
        sizes="(max-width: 640px) 82vw, (max-width: 900px) 50vw, 33vw"
      />
    </span>
  );
}
