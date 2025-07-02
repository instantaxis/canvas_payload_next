
'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

interface HydrationProviderProps {
  children: React.ReactNode;
  state: unknown;
}

/**
 * @description Provides hydration for TanStack Query state.
 * @param {HydrationProviderProps} { children, state }
 * @returns {React.ReactElement}
 */
export const HydrationProvider: React.FC<HydrationProviderProps> = ({
  children,
  state,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};
