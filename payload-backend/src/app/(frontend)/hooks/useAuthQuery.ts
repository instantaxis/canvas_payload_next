
'use client';

import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createQuery } from '@/app/(frontend)/lib/queryFactories';

/**
 * @description Options for the useAuthQuery hook.
 * @template TQueryFnData
 * @template TError
 * @template TData
 * @template TQueryKey
 * @augments UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
 */
interface UseAuthQueryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  requireAuth?: boolean; // Whether the query requires authentication
}

/**
 * @description A custom hook for authenticated data fetching with TanStack Query.
 * It automatically includes the authentication token from cookies and handles unauthorized responses.
 * @template TQueryFnData
 * @template TError
 * @template TData
 * @template TQueryKey
 * @param {TQueryKey} queryKey - The query key for TanStack Query.
 * @param {(context: { queryKey: TQueryKey; signal?: AbortSignal }) => Promise<TQueryFnData>} queryFn - The function that fetches the data.
 * @param {UseAuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>} [options] - Options for the query.
 * @returns {import('@tanstack/react-query').UseQueryResult<TData, TError>}
 */
export const useAuthQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: (context: { queryKey: TQueryKey; signal?: AbortSignal }) => Promise<TQueryFnData>,
  options?: UseAuthQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const token = Cookies.get('payload-token'); // Assuming the token is stored in a cookie named 'payload-token'
  const isAuthenticated = !!token;

  const authenticatedQueryFn: typeof queryFn = async (context) => {
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    // Modify the original queryFn to include headers if it's a fetch request
    // This is a simplified example and might need more robust handling for different queryFn types
    if (context.queryKey[0] && typeof context.queryKey[0] === 'string' && context.queryKey[0].startsWith('/')) {
      const response = await fetch(context.queryKey[0], {
        headers,
        signal: context.signal,
      });
      if (!response.ok) {
        // Handle unauthorized or forbidden responses
        if (response.status === 401 || response.status === 403) {
          // Redirect to login or show an error
          console.error('Authentication error', response.status);
          // Example: window.location.href = '/login';
        }
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    }
    return queryFn(context);
  };

  return createQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    authenticatedQueryFn,
    {
      enabled: options?.requireAuth ? isAuthenticated : true, // Only enable if authenticated and required
      ...options,
    }
  )();
};
