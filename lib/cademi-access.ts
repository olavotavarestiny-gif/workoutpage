export const cademiContextKeys = [
  'cuser_id',
  'cuser_gratis',
  'cuser_fname',
  'cuser_name',
  'cuser_email',
  'cuser_avatar',
] as const;

export type WorkoutAccessState = 'checking' | 'granted' | 'denied';

export function getAccessRequest(params: URLSearchParams) {
  const userId = params.get('cuser_id')?.trim() || '';
  const email = params.get('cuser_email')?.trim().toLowerCase() || '';

  if (!/^\d+$/.test(userId) || !email.includes('@')) return null;
  return { userId, email };
}
