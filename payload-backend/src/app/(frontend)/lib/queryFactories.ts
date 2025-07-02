
import { QueryKey, useQuery, UseQueryOptions, useMutation, UseMutationOptions } from '@tanstack/react-query';

interface QueryFactoryOptions<TQueryFnData, TError, TData, TQueryKey extends QueryKey> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {}

interface MutationFactoryOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<TData, TError, TVariables, TContext> {}

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

export const createMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationFactoryOptions<TData, TError, TVariables, TContext>,
) => {
  return () => useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
};
