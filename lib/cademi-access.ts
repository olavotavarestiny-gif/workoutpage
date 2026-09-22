export const cademiContextKeys = [
  'cuser_id',
  'cuser_gratis',
  'cuser_fname',
  'cuser_name',
  'cuser_avatar',
] as const;

export type CademiAccessState = 'purchased' | 'free' | 'unknown';

// Presentation only: Cademí must authorize every actual module/lesson request.
// Missing context is not evidence that an authenticated student has not paid.
export function getCademiAccessState(
  params: URLSearchParams,
): CademiAccessState {
  const values = params.getAll('cuser_gratis');
  if (values.length !== 1) return 'unknown';
  if (values[0] === '0') return 'purchased';
  if (values[0] === '1') return 'free';
  return 'unknown';
}
