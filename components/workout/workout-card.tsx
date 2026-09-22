import { ArrowUpRight, Clock3, LockKeyhole } from 'lucide-react';
import type { WorkoutProgram } from '@/lib/student-data';
import type { CademiAccessState } from '@/lib/cademi-access';
import { WorkoutCover } from './workout-cover';

export function WorkoutCard({
  programme,
  accessState,
}: {
  programme: WorkoutProgram;
  accessState: CademiAccessState;
}) {
  const isFree = accessState === 'free';
  const contents = (
    <>
      <div className="workout-art">
        <WorkoutCover programme={programme} />
        {isFree && (
          <span className="workout-lock" aria-hidden="true">
            <LockKeyhole size={22} />
          </span>
        )}
      </div>
      <div className="workout-card-copy">
        <div>
          <h3>{programme.title}</h3>
          <p>{programme.subtitle}</p>
        </div>
        <div className="card-meta">
          <span>
            <Clock3 size={15} /> {programme.lessonMinutes} min
          </span>
          <span>{programme.level}</span>
        </div>
        <span className="card-action">
          {!isFree ? (
            <>
              {accessState === 'purchased' ? 'Treinar' : 'Verificar acesso'}{' '}
              <ArrowUpRight size={17} />
            </>
          ) : (
            <>
              Verificar acesso <LockKeyhole size={16} />
            </>
          )}
        </span>
      </div>
    </>
  );

  return (
    <article className={`workout-card${isFree ? ' is-locked' : ''}`}>
      <a
        className="workout-link"
        href={programme.url}
        target="_top"
        aria-label={`${accessState === 'purchased' ? 'Treinar' : 'Verificar acesso a'} ${programme.title}`}
      >
        {contents}
      </a>
    </article>
  );
}
