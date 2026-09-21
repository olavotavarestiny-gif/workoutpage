import { CalendarDays, Clock3, Flame, CircleCheck } from 'lucide-react';
import { formatTrainingTime, type StudentProfile } from '@/lib/student-data';

export function ProgressOverview({ user }: { user: StudentProfile }) {
  const stats = [
    {
      label: 'Treinos esta semana',
      value: user.workoutsThisWeek,
      icon: CalendarDays,
    },
    {
      label: 'Tempo de treino',
      value: formatTrainingTime(user.minutesTrained),
      icon: Clock3,
    },
    {
      label: 'Aulas concluídas',
      value: user.completedWorkouts,
      icon: CircleCheck,
    },
    {
      label: 'Sequência de treino',
      value: `${user.trainingStreak} ${user.trainingStreak === 1 ? 'dia' : 'dias'}`,
      icon: Flame,
    },
  ];
  return (
    <section
      id="resumo-progresso"
      className="progress-section"
      aria-labelledby="progress-heading"
    >
      <div className="section-heading">
        <h2 id="progress-heading">O teu progresso</h2>
        <span>
          {user.completedWorkouts
            ? 'Cada treino conta.'
            : 'Tudo começa no primeiro treino.'}
        </span>
      </div>
      <dl className="stats-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="stat-card" key={label}>
            <Icon size={19} aria-hidden="true" />
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
