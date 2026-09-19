"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useCademiUser } from "@/lib/cademi";
import { modules, type CourseModule } from "@/lib/config";
import { AppShell } from "./app-shell";
import { AdvertisingCarousel, SponsorStrip } from "./sponsors";

function ModuleContents({ module, index }: { module: CourseModule; index: number }) {
  return <>
    <span className="module-photo" style={{ backgroundPosition: `${module.imageX / (2940 - 560) * 100}% ${656 / (1794 - 910) * 100}%` }} />
    <span className="module-shade" />
    <span className="module-number">{String(index + 1).padStart(2, "0")} <span>/ MÓDULO</span></span>
    <span className="module-arrow"><ArrowUpRight size={20} /></span>
    <span className="module-copy"><span className="module-subtitle">{module.subtitle}</span><span className="module-title">{module.title}</span><span className="module-action"><span className="play-circle"><Play size={12} fill="currentColor" /></span> Ver aulas</span></span>
  </>;
}

export function Dashboard() {
  const user = useCademiUser();
  return <AppShell>
    <SponsorStrip />
    <section className="library-intro">
      <div><p className="eyebrow"><span /> SAMORAFIT WORKOUT</p><h1>Carrega no play.<br /><span>Supera-te.</span></h1></div>
      <p className="intro-copy">{user.firstName ? `Olá, ${user.firstName}. ` : ""}O teu momento de treinar.<br />Escolhe uma aula e começa.</p>
    </section>
    <section className="library-section" id="modulos" aria-labelledby="modules-title">
      <div className="library-heading"><h2 id="modules-title">Os teus módulos<span>05</span></h2><span>O teu treino. Ao teu ritmo.</span></div>
      <div className="module-grid">
        {modules.map((module, index) => <article className={index === 0 ? "featured-module" : ""} key={module.slug}>
          <a className="module-card" href={module.url} target="_top" aria-label={`Ver aulas de ${module.title}`}><ModuleContents module={module} index={index} /></a>
        </article>)}
      </div>
    </section>
    <AdvertisingCarousel />
  </AppShell>;
}
