
import { QueryKey, useQuery, UseQueryOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';

interface QueryFactoryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {}

interface MutationFactoryOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<TData, TError, TVariables, TContext> {}

/**
 * @description Creates a reusable query hook with a predefined query key and function.
 * @template TQueryFnData
 * @template TError
 * @template TData
 * @template TQueryKey
 * @param {TQueryKey} queryKey - The query key for TanStack Query.
 * @param {(context: { queryKey: TQueryKey; signal?: AbortSignal }) => Promise<TQueryFnData>} queryFn - The function that fetches the data.
 * @param {QueryFactoryOptions<TQueryFnData, TError, TData, TQueryKey>} [options] - Options for the query.
 * @returns {() => import('@tanstack/react-query').UseQueryResult<TData, TError>}
 */
export const createQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: (context: { queryKey: TQueryKey; signal?: AbortSignal }) => Promise<TQueryFnData>,
  options?: QueryFactoryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  return () => useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
};

/**
 * @description Creates a reusable mutation hook with a predefined mutation function.
 * @template TData
 * @template TError
 * @template TVariables
 * @template TContext
 * @param {(variables: TVariables) => Promise<TData>} mutationFn - The function that performs the mutation.
 * @param {MutationFactoryOptions<TData, TError, TVariables, TContext>} [options] - Options for the mutation.
 * @returns {() => import('@tanstack/react-query').UseMutationResult<TData, TError, TVariables, TContext>}
 */
export const createMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationFactoryOptions<TData, TError, TVariables, TContext>,
) => {
  return () => useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
};
