import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { WorkoutProgram } from '@/lib/student-data';
import { WorkoutCover } from './workout-cover';

export function WorkoutCard({ programme }: { programme: WorkoutProgram }) {
  return (
    <article className="workout-card">
      <a
        className="workout-link"
        href={programme.url}
        target="_top"
        aria-label={`Treinar ${programme.title}`}
      >
        <div className="workout-art">
          <WorkoutCover programme={programme} />
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
            Treinar <ArrowUpRight size={17} />
          </span>
        </div>
      </a>
    </article>
  );
}
