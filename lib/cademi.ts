'use client';

import { appConfig } from './config';
import { getCademiAccessState } from './cademi-access';
import { useBrowserSearchParams } from './browser-search-params';

export function useCademiUser() {
  const params = useBrowserSearchParams();
  const fullName = params.get('cuser_name') || appConfig.defaults.fullName;

  return {
    id: params.get('cuser_id') || 'demo',
    firstName:
      params.get('cuser_fname') ||
      fullName.split(' ')[0] ||
      appConfig.defaults.firstName,
    fullName,
    avatar: safeImageUrl(params.get('cuser_avatar')),
    accessState: getCademiAccessState(params),
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
