'use client';

import { CalendarDays, CheckCircle2, Clock3, Flame } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { formatTrainingTime, getStudentDemo } from '@/lib/student-data';

export function ProgressOverview() {
  const params = useSearchParams();
  const { user, programmes } = getStudentDemo(params.get('demo') === 'new');
  const weeklyGoal = 4;
  const weeklyProgress = Math.min(
    100,
    Math.round((user.workoutsThisWeek / weeklyGoal) * 100),
  );
  const activeProgrammes = programmes.filter((programme) => programme.progress);
  const stats = [
    {
      label: 'Treinos concluídos',
      value: user.completedWorkouts,
      icon: CheckCircle2,
    },
    {
      label: 'Tempo treinado',
      value: formatTrainingTime(user.minutesTrained),
      icon: Clock3,
    },
    {
      label: 'Sequência actual',
      value: `${user.trainingStreak} ${user.trainingStreak === 1 ? 'dia' : 'dias'}`,
      icon: Flame,
    },
  ];

  return (
    <section className="progress-dashboard" aria-label="Resumo do progresso">
      <div className="progress-hero">
        <div>
          <span className="progress-label">PROGRESSO TOTAL</span>
          <strong>{user.progress}%</strong>
          <p>Continua. A consistência constrói resultados.</p>
        </div>
        <div className="progress-total-bar">
          <Progress value={user.progress} aria-label="Progresso total" />
        </div>
      </div>

      <dl className="progress-stats">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="progress-stat" key={label}>
            <Icon size={21} aria-hidden="true" />
            <dd>{value}</dd>
            <dt>{label}</dt>
          </div>
        ))}
      </dl>

      <div className="progress-columns">
        <section className="weekly-goal" aria-labelledby="weekly-goal-title">
          <div className="progress-panel-heading">
            <div>
              <span className="progress-label">ESTA SEMANA</span>
              <h2 id="weekly-goal-title">Meta semanal</h2>
            </div>
            <CalendarDays size={22} aria-hidden="true" />
          </div>
          <strong>
            {user.workoutsThisWeek} <span>de {weeklyGoal} treinos</span>
          </strong>
          <Progress value={weeklyProgress} aria-label="Meta semanal" />
          <p>
            {user.workoutsThisWeek >= weeklyGoal
              ? 'Meta cumprida. Excelente trabalho.'
              : `Faltam ${weeklyGoal - user.workoutsThisWeek} treinos para cumprires a meta.`}
          </p>
        </section>

        <section className="recent-training" aria-labelledby="recent-title">
          <div className="progress-panel-heading">
            <div>
              <span className="progress-label">EM ANDAMENTO</span>
              <h2 id="recent-title">Os teus programas</h2>
            </div>
          </div>
          {activeProgrammes.length ? (
            <ul>
              {activeProgrammes.map((programme) => (
                <li key={programme.slug}>
                  <div>
                    <strong>{programme.title}</strong>
                    <span>{programme.progress}% concluído</span>
                  </div>
                  <Progress
                    value={programme.progress}
                    aria-label={`Progresso de ${programme.title}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="progress-empty-copy">
              O teu primeiro programa aparecerá aqui quando começares.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
