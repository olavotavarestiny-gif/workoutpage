import type { Metadata } from 'next';
import { LifeBuoy, Mail } from 'lucide-react';
import { PageHeader } from '@/components/workout/page-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Suporte | SamoraFit Workout',
  description: 'Ajuda para utilizar a plataforma SamoraFit Workout.',
};

const questions = [
  {
    question: 'Onde encontro as aulas?',
    answer:
      'Abre a página Treinos, escolhe um programa e toca em “Treinar”. A aula abre directamente na tua área Workout.',
  },
  {
    question: 'Como altero os meus dados ou acesso?',
    answer:
      'O perfil, a palavra-passe, os pagamentos e o acesso à conta são geridos na tua área Workout.',
  },
  {
    question: 'O meu treino não abriu. O que devo fazer?',
    answer:
      'Confirma que tens sessão iniciada na Workout e volta a abrir o programa pela página Treinos.',
  },
];

export default function SuportePage() {
  return (
    <main className="workout-page subpage" id="conteudo">
      <PageHeader
        eyebrow="AJUDA"
        title="Como podemos ajudar?"
        description="Respostas rápidas para continuares o teu treino."
      />
      <div className="support-layout">
        <section className="faq-panel" aria-labelledby="faq-title">
          <h2 id="faq-title">Perguntas frequentes</h2>
          <Accordion>
            {questions.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <aside className="support-card">
          <span className="support-icon" aria-hidden="true">
            <LifeBuoy size={24} />
          </span>
          <h2>Precisas de mais ajuda?</h2>
          <p>
            Envia-nos um e-mail para receberes apoio com a tua conta ou com os
            teus treinos.
          </p>
          <a href="mailto:suporte@brunosamora.ao">
            Enviar e-mail <Mail size={17} />
          </a>
          <span className="support-email">suporte@brunosamora.ao</span>
        </aside>
      </div>
    </main>
  );
}
