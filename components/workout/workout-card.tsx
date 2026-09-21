import { ArrowUpRight, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { WorkoutProgram } from '@/lib/student-data';
import { WorkoutCover } from './workout-cover';

export function WorkoutCard({ programme }: { programme: WorkoutProgram }) {
  return (
    <article className="workout-card">
      <a
        className="workout-link"
        href={programme.url}
        target="_top"
        aria-label={`${programme.progress ? 'Continuar' : 'Começar'} ${programme.title}`}
      >
        <div className="workout-art">
          <WorkoutCover programme={programme} />
          <span className="card-category">{programme.categories[0]}</span>
          <span className="card-play" aria-hidden="true">
            <Play size={21} fill="currentColor" />
          </span>
        </div>
        <div className="workout-card-copy">
          <h3>{programme.title}</h3>
          <p>
            {programme.lessonCount} aulas <span>·</span>{' '}
            {programme.lessonMinutes} min/aula
          </p>
          <span className="card-level">{programme.level}</span>
          <div className="card-action">
            <span>
              <Play size={13} fill="currentColor" />{' '}
              {programme.progress ? 'Continuar' : 'Começar'}
            </span>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </a>
      <div className="card-progress">
        <span>
          {programme.progress
            ? `${programme.progress}% concluído`
            : 'Não iniciado'}
        </span>
        <Progress
          value={programme.progress}
          aria-label={`Progresso de ${programme.title}`}
        />
      </div>
    </article>
  );
}
