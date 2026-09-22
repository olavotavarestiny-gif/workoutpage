import { ArrowRight, Clock3, Play, Signal } from 'lucide-react';
import type { StudentProfile, WorkoutProgram } from '@/lib/student-data';
import type { CademiAccessState } from '@/lib/cademi-access';
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
  accessState: CademiAccessState;
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
          <a
            href={user.currentLesson.url || programme.url}
            target="_top"
            className="button-primary"
          >
            <Play size={18} fill="currentColor" />
            {accessState !== 'purchased'
              ? 'Verificar acesso na Cademí'
              : canResume
                ? 'Continuar treino'
                : 'Começar treino'}
            <ArrowRight size={19} />
          </a>
          {accessState !== 'purchased' && (
            <p className="access-recheck">
              Já pagaste? Abre o treino com a conta usada no pagamento. A Cademí
              verifica a tua permissão para esta aula.
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
