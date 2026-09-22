'use client';

import type { WorkoutProgram } from '@/lib/student-data';
import { useCademiUser } from '@/lib/cademi';
import { CademiLink } from './cademi-link';
import { WorkoutCard } from './workout-card';

export function WorkoutLibrary({
  programmes,
  preview = false,
}: {
  programmes: WorkoutProgram[];
  preview?: boolean;
}) {
  const { hasCourseAccess } = useCademiUser();
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
          <WorkoutCard
            key={programme.slug}
            programme={programme}
            hasAccess={hasCourseAccess}
          />
        ))}
      </div>
      {preview && (
        <CademiLink className="library-all-link" href="/treinos">
          Ver todos os treinos <span aria-hidden="true">→</span>
        </CademiLink>
      )}
    </section>
  );
}
