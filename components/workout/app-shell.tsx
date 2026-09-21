'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  Home,
  Library,
  Dumbbell,
  ChartNoAxesColumn,
  UserRound,
  Handshake,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { appConfig } from '@/lib/config';
import type { StudentProfile } from '@/lib/student-data';

export type NavigationItem =
  | 'inicio'
  | 'treinos'
  | 'biblioteca'
  | 'progresso'
  | 'parceiros';
const navigation = [
  { id: 'inicio', href: '#inicio', label: 'Início', icon: Home },
  {
    id: 'treinos',
    href: '#treinos',
    label: 'Meus treinos',
    icon: Dumbbell,
  },
  { id: 'biblioteca', href: '#biblioteca', label: 'Biblioteca', icon: Library },
  {
    id: 'progresso',
    href: '#progresso',
    label: 'Progresso',
    icon: ChartNoAxesColumn,
  },
  { id: 'parceiros', href: '#parceiros', label: 'Parceiros', icon: Handshake },
] as const;

function StudentAvatar({ user }: { user: StudentProfile }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="avatar">
      {user.avatar && !failed ? (
        <Image
          unoptimized
          src={user.avatar}
          width={36}
          height={36}
          onError={() => setFailed(true)}
          alt=""
        />
      ) : (
        user.name.charAt(0).toUpperCase()
      )}
    </span>
  );
}

export function AppShell({
  user,
  activeNav,
  onNavigate,
  children,
}: {
  user: StudentProfile;
  activeNav: NavigationItem;
  onNavigate: (item: NavigationItem) => void;
  children: React.ReactNode;
}) {
  const firstName = user.name.split(' ')[0];
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="topbar">
        <div className="topbar-inner">
          <a
            href="#inicio"
            onClick={() => onNavigate('inicio')}
            className="brand"
            aria-label="SamoraFit Workout — início"
          >
            <Image
              unoptimized
              src="/images/samorafit-workout-logo.webp"
              alt="SamoraFit Workout"
              width={166}
              height={38}
            />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a
                href={item.href}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={activeNav === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="profile-trigger"
              aria-label={`Abrir menu de ${firstName}`}
            >
              <StudentAvatar user={user} />
              <span>{firstName}</span>
              <ChevronDown size={15} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="profile-menu">
              <div className="profile-summary">
                <strong>{user.name}</strong>
                <span>Aluno SamoraFit</span>
              </div>
              <DropdownMenuItem
                render={<a href="#treinos" aria-label="Os meus treinos" />}
                onClick={() => onNavigate('treinos')}
              >
                <Dumbbell size={17} /> Os meus treinos
              </DropdownMenuItem>
              <DropdownMenuItem
                render={<a href="#progresso" aria-label="O meu progresso" />}
                onClick={() => onNavigate('progresso')}
              >
                <ChartNoAxesColumn size={17} /> O meu progresso
              </DropdownMenuItem>
              <DropdownMenuItem
                render={
                  <a
                    href={appConfig.cademi.courseHome}
                    target="_top"
                    aria-label="Área na Cademi"
                  />
                }
              >
                <UserRound size={17} /> Área na Cademi{' '}
                <ArrowUpRight size={15} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="main-content" id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer">
        <span>
          SamoraFit Workout <span>·</span> Bruno Samora
        </span>
        <span>Torna-te mais.</span>
      </footer>
      <nav className="mobile-nav" aria-label="Navegação no telemóvel">
        {navigation.map(({ icon: Icon, ...item }) => (
          <a
            href={item.href}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            aria-current={activeNav === item.id ? 'page' : undefined}
          >
            <Icon size={19} />
            <span>{item.id === 'treinos' ? 'Meus treinos' : item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
