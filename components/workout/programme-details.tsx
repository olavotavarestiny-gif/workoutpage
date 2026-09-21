'use client';

import { ArrowUpRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import type { WorkoutProgram } from '@/lib/student-data';

export function ProgrammeDetails({ programme }: { programme: WorkoutProgram }) {
  return (
    <Dialog>
      <DialogTrigger className="button-secondary">
        Ver programa <ArrowUpRight size={17} />
      </DialogTrigger>
      <DialogContent className="programme-dialog" showCloseButton={false}>
        <DialogClose
          className="icon-button dialog-close"
          aria-label="Fechar programa"
        >
          <X size={21} />
        </DialogClose>
        <span className="eyebrow">O TEU PROGRAMA</span>
        <DialogTitle className="dialog-title">{programme.title}</DialogTitle>
        <DialogDescription className="dialog-description">
          {programme.subtitle}. Escolhe a tua próxima aula na área de aluno.
        </DialogDescription>
        <dl className="programme-facts">
          <div>
            <dt>Aulas</dt>
            <dd>{programme.lessonCount}</dd>
          </div>
          <div>
            <dt>Por aula</dt>
            <dd>{programme.lessonMinutes} min</dd>
          </div>
          <div>
            <dt>Nível</dt>
            <dd>{programme.level}</dd>
          </div>
        </dl>
        <div className="progress-caption">
          <span>O teu progresso</span>
          <strong>{programme.progress}%</strong>
        </div>
        <Progress
          value={programme.progress}
          aria-label={`Progresso de ${programme.title}`}
        />
        <p className="demo-note">
          Dados de demonstração. As aulas e o acesso são geridos na Cademi.
        </p>
        <a className="button-primary" href={programme.url} target="_top">
          Abrir programa na Cademi <ArrowUpRight size={18} />
        </a>
      </DialogContent>
    </Dialog>
  );
}
