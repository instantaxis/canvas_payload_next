
'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { FieldValues } from 'react-hook-form';

interface UseFormSubmissionOptions<TData, TError, TVariables extends FieldValues, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => Promise<unknown> | void;
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => Promise<unknown> | void;
}

export const useFormSubmission = <TData, TError, TVariables extends FieldValues, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseFormSubmissionOptions<TData, TError, TVariables, TContext>,
) => {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options,
  });
};
