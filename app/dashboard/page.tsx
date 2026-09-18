import { Suspense } from "react";
import { Dashboard } from "@/components/workout/dashboard";
export default function DashboardPage() { return <Suspense fallback={<main className="loading-screen">A preparar o teu treino…</main>}><Dashboard /></Suspense>; }
