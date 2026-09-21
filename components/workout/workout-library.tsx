import Link from 'next/link';
import type { WorkoutProgram } from '@/lib/student-data';
import { WorkoutCard } from './workout-card';

export function WorkoutLibrary({
  programmes,
  preview = false,
}: {
  programmes: WorkoutProgram[];
  preview?: boolean;
}) {
  const visibleProgrammes = preview ? programmes.slice(0, 3) : programmes;
  return (
    <section
      className={`library-section${preview ? ' library-preview' : ''}`}
      aria-labelledby="library-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            {preview ? 'CONTINUA EM MOVIMENTO' : 'ESCOLHE O TEU RITMO'}
          </span>
          <h2 id="library-heading">
            {preview ? 'Outros treinos' : 'Todos os treinos'}
          </h2>
        </div>
        {!preview && <p>{programmes.length} programas disponíveis</p>}
      </div>
      <div className="workout-grid">
        {visibleProgrammes.map((programme) => (
          <WorkoutCard key={programme.slug} programme={programme} />
        ))}
      </div>
      {preview && (
        <Link className="library-all-link" href="/treinos">
          Ver todos os treinos <span aria-hidden="true">→</span>
        </Link>
      )}
    </section>
  );
}
