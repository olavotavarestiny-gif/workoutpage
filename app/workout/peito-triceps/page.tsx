import { Suspense } from "react";
import { WorkoutDetail } from "@/components/workout/workout-detail";
export default function PeitoTricepsPage() { return <Suspense fallback={<main className="loading-screen">A carregar o treino…</main>}><WorkoutDetail /></Suspense>; }
