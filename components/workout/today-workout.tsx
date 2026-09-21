import { ArrowRight, Clock3, Play, Signal } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  formatPlayback,
  type StudentProfile,
  type WorkoutProgram,
} from '@/lib/student-data';
import { ProgrammeDetails } from './programme-details';
import { WorkoutCover } from './workout-cover';

export function TodayWorkout({
  user,
  programme,
}: {
  user: StudentProfile;
  programme: WorkoutProgram;
}) {
  const lesson = user.currentLesson;
  const resume =
    lesson.elapsedSeconds > 0 && lesson.elapsedSeconds < lesson.durationSeconds;
  const playbackPercent = Math.min(
    100,
    Math.round(
      (lesson.elapsedSeconds / Math.max(lesson.durationSeconds, 1)) * 100,
    ),
  );
  return (
    <section
      className="today-section"
      id="treino-hoje"
      aria-labelledby="today-heading"
    >
      <div className="section-heading">
        <h2 id="today-heading">O teu treino de hoje</h2>
        <span>
          <span className="status-dot" />{' '}
          {resume ? 'À tua espera' : 'Escolhido para ti'}
        </span>
      </div>
      <article className="today-card">
        <div className="today-copy">
          <span className="eyebrow accent">
            {resume
              ? 'CONTINUA DE ONDE PARASTE'
              : 'TREINO RECOMENDADO PARA HOJE'}
          </span>
          <h3>{programme.title}</h3>
          <p className="today-subtitle">{programme.subtitle}</p>
          <div className="workout-meta">
            <span>
              Aula {String(lesson.number).padStart(2, '0')} de{' '}
              {programme.lessonCount}
            </span>
            <span>
              <Clock3 size={16} /> {Math.ceil(lesson.durationSeconds / 60)} min
            </span>
            <span>
              <Signal size={16} /> {programme.level}
            </span>
          </div>
          {resume ? (
            <div className="resume-progress">
              <div className="progress-caption">
                <span>
                  Paraste aos{' '}
                  <strong>{formatPlayback(lesson.elapsedSeconds)}</strong>
                </span>
                <span>{formatPlayback(lesson.durationSeconds)}</span>
              </div>
              <Progress
                value={playbackPercent}
                aria-label="Tempo visto da aula"
              />
              <span className="programme-progress">
                {user.progress}% do programa concluído
              </span>
            </div>
          ) : (
            <p className="start-message">
              O primeiro passo começa com um play.
            </p>
          )}
          <div className="today-actions">
            <a
              href={lesson.url || programme.url}
              target="_top"
              className="button-primary"
            >
              <Play size={17} fill="currentColor" />
              {resume ? 'Continuar treino' : 'Começar treino'}
              <ArrowRight size={18} />
            </a>
            <ProgrammeDetails programme={programme} />
          </div>
          <p className="today-note">
            Acede à aula na tua área de aluno Cademi.
          </p>
        </div>
        <div className="today-art">
          <WorkoutCover programme={programme} />
          <span className="trainer-credit">COM BRUNO SAMORA</span>
        </div>
      </article>
    </section>
  );
}
