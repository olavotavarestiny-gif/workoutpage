"use client";

import { ArrowRight, Play } from "lucide-react";
import { useCademiUser } from "@/lib/cademi";
import { modules, type CourseModule } from "@/lib/config";
import { AppShell } from "./app-shell";

function ModuleContents({ module, index }: { module: CourseModule; index: number }) {
  return <>
    <span className="module-cover" style={{ backgroundPosition: `${module.imageX / (2940 - 560) * 100}% ${656 / (1794 - 910) * 100}%` }}>
      <span className="module-number">MÓDULO {String(index + 1).padStart(2, "0")}</span>
      <span className="cover-play"><Play size={22} fill="currentColor" /></span>
    </span>
    <span className="module-copy"><span className="module-title">{module.title}</span><span className="module-subtitle">{module.subtitle}</span><span className="module-action">Ver aulas <ArrowRight size={18} /></span></span>
  </>;
}

export function Dashboard() {
  const user = useCademiUser();
  return <AppShell>
    <section className="library-intro">
      <p className="eyebrow">SAMORAFIT WORKOUT</p>
      <h1>O teu treino começa aqui<span>.</span></h1>
      <p className="intro-copy">{user.firstName ? `Olá, ${user.firstName}. ` : ""}Escolhe o teu módulo e vamos treinar.</p>
    </section>
    <section className="library-section" id="modulos" aria-labelledby="modules-title">
      <div className="library-heading"><h2 id="modules-title">As tuas aulas</h2><span>5 módulos <span className="heading-dot" /> Ao teu ritmo</span></div>
      <div className="module-grid">
        {modules.map((module, index) => <article key={module.slug}>
          <a className="module-card" href={module.url} target="_top" aria-label={`Ver aulas de ${module.title}`}><ModuleContents module={module} index={index} /></a>
        </article>)}
      </div>
    </section>
  </AppShell>;
}
