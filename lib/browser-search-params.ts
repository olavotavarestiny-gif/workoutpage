'use client';

import { useMemo, useSyncExternalStore } from 'react';

function subscribeToLocation(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

function getBrowserSearch() {
  return window.location.search;
}

function getServerSearch() {
  return '';
}

export function useBrowserSearchParams() {
  const search = useSyncExternalStore(
    subscribeToLocation,
    getBrowserSearch,
    getServerSearch,
  );

  return useMemo(() => new URLSearchParams(search), [search]);
}
