'use client';

import { useEffect, useState } from 'react';
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
  useEffect(() => {
    function syncNavigation() {
      const item = window.location.hash.slice(1);
      if (item === 'conteudo') return;
      navigate(
        ['inicio', 'treinos', 'biblioteca', 'progresso', 'parceiros'].includes(
          item,
        )
          ? (item as NavigationItem)
          : 'inicio',
      );
    }
    syncNavigation();
    window.addEventListener('hashchange', syncNavigation);
    return () => window.removeEventListener('hashchange', syncNavigation);
  }, []);
  function navigate(item: NavigationItem) {
    setActiveNav(item);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (item === 'biblioteca' || item === 'treinos') {
      setOnlyStarted(item === 'treinos');
      setFilter('Todos');
    }
  }
  return (
    <AppShell user={user} activeNav={activeNav} onNavigate={navigate}>
      <div className={`workspace-view view-${activeNav}`} key={activeNav}>
        {activeNav === 'inicio' && (
          <>
            <WelcomeSection user={user} />
            <TodayWorkout user={user} programme={programme} />
            <a
              className="home-library-link"
              href="#biblioteca"
              onClick={() => navigate('biblioteca')}
            >
              <span>
                <strong>Encontra o teu próximo treino</strong>
                <span>5 programas · Aulas de 20 a 21 minutos</span>
              </span>
              <span>Ver biblioteca →</span>
            </a>
          </>
        )}
        {(activeNav === 'biblioteca' || activeNav === 'treinos') && (
          <WorkoutLibrary
            programmes={demo.programmes}
            filter={filter}
            onFilterChange={setFilter}
            onlyStarted={onlyStarted}
            onShowAll={() => {
              window.location.hash = 'biblioteca';
              navigate('biblioteca');
            }}
          />
        )}
        {activeNav === 'progresso' && (
          <>
            <header className="view-heading">
              <span className="eyebrow">A TUA EVOLUÇÃO</span>
              <h1>Progresso</h1>
              <p>Acompanha o teu ritmo de treino.</p>
            </header>
            <ProgressOverview user={user} />
          </>
        )}
        {activeNav === 'parceiros' && (
          <>
            <header className="view-heading">
              <span className="eyebrow">SAMORAFIT</span>
              <h1>Parceiros</h1>
              <p>Marcas que acompanham o teu treino.</p>
            </header>
            <Sponsors />
            <PartnerOffers />
          </>
        )}
      </div>
    </AppShell>
  );
}
