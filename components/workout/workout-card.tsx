import { ArrowUpRight, Clock3, LoaderCircle, LockKeyhole } from 'lucide-react';
import type { WorkoutProgram } from '@/lib/student-data';
import type { WorkoutAccessState } from '@/lib/cademi-access';
import { PaymentRequiredDialog } from './payment-required-dialog';
import { WorkoutCover } from './workout-cover';

export function WorkoutCard({
  programme,
  accessState,
}: {
  programme: WorkoutProgram;
  accessState: WorkoutAccessState;
}) {
  const isLocked = accessState === 'denied';
  const contents = (
    <>
      <div className="workout-art">
        <WorkoutCover programme={programme} />
        {isLocked && (
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
          {accessState === 'granted' ? (
            <>
              Treinar
              <ArrowUpRight size={17} />
            </>
          ) : accessState === 'checking' ? (
            <>
              A carregar <LoaderCircle className="access-spinner" size={16} />
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
    <article className={`workout-card${isLocked ? ' is-locked' : ''}`}>
      {accessState === 'granted' ? (
        <a
          className="workout-link"
          href={programme.url}
          target="_top"
          aria-label={`Treinar ${programme.title}`}
        >
          {contents}
        </a>
      ) : accessState === 'denied' ? (
        <PaymentRequiredDialog
          trigger={
            <button
              className="workout-link workout-gate-button"
              type="button"
              aria-label={`${programme.title}: pagamento necessário`}
            >
              {contents}
            </button>
          }
        />
      ) : (
        <div className="workout-link" aria-label="A carregar acesso">
          {contents}
        </div>
      )}
    </article>
  );
}
