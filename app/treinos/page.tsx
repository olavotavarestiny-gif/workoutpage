import type { Metadata } from 'next';
import { PageHeader } from '@/components/workout/page-header';
import { WorkoutLibrary } from '@/components/workout/workout-library';
import { getStudentDemo } from '@/lib/student-data';

export const metadata: Metadata = {
  title: 'Treinos | SamoraFit Workout',
  description: 'Todos os programas de treino SamoraFit Workout.',
};

export default function TreinosPage() {
  const { programmes } = getStudentDemo();

  return (
    <main className="workout-page subpage" id="conteudo">
      <PageHeader
        eyebrow="BIBLIOTECA"
        title="Treina ao teu ritmo."
        description="Escolhe o programa certo para o treino de hoje."
      />
      <WorkoutLibrary programmes={programmes} />
    </main>
  );
}
