'use client';

import { useEffect } from 'react';
import { modules } from '@/lib/config';
import { hasCademiCourseAccess } from '@/lib/cademi-access';

type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => { programme: string; destination: string };
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};

export function WorkoutWebMcpTools() {
  useEffect(() => {
    if (!hasCademiCourseAccess(new URLSearchParams(window.location.search))) {
      return;
    }

    const context = (document as Document & { modelContext?: ModelContext })
      .modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    void Promise.resolve(
      context.registerTool(
        {
          name: 'start_samorafit_workout',
          title: 'Começar treino SamoraFit',
          description:
            'Abre um programa disponível na área SamoraFit Workout do aluno.',
          inputSchema: {
            type: 'object',
            properties: {
              programme: {
                type: 'string',
                enum: modules.map((module) => module.slug),
                description: 'Identificador do programa a abrir.',
              },
            },
            required: ['programme'],
            additionalProperties: false,
          },
          annotations: {
            readOnlyHint: false,
            untrustedContentHint: false,
          },
          execute(input) {
            const programme =
              typeof input === 'object' && input !== null
                ? (input as { programme?: unknown }).programme
                : undefined;
            const selected = modules.find(
              (module) => module.slug === programme,
            );
            if (!selected) throw new Error('Programa de treino inválido.');
            window.open(selected.url, '_top');
            return {
              programme: selected.slug,
              destination: selected.url,
            };
          },
        },
        { signal: lifecycle.signal },
      ),
    ).catch(() => undefined);

    return () => lifecycle.abort();
  }, []);

  return null;
}
