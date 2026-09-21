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
  const visible = filterProgrammes(programmes, filter, onlyStarted);
  return (
    <section
      className="library-section"
      id="biblioteca"
      aria-labelledby="library-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">ENCONTRA O TEU RITMO</span>
          <h2 id="library-heading">
            {onlyStarted ? 'Os meus treinos' : 'Explorar treinos'}
          </h2>
        </div>
        {onlyStarted ? (
          <button className="text-button" onClick={onShowAll}>
            Ver todos <ArrowRight size={17} />
          </button>
        ) : (
          <span>{programmes.length} programas para ti</span>
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
          {libraryFilters.map((category) => (
            <TabsTrigger
              className="filter-button"
              value={category}
              key={category}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {libraryFilters.map((category) => (
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
