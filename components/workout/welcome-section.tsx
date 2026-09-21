'use client';

import { useSyncExternalStore } from 'react';
import type { StudentProfile } from '@/lib/student-data';

function subscribeToClock(onChange: () => void) {
  const timer = window.setInterval(onChange, 60000);
  return () => window.clearInterval(timer);
}
function getGreeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
}
const serverGreeting = () => 'Olá';

export function WelcomeSection({ user }: { user: StudentProfile }) {
  const greeting = useSyncExternalStore(
    subscribeToClock,
    getGreeting,
    serverGreeting,
  );
  return (
    <section className="welcome-section" aria-labelledby="welcome-heading">
      <div>
        <p>
          {greeting}, {user.name.split(' ')[0]}.
        </p>
        <h1 id="welcome-heading">Pronto para treinar?</h1>
      </div>
      <span
        className="demo-badge"
        title="Nome, duração das aulas e progresso são exemplos para testar esta interface."
      >
        Demonstração <span /> Dados de exemplo
      </span>
    </section>
  );
}
