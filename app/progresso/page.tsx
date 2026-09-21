import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHeader } from '@/components/workout/page-header';
import { ProgressOverview } from '@/components/workout/progress-overview';

export const metadata: Metadata = {
  title: 'Progresso | SamoraFit Workout',
  description: 'Acompanha a tua evolução no SamoraFit Workout.',
};

export default function ProgressoPage() {
  return (
    <main className="workout-page subpage" id="conteudo">
      <PageHeader
        eyebrow="A TUA EVOLUÇÃO"
        title="Cada treino conta."
        description="Consistência, tempo e progresso num só lugar."
      />
      <Suspense fallback={<div className="progress-loading">A carregar…</div>}>
        <ProgressOverview />
      </Suspense>
    </main>
  );
}
