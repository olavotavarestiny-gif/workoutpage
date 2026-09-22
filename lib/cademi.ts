'use client';

import { appConfig } from './config';
import { useEffect, useState } from 'react';
import { getAccessRequest, type WorkoutAccessState } from './cademi-access';
import { useBrowserSearchParams } from './browser-search-params';

export function useCademiUser() {
  const params = useBrowserSearchParams();
  const [accessState, setAccessState] =
    useState<WorkoutAccessState>('checking');
  const fullName = params.get('cuser_name') || appConfig.defaults.fullName;

  useEffect(() => {
    const identity = getAccessRequest(params);
    if (!identity) {
      const timeout = window.setTimeout(() => setAccessState('denied'), 0);
      return () => window.clearTimeout(timeout);
    }

    const controller = new AbortController();
    const query = new URLSearchParams({
      user_id: identity.userId,
      email: identity.email,
    });

    void fetch(`/api/workout-access?${query}`, {
      credentials: 'same-origin',
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('access-check-failed');
        return (await response.json()) as { hasAccess?: unknown };
      })
      .then((result) => setAccessState(result.hasAccess ? 'granted' : 'denied'))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setAccessState('denied');
        }
      });

    return () => controller.abort();
  }, [params]);

  return {
    id: params.get('cuser_id') || 'demo',
    firstName:
      params.get('cuser_fname') ||
      fullName.split(' ')[0] ||
      appConfig.defaults.firstName,
    fullName,
    avatar: safeImageUrl(params.get('cuser_avatar')),
    accessState,
  };
}

function safeImageUrl(value: string | null) {
  if (!value) return '';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}
