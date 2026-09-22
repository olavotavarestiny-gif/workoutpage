export const cademiContextKeys = [
  'cuser_id',
  'cuser_gratis',
  'cuser_fname',
  'cuser_name',
  'cuser_avatar',
] as const;

export function hasCademiCourseAccess(params: URLSearchParams) {
  return params.get('cuser_gratis') === '0';
}
