'use client';

import Image from 'next/image';
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
  const name = user.name.trim().split(/\s+/)[0];
  return (
    <header className="welcome-section">
      <Image
        className="page-logo"
        unoptimized
        src="/images/samorafit-workout-logo.webp"
        alt="SamoraFit Workout"
        width={166}
        height={38}
        priority
      />
      <p>
        {name
          ? `${greeting}, ${name}.`
          : greeting === 'Olá'
            ? 'Olá.'
            : `${greeting}.`}
      </p>
      <h1>Pronto para treinar?</h1>
      <span>Treina onde quiseres. Evolui todos os dias.</span>
    </header>
  );
}
