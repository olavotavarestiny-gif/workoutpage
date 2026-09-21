'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCademiUser } from '@/lib/cademi';
import { getStudentDemo, type LibraryFilter } from '@/lib/student-data';
import { AppShell, type NavigationItem } from './app-shell';
import { WelcomeSection } from './welcome-section';
import { TodayWorkout } from './today-workout';
import { ProgressOverview } from './progress-overview';
import { WorkoutLibrary } from './workout-library';
import { Sponsors } from './sponsors';
import { PartnerOffers } from './partner-offers';

export function Dashboard() {
  const cademiUser = useCademiUser();
  const params = useSearchParams();
  const demo = getStudentDemo(params.get('demo') === 'new');
  const user = {
    ...demo.user,
    name: cademiUser.fullName || cademiUser.firstName || demo.user.name,
    avatar: cademiUser.avatar || demo.user.avatar,
  };
  const [activeNav, setActiveNav] = useState<NavigationItem>('inicio');
  const [filter, setFilter] = useState<LibraryFilter>('Todos');
  const [onlyStarted, setOnlyStarted] = useState(false);
  const programme =
    demo.programmes.find((item) => item.slug === user.currentWorkout) ||
    demo.programmes[0];
  function navigate(item: NavigationItem) {
    setActiveNav(item);
    if (item === 'biblioteca' || item === 'treinos') {
      setOnlyStarted(item === 'treinos');
      setFilter('Todos');
    }
  }
  return (
    <AppShell user={user} activeNav={activeNav} onNavigate={navigate}>
      <WelcomeSection user={user} />
      <TodayWorkout user={user} programme={programme} />
      <ProgressOverview user={user} />
      <WorkoutLibrary
        programmes={demo.programmes}
        filter={filter}
        onFilterChange={setFilter}
        onlyStarted={onlyStarted}
        onShowAll={() => navigate('biblioteca')}
      />
      <Sponsors />
      <PartnerOffers />
    </AppShell>
  );
}
