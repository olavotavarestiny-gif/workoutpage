"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { useCademiUser } from "@/lib/cademi";

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useCademiUser();
  return <div className="app-shell">
    <a className="skip-link" href="#modulos">Ir para os módulos</a>
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/dashboard" className="brand" aria-label="SamoraFit Workout — início"><img src="/images/samorafit-workout-logo.webp" alt="SamoraFit Workout" /></Link>
        <a className="current-section" href="#modulos"><Play size={16} fill="currentColor" /> As minhas aulas</a>
        <div className="member"><span>Área de aluno</span><div className="avatar" aria-label={user.fullName || "Aluno"}>{user.avatar ? <img src={user.avatar} alt="" /> : user.firstName ? user.firstName.slice(0, 1).toUpperCase() : "S"}</div></div>
      </div>
    </header>
    <main className="main-content">{children}</main>
    <footer className="footer"><span>SamoraFit Workout <span className="footer-dot">·</span> Bruno Samora</span><span>Torna-te mais.</span></footer>
  </div>;
}
