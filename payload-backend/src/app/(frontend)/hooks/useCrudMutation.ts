
'use client';

import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { createMutation } from '@/app/(frontend)/lib/queryFactories';

interface UseCrudMutationOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<TData, TError, TVariables, TContext> {
  invalidateQueryKeys?: string[][];
}

/**
 * @description A custom hook for performing CRUD mutations with TanStack Query, including automatic query invalidation.
 * @template TData
 * @template TError
 * @template TVariables
 * @template TContext
 * @param {(variables: TVariables) => Promise<TData>} mutationFn - The function that performs the mutation.
 * @param {UseCrudMutationOptions<TData, TError, TVariables, TContext>} [options] - Options for the mutation, including query invalidation keys.
 * @returns {import('@tanstack/react-query').UseMutationResult<TData, TError, TVariables, TContext>}
 */
export const useCrudMutation = <TData, TError, TVariables, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseCrudMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const queryClient = useQueryClient();

  return createMutation<TData, TError, TVariables, TContext>(
    mutationFn,
    {
      onMutate: async (variables) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        if (options?.invalidateQueryKeys) {
          for (const key of options.invalidateQueryKeys) {
            await queryClient.cancelQueries({ queryKey: key });
          }
        }

        // Snapshot the previous value
        const previousData = options?.invalidateQueryKeys ? 
          queryClient.getQueryData(options.invalidateQueryKeys[0]) : undefined;

        // Optimistically update to the new value (if an optimistic update function is provided)
        if (options?.onMutate) {
          options.onMutate(variables);
        }

        return { previousData };
      },
      onError: (error, variables, context) => {
        // Rollback on failure
        if (context?.previousData) {
          queryClient.setQueryData(options?.invalidateQueryKeys?.[0] || [], context.previousData);
        }
        options?.onError?.(error, variables, context);
      },
      onSettled: (data, error, variables, context) => {
        // Always refetch after error or success:
        if (options?.invalidateQueryKeys) {
          options.invalidateQueryKeys.forEach(key => {
            queryClient.invalidateQueries({ queryKey: key });
          });
        }
        options?.onSettled?.(data, error, variables, context);
      },
      onSuccess: (data, variables, context) => {
        options?.onSuccess?.(data, variables, context);
      },
      ...options,
    }
  )();
};
