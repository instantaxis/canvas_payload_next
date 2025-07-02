'use client'

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryClientProviderWrapperProps {
  children: React.ReactNode
}

/**
 * @description Provides a QueryClient to the application and persists its state.
 * @param {QueryClientProviderWrapperProps} { children }
 * @returns {React.ReactElement}
 */
/**
 * @description Provides a QueryClient to the application and persists its state.
 * @param {QueryClientProviderWrapperProps} { children }
 * @returns {React.ReactElement}
 */
export const QueryClientProviderWrapper: React.FC<QueryClientProviderWrapperProps> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
          },
        },
      }),
  )

  const persister = createSyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  })

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const setupPersistence = async () => {
        await persistQueryClient({
          queryClient,
          persister,
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        })
        queryClient.resumePausedMutations()
      }

      setupPersistence()
    }
  }, [queryClient, persister])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
