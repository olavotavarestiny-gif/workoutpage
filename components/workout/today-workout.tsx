import {
  ArrowRight,
  Clock3,
  LoaderCircle,
  LockKeyhole,
  Play,
  Signal,
} from 'lucide-react';
import type { StudentProfile, WorkoutProgram } from '@/lib/student-data';
import type { WorkoutAccessState } from '@/lib/cademi-access';
import { PaymentRequiredDialog } from './payment-required-dialog';
import { WorkoutCover } from './workout-cover';

export function TodayWorkout({
  user,
  programme,
  isDemo,
  accessState,
}: {
  user: StudentProfile;
  programme: WorkoutProgram;
  isDemo: boolean;
  accessState: WorkoutAccessState;
}) {
  const canResume = isDemo && user.currentLesson.elapsedSeconds > 0;
  return (
    <section
      className="today-section"
      id="treino-hoje"
      aria-labelledby="today-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">RECOMENDADO</span>
          <h2 id="today-heading">O teu treino de hoje</h2>
        </div>
      </div>
      <article className="today-card">
        <div className="today-art">
          <WorkoutCover programme={programme} />
        </div>
        <div className="today-copy">
          <span className="programme-pill">SAMORAFIT WORKOUT</span>
          <h3>{programme.title}</h3>
          <p className="today-subtitle">{programme.subtitle}</p>
          <div className="workout-meta">
            <span>
              <Clock3 size={17} /> {programme.lessonMinutes} min
            </span>
            <span>
              <Signal size={17} /> {programme.level}
            </span>
            <span>{programme.lessonCount} aulas</span>
          </div>
          {accessState === 'granted' ? (
            <a
              href={user.currentLesson.url || programme.url}
              target="_top"
              className="button-primary"
            >
              <Play size={18} fill="currentColor" />
              {canResume ? 'Continuar treino' : 'Começar treino'}
              <ArrowRight size={19} />
            </a>
          ) : accessState === 'denied' ? (
            <PaymentRequiredDialog
              trigger={
                <button className="button-primary button-locked" type="button">
                  <LockKeyhole size={18} /> Aulas bloqueadas
                </button>
              }
            />
          ) : (
            <button
              className="button-primary button-locked"
              type="button"
              disabled
            >
              <LoaderCircle className="access-spinner" size={18} /> A carregar
            </button>
          )}
        </div>
      </article>
    </section>
  );
}
