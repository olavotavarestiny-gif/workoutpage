'use client';

import Image from 'next/image';
import { useCademiUser } from '@/lib/cademi';
import { useBrowserSearchParams } from '@/lib/browser-search-params';
import { getStudentDemo, type StudentProfile } from '@/lib/student-data';
import { WelcomeSection } from './welcome-section';
import { TodayWorkout } from './today-workout';
import { WorkoutLibrary } from './workout-library';
import { Sponsors } from './sponsors';

const emptyStudent: StudentProfile = {
  name: '',
  avatar: '',
  currentWorkout: 'cross-training',
  currentLesson: {
    number: 1,
    durationSeconds: 1260,
    elapsedSeconds: 0,
    url: null,
  },
  progress: 0,
  trainingStreak: 0,
  minutesTrained: 0,
  completedWorkouts: 0,
  workoutsThisWeek: 0,
};

export function Dashboard() {
  const params = useBrowserSearchParams();
  const cademiUser = useCademiUser();
  const isDemo = params.has('demo');
  const data = getStudentDemo(params.get('demo') === 'new');
  const firstName =
    cademiUser.firstName || cademiUser.fullName.trim().split(/\s+/)[0] || '';
  const user: StudentProfile = isDemo
    ? data.user
    : { ...emptyStudent, name: firstName, avatar: cademiUser.avatar };
  const programmes = data.programmes.map((programme) => ({
    ...programme,
    progress: isDemo ? programme.progress : 0,
  }));
  const programme =
    programmes.find((item) => item.slug === user.currentWorkout) ||
    programmes[0];

  return (
    <main className="workout-page" id="conteudo">
      <a className="skip-link" href="#treino-hoje">
        Ir para o treino de hoje
      </a>
      <section className="dashboard-intro" aria-label="Boas-vindas">
        <WelcomeSection user={user} />
        <figure className="home-visual">
          <Image
            src="/images/01.jpg"
            alt="Bruno Samora com equipamento SamoraFit Workout"
            width={2400}
            height={1600}
            sizes="(max-width: 640px) calc(100vw - 36px), 58vw"
            priority
          />
        </figure>
      </section>
      <Sponsors />
      <TodayWorkout
        user={user}
        programme={programme}
        isDemo={isDemo}
        accessState={cademiUser.accessState}
      />
      <WorkoutLibrary
        programmes={programmes.filter((item) => item.slug !== programme.slug)}
        preview
      />
    </main>
  );
}
