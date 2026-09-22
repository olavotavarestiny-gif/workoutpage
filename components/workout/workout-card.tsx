import { ArrowUpRight, Clock3, LockKeyhole } from 'lucide-react';
import type { WorkoutProgram } from '@/lib/student-data';
import { WorkoutCover } from './workout-cover';

export function WorkoutCard({
  programme,
  hasAccess,
}: {
  programme: WorkoutProgram;
  hasAccess: boolean;
}) {
  const contents = (
    <>
      <div className="workout-art">
        <WorkoutCover programme={programme} />
        {!hasAccess && (
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
          {hasAccess ? (
            <>
              Treinar <ArrowUpRight size={17} />
            </>
          ) : (
            <>
              Bloqueado <LockKeyhole size={16} />
            </>
          )}
        </span>
      </div>
    </>
  );

  return (
    <article className={`workout-card${hasAccess ? '' : ' is-locked'}`}>
      {hasAccess ? (
        <a
          className="workout-link"
          href={programme.url}
          target="_top"
          aria-label={`Treinar ${programme.title}`}
        >
          {contents}
        </a>
      ) : (
        <div
          className="workout-link"
          aria-label={`${programme.title}: acesso bloqueado até à confirmação do pagamento`}
        >
          {contents}
        </div>
      )}
    </article>
  );
}
