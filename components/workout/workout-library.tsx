'use client';

import { Dumbbell, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  filterProgrammes,
  libraryFilters,
  type LibraryFilter,
  type WorkoutProgram,
} from '@/lib/student-data';
import { WorkoutCard } from './workout-card';

export function WorkoutLibrary({
  programmes,
  filter,
  onFilterChange,
  onlyStarted,
  onShowAll,
}: {
  programmes: WorkoutProgram[];
  filter: LibraryFilter;
  onFilterChange: (value: LibraryFilter) => void;
  onlyStarted: boolean;
  onShowAll: () => void;
}) {
  const availableFilters = libraryFilters.filter(
    (category) =>
      category === 'Todos' ||
      programmes.some((programme) => programme.categories.includes(category)),
  );
  const collection = programmes.filter(
    (programme) => !onlyStarted || programme.progress > 0,
  );
  const visible = filterProgrammes(programmes, filter, onlyStarted);
  return (
    <section
      className="library-section"
      id="colecao-treinos"
      aria-labelledby="library-heading"
    >
      <div className="section-heading view-heading">
        <div>
          <span className="eyebrow">ÁREA DE TREINO</span>
          <h1 id="library-heading">
            {onlyStarted ? 'Os meus treinos' : 'Biblioteca'}
          </h1>
          <p>
            {onlyStarted
              ? 'Retoma os programas que já começaste.'
              : 'Escolhe o teu objetivo. Encontra o teu treino.'}
          </p>
        </div>
        {onlyStarted ? (
          <button className="text-button" onClick={onShowAll}>
            Ver todos <ArrowRight size={17} />
          </button>
        ) : (
          <span className="collection-count">
            <strong>{programmes.length}</strong> programas <span>·</span>{' '}
            {programmes.reduce(
              (sum, programme) => sum + programme.lessonCount,
              0,
            )}{' '}
            aulas
          </span>
        )}
      </div>
      <Tabs
        value={filter}
        onValueChange={(value) => onFilterChange(value as LibraryFilter)}
        className="library-tabs"
      >
        <TabsList
          className="filter-list"
          aria-label="Filtrar treinos por categoria"
        >
          {availableFilters.map((category) => (
            <TabsTrigger
              className="filter-button"
              value={category}
              key={category}
            >
              {category}
              <span className="filter-count">
                {filterProgrammes(collection, category).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {availableFilters.map((category) => (
          <TabsContent
            value={category}
            key={category}
            className="library-panel"
          >
            <output className="sr-only" aria-live="polite">
              {visible.length}{' '}
              {visible.length === 1
                ? 'programa encontrado'
                : 'programas encontrados'}
            </output>
            {visible.length ? (
              <div className="workout-grid">
                {visible.map((programme) => (
                  <WorkoutCard key={programme.slug} programme={programme} />
                ))}
              </div>
            ) : (
              <Empty className="library-empty">
                <EmptyHeader>
                  <Dumbbell size={26} />
                  <EmptyTitle>
                    {onlyStarted
                      ? 'Ainda não tens treinos aqui.'
                      : 'Ainda não há treinos nesta categoria.'}
                  </EmptyTitle>
                  <EmptyDescription>
                    {onlyStarted
                      ? 'Escolhe um programa da biblioteca para começar.'
                      : 'Explora os outros programas disponíveis.'}
                  </EmptyDescription>
                </EmptyHeader>
                <button className="button-secondary" onClick={onShowAll}>
                  Explorar todos os treinos <ArrowRight size={17} />
                </button>
              </Empty>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
