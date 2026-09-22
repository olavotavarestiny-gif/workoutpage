'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { cademiContextKeys } from '@/lib/cademi-access';

type CademiLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export function CademiLink({ href, ...props }: CademiLinkProps) {
  const currentParams = useSearchParams();
  const nextParams = new URLSearchParams();

  for (const key of cademiContextKeys) {
    const value = currentParams.get(key);
    if (value) nextParams.set(key, value);
  }

  const demo = currentParams.get('demo');
  if (demo !== null) nextParams.set('demo', demo);

  const query = nextParams.toString();
  const destination = query ? `${href}?${query}` : href;

  return <Link href={destination} {...props} />;
}
