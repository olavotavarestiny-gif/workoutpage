'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { cademiContextKeys } from '@/lib/cademi-access';
import { useBrowserSearchParams } from '@/lib/browser-search-params';

type CademiLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
};

export function CademiLink({ href, children, ...props }: CademiLinkProps) {
  const currentParams = useBrowserSearchParams();
  const nextParams = new URLSearchParams();

  for (const key of cademiContextKeys) {
    const value = currentParams.get(key);
    if (value) nextParams.set(key, value);
  }

  const demo = currentParams.get('demo');
  if (demo !== null) nextParams.set('demo', demo);

  const query = nextParams.toString();
  const destination = query ? `${href}?${query}` : href;

  return (
    <a href={destination} {...props}>
      {children}
    </a>
  );
}
